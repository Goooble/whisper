interface NetworkMessage extends Message {
  status: string;
}
interface Message {
  command: "activeUsers" | "network" | "directMessage";
}

interface ConnectionsMessage extends Message {
  activeUsers: string[];
}

interface DirectMessage extends Message {
  sender: string;
  text: string;
}

interface Incoming {
  command: "sendDirectMessage" | "Add whatever";
}

interface DirectMessageIncoming extends Incoming {
  sender: string;
  receiver: string;
  text: string;
}

type Reciever = DirectMessageIncoming; //add more types later
//to recieve and determine type
//add more requests later
type Request = DirectMessageIncoming;

export type {
  NetworkMessage,
  ConnectionsMessage,
  Reciever,
  DirectMessageIncoming,
  Request,
  DirectMessage,
};
