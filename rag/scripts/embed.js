require("dotenv").config();
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const chunksPath = path.join(__dirname, "../chunks.json");
const outputPath = path.join(__dirname, "../embeddings.json");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function embedChunks() {
  const chunks = JSON.parse(fs.readFileSync(chunksPath, "utf-8"));
  const embedded = [];

  for (const chunk of chunks) {
    const response = await fetch("https://api.generative.ai/v1/embeddings", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GEMINI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gemini-text-embedding-3-small",
        input: chunk.text
      })
    });

    const data = await response.json();

    embedded.push({
      text: chunk.text,
      embedding: data.data[0].embedding,
      source: chunk.source
    });

    console.log(`Embedded chunk from ${chunk.source}`);
  }

  fs.writeFileSync(outputPath, JSON.stringify(embedded, null, 2));
  console.log("Embeddings generated for all chunks using Gemini");
}
embedChunks();