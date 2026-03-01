import type { DirectMessageIncoming, Reciever, Request } from "./types.js";

function handleIncoming(incomingMessage: Reciever): Request {
  switch (incomingMessage.command) {
    case "sendDirectMessage":
      return sendDirectMessage(incomingMessage);
    default:
      throw new Error("Incoming Message Not Defined");
  }
}

function sendDirectMessage(data: DirectMessageIncoming) {
  return data;
}

export { handleIncoming };
