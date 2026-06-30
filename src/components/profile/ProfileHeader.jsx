import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pen, LogOut, Bell, Shield, Lock } from 'lucide-react';
import PixelAvatar from './PixelAvatar';
import AvatarCustomizer from './AvatarCustomizer';
import { useAvatar } from '../../hooks/useAvatar';

// ─── SVG Icons ────────────────────────────────────────────────────────────
export const BoltIcon = ({ size = 20, color = 'currentColor', fill = 'none' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="square" strokeLinejoin="miter" width={size} height={size}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill={fill} />
  </svg>
);

export const BookIcon = ({ size = 20, color = 'currentColor', fill = 'none' }) => (
  <svg viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={2.5} strokeLinecap="square" strokeLinejoin="miter" width={size} height={size} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" fill={fill !== 'none' ? fill : 'currentColor'} fillOpacity={1} />
  </svg>
);

export const FireIcon = ({ size = 20, color = 'currentColor', fill = 'none' }) => (
  <svg viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={2.5} strokeLinecap="square" strokeLinejoin="miter" width={size} height={size} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" fill={fill !== 'none' ? fill : 'currentColor'} />
  </svg>
);

export const TrophyIcon = ({ size = 20, color = 'currentColor', fill = 'none' }) => (
  <svg viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={2.5} strokeLinecap="square" strokeLinejoin="miter" width={size} height={size} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
    <path d="M12 2a6 6 0 0 1 6 6v5a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z" fill={fill !== 'none' ? fill : 'currentColor'} fillOpacity={1} />
  </svg>
);

export const CoinIcon = ({ size = 20, color = 'currentColor', fill = 'none' }) => (
  <svg viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={2.5} strokeLinecap="square" strokeLinejoin="miter" width={size} height={size} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <circle cx="12" cy="12" r="8" fill={fill !== 'none' ? fill : 'currentColor'} fillOpacity={1} />
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

export const ClockIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="square" strokeLinejoin="miter" width={size} height={size} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// ─── Rank system ──────────────────────────────────────────────────────────
export const RANKS = [
  { min: 0,    label: 'Seedling',    color: '#86efac', type: 'seedling' },
  { min: 100,  label: 'Coin Rookie', color: '#FFCD75', type: 'coin' },
  { min: 300,  label: 'Money Spark', color: '#00D4C8', type: 'spark' },
  { min: 600,  label: 'Budget Hero', color: '#F97316', type: 'hero' },
  { min: 1000, label: 'Cash Wizard', color: '#c4b5fd', type: 'wizard' },
  { min: 2000, label: 'Legend',      color: '#a78bfa', type: 'legend' },
];

const getRank = xp => [...RANKS].reverse().find(r => xp >= r.min) || RANKS[0];

const RankIcon = ({ type, size = 14, color = 'currentColor' }) => {
  switch (type) {
    case 'seedling':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} width={size} height={size} style={{ display: 'inline-block' }}>
          <path d="M2 22c1.25-6.7 5.75-11 12-11h8v2c0 6.25-4.3 10.75-11 12" fill={color} fillOpacity={0.2} />
          <path d="M12 2A15.3 15.3 0 0 1 12 11" />
        </svg>
      );
    case 'coin':
      return <CoinIcon size={size} color={color} fill="currentColor" />;
    case 'spark':
      return <BoltIcon size={size} color={color} fill="currentColor" />;
    case 'hero':
      return <FireIcon size={size} color={color} fill="currentColor" />;
    case 'wizard':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} width={size} height={size} style={{ display: 'inline-block' }}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={color} />
        </svg>
      );
    case 'legend':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} width={size} height={size} style={{ display: 'inline-block' }}>
          <polygon points="6 3 18 3 22 9 12 21 2 9 6 3" fill={color} fillOpacity={0.2} />
        </svg>
      );
    default:
      return null;
  }
};

// ─── Cursor blink ─────────────────────────────────────────────────────────
const Cursor = () => {
  const [v, setV] = useState(true);
  useEffect(() => { const t = setInterval(() => setV(x => !x), 500); return () => clearInterval(t); }, []);
  return <span style={{ opacity: v ? 1 : 0 }}>_</span>;
};

// ─── Count-up ─────────────────────────────────────────────────────────────
const CountUp = ({ to, duration = 1000 }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let s = 0;
    const step = to / (duration / 16);
    const t = setInterval(() => {
      s = Math.min(s + step, to);
      setVal(Math.floor(s));
      if (s >= to) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [to]);
  return <>{val.toLocaleString()}</>;
};

// ─── Circular weekly goal ring ────────────────────────────────────────────
const GoalRing = ({ current = 0, target = 5, size = 80 }) => {
  const r = (size / 2) - 7;
  const circ = 2 * Math.PI * r;
  const dash = (current / target) * circ;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7"/>
      <motion.circle
        cx={size/2} cy={size/2} r={r} fill="none"
        stroke="#B8F400" strokeWidth="7" strokeLinecap="round"
        initial={{ strokeDasharray: `0 ${circ}` }}
        animate={{ strokeDasharray: `${dash} ${circ}` }}
        transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
      />
    </svg>
  );
};

// ─── Confetti ─────────────────────────────────────────────────────────────
const Confetti = ({ active }) => {
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 99 }}>
      {[...Array(20)].map((_, i) => (
        <motion.div key={i}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: (Math.random()-0.5)*260, y: -(Math.random()*180+40), opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: i*0.025 }}
          style={{ position:'absolute', left:'50%', top:'30%', width:7, height:7, background:['#F97316','#B8F400','#00D4C8','#FFCD75','#c4b5fd'][i%5], borderRadius: i%2===0?'50%':2 }}
        />
      ))}
    </div>
  );
};

// ─── BadgeIcon component ──────────────────────────────────────────────────
export const BadgeIcon = ({ name, size = 30, color = 'currentColor' }) => {
  switch (name) {
    case 'welcome':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} width={size} height={size}>
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill={`${color}20`} />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );
    case 'consistency':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} width={size} height={size}>
          <rect x="3" y="4" width="18" height="18" rx="2" fill={`${color}20`} />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case 'wealth':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} width={size} height={size}>
          <circle cx="12" cy="12" r="8" fill={`${color}20`} />
          <path d="M12 8v8M9 10h5.5a1.5 1.5 0 0 1 0 3H12" />
        </svg>
      );
    case 'growth':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} width={size} height={size}>
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      );
    case 'planner':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} width={size} height={size}>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill={`${color}20`} />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case 'target':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} width={size} height={size}>
          <circle cx="12" cy="12" r="10" fill={`${color}20`} />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" fill={color} />
        </svg>
      );
    case 'legendary':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} width={size} height={size}>
          <polygon points="6 3 18 3 22 9 12 21 2 9" fill={`${color}20`} />
        </svg>
      );
    case 'star':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} width={size} height={size}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={`${color}20`} />
        </svg>
      );
    default:
      return null;
  }
};

// ─── SkillIcon component ──────────────────────────────────────────────────
export const SkillIcon = ({ name, size = 24, color = 'currentColor' }) => {
  switch (name) {
    case 'budgeting':
      return <CoinIcon size={size} color={color} fill="currentColor" />;
    case 'investing':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} width={size} height={size}>
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      );
    case 'banking':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} width={size} height={size}>
          <path d="M3 22h18M5 10v10M19 10v10M12 10v10M3 10h18M12 2L3 7h18l-9-5z" fill={`${color}20`} />
        </svg>
      );
    case 'credit':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} width={size} height={size}>
          <rect x="2" y="5" width="20" height="14" rx="2" fill={`${color}20`} />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      );
    case 'estate':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} width={size} height={size}>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill={`${color}20`} />
        </svg>
      );
    default:
      return null;
  }
};

// ─── Badge component ──────────────────────────────────────────────────────
const Badge = ({ name, earned, rarity = 'common', color = '#94B0C2' }) => {
  const glow = { common:'none', uncommon:'0 0 10px rgba(0,212,200,0.3)', rare:'0 0 14px rgba(139,92,246,0.4)', legendary:'0 0 20px rgba(255,205,117,0.5)' };
  const border = { common:'rgba(255,255,255,0.07)', uncommon:'rgba(0,212,200,0.5)', rare:'rgba(139,92,246,0.6)', legendary:'rgba(255,205,117,0.8)' };
  return (
    <motion.div
      whileHover={earned ? { scale: 1.14, y: -5 } : {}}
      className="flex items-center justify-center rounded-xl"
      title={name.toUpperCase()}
      style={{
        width: 60, height: 60,
        background: earned ? '#D9F99D' : 'rgba(20,83,45,0.1)',
        border: '3px solid #14532D',
        boxShadow: earned ? '3px 3px 0 #14532D' : 'none',
        opacity: earned ? 1 : 0.6,
      }}
    >
      {earned ? <BadgeIcon name={name} color="#14532D" size={32} /> : <Lock size={20} color="#14532D" />}
    </motion.div>
  );
};

// ─── Activity Heatmap (GitHub-style) ──────────────────────────────────────
const ActivityHeatmap = ({ data }) => {
  const weeks = 10;
  // New user = all cells empty
  const emptyData = Array.from({ length: weeks * 7 }, () => 0);
  const cells = data || emptyData;

  const intensityColors = [
    'rgba(255,255,255,0.04)',
    'rgba(0,212,200,0.25)',
    'rgba(0,212,200,0.55)',
    '#00D4C8',
  ];

  return (
    <div>
      <div className="flex gap-1">
        {Array.from({ length: weeks }, (_, w) => (
          <div key={w} className="flex flex-col gap-1">
            {Array.from({ length: 7 }, (_, d) => {
              const intensity = cells[w * 7 + d] || 0;
              return (
                <motion.div
                  key={d}
                  whileHover={{ scale: 1.4 }}
                  style={{
                    width: 10, height: 10,
                    borderRadius: 2,
                    background: intensityColors[intensity],
                    cursor: 'default',
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Seedling Icon (inline SVG for rank badge) ────────────────────────────
const SeedlingIcon = ({ size = 16, color = '#86efac' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} width={size} height={size} style={{ display: 'inline-block' }}>
    <path d="M2 22c1.25-6.7 5.75-11 12-11h8v2c0 6.25-4.3 10.75-11 12" fill={color} fillOpacity={0.25} />
    <path d="M12 2A15.3 15.3 0 0 1 12 11" />
  </svg>
);

// ─── Main ProfileHeader ───────────────────────────────────────────────────
const ProfileHeader = ({
  username  = 'Player',
  level     = 1,
  xp        = 0,
  maxXp     = 100,
  followers = 0,
  following = 0,
}) => {
  const [avatarConfig, setAvatarConfig] = useAvatar();
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const rank = getRank(xp);

  // All badges locked for new user
  const BADGES = [
    { name: 'welcome',     earned: false, rarity: 'uncommon',  color: '#14532D', label: 'Welcome' },
    { name: 'consistency', earned: false, rarity: 'rare',      color: '#14532D', label: 'Consistency' },
    { name: 'wealth',      earned: false, rarity: 'common',    color: '#14532D', label: 'Wealth' },
    { name: 'growth',      earned: false, rarity: 'uncommon',  color: '#14532D', label: 'Growth' },
  ];

  return (
    <>
      {/* Container: Light pop-art neo-brutalist card */}
      <div className="w-full max-w-5xl mx-auto rounded-3xl relative overflow-visible" style={{ background: '#F4F4F5', border: '4px solid #18181B', boxShadow: '8px 8px 0 #18181B', marginTop: 48, paddingBottom: 24, marginBottom: 40 }}>
        
        {/* Confetti for when you level up / open profile */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none" style={{ zIndex: 99 }}>
            <Confetti active={showConfetti} />
        </div>

        {/* ────────────────────── BANNER ────────────────────── */}
        {/* Solid purple top banner */}
        <div className="w-full rounded-t-[20px] relative" style={{ height: 160, background: '#A78BFA', borderBottom: '4px solid #18181B', overflow: 'hidden' }}>
          {/* subtle pattern for texture */}
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#8B5CF6 20%, transparent 20%)', backgroundSize: '16px 16px', opacity: 0.4 }}></div>
          
          <div className="absolute right-8 bottom-6 text-right">
             <h1 className="text-4xl font-black" style={{ color: '#FAFAFA', textShadow: '4px 4px 0 #4C1D95', fontFamily: 'Inter, sans-serif' }}>{username}</h1>
             <div className="inline-flex items-center gap-2 px-3 py-1 mt-3 rounded-xl" style={{ background: '#581C87', border: '2px solid #2E1065', boxShadow: '2px 2px 0 #2E1065' }}>
                <SeedlingIcon size={16} color={rank.color} />
                <span className="font-pixel text-white" style={{ fontSize: 10 }}>{rank.label}</span>
             </div>
          </div>
        </div>

        {/* ────────────────────── AVATAR ────────────────────── */}
        {/* Top-left overlapping avatar */}
        <div className="absolute" style={{ top: -32, left: 32, zIndex: 50 }}>
           <motion.div 
             whileHover={{ scale: 1.05 }}
             className="relative cursor-pointer rounded-full flex items-center justify-center bg-[#D9F99D]" 
             style={{ width: 120, height: 120, border: '4px solid #18181B', boxShadow: '4px 4px 0 #18181B' }}
             onClick={() => setIsEditingAvatar(true)}
           >
              {/* Pink silhouette proxy using AvatarCustomizer data */}
              <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center pt-4 bg-[#FBCFE8]">
                 <PixelAvatar config={avatarConfig} size={90} />
              </div>
              
              {/* Edit icon overlay */}
              <div className="absolute -bottom-2 -right-2 w-11 h-11 rounded-full flex items-center justify-center" style={{ background: '#F472B6', border: '3px solid #18181B', boxShadow: '2px 2px 0 #18181B' }}>
                 <Pen size={18} color="#18181B" />
              </div>
           </motion.div>
        </div>

        {/* ────────────────────── 2-COLUMN LAYOUT ────────────────────── */}
        <div className="p-6 flex flex-col md:flex-row gap-6 relative z-10">
           
           {/* LEFT COLUMN */}
           <div className="flex-1 flex flex-col gap-6">
              
              {/* Top Green Block: Achievements */}
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="rounded-2xl p-6" style={{ background: '#84CC16', border: '4px solid #18181B', boxShadow: '6px 6px 0 #18181B' }}>
                 <div className="flex justify-between items-center mb-5">
                    <h3 className="font-black text-2xl uppercase" style={{ color: '#14532D', textShadow: '2px 2px 0 rgba(255,255,255,0.4)' }}>Achievements</h3>
                    <span className="font-bold text-sm cursor-pointer hover:underline" style={{ color: '#14532D' }}>View all &gt;</span>
                 </div>
                 <div className="flex items-center justify-between gap-2">
                    {BADGES.map((b, i) => (
                      <div key={i} className="flex flex-col items-center gap-2">
                         <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: b.earned ? '#D9F99D' : 'rgba(20,83,45,0.1)', border: '3px solid #14532D', boxShadow: b.earned ? '3px 3px 0 #14532D' : 'none', opacity: b.earned ? 1 : 0.6 }}>
                            {b.earned ? <BadgeIcon name={b.name} color="#14532D" size={32} /> : <Lock size={24} color="#14532D" />}
                         </div>
                         <span className="font-bold text-center uppercase tracking-wide" style={{ fontSize: 10, color: '#14532D' }}>{b.label}</span>
                      </div>
                    ))}
                 </div>
              </motion.div>

              {/* Middle Grey Blocks: Statistics Grid */}
              <div className="grid grid-cols-2 gap-4">
                  {[
                    { Icon: <FireIcon size={32} color="#EA580C" fill="currentColor" />, label: 'Day Streak', value: '0', color: '#EA580C' },
                    { Icon: <BoltIcon size={32} color="#EAB308" fill="currentColor" />, label: 'Total XP', value: <CountUp to={xp} />, color: '#EAB308' },
                    { Icon: <TrophyIcon size={32} color="#0D9488" fill="currentColor" />, label: 'League', value: '--', color: '#0D9488' },
                    { Icon: <BookIcon size={32} color="#7E22CE" fill="currentColor" />, label: 'Quests', value: '0', color: '#7E22CE' },
                  ].map((s, i) => (
                    <motion.div key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 + i*0.05 }} className="rounded-2xl p-6 flex items-center gap-4" style={{ background: '#A1A1AA', border: '4px solid #18181B', boxShadow: '4px 4px 0 #18181B' }}>
                       <div className="p-3 rounded-full shrink-0" style={{ background: 'rgba(24,24,27,0.1)' }}>{s.Icon}</div>
                       <div>
                          <div className="font-black text-3xl" style={{ color: '#18181B' }}>{s.value}</div>
                          <div className="font-bold uppercase tracking-wider" style={{ fontSize: 11, color: '#3F3F46' }}>{s.label}</div>
                       </div>
                    </motion.div>
                  ))}
              </div>

              {/* Bottom Green Block: Activity Heatmap */}
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="rounded-2xl p-6" style={{ background: '#84CC16', border: '4px solid #18181B', boxShadow: '6px 6px 0 #18181B' }}>
                 <div className="flex justify-between items-center mb-5">
                    <h3 className="font-black text-2xl uppercase" style={{ color: '#14532D', textShadow: '2px 2px 0 rgba(255,255,255,0.4)' }}>Activity</h3>
                 </div>
                 {/* Custom Heatmap for light theme */}
                 <div className="flex gap-2 overflow-x-auto pb-2">
                    {Array.from({ length: 14 }, (_, w) => (
                      <div key={w} className="flex flex-col gap-2">
                        {Array.from({ length: 7 }, (_, d) => {
                          const intensity = 0; // Empty for new user
                          const bg = intensity === 0 ? 'rgba(20,83,45,0.15)' : '#D9F99D';
                          return <div key={d} style={{ width: 16, height: 16, borderRadius: 4, background: bg, border: intensity === 0 ? 'none' : '2px solid #14532D' }} />
                        })}
                      </div>
                    ))}
                 </div>
              </motion.div>

           </div>

           {/* RIGHT COLUMN */}
           <div className="w-full md:w-[340px] flex flex-col">
              {/* Tall Purple Block: Friends */}
              <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="rounded-2xl p-6 flex-1 flex flex-col" style={{ background: '#C4B5FD', border: '4px solid #18181B', boxShadow: '6px 6px 0 #18181B' }}>
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="font-black text-2xl uppercase" style={{ color: '#4C1D95', textShadow: '2px 2px 0 rgba(255,255,255,0.4)' }}>Friends</h3>
                    <span className="font-bold text-sm cursor-pointer hover:underline" style={{ color: '#4C1D95' }}>Find &gt;</span>
                 </div>

                 {/* Empty state */}
                 <div className="flex-1 flex flex-col items-center justify-center p-6 rounded-2xl" style={{ border: '4px dashed #7C3AED', background: 'rgba(255,255,255,0.3)' }}>
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: '#A78BFA', border: '4px solid #4C1D95', boxShadow: '4px 4px 0 #4C1D95' }}>
                       <svg viewBox="0 0 24 24" fill="none" stroke="#FAFAFA" strokeWidth={2.5} width={40} height={40}>
                         <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                         <circle cx="9" cy="7" r="4" />
                         <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                         <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                       </svg>
                    </div>
                    <p className="font-black text-center text-xl uppercase" style={{ color: '#4C1D95' }}>No friends yet!</p>
                    <p className="font-bold text-center text-sm mt-2 leading-relaxed" style={{ color: '#5B21B6' }}>Add friends to compete on the leaderboard.</p>
                 </div>
              </motion.div>
           </div>

        </div>

      </div>

      {/* Avatar customizer modal */}
      {isEditingAvatar && (
        <AvatarCustomizer
          initialConfig={avatarConfig}
          onSave={c => { setAvatarConfig(c); setIsEditingAvatar(false); }}
          onClose={() => setIsEditingAvatar(false)}
        />
      )}
    </>
  );
};

export default ProfileHeader;
