import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { queryLogId, isHelpful } = req.body;

  if (!queryLogId || typeof isHelpful !== "boolean") {
    return res.status(400).json({
      error: "queryLogId and isHelpful (boolean) are required"
    });
  }

  try {
    const feedback = await Feedback.create({
      queryLogId,
      isHelpful
    });

    res.status(201).json({
      message: "Feedback received",
      feedbackId: feedback._id
    });
  } catch (error) {
    console.error("Feedback error:", error.message);
    res.status(500).json({ error: "Failed to save feedback" });
  }
});

export default router;
