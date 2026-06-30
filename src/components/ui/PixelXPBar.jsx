import React from 'react';

// Clean slim XP bar — single solid fill, like Codedex's progress bar style
const PixelXPBar = ({ current, max, segments = 20 }) => {
  const filled = Math.round((current / max) * segments);
  const ratio = filled / segments;

  const fillColor = ratio < 0.3 ? '#B13E53' : ratio < 0.7 ? '#FFCD75' : '#B8F400';

  return (
    <div className="flex gap-[3px] flex-wrap">
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 14,
            height: 14,
            background: i < filled ? fillColor : '#1a1a3a',
            border: `1px solid ${i < filled ? fillColor : '#2a2a5a'}`,
            imageRendering: 'pixelated',
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
};

export default PixelXPBar;
