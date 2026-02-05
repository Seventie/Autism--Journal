# ✨ Magic Scrapbook

An interactive, autism-friendly digital journal designed to encourage creativity, emotional awareness, and memory keeping.

## 🎨 Features

- **Art Room**: A creative space to draw, upload photos, and write stories.
  - **AI Magic Wand**: Uses Google Gemini to automatically expand your stories based on your drawings.
- **Mood Checker**: A gamified daily check-in system.
  - Track **Mood** (Emojis), **Water** (Hydration), **Sleep** (Stars), **Energy** (Battery), and **Gratitude**.
  - Generates a "Daily Snapshot" card upon submission.
- **Memories Vault**: A secure gallery to view all your saved drawings and mood snapshots.
- **Quote Display**: Delivers positive affirmations to brighten your day.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **AI**: Google Gemini API

## 🚀 Getting Started

1.  **Install dependencies** (in both root and server folders):
    ```bash
    npm install
    cd server && npm install
    ```
2.  **Environment Setup**:
    - Create a `.env` in the root with `VITE_GEMINI_API_KEY=your_key_here`.
    - Create a `.env` in `server/` with `MONGODB_URI=your_mongo_url`.
3.  **Run the App**:
    - Frontend: `npm run dev`
    - Backend: `cd server && npm run dev`
