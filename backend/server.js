import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import askroute from "./routes/ask.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  }
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/ask", askroute);

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});
app.get("/ask", (req, res) => {
  res.status(200).json({ ok: true });
});
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
