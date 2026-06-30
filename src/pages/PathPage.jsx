import React from 'react';
import PathSidebar from '../components/path/PathSidebar';
import LearningPath from '../components/path/LearningPath';
import { CircleDollarSign, BarChart2 } from 'lucide-react';

const PathPage = () => {
  return (
    <div className="w-full relative pb-12">
      
      {/* Decorative Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.15] dark:opacity-[0.05]">
        <CircleDollarSign className="absolute top-[10%] left-[5%] w-16 h-16 -rotate-12" />
        <CircleDollarSign className="absolute top-[30%] right-[40%] w-12 h-12 rotate-45" />
        <CircleDollarSign className="absolute top-[60%] left-[10%] w-20 h-20 rotate-12" />
        <BarChart2 className="absolute top-[20%] right-[5%] w-24 h-24 -rotate-12" />
        <BarChart2 className="absolute top-[80%] right-[30%] w-16 h-16 rotate-6" />
        <CircleDollarSign className="absolute top-[85%] left-[20%] w-14 h-14 -rotate-45" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-8 relative z-10">
        
        {/* Header (Mobile Only) */}
        <div className="lg:hidden flex items-center justify-between mb-8 bg-[#18181B] p-4 border-[3px] border-[#18181B] shadow-[6px_6px_0_#8B5CF6]">
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">PiggyPath</h1>
        </div>

        {/* 2-Column Section */}
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Main Content Area (Left side on desktop) */}
          <div className="w-full lg:w-[65%] shrink-0">
             <LearningPath />
          </div>

          {/* Sidebar Area (Right side on desktop) */}
          <div className="w-full lg:w-[35%] shrink-0 sticky top-24">
             <PathSidebar />
          </div>

        </div>
      </div>
    </div>
  );
};

export default PathPage;
