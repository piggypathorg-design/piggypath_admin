import React from 'react';
import { Coins } from 'lucide-react';

const CoinDisplay = ({ amount, className = '' }) => {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-500/50 shadow-[0_0_8px_rgba(234,179,8,0.3)]">
        <Coins size={12} className="text-yellow-400" />
      </div>
      <span className="font-bold text-sm tracking-wide">{amount.toLocaleString()}</span>
    </div>
  );
};

export default CoinDisplay;
