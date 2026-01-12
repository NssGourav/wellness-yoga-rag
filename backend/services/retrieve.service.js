import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const embeddingsPath = path.join(__dirname, "../../rag/embeddings.json");

let embeddings = [];
try {
  embeddings = JSON.parse(fs.readFileSync(embeddingsPath, "utf-8"));
  console.log("Loaded embeddings:", embeddings.length);
} catch (error) {
  console.error("Failed embeddings.json:", error.message);
}

function cosineSimilarity(vecA, vecB) {
  if (!Array.isArray(vecA) || !Array.isArray(vecB)) {
    return 0;
  }
  const dotProduct = vecA.reduce((sum, val, i) => sum + (val * (vecB[i] || 0)), 0);
  const normA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const normB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (normA * normB);
}

export function retrieveTopChunks(queryEmbedding, topK = 3) {
  if (!Array.isArray(queryEmbedding)) {
    console.error("❌ Error: retrieveTopChunks expected an array for queryEmbedding but received:", typeof queryEmbedding);
    throw new Error("embed the query string first?");
  }

  const scoredChunks = embeddings.map(chunk => ({
    ...chunk,
    score: cosineSimilarity(queryEmbedding, chunk.embedding)
  }));

  return scoredChunks
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
