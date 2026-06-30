import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfileTopBar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white dark:bg-[#18181B] border-b-[3px] border-[#18181B] dark:border-[#F4F4F5] px-6 py-4 flex items-center justify-between sticky top-0 z-40 transition-colors">
      
      {/* Left Area */}
      <div className="flex items-center gap-6">
        <button 
          onClick={() => navigate(-1)}
          className="bg-white dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-[#F4F4F5] shadow-[4px_4px_0_#18181B] dark:shadow-[4px_4px_0_#F4F4F5] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#18181B] dark:hover:shadow-[2px_2px_0_#F4F4F5] transition-all px-4 py-2 flex items-center gap-2 font-black text-sm text-[#18181B] dark:text-[#F4F4F5]"
        >
          <ArrowLeft size={18} strokeWidth={3} />
          BACK
        </button>
        <h1 className="font-black text-xl tracking-tight text-[#18181B] dark:text-[#F4F4F5] uppercase hidden sm:block">
          MY FINANCIAL IDENTITY
        </h1>
      </div>

      {/* Right Area */}
      <div>
        <span className="bg-[#18181B] dark:bg-[#F4F4F5] text-[#00E599] dark:text-[#18181B] font-black text-xs px-3 py-1.5 tracking-widest font-['Space_Mono',monospace] transition-colors border-2 border-transparent dark:border-[#18181B]">
          @PIGGYPATH
        </span>
      </div>

    </div>
  );
};

export default ProfileTopBar;
