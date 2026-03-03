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
  getSocket,
} from "./registry.js";
import type {
  NetworkMessage,
  ConnectionsMessage,
  Reciever,
  Request,
  DirectMessage,
} from "./types.js";
import { handleIncoming } from "./chatService.js";

interface WS extends WebSocket {
  userID: string;
}

export type { WS };

const wss = new WebSocketServer({ port: 8000, clientTracking: true });

function serviceHandler(request: Request): void {
  switch (request.command) {
    case "sendDirectMessage":
      sendDirectMessage(request);
  }
}

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
    try {
      const recieved: Reciever = JSON.parse(data.toString());
      const serviceInstruction: Request = handleIncoming(recieved);
      serviceHandler(serviceInstruction);
    } catch (e: any) {
      throw e;
    }
  });
  ws.on("close", (code, reason) => {
    // ws.send("Socket closed: " + code.toString() + reason.toString());
    deleteUser(ws.userID);
    updateConnections();
  });
  updateConnections();
  const payload: NetworkMessage = {
    command: "network",
    status: "Connected",
  };
  ws.send(JSON.stringify(payload));
});

function updateConnections() {
  const message: ConnectionsMessage = {
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
    //broadcast
    message.activeUsers = usersToBroadcast;
    client.send(JSON.stringify(message));
  });
}

function sendDirectMessage(request: Request): void {
  const recieverSocket: WS = getSocket(request.receiver);
  const Message: DirectMessage = {
    command: "directMessage",
    sender: request.sender,
    text: request.text,
  };
  recieverSocket.send(JSON.stringify(Message));
  console.log("sending message");
}

export { wss };
