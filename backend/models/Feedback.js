import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    queryLogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QueryLog",
      required: true,
    },

    isHelpful: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", FeedbackSchema);
