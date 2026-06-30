import React from 'react';

const VirtualBalanceCard = ({ 
  balance = 0, 
  currencySymbol = '₹', 
  level = 1, 
  title = "Novice", 
  memberSince = "Today",
  xpToNext = 100,
  nextLevel = 2,
  progressPercent = 0
}) => {
  return (
    <div className="w-full bg-[#18181B] border-[3px] border-transparent dark:border-[#F4F4F5] p-8 relative mb-6 shadow-[8px_8px_0_#00E599] transition-colors">
      
      {/* Top badges */}
      <div className="flex justify-between items-start mb-10">
        <span className="bg-[#00E599] text-[#18181B] font-black tracking-widest px-3 py-1 text-xs">
          VIRTUAL BALANCE
        </span>
        <span className="bg-[#8B5CF6] text-white font-black tracking-widest px-3 py-1 text-xs">
          LEVEL {level}
        </span>
      </div>

      {/* Balance */}
      <div className="mb-4">
        <h1 className="text-6xl md:text-7xl font-black text-[#00E599] tracking-tighter">
          {currencySymbol}{balance.toLocaleString()}
        </h1>
      </div>

      {/* Title & Date */}
      <div className="flex items-center gap-2 text-white font-['Space_Mono',monospace] text-sm mb-12">
        <span className="font-bold">{title}</span>
        <span className="text-gray-500">•</span>
        <span className="text-gray-400">Member since {memberSince}</span>
      </div>

      {/* Progress Bar Area */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-end text-white font-['Space_Mono',monospace] text-xs">
          <span className="text-gray-400">Next milestone <br/></span>
          <span className="font-bold ml-2">{xpToNext} XP TO LVL {nextLevel}</span>
        </div>
        <div className="h-3 w-full bg-[#27272A] border-2 border-[#00E599] relative">
          <div 
            className="absolute top-0 left-0 h-full bg-[#00E599]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

    </div>
  );
};

export default VirtualBalanceCard;
