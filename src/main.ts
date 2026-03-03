import express from "express";
import { wss } from "./websocket.js";
import cors from "cors";
import { login, signin } from "./auth.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  console.log("home");
});

app.post("/login", login);
app.post("/signup", signin);

app.listen(8080, () => {
  console.log("listening...");
});
