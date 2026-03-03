import express from "express";
import { wss } from "./websocket.js";
import cors from "cors";
import { signin } from "./auth.js";

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.get("/", (req, res) => {
  console.log("home");
});

app.post("/login", (req, res) => {});
app.post("/signup", signin);

app.listen(8080, () => {
  console.log("listening...");
});
