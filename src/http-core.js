export function parseRequest(requestText) {
     let headerEnd = requestText.indexOf("\r\n\r\n")
      let headerText = requestText.slice(0, headerEnd)
      let lines = headerText.split('\r\n')
   
      const requestLineParts = lines[0].split(" ")
      console.log(requestLineParts);
      const method = requestLineParts[0]
      const path = requestLineParts[1]
      const version = requestLineParts[2]
      const headers = {};
      for (let index = 1; index < lines.length; index++) {
        console.log(lines[index]);
        const colonIndex = lines[index].indexOf(":")
        const headerName = lines[index].slice(0, colonIndex).toLowerCase()
        const headerValue = lines[index].slice(colonIndex + 1).trim()
        headers[headerName] = headerValue
  }
return {
  method,
  path,
  version,
  headers
}
}
  export function handleConnection(socket) {
let buffer = "";
  socket.on("data", (chunk) => {
    buffer = buffer + chunk.toString();
    
    console.log(buffer);
    if (buffer.includes('\r\n\r\n')) {
      console.log('Заголовки отримані повністю');
      const parsedRequest = parseRequest(buffer)
      const method = parsedRequest.method
      const path = parsedRequest.path
      const version = parsedRequest.version
      const headers = parsedRequest.headers
      console.log(parsedRequest)


      let status;
      let body;

      if (method === "GET" && path === "/") {
        status = "200 OK";
        body = "Все Добре";
        console.log(status, body);
     
      }
      else if (method === "GET" && path === "/headers") {
        status = "200 OK";
        body = "";
        for (const key in headers) {
    
          const element = headers[key];
           body += key + ": " + element + "\n"
          
        }
        
      }
      else{
        status = "404 Not Found";
        body = "Все погано";
        console.log(status, body); 
      }
         const contentLength = Buffer.byteLength(body, "utf8");
      const response =
  "HTTP/1.1 " + status + "\r\n" +
  "Content-Type: text/plain; charset=utf-8\r\n" +
  "Content-Length: " + contentLength + "\r\n" +
  "\r\n" +
        body;
      socket.end(response);
}
});
}