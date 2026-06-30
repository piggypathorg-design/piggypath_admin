import React, { useState, useEffect } from 'react';
import ChapterMap from '../ui/ChapterMap';

const BoltIcon = ({ size = 10, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill={color} width={size} height={size} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 4 }}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const RocketIcon = ({ size = 14, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={size} height={size} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: 4 }}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const Cursor = () => {
  const [v, setV] = React.useState(true);
  React.useEffect(() => { const t = setInterval(() => setV(x => !x), 500); return () => clearInterval(t); }, []);
  return <span style={{ opacity: v ? 1 : 0 }}>_</span>;
};

// Leaderboard data — social comparison
const LEADERBOARD = [
  { rank: 12, name: 'FinanceKing', xp: 1240, isYou: false },
  { rank: 13, name: 'Priya S.',    xp: 1180, isYou: false },
  { rank: 14, name: 'Alex (You)',  xp:  980, isYou: true  },
  { rank: 15, name: 'Rahul M.',   xp:  870, isYou: false },
];

const ChallengesPanel = () => {
  const [daysLeft] = useState(4);
  const urgencyColor = daysLeft <= 3 ? '#B13E53' : daysLeft <= 7 ? '#F97316' : '#00D4C8';

  return (
    <div
      className="rounded-xl p-5 relative"
      style={{
        background: 'rgba(18,10,45,0.75)',
        border: `2px solid ${urgencyColor}50`,
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Urgency badge */}
      <div className="absolute top-4 right-4">
        <div
          className="font-pixel px-2 py-1"
          style={{ fontSize:8, color: urgencyColor, border:`2px solid ${urgencyColor}`, background:`${urgencyColor}12`, boxShadow:`2px 2px 0 ${urgencyColor}40` }}
        >
          <BoltIcon size={10} color={urgencyColor} /> {daysLeft} DAYS LEFT
        </div>
      </div>

      {/* Title */}
      <div className="flex items-center gap-2 mb-4 pb-4" style={{ borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-2.5 h-2.5 rounded-full" style={{ background:'#00D4C8', animation:'pulse 1.5s infinite' }} />
        <span className="font-pixel text-xs tracking-widest" style={{ color:'#00D4C8' }}>ACTIVE CHALLENGE</span>
      </div>

      {/* Tag */}
      <div className="inline-flex items-center font-pixel px-3 py-1 mb-3 rounded" style={{ fontSize:9, color:'#00D4C8', border:'1px solid #00D4C8', background:'rgba(0,212,200,0.08)' }}>
        [INVESTING]
      </div>

      <h3 className="text-xl font-black text-white mb-1">Real Estate Tycoon</h3>
      <p className="text-sm mb-4" style={{ color:'#7B8DB0' }}>Become the landlord of your future</p>

      {/* Chapter map */}
      <div className="mb-4">
        <p className="text-xs font-semibold mb-3" style={{ color:'#94B0C2' }}>Chapter 2 of 5: Market Basics</p>
        <ChapterMap current={2} total={5} />
      </div>

      {/* Social comparison leaderboard — ranked list */}
      <div className="mb-5 rounded-lg overflow-hidden" style={{ border:'1px solid rgba(255,255,255,0.06)' }}>
        <div className="px-3 py-2" style={{ background:'rgba(10,4,28,0.6)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
          <span className="font-pixel text-[9px]" style={{ color:'#566C86' }}>CHALLENGE LEADERBOARD</span>
        </div>
        {LEADERBOARD.map(p => (
          <div
            key={p.rank}
            className="flex items-center justify-between px-3 py-2.5"
            style={{
              background: p.isYou ? 'rgba(0,212,200,0.08)' : 'transparent',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              borderLeft: p.isYou ? '2px solid #00D4C8' : '2px solid transparent',
            }}
          >
            <div className="flex items-center gap-3">
              <span className="font-pixel w-5 text-center" style={{ fontSize:9, color: p.rank <= 13 ? '#FFCD75' : '#566C86' }}>
                #{p.rank}
              </span>
              <span className="text-sm font-semibold" style={{ color: p.isYou ? '#00D4C8' : '#F4F4F4' }}>
                {p.name}
              </span>
            </div>
            <span className="text-xs font-bold" style={{ color: p.isYou ? '#B8F400' : '#566C86' }}>
              {p.xp.toLocaleString()} XP
            </span>
          </div>
        ))}
      </div>

      <button
        className="w-full py-3 font-pixel text-[10px] rounded-lg pixel-btn uppercase"
        style={{ background:'#00D4C8', color:'#0A0A1A', border:'2px solid #004A45', boxShadow:'4px 4px 0 #004A45' }}
      >
        &gt; RESUME <Cursor />
      </button>
    </div>
  );
};

export default ChallengesPanel;
