import { WebSocketServer } from "ws";
import { WebSocket } from "ws";
import { WebSocket as webSocket } from "ws";
import { verifyUser } from "./auth.js";
import { getUserID } from "./auth.js";
import {
  addUser,
  deleteUser,
  getAllActiveSockets,
  getAllActiveUsers,
} from "./registry.js";
interface WS extends WebSocket {
  userID: string;
}
export type { WS };

const wss = new WebSocketServer({ port: 8000, clientTracking: true });

wss.on("connection", function connection(ws: WS, req) {
  //auth
  if (!req.url || !verifyUser(req.url)) {
    //if url is not given as well
    ws.close(1000, "unverified");
  } else {
    ws.userID = getUserID(req.url);
    addUser(ws.userID, ws);
  }

  ws.on("error", (err) => {
    console.error("Socket error:", err);
  });

  ws.on("message", function message(data) {
    broadCast(data.toString(), ws);
    console.log(wss.clients.size);
    console.log(data.toString());
  });
  ws.on("close", (code, reason) => {
    // ws.send("Socket closed: " + code.toString() + reason.toString());
    deleteUser(ws.userID);
    updateConnections();
  });
  updateConnections();
  ws.send("Connected");
});

interface MessageStructure {
  command: "activeUsers";
  activeUsers: string[];
}

function updateConnections() {
  const message: MessageStructure = {
    command: "activeUsers",
    activeUsers: [],
  };
  let usersConnected: string[] = getAllActiveUsers();
  let connectedSockets: WS[] = getAllActiveSockets();

  connectedSockets.forEach((client) => {
    //only send other connected users except the client itself
    let usersToBroadcast = [...usersConnected];
    let index = usersToBroadcast.indexOf(client.userID);
    usersToBroadcast.splice(index, 1);
    message.activeUsers = usersToBroadcast;
    client.send(JSON.stringify(message));
  });
}

function broadCast(message: string, sender: WS): void {
  wss.clients.forEach((client) => {
    if (client.readyState === webSocket.OPEN && sender != client) {
      client.send(message);
    }
  });
}

export { wss };
