import React, { useState, useEffect } from 'react';

const Cursor = () => {
  const [v, setV] = useState(true);
  useEffect(() => { const t = setInterval(() => setV(x => !x), 500); return () => clearInterval(t); }, []);
  return <span style={{ opacity: v ? 1 : 0 }}>_</span>;
};

const ShopPreview = ({ coins, onBrowse }) => {
  const [pressed, setPressed] = useState(false);

  return (
    <div 
      className="rounded-2xl p-5 flex flex-col justify-between h-full min-h-[180px] relative overflow-hidden"
      style={{
        background: 'rgba(18,10,45,0.95)',
        border: '2px solid #FFCD75',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="flex justify-end mb-2 relative z-10 w-full">
         <div className="flex items-center gap-1.5 font-black text-base" style={{ color: '#FFCD75', fontFamily: 'Inter, sans-serif' }}>
           <span>0</span>
           <div className="w-5 h-5 flex items-center justify-center text-[10px] rounded-full"
             style={{ background: '#FFCD75', color: '#6B4F00', border: '2px solid #6B4F00' }}>C</div>
         </div>
      </div>
      
      {/* Decorative Icon */}
      <div className="flex items-center justify-center flex-1 relative z-10 mb-2 w-full">
         <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
           style={{ background: '#FFCD75', border: '2px solid #6B4F00', boxShadow: '4px 4px 0 #6B4F00' }}>
           <svg viewBox="0 0 24 24" fill="none" stroke="#6B4F00" strokeWidth="2" width="32" height="32">
             <path d="M20 7h-3M14 7h-4M7 7H4M4 7l2 11h12l2-11H4z" />
             <path d="M16 11V7a4 4 0 0 0-8 0v4" />
           </svg>
         </div>
      </div>
      
      <h3 className="text-sm font-black text-center text-white mb-3 relative z-10 mt-2">Item Shop</h3>
      
      <button 
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        onClick={onBrowse}
        className="px-6 py-3 font-pixel text-[10px] rounded-lg pixel-btn uppercase text-[#0A0A1A] w-full relative z-10"
        style={{
          background: '#FFCD75',
          border: '2px solid #6B4F00',
          boxShadow: pressed ? 'none' : '4px 4px 0 #6B4F00',
          transform: pressed ? 'translate(4px,4px)' : 'none',
        }}
      >
        &gt; BROWSE <Cursor />
      </button>
    </div>
  );
};

export default ShopPreview;

