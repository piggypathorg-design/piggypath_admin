import React from 'react';

const PixelLabel = ({ children, color = '#00D4C8', className = '' }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div
      className="w-3 h-3 animate-[blink_1s_steps(1)_infinite]"
      style={{ background: color }}
    />
    <span
      className="font-pixel text-sm uppercase tracking-widest"
      style={{ color }}
    >
      {children}
    </span>
  </div>
);

export default PixelLabel;
