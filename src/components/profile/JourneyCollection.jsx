import React from 'react';
import { Zap } from 'lucide-react';

const journeys = [
  { id: 1, number: '01', title: 'Money Basics', status: 'READY' },
  { id: 2, number: '02', title: 'Budgeting Essentials', status: 'LOCKED' },
  { id: 7, number: '07', title: 'Wealth Building', status: 'LOCKED' },
];

const JourneyCollection = () => {
  return (
    <div className="w-full bg-[#00E599] border-[3px] border-[#18181B] dark:border-white shadow-[6px_6px_0_#18181B] dark:shadow-[6px_6px_0_#F4F4F5] p-6 mb-6 transition-colors">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Zap size={20} strokeWidth={3} color="#18181B" />
        <h3 className="font-black text-lg tracking-tight text-[#18181B] uppercase">Journey Collection</h3>
      </div>

      {/* List */}
      <div className="flex flex-col gap-4">
        {journeys.map((journey) => (
          <div key={journey.id} className="w-full bg-white dark:bg-[#18181B] border-[3px] border-[#18181B] dark:border-white p-3 flex items-center justify-between transition-colors">
            <div className="flex items-center gap-4">
              <span className="bg-[#18181B] dark:bg-white text-[#00E599] dark:text-[#18181B] font-black text-sm px-2 py-1 transition-colors">
                {journey.number}
              </span>
              <span className="font-['Space_Mono',monospace] font-bold text-sm text-[#18181B] dark:text-[#F4F4F5]">
                {journey.title}
              </span>
            </div>
            
            {journey.status === 'DONE' ? (
              <span className="bg-[#00E599] text-[#18181B] border-2 border-[#18181B] dark:border-white font-black text-[10px] px-2 py-1 tracking-widest transition-colors">
                DONE
              </span>
            ) : journey.status === 'READY' ? (
              <span className="bg-[#FFC107] text-[#18181B] border-2 border-[#18181B] dark:border-white font-black text-[10px] px-2 py-1 tracking-widest transition-colors">
                READY
              </span>
            ) : (
              <span className="bg-[#18181B] dark:bg-[#F4F4F5] text-white dark:text-[#18181B] border-2 border-[#18181B] dark:border-transparent font-black text-[10px] px-2 py-1 tracking-widest transition-colors">
                LOCKED
              </span>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default JourneyCollection;
