# ✨ Magic Scrapbook

<div align="center">

**An interactive, autism-friendly digital journal designed to encourage creativity, emotional awareness, and memory keeping.**

![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)

</div>

---

## 📖 About

Magic Scrapbook is a thoughtfully designed digital journal application that provides a safe, creative space for individuals, especially those on the autism spectrum, to express themselves. The app combines art, storytelling, and emotional tracking in an intuitive, gamified interface that makes journaling fun and engaging.

### Why Magic Scrapbook?

- **Sensory-Friendly Design**: Clean, calming interface designed with neurodiversity in mind
- **Creative Expression**: Multiple ways to express thoughts and feelings through art, photos, and stories
- **AI-Powered Storytelling**: Gentle AI assistance to help expand ideas and stories
- **Emotional Awareness**: Simple, visual tools to track moods and daily habits
- **Memory Preservation**: Beautiful gallery to revisit past creations and moments

---

## 🎨 Features

### 🖼️ Art Room
A creative sanctuary for self-expression:
- **Draw freely** on an interactive canvas
- **Upload photos** to include in your memories
- **Write stories** about your creations
- **AI Magic Wand** ✨: Uses Google Gemini to help expand your stories based on your drawings
- **Save & Share**: Store your creations in the Memories Vault

### 😊 Mood Checker
A gamified daily check-in system to build self-awareness:
- Track your **Mood** 😊😐😢 with emoji selections
- Monitor **Water intake** 💧 for hydration tracking
- Record **Sleep quality** ⭐ with star ratings
- Check your **Energy levels** 🔋 with battery indicators
- Practice **Gratitude** 🙏 with daily reflections
- Get a beautiful **Daily Snapshot** card summarizing your day

### 📸 Memories Vault
A secure, beautiful gallery where all your creations live:
- Browse all your saved drawings in a polaroid-style layout
- View mood snapshots from previous check-ins
- Relive special moments and see your progress over time

### 💭 Quote Display
Positive affirmations to brighten your day and encourage positive thinking.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library for building interactive interfaces
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling

### AI & APIs
- **Google Gemini API** - Generative AI for story expansion

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB** - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier) or local installation

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Seventie/Autism--Journal.git
   cd Autism--Journal
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Environment Setup**

   Create a `.env` file in the **root directory**:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

   Create a `.env` file in the **server directory**:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=3001
   ```

   > **Getting API Keys:**
   > - **Gemini API Key**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   > - **MongoDB URI**: Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

5. **Run the Application**

   Open two terminal windows:

   **Terminal 1 - Frontend:**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

   **Terminal 2 - Backend:**
   ```bash
   cd server
   npm run dev
   ```
   The backend will run on `http://localhost:3001`

6. **Open in Browser**

   Navigate to `http://localhost:5173` to start using Magic Scrapbook!

---

## 📁 Project Structure

```
Autism--Journal/
├── components/           # React components
│   ├── ArtRoom.tsx      # Drawing and story creation
│   ├── MoodChecker.tsx  # Daily mood tracking
│   ├── Memories.tsx     # Memory gallery
│   ├── QuoteDisplay.tsx # Inspirational quotes
│   └── Sidebar.tsx      # Navigation sidebar
├── server/              # Backend application
│   ├── src/
│   │   └── server.ts    # Express server setup
│   ├── package.json
│   └── .env
├── services/            # API services
├── App.tsx              # Main application component
├── index.tsx            # Application entry point
├── types.ts             # TypeScript type definitions
├── package.json         # Frontend dependencies
├── vite.config.ts       # Vite configuration
└── README.md            # You are here!
```

---

## 🎯 Usage

### Creating Your First Drawing

1. Click on **Art Room** in the sidebar
2. Use the drawing tools to create your artwork
3. Write a story about your drawing in the text area
4. Click the **AI Magic Wand** ✨ to let Gemini expand your story (optional)
5. Click **Save Memory** to store your creation

### Daily Mood Check-In

1. Click on **Mood Checker** in the sidebar
2. Select emojis representing your current mood
3. Track your water intake, sleep quality, and energy levels
4. Write something you're grateful for
5. Submit to generate your Daily Snapshot card

### Viewing Your Memories

1. Click on **Memories Vault** in the sidebar
2. Browse through your saved drawings and mood snapshots
3. Click on any memory to view it in detail

---

## 🤝 Contributing

We welcome contributions to make Magic Scrapbook even better! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Ideas for Contributions

- 🎨 Additional drawing tools (shapes, stamps, patterns)
- 🌈 More accessibility features
- 🔊 Sound effects and audio feedback
- 🌍 Internationalization (i18n) support
- 📱 Mobile app version
- ♿ Enhanced screen reader support

---

## 📄 License

This project is open source and available for personal and educational use.

---

## 💖 Acknowledgments

- Designed with love for the autism community
- Inspired by the need for sensory-friendly, creative tools
- Thanks to all contributors and supporters

---

## 🐛 Support

If you encounter any issues or have questions:
1. Check existing [GitHub Issues](https://github.com/Seventie/Autism--Journal/issues)
2. Create a new issue with a detailed description
3. Include screenshots if applicable

---

<div align="center">

**Made with ❤️ for a more inclusive digital world**

⭐ If you find this project helpful, please consider giving it a star! ⭐

</div>
