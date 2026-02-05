
import React, { useRef, useState, useEffect } from 'react';
import { describeDrawing, generateMagicStory } from '../services/geminiService';
import { memoryService } from '../services/memoryService';
import { Memory } from '../types';

const ArtRoom: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#4C9AFF');
  const [brushSize, setBrushSize] = useState(8);
  const [tool, setTool] = useState<'pen' | 'brush' | 'eraser'>('pen');
  const [story, setStory] = useState("Today was a wonderful day! I decided to create something special...");
  const [title, setTitle] = useState("My Magic Memory");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isMagicLoading, setIsMagicLoading] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
    }
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas && canvas.parentElement) {
      const rect = canvas.parentElement.getBoundingClientRect();
      const tempImage = canvas.toDataURL();
      canvas.width = rect.width;
      canvas.height = 500; 
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0);
        img.src = tempImage;
      }
    }
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    canvasRef.current?.getContext('2d')?.beginPath();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineWidth = tool === 'eraser' ? brushSize * 4 : brushSize;
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleMagicWand = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsMagicLoading(true);
    try {
      const imgData = canvas.toDataURL('image/png');
      const description = await describeDrawing(imgData);
      const newStoryPart = await generateMagicStory(description, story);
      setStory(prev => prev + " " + newStoryPart);
    } catch (err) {
      console.error(err);
    } finally {
      setIsMagicLoading(false);
    }
  };

  const saveToVault = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const drawingImg = canvas.toDataURL('image/png');
    
    // In this combined layout, we save the drawing as the main image 
    // but in a real app you might want to composite the photo + drawing.
    const finalMemoryImage = uploadedImage || drawingImg;

    const newMemory: Memory = {
      id: Date.now().toString(),
      title: title || "My Masterpiece",
      date: new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }),
      imageUrl: finalMemoryImage,
      story: story,
      type: uploadedImage ? 'photo' : 'drawing',
      tilt: Math.random() > 0.5 ? 'left' : 'right'
    };

    try {
      await memoryService.save(newMemory);
      alert("Success! Your memory is safely stored in the magic vault. ✨");
    } catch (error) {
      alert("Oh no! The magic failed. Try saving again.");
    }
  };

  return (
    <div className="flex-1 h-screen overflow-y-auto scrapbook-bg p-8" ref={scrollContainerRef}>
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border-[12px] border-white relative mb-20">
        
        {/* JOURNAL HEADER */}
        <header className="p-10 bg-pastel-blue/30 border-b-4 border-dashed border-blue-100 relative">
          <div className="flex flex-col gap-4">
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-6xl font-black text-primary font-handwritten bg-transparent border-none focus:ring-0 p-0 placeholder-blue-200 w-full"
              placeholder="Journal Entry Title..."
            />
            <div className="flex items-center gap-4">
               <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="text-lg font-bold text-slate-400 border-none bg-white rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-300"
              />
              <div className="h-px flex-1 bg-blue-100"></div>
              <span className="material-symbols-outlined text-4xl text-blue-200">auto_stories</span>
            </div>
          </div>

          {/* PHOTO UPLOAD BUTTON */}
          <div className="mt-8 flex flex-col items-center gap-4">
            {!uploadedImage ? (
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-3 px-10 py-4 bg-green-500 text-white rounded-2xl font-black text-lg shadow-[0_6px_0_#15803d] hover:translate-y-1 hover:shadow-none transition-all active:scale-95 group"
              >
                <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">add_a_photo</span>
                ADD A PHOTO TO THIS PAGE
              </button>
            ) : (
              <div className="relative group animate-in fade-in zoom-in duration-300">
                <div className="bg-white p-4 pb-12 shadow-xl border border-slate-200 rotate-1 max-w-sm">
                  <img src={uploadedImage} alt="Uploaded" className="w-full aspect-square object-cover border border-slate-100" />
                  <p className="mt-2 font-handwritten text-center text-slate-400">Captured Magic Moment</p>
                </div>
                <button 
                  onClick={() => setUploadedImage(null)}
                  className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
          </div>
        </header>

        {/* WRITING AREA */}
        <section className="p-10 relative border-b-2 border-dashed border-blue-50">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-3xl text-pink-400">edit_note</span>
            <h3 className="text-xl font-bold text-slate-600 uppercase tracking-widest">My Story</h3>
          </div>
          <div 
            className="lined-paper min-h-[250px] font-handwritten text-4xl text-slate-700 focus:outline-none whitespace-pre-wrap px-4"
            contentEditable="true"
            onBlur={(e) => setStory(e.currentTarget.innerText)}
            suppressContentEditableWarning={true}
          >
            {story}
          </div>

          <button 
            onClick={handleMagicWand} 
            disabled={isMagicLoading}
            className="absolute right-10 bottom-0 translate-y-1/2 z-20 group"
          >
            <div className={`size-24 bg-gradient-to-tr from-purple-500 to-pink-400 rounded-full flex items-center justify-center shadow-2xl border-4 border-white magic-wand-glow hover:scale-110 transition-all ${isMagicLoading ? 'animate-pulse' : ''}`}>
              <span className={`material-symbols-outlined text-white text-5xl rotate-45 ${isMagicLoading ? 'animate-spin' : ''}`}>magic_button</span>
            </div>
          </button>
        </section>

        {/* DRAWING AREA */}
        <section className="bg-slate-50 p-10 border-t-8 border-white">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-3xl text-blue-400">palette</span>
              <h3 className="text-xl font-bold text-slate-600 uppercase tracking-widest">Drawing Pad</h3>
            </div>
            
            <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-sm border border-blue-50">
              <button onClick={() => setTool('pen')} className={`size-12 rounded-xl flex items-center justify-center transition-all ${tool === 'pen' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:bg-blue-50'}`}><span className="material-symbols-outlined">edit</span></button>
              <button onClick={() => setTool('brush')} className={`size-12 rounded-xl flex items-center justify-center transition-all ${tool === 'brush' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:bg-blue-50'}`}><span className="material-symbols-outlined">brush</span></button>
              <button onClick={() => setTool('eraser')} className={`size-12 rounded-xl flex items-center justify-center transition-all ${tool === 'eraser' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:bg-blue-50'}`}><span className="material-symbols-outlined text-pink-400">ink_eraser</span></button>
              <div className="w-px h-8 bg-blue-100 mx-2"></div>
              <div className="flex gap-1">
                {['#f87171', '#fbbf24', '#4ade80', '#4C9AFF', '#c084fc', '#000000'].map(c => (
                  <button key={c} onClick={() => {setColor(c); setTool('pen');}} style={{ backgroundColor: c }} className={`size-8 rounded-full border-2 border-white ring-2 ${color === c ? 'ring-blue-400 scale-110' : 'ring-transparent'} transition-all`}></button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border-4 border-white shadow-inner overflow-hidden relative cursor-crosshair h-[500px]">
            <canvas 
              ref={canvasRef} 
              onMouseDown={startDrawing} 
              onMouseUp={stopDrawing} 
              onMouseMove={draw} 
              onTouchStart={startDrawing} 
              onTouchEnd={stopDrawing} 
              onTouchMove={draw} 
              className="absolute inset-0" 
            />
          </div>
        </section>

        <footer className="p-10 bg-white flex justify-between items-center border-t-2 border-dashed border-blue-50">
          <button 
            onClick={() => {
              const ctx = canvasRef.current?.getContext('2d');
              if (ctx && canvasRef.current) {
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
              }
              setStory("");
              setUploadedImage(null);
            }}
            className="flex items-center gap-2 text-slate-400 font-bold hover:text-red-400 transition-colors"
          >
            <span className="material-symbols-outlined">delete_sweep</span>
            Reset Page
          </button>
          
          <button 
            onClick={saveToVault}
            className="px-12 py-5 bg-primary text-white rounded-3xl font-black text-2xl shadow-[0_8px_0_#2b7ad1] hover:translate-y-1 hover:shadow-none transition-all active:scale-95 flex items-center gap-4"
          >
            <span className="material-symbols-outlined text-3xl">cloud_done</span>
            SAVE TO VAULT
          </button>
        </footer>
      </div>

      <span className="material-symbols-outlined absolute top-40 right-10 text-9xl text-pink-300/20 rotate-12 select-none pointer-events-none">favorite</span>
      <span className="material-symbols-outlined absolute top-1/2 left-4 text-9xl text-yellow-300/20 -rotate-12 select-none pointer-events-none">star</span>
    </div>
  );
};

export default ArtRoom;
