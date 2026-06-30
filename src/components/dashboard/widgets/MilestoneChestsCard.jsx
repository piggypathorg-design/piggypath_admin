import React from 'react';
import { Check, Lock } from 'lucide-react';

const chests = [
  { id: 1, title: 'WISDOM PACK', subtitle: '500', status: 'ready', badge: 'OPEN' },
  { id: 2, title: 'RISK BUNDLE', subtitle: 'Risk Aware', status: 'locked' },
  { id: 3, title: 'GOAL CRATE', subtitle: '+150 XP', status: 'locked' },
  { id: 4, title: 'WEALTH LOCKER', subtitle: '1,200', status: 'locked' },
  { id: 5, title: 'LEGEND VAULT', subtitle: 'Diamond Frame', status: 'locked' },
];

const MilestoneChestsCard = () => {
  return (
    <div className="w-full bg-white dark:bg-[#18181B] border-[3px] border-[#18181B] dark:border-white shadow-[6px_6px_0_#18181B] dark:shadow-[6px_6px_0_#F4F4F5] p-6 mb-6 transition-colors">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <h3 className="font-black text-xl tracking-tight text-[#18181B] dark:text-[#F4F4F5]">MILESTONE CHESTS</h3>
        <div className="flex items-center gap-2 font-['Space_Mono',monospace] text-xs font-bold">
          <span className="bg-[#00E599] text-[#18181B] px-2 py-1">0 COLLECTED</span>
          <span className="bg-[#F4F4F5] dark:bg-[#27272A] text-[#18181B] dark:text-[#F4F4F5] border border-gray-200 dark:border-gray-600 px-2 py-1 transition-colors">10 LEFT</span>
        </div>
      </div>

      {/* Chests Grid / Scroll */}
      <div className="flex overflow-x-auto pb-4 gap-4 hide-scrollbar">
        {chests.map((chest) => (
          <div 
            key={chest.id} 
            className={`
              min-w-[120px] h-[140px] border-[3px] border-[#18181B] dark:border-white flex flex-col items-center justify-between p-3 relative shrink-0 transition-colors
              ${chest.status === 'ready' ? 'bg-[#FFC107] shadow-[4px_4px_0_#8B5CF6] dark:shadow-[4px_4px_0_#A78BFA]' : 'bg-white dark:bg-[#27272A] shadow-[2px_2px_0_#18181B] dark:shadow-[2px_2px_0_#F4F4F5]'}
            `}
          >
            {/* Top Icon */}
            <div className="mt-2">
              {chest.status === 'collected' && (
                <div className="w-8 h-8 bg-[#18181B] dark:bg-black flex items-center justify-center">
                  <Check color="#00E599" strokeWidth={3} size={20} />
                </div>
              )}
              {chest.status === 'ready' && (
                <div className="w-8 h-8 bg-[#18181B] dark:bg-black flex items-center justify-center">
                  {/* Maybe a solid block representing a crate */}
                  <div className="w-4 h-4 bg-[#FFC107]"></div>
                </div>
              )}
              {chest.status === 'locked' && (
                <div className="w-8 h-8 bg-[#18181B] dark:bg-black flex items-center justify-center">
                  <Lock color="#A1A1AA" strokeWidth={2} size={18} />
                </div>
              )}
            </div>

            {/* Bottom Text */}
            <div className="text-center w-full">
              <h4 className={`font-black text-[11px] leading-tight mb-1 ${chest.status === 'ready' ? 'text-[#18181B]' : 'text-[#18181B] dark:text-[#F4F4F5]'}`}>{chest.title}</h4>
              <p className={`font-['Space_Mono',monospace] text-[9px] truncate ${chest.status === 'ready' ? 'text-[#18181B]' : 'text-[#71717A] dark:text-[#A1A1AA]'}`}>{chest.subtitle}</p>
            </div>

            {/* Badge for ready state */}
            {chest.badge && (
              <div className="absolute -top-3 -right-3 bg-[#00E599] border-2 border-[#18181B] dark:border-white text-[#18181B] font-black text-[10px] px-1.5 py-0.5">
                {chest.badge}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default MilestoneChestsCard;
