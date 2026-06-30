import React from 'react';

// Drop inside any `relative overflow-hidden` container.
// Draws L-shaped corner brackets — classic RPG window decoration.
const PixelCorners = ({ color = '#00D4C8', size = 10 }) => (
  <>
    <div className="absolute top-0 left-0"
      style={{ width: size, height: size, borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}` }} />
    <div className="absolute top-0 right-0"
      style={{ width: size, height: size, borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}` }} />
    <div className="absolute bottom-0 left-0"
      style={{ width: size, height: size, borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}` }} />
    <div className="absolute bottom-0 right-0"
      style={{ width: size, height: size, borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}` }} />
  </>
);

export default PixelCorners;
