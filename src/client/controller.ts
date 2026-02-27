import { socket } from "./socket.js";
import { rl } from "./terminal.js";
import { menu } from "./state.js";

function userInput(text: string): void {
  if (!menu.data().login) {
    console.log("Please log in first");
  } else {
    socket.send(text);
  }
}

export { userInput };
