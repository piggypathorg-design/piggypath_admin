import React from 'react';

const ACCENTS = {
  teal:   { border: '#00D4C8', shadow: '#004A45' },
  lime:   { border: '#B8F400', shadow: '#3D5200' },
  violet: { border: '#8B5CF6', shadow: '#2D1A60' },
  flame:  { border: '#F97316', shadow: '#7A3800' },
  gold:   { border: '#FFCD75', shadow: '#6B4F00' },
  navy:   { border: '#29366F', shadow: '#0A0A1A' },
};

const PixelPanel = ({ accent = 'navy', children, className = '' }) => {
  const a = ACCENTS[accent] || ACCENTS.navy;
  return (
    <div
      className={`relative bg-[#12123A] ${className}`}
      style={{
        border: `2px solid ${a.border}`,
        boxShadow: `4px 4px 0px ${a.shadow}`,
      }}
    >
      {children}
    </div>
  );
};

export default PixelPanel;
