
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-72 bg-white/90 backdrop-blur-md border-r border-blue-100 h-screen flex flex-col p-6 gap-8 z-20">
      <div className="flex items-center gap-3">
        <div className="bg-[#4C9AFF] shadow-[4px_4px_0px_#BFDBFE] p-2 rounded-xl text-white">
          <span className="material-symbols-outlined text-3xl">auto_stories</span>
        </div>
        <div>
          <h1 className="text-lg font-bold leading-tight">My Scrapbook</h1>
          <p className="text-xs text-[#4c739a] font-medium">Magic Memories!</p>
        </div>
      </div>

      <nav className="flex flex-col gap-4">
        <NavLink
          to="/art-room"
          className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group ${isActive ? 'bg-[#4C9AFF] text-white shadow-lg shadow-primary/30 border-b-4 border-blue-600' : 'hover:bg-pastel-blue'}`}
        >
          <span className="material-symbols-outlined text-3xl text-pink-400 group-hover:scale-110 transition-transform">palette</span>
          <span className="text-base font-bold">Art Room</span>
        </NavLink>
        <NavLink
          to="/memories"
          className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group ${isActive ? 'bg-[#4C9AFF] text-white shadow-lg shadow-primary/30 border-b-4 border-blue-600' : 'hover:bg-pastel-blue'}`}
        >
          <span className="material-symbols-outlined text-3xl text-green-400 group-hover:scale-110 transition-transform">photo_library</span>
          <span className="text-base font-bold">Memories</span>
        </NavLink>
        <NavLink
          to="/mood-checker"
          className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group ${isActive ? 'bg-[#4C9AFF] text-white shadow-lg shadow-primary/30 border-b-4 border-blue-600' : 'hover:bg-pastel-blue'}`}
        >
          <span className="material-symbols-outlined text-3xl text-yellow-400 group-hover:scale-110 transition-transform">mood</span>
          <span className="text-base font-bold">Mood Tracker</span>
        </NavLink>
      </nav>

      <div className="mt-auto bg-white border-2 border-dashed border-blue-200 p-4 rounded-2xl flex items-center gap-3">
        <div className="size-12 rounded-full bg-cover bg-center border-4 border-white shadow-md" style={{ backgroundImage: "url('https://picsum.photos/seed/alex/100/100')" }}></div>
        <div className="overflow-hidden">
          <p className="text-sm font-bold truncate">Alex's Gallery</p>
          <p className="text-[10px] text-primary font-bold uppercase tracking-wider">Super Explorer</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
