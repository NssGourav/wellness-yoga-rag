import express from "express";
import QueryLog from "../models/Querylogs.js";

const router = express.Router()
const UNSAFE_KEYWORDS = ["pregnant", "pregnancy", "hernia", "glaucoma", "high blood pressure", "bp", "surgery",]

router.post("/", async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Query is required" })
  }
  const lowerQuery = query.toLowerCase()
  const unsafeMatch = UNSAFE_KEYWORDS.find((word) =>
    lowerQuery.includes(word)
  )

  const isUnsafe = Boolean(unsafeMatch)

  const answer = isUnsafe ? "This question may involve health risks. Please consult a qualified yoga instructor or doctor before practicing."
    : "RAG response will be added soon.";

  const log = await QueryLog.create({
    query,
    answer,
    isUnsafe,
    safetyReason: unsafeMatch || null,
  });

  res.status(200).json({
    answer,
    isUnsafe,
    queryLogId: log._id,
  });
});

export default router;
