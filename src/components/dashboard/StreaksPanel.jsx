import React, { useState, useEffect } from 'react';

const useMidnightCountdown = () => {
  const getSecondsLeft = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    return Math.floor((midnight - now) / 1000);
  };
  const [secs, setSecs] = useState(getSecondsLeft);
  useEffect(() => { const t = setInterval(() => setSecs(getSecondsLeft()), 1000); return () => clearInterval(t); }, []);
  const h = String(Math.floor(secs / 3600)).padStart(2, '0');
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
};

const Cursor = () => {
  const [v, setV] = useState(true);
  useEffect(() => { const t = setInterval(() => setV(x => !x), 500); return () => clearInterval(t); }, []);
  return <span style={{ opacity: v ? 1 : 0 }}>_</span>;
};

const PixelFlame = ({ size = 1 }) => {
  const [frame, setFrame] = useState(0);
  const frames = [
    'polygon(50% 0%, 80% 40%, 70% 60%, 90% 70%, 60% 100%, 40% 100%, 10% 70%, 30% 60%, 20% 40%)',
    'polygon(50% 5%, 78% 38%, 68% 58%, 88% 68%, 58% 100%, 42% 100%, 12% 68%, 32% 58%, 22% 38%)',
  ];
  useEffect(() => { const t = setInterval(() => setFrame(f => 1 - f), 280); return () => clearInterval(t); }, []);
  return (
    <div style={{
      width: 32 * size, height: 42 * size,
      background: 'linear-gradient(to top, #F97316, #FFCD75)',
      clipPath: frames[frame],
      imageRendering: 'pixelated', flexShrink: 0,
    }} />
  );
};

const ClockIcon = ({ size = 14, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} width={size} height={size} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const DAYS   = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const StreaksPanel = ({ currentStreak = 0 }) => {
  // For brand new user: all days inactive
  const ACTIVE = Array(7).fill(false);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: 'rgba(18,10,45,0.75)',
        border: '2px solid rgba(249,115,22,0.3)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Header: streak count */}
      <div className="flex items-center justify-center pt-5 pb-3">
        <div className="flex items-center gap-3">
          <PixelFlame />
          <div>
            <div className="font-black" style={{ fontSize: 52, color: '#F97316', lineHeight: 1, fontFamily: 'Inter, sans-serif', textShadow: '3px 3px 0 rgba(122,56,0,0.6)' }}>
              {currentStreak}
            </div>
            <div className="text-xs font-semibold" style={{ color: '#94B0C2' }}>day streak</div>
          </div>
        </div>
      </div>

      {/* Day tiles */}
      <div className="px-5 mb-4">
        <div className="flex justify-between items-center px-3 py-3 rounded-lg"
          style={{ background: 'rgba(10,4,28,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}>
          {DAYS.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-bold" style={{ color: '#566C86' }}>{day}</span>
              <div style={{
                width: 20, height: 20,
                border: `2px solid ${ACTIVE[i] ? '#F97316' : 'rgba(255,255,255,0.1)'}`,
                background: ACTIVE[i] ? 'rgba(249,115,22,0.25)' : 'transparent',
                imageRendering: 'pixelated',
                borderRadius: 2,
              }} />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-5">
        <button
          className="w-full py-3 font-pixel text-[10px] rounded-lg pixel-btn uppercase"
          style={{
            background: '#F97316',
            color: '#0A0A1A',
            border: '2px solid #7A3800',
            boxShadow: '4px 4px 0 #7A3800',
          }}
        >
          &gt; START <Cursor />
        </button>
      </div>
    </div>
  );
};

export default StreaksPanel;
