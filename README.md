# Yoga Wellness RAG Micro-App

A **Retrieval-Augmented Generation (RAG)** based wellness application focused on providing **safe, grounded, and explainable yoga guidance**.

The system retrieves answers strictly from curated yoga articles, applies **medical safety checks**, and ensures **full traceability** by logging queries, answers, and sources in MongoDB.

This project fully satisfies **Track B – Wellness RAG Micro-App** requirements.

---

## 📌 Project Overview

This application allows users to ask yoga-related questions and receive responses that are:

- Grounded only in retrieved yoga content
- Safety-checked for medical or high-risk conditions
- Transparent with cited sources
- Logged for traceability and feedback analysis

A fully tested Android **APK file** is included in the repository for evaluation.

---

## 🏗️ System Architecture
    Frontend (React Native)   
    ↓   
    Backend (Node.js + Express)   
    ↓   
    RAG Pipeline    
    ↓   
    MongoDB (Logs & Feedback)

---

## 🔁 RAG Pipeline Description

The system follows this **exact flow**:

    User Query  
    ↓   
    Safety Check    
    ↓   
    Query Embedding   
    ↓   
    Vector Similarity Search      
    ↓   
    Context Assembly    
    ↓   
    Constrained Prompt    
    ↓     
    LLM Answer    
    ↓   
    MongoDB Logging + Sources


---

## 📖 Explanation

- Yoga articles are split into meaningful text chunks  
- Each chunk is converted into numerical embeddings  
- The user query is embedded using the same embedding model  
- Cosine similarity retrieves the most relevant chunks  
- Retrieved context is injected into a controlled prompt  
- The AI generates an answer **only from retrieved data**

---

## 🚨 Safety Logic

### Safety Detection

Queries are flagged as **unsafe** if they include references to:

- Pregnancy  
- Surgery  
- Medical conditions (e.g., high blood pressure, hernia, glaucoma)

### Unsafe Query Behavior

- `isUnsafe = true` is stored in MongoDB  
- **No medical advice** is provided  
- A safety-first response is returned  
- UI displays a **red warning message** advising professional supervision  

---

## 🗄️ Data Models

### QueryLog Model

Stores:
- User query  
- Final AI answer  
- Retrieved sources  
- Safety flag  
- Timestamp  

### Feedback Model

Stores:
- User feedback (👍 / 👎)  
- Linked query ID  

---

## ⚙️ Installation & Setup

### 1️⃣ Backend Setup

```bash
cd backend
npm install
```
Create a .env file inside the backend folder:
```
PORT=5001
MONGODB_URI= your_mongodb_connection_string
GEMINI_API_KEY= your_gemini_api_key
```
### Start the backend server
```bash
npm run dev
```

### 2️⃣ RAG Scripts Setup
```bash
cd rag
node scripts/chunk.js
node scripts/embed.js
```

- This generates: 
    - chunks.json
    - embeddings.json

## 3️⃣ Frontend Setup (React Native)
``` bash
cd frontend
npm install
```
- Run the app on Android:
  - npx react-native run-android


A fully tested .apk file is included in the repository.

 Demo Video Link: [demolink](https://drive.google.com/file/d/1lZbNEI7BnOVbXa9Cz-eLcJXKBhSKgeK9/view?usp=sharing)

## 🤖 AI Tools & Prompts Used
  - Refer [ai.md](ai.md)


📝 All AI-generated outputs were manually reviewed and integrated.

🚀 Deployment

Frontend: https://wellness-yoga-rag.vercel.app/

Backend: https://wellness-yoga-rag.onrender.com

Database: MongoDB Atlas
