import type { WS } from "./server.js";
const userToWS = new Map<string, WS>();

function addUser(userID: string, ws: WS) {
  userToWS.set(userID, ws);
}
function deleteUser(userID: string) {
  userToWS.delete(userID);
}

export { deleteUser, addUser };
