import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PixelAvatar from '../profile/PixelAvatar';

// ── SVG Icons ─────────────────────────────────────────────────────────────

const TrophyIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} width={size} height={size}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7c0 3.31 2.69 6 6 6s6-2.69 6-6V2z" />
  </svg>
);

const DiamondIcon = ({ size = 16, color = '#00D4C8' }) => (
  <svg viewBox="0 0 24 24" fill={color} width={size} height={size}>
    <path d="M12 2l10 7-10 13L2 9l10-7z" fillOpacity={0.8} />
    <path d="M12 2l5 7-5 13-5-13 5-7z" fill="rgba(255,255,255,0.4)" />
  </svg>
);

const HouseIcon = ({ size = 56, color = '#8B5CF6' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const RocketIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const ArrowUpIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const BotIcon = ({ size = 30, color = '#c4b5fd' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16" />
    <line x1="16" y1="16" x2="16" y2="16" />
  </svg>
);

const FlameIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill={color} width={size} height={size}>
    <path d="M12 2c0 0-5 6-5 11a5 5 0 0 0 10 0c0-5-5-11-5-11zm0 16a3 3 0 0 1-3-3c0-2 2-4 3-6 1 2 3 4 3 6a3 3 0 0 1-3 3z" />
  </svg>
);

const PlayIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill={color} width={size} height={size}>
    <path d="M5 3l14 9-14 9V3z" />
  </svg>
);

const StarIcon = ({ size = 14, color = '#FFCD75' }) => (
  <svg viewBox="0 0 24 24" fill={color} width={size} height={size}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

// ── Typewriter ────────────────────────────────────────────────────────────

const useTypewriter = (text, speed = 55) => {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const t = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text]);
  return displayed;
};

const Cursor = () => {
  const [v, setV] = useState(true);
  useEffect(() => { const t = setInterval(() => setV(x => !x), 500); return () => clearInterval(t); }, []);
  return <span style={{ opacity: v ? 1 : 0 }}>_</span>;
};

// ── ChapterDots ───────────────────────────────────────────────────────────

const ChapterDots = ({ total = 5, current = 1 }) => (
  <div className="flex items-center gap-1.5">
    {[...Array(total)].map((_, i) => (
      <div key={i} style={{
        width: i === current - 1 ? 20 : 10,
        height: 10,
        borderRadius: 5,
        background: i < current ? '#8B5CF6' : 'rgba(255,255,255,0.12)',
        transition: 'all 0.3s',
      }} />
    ))}
  </div>
);

// ── CountUp ───────────────────────────────────────────────────────────────

const CountUp = ({ to, duration = 1000 }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (to === 0) { setVal(0); return; }
    let s = 0;
    const t = setInterval(() => {
      s += Math.max(1, Math.floor(to / (duration / 30)));
      if (s >= to) { s = to; clearInterval(t); }
      setVal(s);
    }, 30);
    return () => clearInterval(t);
  }, [to, duration]);
  return <>{val.toLocaleString()}</>;
};

// ── Leaderboard data ──────────────────────────────────────────────────────

const PLAYERS = [
  { rank: 1,  name: 'FinanceKing', xp: 3240, color: '#FFCD75', avatar: { skinColor:'#FFCDD2', hairStyle:'spiky', hairColor:'#3e2723', eyeStyle:'normal', mouthStyle:'smile', bodyType:'chibi', outfitColor:'#1565C0', accessory:'none', headwear:'crown' } },
  { rank: 2,  name: 'MoneyMaya',   xp: 2980, color: '#94B0C2', avatar: { skinColor:'#F5DEB3', hairStyle:'long', hairColor:'#607D8B', eyeStyle:'wink', mouthStyle:'happy', bodyType:'chibi', outfitColor:'#00796B', accessory:'glasses', headwear:'none' } },
  { rank: 3,  name: 'CoinQueen',   xp: 2650, color: '#CD7F32', avatar: { skinColor:'#8D5524', hairStyle:'curly', hairColor:'#1a1a1a', eyeStyle:'normal', mouthStyle:'neutral', bodyType:'chibi', outfitColor:'#8E24AA', accessory:'none', headwear:'bow' } },
  { rank: 4,  name: 'Rahul M.',    xp: 1840, color: '#8B5CF6', avatar: { skinColor:'#E0AC69', hairStyle:'short', hairColor:'#212121', eyeStyle:'normal', mouthStyle:'smile', bodyType:'chibi', outfitColor:'#D32F2F', accessory:'none', headwear:'cap' } },
  { rank: 5,  name: 'Aditya P.',   xp: 1620, color: '#566C86', avatar: { skinColor:'#FFDBAC', hairStyle:'fade', hairColor:'#000000', eyeStyle:'normal', mouthStyle:'neutral', bodyType:'chibi', outfitColor:'#455A64', accessory:'none', headwear:'none' } },
  { rank: 6,  name: 'Sneha K.',    xp: 1410, color: '#566C86', avatar: { skinColor:'#C68642', hairStyle:'bun', hairColor:'#3e2723', eyeStyle:'normal', mouthStyle:'smile', bodyType:'chibi', outfitColor:'#C2185B', accessory:'earrings', headwear:'none' } },
  { rank: 7,  name: 'Priya S.',    xp: 1200, color: '#566C86', avatar: { skinColor:'#F1C27D', hairStyle:'long', hairColor:'#000000', eyeStyle:'normal', mouthStyle:'smile', bodyType:'chibi', outfitColor:'#0097A7', accessory:'none', headwear:'none' } },
  { rank: 14, name: 'You',         xp:    0, color: '#00D4C8', isYou: true, avatar: { skinColor:'#FFDBAC', hairStyle:'spiky', hairColor:'#F57C00', eyeStyle:'normal', mouthStyle:'smile', bodyType:'chibi', outfitColor:'#00D4C8', accessory:'none', headwear:'none' } },
  { rank: 15, name: 'BudgetBro',   xp:  870, color: '#566C86', avatar: { skinColor:'#8D5524', hairStyle:'bald', hairColor:'#000000', eyeStyle:'normal', mouthStyle:'neutral', bodyType:'chibi', outfitColor:'#1976D2', accessory:'none', headwear:'bandana' } },
];
const PODIUM = [PLAYERS[1], PLAYERS[0], PLAYERS[2]];

// ── Medal SVG icons (no emoji) ────────────────────────────────────────────

const MedalIcon = ({ rank, size = 18 }) => {
  const colors = { 1: '#FFCD75', 2: '#94B0C2', 3: '#CD7F32' };
  const fill = colors[rank] || '#566C86';
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <circle cx="12" cy="14" r="8" fill={fill} fillOpacity={0.25} stroke={fill} strokeWidth={2} />
      <text x="12" y="18" textAnchor="middle" fill={fill} fontSize="11" fontWeight="900" fontFamily="Inter,sans-serif">
        {rank}
      </text>
      <path d="M8 2l4 8 4-8" fill="none" stroke={fill} strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
};

// ── Main HeroSection ──────────────────────────────────────────────────────

const HeroSection = ({
  username = 'Player',
  level = 1,
  xp = 0,
  maxXp = 100,
}) => {
  const greeting = useTypewriter(`Hey ${username}!`, 60);
  const [pressed, setPressed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const questProgress = 0;
  const listPlayers = expanded ? PLAYERS : PLAYERS.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(18,10,45,0.95)',
        border: '2px solid #8B5CF6',
        backdropFilter: 'blur(14px)',
        boxShadow: '0 0 40px rgba(139,92,246,0.25), 0 0 80px rgba(139,92,246,0.1)',
      }}
    >
      {/* Purple gradient glow blob - top right */}
      <div style={{
        position: 'absolute',
        top: -40,
        right: -40,
        width: 220,
        height: 220,
        background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ──────────────────── 1. Greeting Row ──────────────────── */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-2">
        <motion.div
          animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
          transition={{ duration: 1.5, delay: 1, ease: 'easeInOut' }}
          className="shrink-0 flex items-center justify-center"
          style={{
            width: 36,
            height: 36,
            background: '#8B5CF6',
            border: '2px solid #2D1A60',
            boxShadow: '2px 2px 0 #2D1A60',
            borderRadius: 10,
          }}
        >
          <BotIcon size={22} color="#FFFFFF" />
        </motion.div>
        <p className="font-bold text-white" style={{ fontSize: 16, lineHeight: 1.3 }}>
          {greeting}<span style={{ color: '#c4b5fd' }}><Cursor /></span>
        </p>
      </div>

      {/* ──────────────────── 2. XP Bar ──────────────────── */}
      <div className="px-5 pt-4 pb-1">
        <div className="flex items-center gap-3">
          {/* Level badge left */}
          <div className="shrink-0 flex items-center justify-center rounded-xl font-black"
            style={{
              width: 40,
              height: 40,
              background: '#8B5CF6',
              border: '2px solid #2D1A60',
              boxShadow: '2px 2px 0 #2D1A60',
              color: '#FFFFFF',
              fontSize: 13,
              fontFamily: 'Inter,sans-serif',
            }}>
            {level}
          </div>

          {/* Bar */}
          <div className="flex-1">
            <div className="w-full rounded-full" style={{ height: 14, background: 'rgba(255,255,255,0.08)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${maxXp > 0 ? (xp / maxXp) * 100 : 0}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="h-full rounded-full relative"
                style={{
                  background: 'linear-gradient(90deg,#B8F400,#00D4C8)',
                  boxShadow: xp > 0 ? '0 0 12px rgba(184,244,0,0.4)' : 'none',
                }}
              >
                {xp > 0 && (
                  <span style={{ position: 'absolute', right: -12, top: -8 }}>
                    <FlameIcon size={24} color="#F97316" />
                  </span>
                )}
              </motion.div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="font-pixel" style={{ fontSize: 8, color: '#566C86' }}>{xp} XP</span>
              <span className="font-pixel" style={{ fontSize: 8, color: '#566C86' }}>{maxXp} XP</span>
            </div>
          </div>

          {/* Next level badge right */}
          <div className="shrink-0 flex items-center justify-center rounded-xl font-black"
            style={{
              width: 40,
              height: 40,
              background: 'rgba(255,255,255,0.05)',
              border: '2px solid rgba(255,255,255,0.2)',
              boxShadow: '2px 2px 0 rgba(0,0,0,0.3)',
              color: '#94B0C2',
              fontSize: 13,
              fontFamily: 'Inter,sans-serif',
            }}>
            {level + 1}
          </div>
        </div>
      </div>

      {/* ──────────────────── 3. Quest Card ──────────────────── */}
      <div className="px-5 pt-4 pb-5">
        <div className="flex items-center gap-5">
          {/* Quest icon */}
          <div className="shrink-0 flex items-center justify-center rounded-2xl"
            style={{
              width: 80,
              height: 80,
              background: '#00D4C8',
              border: '2px solid #004A45',
              boxShadow: '4px 4px 0 #004A45',
            }}>
            <HouseIcon size={46} color="#004A45" />
          </div>

          {/* Right content */}
          <div className="flex-1 min-w-0">
            <ChapterDots total={5} current={1} />

            <h2 className="font-black text-white mt-2 mb-3" style={{ fontSize: 20, lineHeight: 1.1 }}>
              Real Estate Tycoon
            </h2>

            {/* Quest progress bar */}
            <div className="w-full rounded-full mb-4" style={{ height: 14, background: 'rgba(255,255,255,0.08)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${questProgress}%` }}
                transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg,#B8F400,#00D4C8)',
                  boxShadow: questProgress > 0 ? '0 0 10px rgba(184,244,0,0.4)' : 'none',
                }}
              />
            </div>

            {/* Play button */}
            <motion.button
              onMouseDown={() => setPressed(true)}
              onMouseUp={() => setPressed(false)}
              onMouseLeave={() => setPressed(false)}
              className="w-full font-pixel pixel-btn"
              style={{
                padding: '14px 0',
                fontSize: 10,
                background: '#B8F400',
                color: '#0A0A1A',
                border: '2px solid #3D5200',
                boxShadow: pressed ? 'none' : '4px 4px 0 #3D5200',
                transform: pressed ? 'translate(4px,4px)' : 'none',
                imageRendering: 'pixelated',
              }}
            >
              &gt; PLAY <Cursor />
            </motion.button>
          </div>
        </div>
      </div>

      {/* ──────────────────── 4. Divider ──────────────────── */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 20px' }} />

      {/* ──────────────────── 5. Leaderboard ──────────────────── */}
      <div>
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <div className="flex items-center gap-3">
            <TrophyIcon size={26} color="#FFCD75" />
            <span className="font-black text-white text-xl">Leaderboard</span>
          </div>
          <div className="font-pixel px-3 py-1.5 rounded-lg flex items-center gap-1.5"
            style={{ fontSize: 9, background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.4)', color: '#c4b5fd' }}>
            LVL {level}
          </div>
        </div>

        {/* Podium */}
        <div className="flex items-end justify-center gap-4 px-5 pt-2 pb-6">
          {PODIUM.map((p, i) => {
            const isGold = i === 1;
            const heights = [100, 132, 88];
            const podiumRanks = [2, 1, 3];
            const bgs = ['rgba(148,176,194,0.12)', 'rgba(255,205,117,0.14)', 'rgba(205,127,50,0.12)'];
            const borders = ['rgba(148,176,194,0.35)', 'rgba(255,205,117,0.5)', 'rgba(205,127,50,0.35)'];
            return (
              <motion.div key={p.rank}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 180 }}
                className="flex flex-col items-center gap-2" style={{ width: '31%' }}
              >
                <motion.div whileHover={{ scale: 1.08 }}
                  className="flex items-center justify-center rounded-2xl relative"
                  style={{
                    width: isGold ? 76 : 62,
                    height: isGold ? 76 : 62,
                    background: bgs[i],
                    border: `2px solid ${borders[i]}`,
                    boxShadow: isGold ? '0 0 24px rgba(255,205,117,0.35)' : 'none',
                  }}>
                  <PixelAvatar customization={p.avatar} size={isGold ? 60 : 44} />
                  {isGold && (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                      style={{ position: 'absolute', inset: -5, borderRadius: 20, border: '2px dashed rgba(255,205,117,0.3)', pointerEvents: 'none' }} />
                  )}
                  <div style={{
                    position: 'absolute', top: -10, right: -12,
                    background: bgs[i],
                    border: `1px solid ${borders[i]}`,
                    borderRadius: 8,
                    padding: '1px 3px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <MedalIcon rank={podiumRanks[i]} size={20} />
                  </div>
                </motion.div>
                <div className="text-center">
                  <div className="font-bold text-white text-xs truncate" style={{ maxWidth: 84 }}>{p.name}</div>
                  <div className="font-black" style={{ fontSize: 17, color: p.color, fontFamily: 'Inter,sans-serif' }}>
                    <CountUp to={p.xp} />
                  </div>
                </div>
                <div className="w-full flex items-end justify-center rounded-t-xl"
                  style={{
                    height: heights[i],
                    background: bgs[i],
                    border: `1px solid ${borders[i]}`,
                    borderBottom: 'none',
                  }}>
                  <span style={{ marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MedalIcon rank={podiumRanks[i]} size={22} />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Rows */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <AnimatePresence>
            {listPlayers.slice(3).map((p, i) => (
              <motion.div key={p.rank}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between px-5 py-3"
                style={{
                  background: p.isYou ? 'rgba(0,212,200,0.08)' : 'transparent',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  borderLeft: p.isYou ? '3px solid #00D4C8' : '3px solid transparent',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="font-black shrink-0 text-center"
                    style={{ width: 28, fontSize: 15, color: p.isYou ? '#00D4C8' : '#566C86', fontFamily: 'Inter,sans-serif' }}>
                    {p.rank}
                  </div>
                  <div className="flex items-center justify-center rounded-xl shrink-0"
                    style={{
                      width: 40, height: 40,
                      background: p.isYou ? 'rgba(0,212,200,0.15)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${p.isYou ? 'rgba(0,212,200,0.4)' : 'rgba(255,255,255,0.06)'}`,
                      overflow: 'hidden',
                    }}>
                    <PixelAvatar customization={p.avatar} size={36} />
                  </div>
                  <span className="font-bold text-sm" style={{ color: p.isYou ? '#00D4C8' : '#F4F4F4' }}>{p.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-black" style={{ fontSize: 18, color: p.isYou ? '#B8F400' : p.color, fontFamily: 'Inter,sans-serif' }}>
                    {p.isYou ? <CountUp to={p.xp} /> : p.xp.toLocaleString()}
                  </div>
                  <div className="font-pixel" style={{ fontSize: 7, color: '#566C86' }}>XP</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA strip */}
        <div className="px-5 py-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,212,200,0.05)' }}>
          <div className="flex items-center justify-between mb-2">
            <ArrowUpIcon size={20} color="#F97316" />
            <div className="flex-1 mx-3 rounded-full" style={{ height: 10, background: 'rgba(255,255,255,0.07)' }}>
              <div className="h-full rounded-full" style={{ width: '0%', background: 'linear-gradient(90deg,#00D4C8,#B8F400)' }} />
            </div>
            <span className="font-black" style={{ fontSize: 18, color: '#F97316', fontFamily: 'Inter,sans-serif' }}>0 XP</span>
          </div>
          <div className="flex gap-2 mt-3">
            <button className="flex-1 py-3 font-pixel pixel-btn rounded-lg uppercase"
              style={{ fontSize: 10, background: '#00D4C8', color: '#0A0A1A', border: '2px solid #004A45', boxShadow: '4px 4px 0 #004A45' }}>
              &gt; START <Cursor />
            </button>
            <button onClick={() => setExpanded(e => !e)}
              className="px-4 py-3 font-pixel pixel-btn rounded-lg"
              style={{ fontSize: 10, background: 'rgba(255,255,255,0.05)', color: '#7B8DB0', border: '2px solid rgba(255,255,255,0.1)', boxShadow: '4px 4px 0 rgba(0,0,0,0.2)' }}>
              {expanded ? 'LESS' : 'MORE'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
