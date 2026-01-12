import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function embedQuery(text) {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY not found in environment variables");
  }

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent",
      {
        content: {
          parts: [{ text }]
        }
      },
      {
        params: { key: GEMINI_API_KEY }
      }
    );

    if (response.data && response.data.embedding && response.data.embedding.values) {
      return response.data.embedding.values;
    } else {
      throw new Error("Invalid response from Gemini Embedding API");
    }
  } catch (error) {
    console.error("Embedding error:", error.response?.data || error.message);
    throw error;
  }
}
