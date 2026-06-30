import React from 'react';
import { motion } from 'framer-motion';

const XPProgressBar = ({ current, max, className = '' }) => {
  const percent = Math.min(100, Math.max(0, (current / max) * 100));

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-end mb-1">
        <div className="text-xs text-gray-400 font-medium">XP</div>
        <div className="text-xs font-bold">{current} / {max}</div>
      </div>
      <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-piggy-purple via-piggy-teal to-piggy-teal rounded-full shadow-[0_0_10px_rgba(0,212,170,0.5)] relative"
        >
          <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/30" />
        </motion.div>
      </div>
    </div>
  );
};

export default XPProgressBar;
