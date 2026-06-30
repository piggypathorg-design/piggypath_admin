import React from 'react';
import { Shield, Trophy, ChevronRight } from 'lucide-react';

const LeaderboardCard = () => {
  return (
    <div className="w-full bg-[#3B82F6] border-[3px] border-[#18181B] dark:border-white shadow-[6px_6px_0_#18181B] dark:shadow-[6px_6px_0_#F4F4F5] p-6 transition-colors flex flex-col flex-1 min-h-0">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h3 className="font-black text-xl tracking-tight text-white dark:text-[#18181B]">LEAGUES</h3>
        <span className="bg-white dark:bg-[#18181B] text-[#3B82F6] font-['Space_Mono',monospace] font-bold text-[10px] px-2 py-1 tracking-widest uppercase transition-colors border-[2px] border-[#18181B] dark:border-transparent">
          Bronze
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center flex-1 py-4">
        
        {/* Shield / League Icon */}
        <div className="relative mb-4 group cursor-pointer">
          <Shield 
            size={80} 
            color="#18181B" 
            fill="#8B5CF6" // Bronze color could be #D97706, but let's make it a nice purple/orange. Let's use Bronze: #D97706
            strokeWidth={2}
            className="drop-shadow-[4px_4px_0_rgba(24,24,27,0.5)] dark:drop-shadow-[4px_4px_0_rgba(244,244,245,0.5)] transition-transform group-hover:-translate-y-1"
            style={{ fill: '#D97706' }} // Bronze League
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Trophy size={32} color="#FFF" fill="#FFF" strokeWidth={1.5} className="opacity-90 drop-shadow-sm" />
          </div>
        </div>

        {/* Text */}
        <h4 className="font-black text-lg text-white dark:text-[#18181B] mb-1">
          Bronze League
        </h4>
        <p className="font-['Space_Mono',monospace] text-xs font-bold text-white/90 dark:text-[#18181B]/90 text-center max-w-[200px]">
          Complete a lesson to join this week's leaderboard!
        </p>

      </div>

      {/* Footer Button */}
      <button className="w-full bg-[#18181B] dark:bg-white text-white dark:text-[#18181B] font-black text-xs px-4 py-3 flex items-center justify-center gap-2 hover:bg-[#27272A] dark:hover:bg-[#E4E4E7] transition-colors border-[3px] border-[#18181B] dark:border-transparent mt-4 shrink-0 shadow-[2px_2px_0_#18181B] dark:shadow-none active:translate-y-[2px] active:translate-x-[2px] active:shadow-none uppercase tracking-widest">
        View League
        <ChevronRight size={16} strokeWidth={3} />
      </button>

    </div>
  );
};

export default LeaderboardCard;
