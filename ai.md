# AI Usage Disclosure

This project was developed with assistance from AI tools to support learning, productivity, and validation.

## AI Tools Used
- Google Gemini API
- ChatGPT
- Antigravity (for frontend scaffolding)

## How AI Was Used

**PROMPTS**:

1. give me a commit message for git add rag/chunks.json

2. Rewrite shevasana information in simple words that I can store in a text file

3. Help me rewrite this website content into my own summarized text so I can use it as knowledge base data?

4. How can i calculate cosine similarity in javaScript and retrieve the top matching chunks for a query?

5. my RAG system is retrieving chunks but the answer doesn’t look correct. how do i debug retrieval vs prompt issues?

6. i need a very basic React native UI that just sends a query, shows the answer, sources, and a safety warning. No extra features

7. What kind of unsafe queries should I test to make sure my safety layer is working properly?

8. Can you walk me through the complete flow of a RAG system from user query to final answer?

9. How do I know whether my retrieval logic is working correctly and not just returning random chunks?

10. Should queries like pain or surgery always be marked unsafe, or is there a better rule of thumb?

11. How can I make sure the AI answers only from retrieved context and doesn’t hallucinate?

12. How simple can the frontend be while still satisfying the evaluation criteria?

13. I want to upgrade the mobile application with a modern, 'cool' aesthetic. Add `expo-linear-gradient` for a vibrant sunset background and use `lucide-react-native` for clean, professional icons. Implement a glassmorphism design for the cards and input fields, ensuring high contrast and smooth transitions between the loading and response states.

14. Implement a robust safety layer. If the backend returns `isUnsafe: true`, the UI MUST display a prominent red warning box at the TOP of the answer card. The message should state: '⚠️ Safety Warning: This question relates to a medical or sensitive topic. Please consult a certified yoga instructor or healthcare professional before attempting any poses.' Ensure this overrides the standard AI response layout when triggered.

15.Backend Refinement & Edge Case Detection
**Objective:** Improve accuracy for safety detection and refine the retrieval logic.

> Optimize the safety service in the backend to ensure keywords like 'surgery' are caught even when phrased as 'recent past surgery'. Ensure the backend response includes a 3-part safety guidance message (gentle notice, safe modifications like supine poses, and professional disclaimer) that is logged correctly in MongoDB.

Deployment & Environment Readiness
**Objective:** Ensure the app works across different device environments (Emulator vs. Physical).

> "Detected a network timeout error on the device. Update the `BACKEND_URL` to dynamically use the machine's local IP address (`192.168.x.x`) instead of `localhost` so the physical test device can communicate with the local Node.js server within the same Wi-Fi network."

**Knowledge Base Preparation**
   - AI was used to summarize publicly available yoga education content into simple, original text.
   - All content was reviewed and edited manually before inclusion.

**RAG Pipeline Understanding**
   - AI was used to understand concepts such as chunking, embeddings, cosine similarity, and retrieval flow.

**Code Assistance**
   - AI helped generate scripts for:
     - Frontend UI
     - Similarity based retrieval
   - All code was reviewed, tested, and modified manually.

**Debugging & Validation**
   - AI was used to help debug runtime errors and validate RAG outputs.

**Frontend Scaffolding**
   - Antigravity was used to scaffold a basic React Native UI.
   - Logic, API integration, and safety handling were implemented manually.

## What AI Was NOT Used For
- AI did not generate final answers directly without retrieval.
- AI did not bypass safety checks.
- AI did not provide medical advice logic.
- AI did not automatically generate the complete project without review.

## Developer Responsibility
All architectural decisions, safety logic, data handling, and final integration were performed and verified by the developer.
