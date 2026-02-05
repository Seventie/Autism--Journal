
import React, { useState, useEffect } from 'react';
import { Memory } from '../types';
import { memoryService } from '../services/memoryService';

const Memories: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'drawing' | 'story' | 'photo' | 'mood'>('all');

  useEffect(() => {
    loadMemories();
  }, []);

  const loadMemories = async () => {
    setLoading(true);
    try {
      const data = await memoryService.getAll();
      setMemories(data);
    } catch (err) {
      console.error("Backend error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this memory from the magic vault?")) return;
    await memoryService.delete(id);
    loadMemories();
  };

  const filteredMemories = memories.filter(m => filter === 'all' || m.type === filter);

  // Helper for decorative stickers on cards
  const getSticker = (index: number) => {
    const stickers = [
      { icon: 'star', color: 'text-yellow-400', pos: '-top-4 -left-4' },
      { icon: 'favorite', color: 'text-pink-400', pos: '-top-4 -right-4 rotate-12' },
      { icon: 'sentiment_very_satisfied', color: 'text-blue-400', pos: '-bottom-4 -right-4' },
      { icon: 'auto_awesome', color: 'text-purple-400', pos: '-top-4 -left-2 -rotate-12' },
      { icon: 'eco', color: 'text-green-400', pos: 'top-2 -right-4' },
      { icon: 'potted_plant', color: 'text-orange-400', pos: '-bottom-2 -left-4 rotate-12' }
    ];
    return stickers[index % stickers.length];
  };

  return (
    <div className="flex-1 flex flex-col p-8 relative overflow-x-hidden h-full overflow-y-auto scrapbook-bg">
      {/* Background Decorations */}
      <span className="material-symbols-outlined absolute top-10 right-20 text-6xl text-pink-200/50 -rotate-12 select-none pointer-events-none">favorite</span>
      <span className="material-symbols-outlined absolute bottom-40 left-10 text-8xl text-yellow-200/50 rotate-12 select-none pointer-events-none">star</span>

      <header className="max-w-6xl mx-auto w-full mb-8 relative">
        <div className="flex flex-col gap-2">
          <h2 className="text-5xl font-black tracking-tight text-primary font-handwritten">My Scrapbook Memories</h2>
          <p className="text-xl text-[#4c739a] max-w-2xl font-medium">Look at all the fun things we did together! ✨</p>
        </div>
      </header>

      {/* Filter Section */}
      <section className="max-w-6xl mx-auto w-full mb-12 relative">
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all ${filter === 'all' ? 'bg-primary text-white shadow-[4px_4px_0px_#2b7ad1]' : 'bg-white text-[#0d141b] border-2 border-blue-100 shadow-sm hover:bg-blue-50'}`}
          >
            <span className="material-symbols-outlined">rocket_launch</span>
            All Memories
          </button>
          <button
            onClick={() => setFilter('drawing')}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all ${filter === 'drawing' ? 'bg-primary text-white shadow-[4px_4px_0px_#2b7ad1]' : 'bg-white text-[#0d141b] border-2 border-blue-100 shadow-sm hover:bg-blue-50'}`}
          >
            <span className="material-symbols-outlined text-pink-400">brush</span>
            Drawings
          </button>
          <button
            onClick={() => setFilter('photo')}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all ${filter === 'photo' ? 'bg-primary text-white shadow-[4px_4px_0px_#2b7ad1]' : 'bg-white text-[#0d141b] border-2 border-blue-100 shadow-sm hover:bg-blue-50'}`}
          >
            <span className="material-symbols-outlined text-green-400">photo_camera</span>
            Photos
          </button>
          <button
            onClick={() => setFilter('mood')}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all ${filter === 'mood' ? 'bg-primary text-white shadow-[4px_4px_0px_#2b7ad1]' : 'bg-white text-[#0d141b] border-2 border-blue-100 shadow-sm hover:bg-blue-50'}`}
          >
            <span className="material-symbols-outlined text-yellow-400">emoji_emotions</span>
            Moods
          </button>
        </div>
      </section>

      {/* Grid Section */}
      <section className="flex-1 overflow-visible relative">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-bounce text-3xl font-handwritten text-primary">Opening the vault...</div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-20">
            {filteredMemories.map((memory, index) => {
              const sticker = getSticker(index);

              if (memory.type === 'mood') {
                const moodEmojis: Record<string, string> = {
                  'Happy': '😊',
                  'Calm': '😌',
                  'Okay': '😐',
                  'Tired': '😫',
                  'Anxious': '😰'
                };
                const emoji = moodEmojis[memory.mood || ''] || '✨';

                return (
                  <div
                    key={memory.id}
                    className={`relative group transition-transform duration-300 ${index % 2 === 0 ? 'polaroid-tilt-left' : 'polaroid-tilt-right'} hover:rotate-0 hover:scale-105`}
                  >
                    <button
                      onClick={() => handleDelete(memory.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white size-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>

                    <div className="bg-white p-4 pb-6 shadow-xl border-4 border-blue-100 rounded-3xl relative overflow-hidden">
                      {/* Tape effect */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-yellow-200/80 rotate-1 shadow-sm"></div>

                      <div className="text-center mb-4 mt-2">
                        <h3 className="text-xl font-bold font-handwritten text-gray-800">{memory.title}</h3>
                        <p className="text-xs font-bold text-primary uppercase">{memory.date}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-blue-50 p-2 rounded-xl text-center">
                          <span className="text-2xl">{emoji}</span>
                          <p className="text-[10px] font-bold text-blue-400 uppercase">{memory.mood}</p>
                        </div>
                        <div className="bg-cyan-50 p-2 rounded-xl text-center">
                          <span className="text-2xl block font-bold text-cyan-500">{memory.waterIntake}</span>
                          <p className="text-[10px] font-bold text-cyan-400 uppercase">Water</p>
                        </div>
                      </div>

                      {memory.gratitude && (
                        <div className="bg-pink-50 p-3 rounded-xl mb-3">
                          <p className="text-[10px] font-bold text-pink-400 uppercase mb-1">Grantitude</p>
                          <p className="text-xs text-slate-600 font-handwritten line-clamp-2">"{memory.gratitude}"</p>
                        </div>
                      )}

                      {memory.story && (
                        <div className="bg-yellow-50 p-3 rounded-xl">
                          <p className="text-[10px] font-bold text-yellow-500 uppercase mb-1">Thoughts</p>
                          <p className="text-xs text-slate-600 italic line-clamp-2">{memory.story}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={memory.id}
                  className={`relative group transition-transform duration-300 ${index % 2 === 0 ? 'polaroid-tilt-left' : 'polaroid-tilt-right'} hover:rotate-0 hover:scale-105`}
                >
                  <span className={`material-symbols-outlined absolute ${sticker.pos} text-4xl ${sticker.color} sticker z-10`}>
                    {sticker.icon}
                  </span>

                  <button
                    onClick={() => handleDelete(memory.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white size-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>

                  <div className="bg-white p-4 pb-12 shadow-xl border border-slate-100">
                    <div className="aspect-square bg-slate-50 mb-4 border border-slate-50 shadow-inner overflow-hidden relative">
                      <img src={memory.imageUrl} alt={memory.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="px-2">
                      <h3 className="text-2xl font-bold font-handwritten text-gray-800 truncate">{memory.title}</h3>
                      <p className="text-sm font-medium text-primary">{memory.date}</p>
                      {memory.story && (
                        <p className="mt-3 text-xs text-slate-400 font-handwritten italic line-clamp-2">"{memory.story}"</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredMemories.length === 0 && (
              <div className="col-span-full py-20 text-center bg-white/50 rounded-3xl border-2 border-dashed border-blue-200">
                <p className="text-2xl font-handwritten text-slate-400">No memories found in this section yet!</p>
              </div>
            )}
          </div>
        )}

        {/* Pagination UI from reference */}
        {!loading && filteredMemories.length > 0 && (
          <div className="max-w-6xl mx-auto flex items-center justify-center gap-4 py-8">
            <button className="size-14 flex items-center justify-center rounded-2xl bg-white border-2 border-blue-100 text-primary shadow-sm hover:bg-blue-50 transition-all">
              <span className="material-symbols-outlined text-3xl">arrow_back_ios_new</span>
            </button>
            <div className="flex gap-2">
              <button className="size-14 flex items-center justify-center rounded-2xl bg-primary text-white font-black text-xl shadow-lg border-b-4 border-blue-600">1</button>
              <button className="size-14 flex items-center justify-center rounded-2xl bg-white border-2 border-blue-100 text-primary font-black text-xl hover:bg-blue-50 transition-all">2</button>
              <button className="size-14 flex items-center justify-center rounded-2xl bg-white border-2 border-blue-100 text-primary font-black text-xl hover:bg-blue-50 transition-all">3</button>
            </div>
            <button className="size-14 flex items-center justify-center rounded-2xl bg-white border-2 border-blue-100 text-primary shadow-sm hover:bg-blue-50 transition-all">
              <span className="material-symbols-outlined text-3xl">arrow_forward_ios</span>
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Memories;
