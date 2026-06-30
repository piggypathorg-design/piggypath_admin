import React, { useState } from 'react';

const COLORS = {
  teal:   { bg: '#00D4C8', shadow: '#004A45', text: '#0A0A1A', border: '#004A45' },
  lime:   { bg: '#B8F400', shadow: '#3D5200', text: '#0A0A1A', border: '#3D5200' },
  violet: { bg: '#8B5CF6', shadow: '#2D1A60', text: '#F4F4F4', border: '#2D1A60' },
  flame:  { bg: '#F97316', shadow: '#7A3800', text: '#0A0A1A', border: '#7A3800' },
  ghost:  { bg: 'transparent', shadow: '#29366F', text: '#94B0C2', border: '#29366F' },
};

const PixelButton = ({ children, color = 'teal', onClick, className = '', type = 'button' }) => {
  const [pressed, setPressed] = useState(false);
  const c = COLORS[color] || COLORS.teal;

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      className={`font-pixel text-base uppercase tracking-wider px-4 py-3 select-none ${className}`}
      style={{
        background: c.bg,
        color: c.text,
        border: `2px solid ${c.border}`,
        boxShadow: pressed ? 'none' : `4px 4px 0px ${c.shadow}`,
        transform: pressed ? 'translate(4px, 4px)' : 'none',
        transition: 'none',
        imageRendering: 'pixelated',
      }}
    >
      {children}
    </button>
  );
};

export default PixelButton;
