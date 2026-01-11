import mongoose from "mongoose";

const QueryLogSchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    default: "",
  },
  sources: {
    type: [String],
    default: [],
  },
  isUnsafe: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("QueryLog", QueryLogSchema);
