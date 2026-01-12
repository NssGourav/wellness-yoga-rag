import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "../data");
const OUTPUT_FILE = path.join(__dirname, "../chunks.json");

// Section headers to identify semantic boundaries
const SECTION_HEADERS = [
  "TITLE:",
  "CATEGORY:",
  "DESCRIPTION:",
  "BENEFITS:",
  "CONTRAINDICATIONS:",
  "WHO SHOULD PRACTICE:",
  "SOURCE:",
  "STEPS:",
  "TECHNIQUE:",
  "DURATION:"
];

function createSemanticChunks(content, filename) {
  const lines = content.split("\n");
  const chunks = [];
  let currentSection = "";
  let currentLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check if this line is a section header
    const isHeader = SECTION_HEADERS.some(header => line.startsWith(header));

    if (isHeader && currentLines.length > 0) {
      // Save the previous section as a chunk
      const chunkText = currentLines.join(" ").trim();
      if (chunkText) {
        chunks.push({
          text: chunkText,
          source: filename
        });
      }
      currentLines = [line];
    } else if (line) {
      currentLines.push(line);
    }
  }

  // Add the last section
  if (currentLines.length > 0) {
    const chunkText = currentLines.join(" ").trim();
    if (chunkText) {
      chunks.push({
        text: chunkText,
        source: filename
      });
    }
  }

  return chunks;
}

const chunks = [];
if (fs.existsSync(DATA_DIR)) {
  fs.readdirSync(DATA_DIR).forEach(file => {
    if (!file.endsWith(".txt")) return;
    const content = fs.readFileSync(path.join(DATA_DIR, file), "utf-8");
    const fileChunks = createSemanticChunks(content, file);
    chunks.push(...fileChunks);
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(chunks, null, 2));
  console.log(`Created ${chunks.length} semantic chunks`);
} else {
  console.error("Data directory not found:", DATA_DIR);
}
