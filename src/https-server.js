import tls from "node:tls";
import fs from "node:fs";
import { handleConnection } from "./http-core.js";

const options = {
    key: fs.readFileSync('certs/server-key.pem'),
    cert: fs.readFileSync('certs/server-cert.pem')
};
const server = tls.createServer(options, (handleConnection))
server.listen(3443);