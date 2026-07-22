import React, { useEffect, useState } from 'react';

const Confetti = ({ score = 100 }) => {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    // Generate confetti based on score
    // Higher score = more confetti
    const count = Math.max(20, Math.floor((score / 100) * 80)); 
    const cols = ['#01EF8E', '#806BFF', '#FFD84D', '#FF73B5', '#3F43BF'];
    
    const generated = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      bg: cols[i % 5],
      duration: `${1.8 + Math.random() * 1.6}s`,
      delay: `${Math.random() * 0.5}s`,
    }));

    setPieces(generated);

    // Auto cleanup after animation finishes (max duration ~3.4s + 0.5s delay)
    const timer = setTimeout(() => {
      setPieces([]);
    }, 4500);

    return () => clearTimeout(timer);
  }, [score]);

  if (pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <style>{`
        @keyframes confFall {
          0% { transform: translateY(-40px) rotate(0); opacity: 1; }
          100% { transform: translateY(105vh) rotate(720deg); opacity: 0.9; }
        }
      `}</style>
      {pieces.map(p => (
        <span
          key={p.id}
          className="absolute w-2.5 h-3.5 rounded-sm"
          style={{
            left: p.left,
            backgroundColor: p.bg,
            animation: `confFall ${p.duration} linear forwards`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
