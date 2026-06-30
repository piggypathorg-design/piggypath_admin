import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Check } from 'lucide-react';
import PixelAvatar, {
  SKIN_TONES, HAIR_COLORS, EYE_COLORS, HAIR_STYLES,
  FACIAL_HAIR, OUTFITS, OUTFIT_COLORS, ACCESSORIES, BG_COLORS, PRESETS
} from './PixelAvatar';
import { motion, AnimatePresence } from 'framer-motion';

// ── Category icons (pure SVG, no text) ────────────────────────────────────
const TAB_ICONS = {
  head:      () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={22} height={22}>
      <circle cx="12" cy="8" r="5"/>
      <path d="M3 21c0-4 4-7 9-7s9 3 9 7"/>
    </svg>
  ),
  hair:      () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={22} height={22}>
      <path d="M12 2C8 2 5 5 5 9v2l2 4h10l2-4V9c0-4-3-7-7-7z"/>
      <path d="M8 9c0-2 4-4 8-2" strokeDasharray="2 1"/>
    </svg>
  ),
  face:      () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={22} height={22}>
      <circle cx="12" cy="12" r="9"/>
      <circle cx="9"  cy="11" r="1.2" fill="currentColor"/>
      <circle cx="15" cy="11" r="1.2" fill="currentColor"/>
      <path d="M9 15.5c1 1 5 1 6 0"/>
    </svg>
  ),
  outfit:    () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={22} height={22}>
      <path d="M3 7l4-3h10l4 3-2 3H5L3 7z"/>
      <rect x="5" y="10" width="14" height="11" rx="1"/>
    </svg>
  ),
  accessory: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={22} height={22}>
      <path d="M3 11h4m14 0h-4M7 11a5 5 0 0010 0M7 11a5 5 0 0110 0"/>
    </svg>
  ),
  bg:        () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={22} height={22}>
      <rect x="2" y="3" width="20" height="18" rx="2"/>
      <circle cx="8" cy="10" r="2"/>
      <path d="M2 17l5-5 4 4 4-5 7 6"/>
    </svg>
  ),
};

const CATEGORIES = [
  { id: 'head',      Icon: TAB_ICONS.head      },
  { id: 'hair',      Icon: TAB_ICONS.hair      },
  { id: 'face',      Icon: TAB_ICONS.face      },
  { id: 'outfit',    Icon: TAB_ICONS.outfit    },
  { id: 'accessory', Icon: TAB_ICONS.accessory },
  { id: 'bg',        Icon: TAB_ICONS.bg        },
];

// ── Color swatch grid (no text, tooltip only) ─────────────────────────────
const ColorGrid = ({ options, value, onChange, size = 44 }) => (
  <div className="flex flex-wrap gap-3">
    {options.map(c => {
      const sel = value === c.hex;
      return (
        <motion.button
          key={c.id}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          title={c.label}
          onClick={() => onChange(c.hex)}
          style={{
            width: size, height: size,
            background: c.hex,
            borderRadius: 10,
            border: `3px solid ${sel ? '#ffffff' : 'transparent'}`,
            boxShadow: sel ? `0 0 16px ${c.hex}88` : 'none',
            transition: 'box-shadow 0.2s',
          }}
        />
      );
    })}
  </div>
);

// ── Hair style visual selector — renders a mini avatar head per style ──────
const HairStylePicker = ({ styles, value, onChange, baseConfig }) => (
  <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
    {styles.map(s => {
      const sel = value === s.id;
      const miniCfg = { ...baseConfig, hairStyle: s.id };
      return (
        <motion.button
          key={s.id}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => onChange(s.id)}
          title={s.label}
          className="flex items-center justify-center p-1 rounded-xl"
          style={{
            background: sel ? 'rgba(0,212,200,0.15)' : 'rgba(255,255,255,0.04)',
            border: `2px solid ${sel ? '#00D4C8' : 'rgba(255,255,255,0.07)'}`,
            boxShadow: sel ? '0 0 12px rgba(0,212,200,0.3)' : 'none',
            cursor: 'pointer',
          }}
        >
          <div style={{ borderRadius: 8, overflow: 'hidden', imageRendering: 'pixelated' }}>
            <PixelAvatar config={miniCfg} size={56} />
          </div>
        </motion.button>
      );
    })}
  </div>
);

// ── Outfit visual picker — mini full avatar per outfit ──────────────────
const OutfitPicker = ({ outfits, value, onChange, baseConfig }) => (
  <div className="grid grid-cols-3 gap-3">
    {outfits.map(o => {
      const sel = value === o.id;
      const miniCfg = { ...baseConfig, outfit: o.id };
      return (
        <motion.button
          key={o.id}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(o.id)}
          title={o.label}
          className="flex items-center justify-center p-1 rounded-xl"
          style={{
            background: sel ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.04)',
            border: `2px solid ${sel ? '#8B5CF6' : 'rgba(255,255,255,0.07)'}`,
            boxShadow: sel ? '0 0 12px rgba(139,92,246,0.3)' : 'none',
            cursor: 'pointer',
          }}
        >
          <div style={{ borderRadius: 8, overflow: 'hidden', imageRendering: 'pixelated' }}>
            <PixelAvatar config={miniCfg} size={60} />
          </div>
        </motion.button>
      );
    })}
  </div>
);

// ── Accessory visual picker ───────────────────────────────────────────────
const AccessoryPicker = ({ accessories, value, onChange, baseConfig }) => (
  <div className="grid grid-cols-4 gap-3">
    {accessories.map(a => {
      const sel = value === a.id;
      const miniCfg = { ...baseConfig, accessory: a.id };
      return (
        <motion.button
          key={a.id}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => onChange(a.id)}
          title={a.label}
          className="flex items-center justify-center p-1 rounded-xl"
          style={{
            background: sel ? 'rgba(184,244,0,0.12)' : 'rgba(255,255,255,0.04)',
            border: `2px solid ${sel ? '#B8F400' : 'rgba(255,255,255,0.07)'}`,
            boxShadow: sel ? '0 0 10px rgba(184,244,0,0.25)' : 'none',
            cursor: 'pointer',
          }}
        >
          <div style={{ borderRadius: 8, overflow: 'hidden', imageRendering: 'pixelated' }}>
            <PixelAvatar config={miniCfg} size={56} />
          </div>
        </motion.button>
      );
    })}
  </div>
);

// ── Gender body toggle — visual silhouette buttons ────────────────────────
const BodyToggle = ({ value, onChange }) => {
  const OPTS = [
    {
      id: 'feminine',
      title: 'Feminine Style',
      svg: (
        <svg viewBox="0 0 40 56" width={36} height={50}>
          <ellipse cx="20" cy="14" rx="9" ry="11" fill="#c4b5fd"/>
          <path d="M8 28 Q12 24 20 24 Q28 24 32 28 L35 52 H5 Z" fill="#c4b5fd"/>
          <path d="M11 36 Q9 44 7 52 H5 L8 28z" fill="#a78bfa"/>
          <path d="M29 36 Q31 44 33 52 H35 L32 28z" fill="#a78bfa"/>
        </svg>
      ),
    },
    {
      id: 'neutral',
      title: 'Chibi Style',
      svg: (
        <svg viewBox="0 0 40 56" width={36} height={50}>
          <circle cx="20" cy="15" r="9.5" fill="#FFB5C8"/>
          <path d="M9 30 Q12 26 20 26 Q28 26 31 30 L33 52 H7 Z" fill="#FFB5C8"/>
          <path d="M12 36 Q10 44 8 52 H7 L9 30z" fill="#f472b6"/>
          <path d="M28 36 Q30 44 32 52 H33 L31 30z" fill="#f472b6"/>
        </svg>
      ),
    },
    {
      id: 'masculine',
      title: 'Masculine Style',
      svg: (
        <svg viewBox="0 0 40 56" width={36} height={50}>
          <ellipse cx="20" cy="14" rx="9" ry="11" fill="#00D4C8"/>
          <path d="M6 26 Q12 22 20 22 Q28 22 34 26 L34 52 H6 Z" fill="#00D4C8"/>
          <path d="M6 32 H3 L5 52 H8 Z" fill="#00B4A8"/>
          <path d="M34 32 H37 L35 52 H32 Z" fill="#00B4A8"/>
        </svg>
      ),
    },
  ];
  return (
    <div className="flex gap-4">
      {OPTS.map(o => {
        const sel = value === o.id;
        return (
          <motion.button
            key={o.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(o.id)}
            title={o.title}
            className="flex-1 flex flex-col items-center justify-center py-4 rounded-2xl"
            style={{
              background: sel ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
              border: `2px solid ${sel ? '#00D4C8' : 'rgba(255,255,255,0.08)'}`,
              boxShadow: sel ? '0 0 16px rgba(0,212,200,0.2)' : 'none',
            }}
          >
            {o.svg}
          </motion.button>
        );
      })}
    </div>
  );
};

// ── Main AvatarCustomizer ─────────────────────────────────────────────────
const AvatarCustomizer = ({ initialConfig, onSave, onClose }) => {
  const [config, setConfig] = useState(initialConfig || {
    skinColor:   SKIN_TONES[1].hex,
    hairColor:   HAIR_COLORS[0].hex,
    hairStyle:   'long_straight',
    outfitColor: OUTFIT_COLORS[2].hex,
    outfit:      'hoodie',
    bgColor:     BG_COLORS[8].hex,
    eyeColor:    EYE_COLORS[0].hex,
    facialHair:  'none',
    accessory:   'none',
    gender:      'feminine',
  });
  const [activeTab, setActiveTab] = useState('head');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); return () => setMounted(false); }, []);

  const update = (key, val) => setConfig(p => ({ ...p, [key]: val }));

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(10,4,28,0.92)', backdropFilter: 'blur(16px)' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        className="w-full max-w-5xl flex flex-col md:flex-row overflow-hidden relative z-[10000]"
        style={{
          background: 'rgba(18,10,45,0.95)',
          border: '1px solid rgba(139,92,246,0.4)',
          borderRadius: 24,
          boxShadow: '0 0 60px rgba(139,92,246,0.25)',
          height: '88vh',
          maxHeight: 680,
        }}
      >
        {/* Absolute Close button in top-right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 flex items-center justify-center rounded-xl bg-purple-950/60 hover:bg-purple-900/80 transition-colors"
          style={{ width: 40, height: 40, color: '#566C86', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <X size={18} />
        </button>

        {/* ── LEFT: Live preview ─────────────────────────────────── */}
        <div className="flex flex-col items-center justify-between py-8 px-6 shrink-0"
          style={{ width: 260, borderRight: '1px solid rgba(255,255,255,0.07)', background: 'rgba(10,4,28,0.4)' }}>

          {/* Spinning glow + avatar */}
          <div className="flex flex-col items-center gap-6 flex-1 justify-center">
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: -8, borderRadius: 28,
                  border: '2px dashed rgba(139,92,246,0.3)', pointerEvents: 'none',
                }}
              />
              {/* Avatar */}
              <motion.div
                key={JSON.stringify(config)}
                initial={{ scale: 0.93 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{ borderRadius: 20, overflow: 'hidden', imageRendering: 'pixelated', boxShadow: '0 0 30px rgba(139,92,246,0.4)' }}
              >
                <PixelAvatar config={config} size={200} />
              </motion.div>
            </div>

            {/* Preset strip — visual magic wand icon, zero words */}
            <div className="w-full">
              <div className="flex justify-center mb-2 text-[#566C86]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={18} height={18} title="Presets">
                  <path d="M15 4V2m0 4V4m0 0h2m-2 0h-2M4 20l10-10m1.5-1.5l2-2a2.12 2.12 0 113 3l-2 2L15.5 8.5z"/>
                </svg>
              </div>
              <div className="flex gap-2 justify-center overflow-x-auto pb-1">
                {PRESETS.map((p, i) => (
                  <motion.button key={i} whileHover={{ scale: 1.1, y: -2 }} onClick={() => setConfig(p)}
                    style={{ borderRadius: 10, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.08)', imageRendering: 'pixelated', flexShrink: 0 }}>
                    <PixelAvatar config={p} size={44} />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Save button */}
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => onSave(config)}
            className="w-full py-4 font-black text-base rounded-2xl flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg,#00D4C8,#B8F400)', color: '#0A0A1A', marginTop: 16 }}
          >
            <Check size={20} /> Save
          </motion.button>
        </div>

        {/* ── RIGHT: Controls ────────────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* Tab content (Top panel) */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(139,92,246,0.3) transparent' }}>
            <AnimatePresence mode="wait">
              <motion.div key={activeTab}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18 }}
                className="flex flex-col gap-6"
              >

                {/* ── HEAD: body type + skin tone ── */}
                {activeTab === 'head' && (
                  <>
                    <BodyToggle value={config.gender} onChange={v => update('gender', v)} />
                    <ColorGrid options={SKIN_TONES} value={config.skinColor} onChange={v => update('skinColor', v)} size={44} />
                  </>
                )}

                {/* ── HAIR: visual style picker + color swatches ── */}
                {activeTab === 'hair' && (
                  <>
                    <HairStylePicker styles={HAIR_STYLES} value={config.hairStyle} onChange={v => update('hairStyle', v)} baseConfig={config} />
                    <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
                    <ColorGrid options={HAIR_COLORS} value={config.hairColor} onChange={v => update('hairColor', v)} size={36} />
                  </>
                )}

                {/* ── FACE: eye color swatches ── */}
                {activeTab === 'face' && (
                  <>
                    <ColorGrid options={EYE_COLORS} value={config.eyeColor} onChange={v => update('eyeColor', v)} size={44} />
                    {/* Facial hair — only show for masculine */}
                    {config.gender === 'masculine' && (
                      <>
                        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
                        <div className="grid grid-cols-3 gap-3">
                          {FACIAL_HAIR.map(f => {
                            const sel = config.facialHair === f.id;
                            const miniCfg = { ...config, facialHair: f.id };
                            return (
                              <motion.button key={f.id} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
                                onClick={() => update('facialHair', f.id)}
                                title={f.label}
                                className="flex items-center justify-center p-1 rounded-xl"
                                style={{ background: sel ? 'rgba(0,212,200,0.12)' : 'rgba(255,255,255,0.03)', border: `2px solid ${sel ? '#00D4C8' : 'rgba(255,255,255,0.07)'}` }}>
                                <div style={{ borderRadius: 8, overflow: 'hidden', imageRendering: 'pixelated' }}>
                                  <PixelAvatar config={miniCfg} size={56} />
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* ── OUTFIT: visual picker + color ── */}
                {activeTab === 'outfit' && (
                  <>
                    <OutfitPicker outfits={OUTFITS} value={config.outfit} onChange={v => update('outfit', v)} baseConfig={config} />
                    <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
                    <ColorGrid options={OUTFIT_COLORS} value={config.outfitColor} onChange={v => update('outfitColor', v)} size={40} />
                  </>
                )}

                {/* ── ACCESSORY: visual picker ── */}
                {activeTab === 'accessory' && (
                  <AccessoryPicker accessories={ACCESSORIES} value={config.accessory} onChange={v => update('accessory', v)} baseConfig={config} />
                )}

                {/* ── BACKGROUND: color swatches ── */}
                {activeTab === 'bg' && (
                  <ColorGrid options={BG_COLORS} value={config.bgColor} onChange={v => update('bgColor', v)} size={56} />
                )}

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Snapchat-style Icon-only tab bar at the bottom */}
          <div className="flex items-center justify-center gap-3 px-4 py-4 shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {CATEGORIES.map(cat => {
              const { Icon } = cat;
              const sel = activeTab === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setActiveTab(cat.id)}
                  title={cat.id.toUpperCase()}
                  className="flex items-center justify-center rounded-xl relative"
                  style={{
                    width: 52, height: 52,
                    color: sel ? '#00D4C8' : '#566C86',
                    background: sel ? 'rgba(0,212,200,0.12)' : 'transparent',
                    border: `2px solid ${sel ? '#00D4C8' : 'transparent'}`,
                  }}
                >
                  <Icon />
                  {sel && (
                    <motion.div layoutId="tab-underline"
                      className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full"
                      style={{ background: '#00D4C8' }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

        </div>
      </motion.div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(modalContent, document.body);
};

export default AvatarCustomizer;
