import express from "express";
import { wss } from "./server.js";
import cors from "cors";

const app = express();
// app.use(cors());
app.get("/", (req, res) => {
  console.log("home");
});

app.listen(8080, () => {
  console.log("listening...");
});
