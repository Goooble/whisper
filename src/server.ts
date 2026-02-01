import { WebSocketServer } from "ws";
import { WebSocket } from "ws";
import { WebSocket as webSocket } from "ws";
import { verifyUser } from "./auth.js";
import { getUserID } from "./auth.js";
import { addUser, deleteUser } from "./registry.js";
interface WS extends WebSocket {
  userID: string;
}
export type { WS };

const wss = new WebSocketServer({ port: 8000, clientTracking: true });

wss.on("connection", function connection(ws: WS, req) {
  //auth
  if (!req.url || !verifyUser(req.url)) {
    //if url is not given as well
    ws.close();
  } else {
    ws.userID = getUserID(req.url);
    addUser(ws.userID, ws);
  }

  ws.on("error", console.error);

  ws.on("message", function message(data) {
    broadCast(data.toString(), ws);
    console.log(wss.clients.size);
    console.log(data.toString());
  });
  ws.on("close", () => {
    deleteUser(ws.userID);
  });

  ws.send("Connected");
});

function broadCast(message: string, sender: WS): void {
  wss.clients.forEach((client) => {
    if (client.readyState === webSocket.OPEN && sender != client) {
      client.send(message);
    }
  });
}

export { wss };
