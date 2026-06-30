import React from 'react';

const PathSidebar = () => {
  return (
    <div className="w-full flex flex-col gap-6 shrink-0 h-fit">
      
      {/* Title */}
      <h2 className="font-black text-2xl tracking-tight text-[#18181B] dark:text-[#F4F4F5] uppercase mb-2">
        PATH MAP
      </h2>

      {/* Overall Progress Card */}
      <div className="w-full bg-[#E4E4E7] dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-[#F4F4F5] shadow-[6px_6px_0_#18181B] dark:shadow-[6px_6px_0_#F4F4F5] p-6 transition-colors">
        <p className="font-['Space_Mono',monospace] text-sm text-[#71717A] dark:text-[#A1A1AA] mb-1">
          Overall Progress
        </p>
        <h3 className="font-black text-3xl text-[#18181B] dark:text-white tracking-tight mb-4">
          1/9 levels
        </h3>
        {/* Progress Bar */}
        <div className="w-full h-4 bg-white dark:bg-[#18181B] border-[2px] border-[#18181B] dark:border-white rounded-full overflow-hidden transition-colors">
          <div className="h-full bg-[#00E599] border-r-[2px] border-[#18181B] dark:border-white w-[11%]"></div>
        </div>
      </div>

      {/* Up Next Card */}
      <div className="w-full bg-[#00E599] border-[3px] border-[#18181B] dark:border-white shadow-[6px_6px_0_#18181B] dark:shadow-[6px_6px_0_#F4F4F5] p-6 transition-colors">
        <p className="font-['Space_Mono',monospace] text-sm text-[#18181B] mb-1">
          Up Next
        </p>
        <h3 className="font-black text-2xl text-[#18181B] tracking-tight mb-6">
          Saving Goals
        </h3>
        <button className="w-full bg-[#18181B] text-white font-black text-sm px-6 py-4 border-[3px] border-transparent hover:bg-[#27272A] transition-colors active:translate-y-[2px] shadow-[2px_2px_0_#18181B] dark:shadow-none uppercase tracking-widest">
          Continue
        </button>
      </div>

    </div>
  );
};

export default PathSidebar;
