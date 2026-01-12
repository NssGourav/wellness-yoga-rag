import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const chunksPath = path.join(__dirname, "../chunks.json");
const outputPath = path.join(__dirname, "../embeddings.json");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function embedChunks() {
  const chunks = JSON.parse(fs.readFileSync(chunksPath, "utf-8"));
  const embedded = [];

  for (const chunk of chunks) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: {
            parts: [{ text: chunk.text }]
          }
        })
      }
    );

    const data = await response.json();

    embedded.push({
      text: chunk.text,
      embedding: data.embedding.values,
      source: chunk.source
    });

    console.log(`Embedded chunk from ${chunk.source}`);
  }

  fs.writeFileSync(outputPath, JSON.stringify(embedded, null, 2));
  console.log("Embeddings generated for all chunks using Gemini");
}
embedChunks();