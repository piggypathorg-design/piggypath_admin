import React from 'react';

const CheckIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Codedex-style chapter node chain — pixel tiles connected by lines
const ChapterMap = ({ current, total }) => (
  <div className="flex items-center flex-wrap gap-y-2">
    {Array.from({ length: total }).map((_, i) => {
      const done   = i < current;
      const active = i === current;

      const tileBg     = done ? '#00D4C8' : active ? '#B8F400' : '#12123A';
      const tileBorder = done ? '#00D4C8' : active ? '#B8F400' : '#29366F';
      const tileText   = (done || active) ? '#0A0A1A' : '#566C86';
      const lineBg     = done ? '#00D4C8' : '#29366F';

      return (
        <React.Fragment key={i}>
          <div
            className="flex items-center justify-center font-pixel"
            style={{
              width: 28, height: 28,
              background: tileBg,
              border: `2px solid ${tileBorder}`,
              color: tileText,
              fontSize: 9,
              boxShadow: active ? `0 0 8px ${tileBorder}80` : 'none',
              imageRendering: 'pixelated',
              flexShrink: 0,
            }}
          >
            {done ? <CheckIcon size={12} color="#0A0A1A" /> : i + 1}
          </div>
          {i < total - 1 && (
            <div style={{ width: 16, height: 3, background: lineBg, flexShrink: 0 }} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

export default ChapterMap;
