import express from "express";
const app = express();

app.get("/", (req, res) => {
  console.log("home");
});

app.listen(8080, () => {
  console.log("listening...");
});
