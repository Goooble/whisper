import express from "express";
import { wss } from "./websocket.js";
import cors from "cors";
import { login, logout, signin, verifyAuth } from "./auth.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post("/login", login);
app.post("/signup", signin);
app.get("/logout", logout);
app.get("/api", verifyAuth, (req, res) => {
  res.send("ok");
});
app.get("/me");
app.listen(8080, () => {
  console.log("listening...");
});
