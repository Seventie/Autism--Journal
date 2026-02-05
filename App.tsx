import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ArtRoom from './components/ArtRoom';
import Memories from './components/Memories';
import Sidebar from './components/Sidebar';
import MoodChecker from './components/MoodChecker';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<ArtRoom />} />
            <Route path="/art-room" element={<ArtRoom />} />
            <Route path="/memories" element={<Memories />} />
            <Route path="/mood-checker" element={<MoodChecker />} />
            <Route path="*" element={<ArtRoom />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
