require("dotenv").config();
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const chunksPath = path.join(__dirname, "../chunks.json");
const outputPath = path.join(__dirname, "../embeddings.json");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY not found in .env");
  process.exit(1);
}

async function embedChunks() {
  const chunks = JSON.parse(fs.readFileSync(chunksPath, "utf-8"));
  const embedded = [];

  for (const chunk of chunks) {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent",
      {
        content: {
          parts: [{ text: chunk.text }]
        }
      },
      {
        params: { key: GEMINI_API_KEY }
      }
    );

    embedded.push({
      text: chunk.text,
      embedding: response.data.embedding.values,
      source: chunk.source
    });

    console.log(`✅ Embedded chunk from ${chunk.source}`);
  }

  fs.writeFileSync(outputPath, JSON.stringify(embedded, null, 2));
  console.log("✅ embeddings.json generated successfully");
}

embedChunks();
