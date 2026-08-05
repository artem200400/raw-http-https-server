import net from "node:net";
import { handleConnection } from "./http-core.js";
const server = net.createServer(handleConnection);

server.listen(3000);
