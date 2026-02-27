import { createInterface } from "node:readline";
import { exit, stdin, stdout } from "node:process";
import { userInput } from "./controller.js";
import { menu } from "./state.js";

const rl = createInterface({
  input: stdin,
  output: stdout,
  prompt: ">",
});

rl.on("line", (line) => {
  userInput(line.trim());
  rl.prompt();
}).on("close", () => {
  console.log("Have a great day!");
  exit(0);
});

export { rl };
