import { WebSocketServer } from "ws";
import { WebSocket } from "ws";
import { WebSocket as webSocket } from "ws";

interface WS extends WebSocket {
  user: string;
}

const wss = new WebSocketServer({ port: 8000, clientTracking: true });
const map = new Map();

wss.on("connection", function connection(ws: WS, req) {
  //associate ID
  const name: string = new URL(
    req.url as string,
    "ws://localhost:8000",
  ).searchParams.get("user") as string;
  map.set(name, ws);
  ws.user = name;
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    broadCast(data.toString(), ws);
    console.log(wss.clients.size);
    console.log(data.toString());
  });
  ws.on("close", () => {
    map.delete(ws.user);
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
