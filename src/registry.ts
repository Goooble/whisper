import type { WS } from "./websocket.js";
const userToWS = new Map<string, WS>();

function addUser(userID: string, ws: WS): void {
  userToWS.set(userID, ws);
}
function deleteUser(userID: string): void {
  userToWS.delete(userID);
}

function getAllActiveUsers(): string[] {
  const users: string[] = [];
  userToWS.forEach((value, key) => {
    users.push(key);
  });
  return users;
}

function getAllActiveSockets(): WS[] {
  const sockets: WS[] = [];
  userToWS.forEach((value, key) => {
    sockets.push(value);
  });
  return sockets;
}

function getSocket(user: string): WS {
  const socket = userToWS.get(user);
  if (!socket) throw new Error("Socket doesnt exist");
  return socket;
}

export {
  deleteUser,
  addUser,
  getAllActiveUsers,
  getSocket,
  getAllActiveSockets,
};
