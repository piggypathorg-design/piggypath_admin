import React from 'react';

const CurrentJourneyCard = () => {
  return (
    <div className="w-full bg-[#8B5CF6] border-[3px] border-[#18181B] dark:border-white shadow-[6px_6px_0_#00E599] p-6 mb-6 flex flex-col relative overflow-hidden transition-colors">
      
      <div className="mb-4">
        <span className="bg-[#00E599] text-[#18181B] font-black text-[10px] px-2 py-1 tracking-widest uppercase">
          Current Journey
        </span>
      </div>

      <h2 className="font-black text-3xl text-white tracking-tighter mb-8">
        Money Basics 101
      </h2>

      {/* Action Button */}
      <button className="w-full bg-[#00E599] text-[#18181B] font-black text-lg py-3 border-[3px] border-[#18181B] dark:border-white shadow-[4px_4px_0_#18181B] dark:shadow-[4px_4px_0_#F4F4F5] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#18181B] dark:hover:shadow-[2px_2px_0_#F4F4F5] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all uppercase mt-2">
        START JOURNEY <span className="font-sans">&gt;</span>
      </button>

    </div>
  );
};

export default CurrentJourneyCard;
