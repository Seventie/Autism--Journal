import React, { useState } from 'react';
import QuoteDisplay from './QuoteDisplay';
import { memoryService } from '../services/memoryService';
import { Memory } from '../types';

// Stateless Component for Mood Item
const MoodOption: React.FC<{
    emoji: string;
    label: string;
    isSelected: boolean;
    onClick: () => void
}> = ({ emoji, label, isSelected, onClick }) => (
    <button
        onClick={(e) => { e.preventDefault(); onClick(); }}
        className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 ${isSelected
            ? 'bg-white shadow-xl scale-110 ring-4 ring-blue-200'
            : 'bg-white/50 hover:bg-white hover:scale-105'
            }`}
    >
        <span className="text-5xl filter drop-shadow-md">{emoji}</span>
        <span className={`font-bold text-sm ${isSelected ? 'text-blue-500' : 'text-slate-400'}`}>
            {label}
        </span>
    </button>
);

const MoodChecker: React.FC = () => {
    const [selectedMood, setSelectedMood] = useState<string>('');
    const [notes, setNotes] = useState('');
    const [waterIntake, setWaterIntake] = useState(0);
    const [sleep, setSleep] = useState(0);
    const [energy, setEnergy] = useState(50);
    const [gratitude, setGratitude] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedMood) {
            alert("Please select a mood first!");
            return;
        }

        const newMemory: any = {
            title: `Mood Check-in: ${selectedMood}`,
            date: new Date().toLocaleDateString(),
            type: 'mood',
            tilt: Math.random() > 0.5 ? 'left' : 'right',
            mood: selectedMood,
            waterIntake,
            sleep,
            energy,
            gratitude,
            story: notes,
            imageUrl: ''
        };

        try {
            await memoryService.save(newMemory);
            setIsSubmitted(true);
        } catch (error) {
            console.error("Failed to save mood check-in", error);
            alert("Oops! Something went wrong saving your check-in.");
        }
    };

    const moods = [
        { emoji: '😊', label: 'Happy' },
        { emoji: '😌', label: 'Calm' },
        { emoji: '😐', label: 'Okay' },
        { emoji: '😫', label: 'Tired' },
        { emoji: '😰', label: 'Anxious' },
    ];

    if (isSubmitted) {
        return (
            <div className="flex-1 h-screen overflow-y-auto scrapbook-bg p-8 flex flex-col items-center">
                <div className="max-w-2xl w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <h2 className="text-4xl font-black text-center text-primary font-handwritten mb-8">
                        Great Check-in! ✨
                    </h2>

                    <div className="bg-white p-8 rounded-3xl shadow-xl border-4 border-blue-100 relative overflow-hidden">
                        {/* Tape effect */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-200/80 rotate-1 shadow-sm"></div>

                        <h3 className="text-2xl font-bold text-slate-700 mb-6 flex items-center gap-2">
                            Today's Snapshot
                        </h3>

                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="bg-blue-50 p-4 rounded-2xl">
                                <p className="text-sm font-bold text-blue-400 uppercase">Mood</p>
                                <p className="text-3xl mt-1">{moods.find(m => m.label === selectedMood)?.emoji || '❓'} {selectedMood}</p>
                            </div>
                            <div className="bg-cyan-50 p-4 rounded-2xl">
                                <p className="text-sm font-bold text-cyan-400 uppercase">Water</p>
                                <p className="text-3xl mt-1 font-bold">{waterIntake} <span className="text-base text-slate-400">glasses</span></p>
                            </div>
                            <div className="bg-indigo-50 p-4 rounded-2xl">
                                <p className="text-sm font-bold text-indigo-400 uppercase">Sleep</p>
                                <p className="text-3xl mt-1 font-bold">{sleep}/5 <span className="text-base text-2xl">🌙</span></p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-2xl">
                                <p className="text-sm font-bold text-green-400 uppercase">Energy</p>
                                <div className="w-full bg-slate-200 rounded-full h-4 mt-3 overflow-hidden">
                                    <div className="bg-green-400 h-full rounded-full transition-all" style={{ width: `${energy}%` }}></div>
                                </div>
                            </div>
                        </div>

                        {gratitude && (
                            <div className="mb-6 bg-pink-50 p-4 rounded-2xl">
                                <p className="text-sm font-bold text-pink-400 uppercase mb-1">Gratitude</p>
                                <p className="text-slate-700 font-handwritten text-xl">"{gratitude}"</p>
                            </div>
                        )}

                        {notes && (
                            <div className="bg-yellow-50 p-4 rounded-2xl">
                                <p className="text-sm font-bold text-yellow-500 uppercase mb-1">Thoughts</p>
                                <p className="text-slate-700 italic">{notes}</p>
                            </div>
                        )}

                        <div className="mt-8 pt-6 border-t border-dashed border-slate-200">
                            <QuoteDisplay />
                        </div>
                    </div>

                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-8 mx-auto block px-8 py-3 bg-white text-slate-500 font-bold rounded-full hover:bg-slate-50 transition-colors"
                    >
                        Check in again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 h-screen overflow-y-auto scrapbook-bg p-8">
            <div className="max-w-4xl mx-auto pb-20">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-black text-slate-700 mb-2">How are you feeling?</h1>
                    <p className="text-slate-500 font-medium">Daily Check-in</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Mood Section */}
                    <section className="bg-blue-50/50 p-8 rounded-[3rem] border-4 border-white shadow-lg transition-transform hover:scale-[1.01]">
                        <h2 className="text-xl font-bold text-slate-600 mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined">emoji_emotions</span>
                            Current Mood
                        </h2>
                        <div className="flex flex-wrap justify-center gap-6">
                            {moods.map((m) => (
                                <MoodOption
                                    key={m.label}
                                    emoji={m.emoji}
                                    label={m.label}
                                    isSelected={selectedMood === m.label}
                                    onClick={() => setSelectedMood(m.label)}
                                />
                            ))}
                        </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Water Tracker Section */}
                        <section className="bg-cyan-50/50 p-8 rounded-[3rem] border-4 border-white shadow-lg hover:scale-[1.02] transition-transform">
                            <h2 className="text-xl font-bold text-slate-600 mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined">water_drop</span>
                                Water Tracker
                            </h2>
                            <div className="flex flex-col items-center gap-4">
                                <div className="flex items-center justify-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setWaterIntake(Math.max(0, waterIntake - 1))}
                                        className="size-12 rounded-full bg-white text-cyan-500 shadow-md hover:bg-cyan-50 font-bold text-xl"
                                    >-</button>
                                    <span className="text-4xl font-black text-cyan-500">{waterIntake}</span>
                                    <button
                                        type="button"
                                        onClick={() => setWaterIntake(Math.min(8, waterIntake + 1))}
                                        className="size-12 rounded-full bg-white text-cyan-500 shadow-md hover:bg-cyan-50 font-bold text-xl"
                                    >+</button>
                                </div>
                                <div className="flex gap-1 mt-2">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className={`h-8 w-3 rounded-full transition-all duration-500 ${i < waterIntake ? 'bg-cyan-400' : 'bg-cyan-100'}`} />
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Sleep Tracker Section */}
                        <section className="bg-indigo-50/50 p-8 rounded-[3rem] border-4 border-white shadow-lg hover:scale-[1.02] transition-transform">
                            <h2 className="text-xl font-bold text-slate-600 mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined">bedtime</span>
                                Sleep Quality
                            </h2>
                            <div className="flex justify-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setSleep(star)}
                                        className={`text-4xl transition-all hover:scale-110 ${sleep >= star ? 'text-indigo-400' : 'text-slate-200'}`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                            <p className="text-center mt-2 text-indigo-400 font-bold">{sleep > 0 ? `${sleep} Stars` : 'Rate your sleep'}</p>
                        </section>
                    </div>

                    {/* Energy Level Section */}
                    <section className="bg-green-50/50 p-8 rounded-[3rem] border-4 border-white shadow-lg hover:scale-[1.01] transition-transform">
                        <h2 className="text-xl font-bold text-slate-600 mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined">battery_charging_full</span>
                            Energy Level
                        </h2>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={energy}
                            onChange={(e) => setEnergy(parseInt(e.target.value))}
                            className="w-full h-4 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                        />
                        <div className="flex justify-between mt-2 font-bold text-slate-400 text-sm">
                            <span>Low</span>
                            <span className="text-green-500">{energy}%</span>
                            <span>FULL POWER!</span>
                        </div>
                    </section>

                    {/* Gratitude Section */}
                    <section className="bg-pink-50/50 p-8 rounded-[3rem] border-4 border-white shadow-lg hover:scale-[1.01] transition-transform">
                        <h2 className="text-xl font-bold text-slate-600 mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined">favorite</span>
                            Daily Gratitude
                        </h2>
                        <input
                            type="text"
                            value={gratitude}
                            onChange={(e) => setGratitude(e.target.value)}
                            className="w-full h-16 rounded-2xl border-2 border-pink-100 p-4 text-slate-600 focus:outline-none focus:border-pink-300 shadow-sm text-lg font-handwritten"
                            placeholder="I'm thankful for..."
                        />
                    </section>

                    {/* Notes Section */}
                    <section className="bg-yellow-50/50 p-8 rounded-[3rem] border-4 border-white shadow-lg hover:scale-[1.01] transition-transform">
                        <h2 className="text-xl font-bold text-slate-600 mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined">edit_note</span>
                            Thoughts
                        </h2>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full h-32 rounded-2xl border-none resize-none p-4 text-slate-600 focus:ring-2 focus:ring-yellow-300 shadow-sm"
                            placeholder="Anything else on your mind?..."
                        />
                    </section>

                    <div className="flex justify-center pt-8">
                        <button
                            type="submit"
                            className="px-12 py-4 bg-primary text-white rounded-2xl font-black text-xl shadow-[0px_10px_20px_rgba(76,154,255,0.4)] hover:translate-y-1 hover:shadow-lg transition-all active:scale-95"
                        >
                            Save Check-in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MoodChecker;
