import { retrieveTopChunks } from "../../backend/services/retrieve.service.js";
import { embedQuery } from "../../backend/services/embedding.service.js";

async function test() {
  const queryText = "benefits of sideways bending yoga pose";

  console.log(`Querying: "${queryText}"...`);

  try {
    const queryEmbedding = await embedQuery(queryText);
    const results = retrieveTopChunks(queryEmbedding, 3);

    console.log("\n Top retrieved chunks:\n");
    results.forEach((r, i) => {
      console.log(`--- Result ${i + 1} (Score: ${r.score.toFixed(4)}) ---`);
      console.log(r.text);
      console.log("Source:", r.source);
      console.log("");
    });
  } catch (error) {
    console.error(error.message);
  }
}

test();
