import express from "express";
import authRoutes from "./routes/authRoute";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// mount router
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello from TypeScript backend");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
