import { WebSocketServer } from "ws";
import type { WebSocket } from "ws";
import { WebSocket as webSocket } from "ws";

const wss = new WebSocketServer({ port: 8080, clientTracking: true });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    broadCast(data.toString(), ws);
  });

  ws.send("Connected");
});
function broadCast(message: string, sender: WebSocket): void {
  wss.clients.forEach((client) => {
    if (client.readyState === webSocket.OPEN && sender != client) {
      client.send(message);
    }
  });
}

export { wss };
