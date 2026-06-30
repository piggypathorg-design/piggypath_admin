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

const ClockIcon = ({ size = 14, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} width={size} height={size} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const BoltIcon = ({ size = 14, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill={color} width={size} height={size} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#0A0A1A" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const CoinIcon = ({ size = 14, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill={color} width={size} height={size} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <circle cx="12" cy="12" r="10" stroke="#0A0A1A" strokeWidth="2" />
    <circle cx="12" cy="12" r="5" stroke="#0A0A1A" strokeWidth="2" fill="none" />
  </svg>
);

const Cursor = () => {
  const [v, setV] = useState(true);
  useEffect(() => { const t = setInterval(() => setV(x => !x), 500); return () => clearInterval(t); }, []);
  return <span style={{ opacity: v ? 1 : 0 }}>_</span>;
};

const DailyQuestPanel = () => {
  const [pressed, setPressed] = useState(false);
  const countdown = useMidnightCountdown();

  return (
    <div
      className="rounded-xl overflow-hidden relative"
      style={{
        background: 'rgba(18,10,45,0.75)',
        border: '2px solid rgba(184,244,0,0.35)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 0 20px rgba(184,244,0,0.08)',
      }}
    >
      {/* Header strip */}
      <div className="flex items-center justify-between px-4 py-2.5" style={{ background: '#B8960C', borderBottom: '2px solid #6B4F00' }}>
        <div className="flex items-center gap-3">
          <div className="font-pixel flex items-center justify-center shrink-0"
            style={{ width: 26, height: 26, background: '#6B4F00', fontSize: 13, color: '#FFCD75', imageRendering: 'pixelated' }}>
            !
          </div>
          <span className="font-pixel" style={{ fontSize: 10, color: '#0A0A1A' }}>DAILY QUEST</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ClockIcon size={12} color="#3D2000" />
          <span className="font-pixel" style={{ fontSize: 9, color: '#3D2000' }}>{countdown}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-black text-white text-center mb-5">Budget Basics</h3>

        {/* CTA */}
        <button
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onMouseLeave={() => setPressed(false)}
          className="w-full font-pixel pixel-btn"
          style={{
            padding: '14px 0', fontSize: 10,
            background: '#B8F400', color: '#0A0A1A',
            border: '2px solid #3D5200',
            boxShadow: pressed ? 'none' : '4px 4px 0 #3D5200',
            transform: pressed ? 'translate(4px,4px)' : 'none',
            imageRendering: 'pixelated',
          }}
        >
          &gt; START QUEST <Cursor />
        </button>
      </div>
    </div>
  );
};

export default DailyQuestPanel;
