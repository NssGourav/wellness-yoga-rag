import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import askRoutes from "./routes/ask.js";

import { connectDB } from "./utils/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/ask", askRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
