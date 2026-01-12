import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function listModels() {
  try {
    const response = await axios.get(
      "https://generativelanguage.googleapis.com/v1beta/models",
      {
        params: { key: GEMINI_API_KEY }
      }
    );
    console.log("Available Models:");
    response.data.models.forEach(m => console.log(m.name));
  } catch (error) {
    console.error("Error listing models:", error.response?.data || error.message);
  }
}

listModels();
