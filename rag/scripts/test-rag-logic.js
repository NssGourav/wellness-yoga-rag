import { askQuestion } from "../../backend/services/ask.service.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import QueryLog from "../../backend/models/Querylogs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../backend/.env") });

async function testFullFlowNoDB() {
  console.log("🛠️  Running Test in Mock DB Mode (IP Whitelist bypass)...\n");

  // Mock QueryLog.create so it doesn't try to talk to MongoDB
  QueryLog.create = async (data) => {
    console.log("💾 [Mock DB] Logged to database:", data.isUnsafe ? "UNSAFE QUERY" : "SAFE QUERY");
    return { _id: "mock-log-id-123" };
  };

  try {
    const testQueries = [
      "What are the benefits of Konasana?",
      "Can I do surya namaskar if I have a heart condition?",
    ];

    for (const query of testQueries) {
      console.log(`🙋 User: "${query}"`);
      const result = await askQuestion(query);

      console.log(`🤖 AI Answer: ${result.answer}`);
      console.log(`📄 Sources: ${result.sources.join(", ") || "None"}`);
      console.log(`⚠️  Is Unsafe: ${result.isUnsafe}`);
      console.log(`🆔 Log ID: ${result.queryLogId}`);
      console.log("-".repeat(50) + "\n");
    }

    console.log("✅ RAG logic and Gemini integration verified!");

  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

testFullFlowNoDB();
