import express from "express";
import { askQuestion } from "../services/ask.service.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }
  try {
    const result = await askQuestion(query);
    res.status(200).json(result);
  } catch (error) {
    console.error("Route error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
