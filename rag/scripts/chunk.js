import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "../data");
const OUTPUT_FILE = path.join(__dirname, "../chunks.json");
const chunkSize = 3;

const chunks = [];
if (fs.existsSync(DATA_DIR)) {
  fs.readdirSync(DATA_DIR).forEach(file => {
    if (!file.endsWith(".txt")) return;
    const content = fs.readFileSync(path.join(DATA_DIR, file), "utf-8");
    const lines = content.split("\n").filter(Boolean);

    for (let i = 0; i < lines.length; i += chunkSize) {
      const chunk = lines.slice(i, i + chunkSize).join(" ");
      chunks.push({
        text: chunk,
        source: file
      });
    }
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(chunks, null, 2));
  console.log(`Created ${chunks.length} chunks`);
} else {
  console.error("Data directory not found:", DATA_DIR);
}
