import { askQuestion } from "../../backend/services/ask.service.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend folder specifically
dotenv.config({ path: path.join(__dirname, "../../backend/.env") });
async function testFullFlow() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI not found in backend/.env");
    }
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("Connected.\n");

    const testQueries = [
      "What are the benefits of Konasana?",
      "Can I do surya namaskar if I have a heart condition?", // Unsafe
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

  } catch (error) {
    console.error("❌ Test failed:", error.message);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log("DB Connection closed.");
    }
  }
}

testFullFlow();
