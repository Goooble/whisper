import type { WS } from "./server.js";
const userToWS = new Map<string, WS>();

function addUser(userID: string, ws: WS) {
  userToWS.set(userID, ws);
}
function deleteUser(userID: string) {
  userToWS.delete(userID);
}

function getAllActiveUsers() {
  const users: string[] = [];
  userToWS.forEach((value, key) => {
    users.push(key);
  });
  return users;
}

function getAllActiveSockets() {
  const sockets: WS[] = [];
  userToWS.forEach((value, key) => {
    sockets.push(value);
  });
  return sockets;
}

function getSocket(user: string) {
  return userToWS.get(user);
}

export {
  deleteUser,
  addUser,
  getAllActiveUsers,
  getSocket,
  getAllActiveSockets,
};
