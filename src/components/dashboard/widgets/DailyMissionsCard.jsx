import React from 'react';
import { Play, Check, Flame } from 'lucide-react';

const missions = [
  { id: 1, title: 'Complete a Lesson', reward: '+50 XP', icon: Play, iconColor: '#00E599', completed: false },
  { id: 2, title: 'Save ₹1500 Today', reward: '+100 XP', icon: Check, iconColor: '#8B5CF6', completed: false },
  { id: 3, title: 'Maintain 3-Day Streak', reward: '+150 XP', icon: Flame, iconColor: '#EF4444', completed: false },
];

const DailyMissionsCard = () => {
  return (
    <div className="w-full bg-white dark:bg-[#18181B] border-[3px] border-[#18181B] dark:border-white shadow-[8px_8px_0_#18181B] dark:shadow-[8px_8px_0_#F4F4F5] p-6 mb-6 transition-colors">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-black text-xl tracking-tight text-[#18181B] dark:text-[#F4F4F5]">DAILY MISSIONS</h3>
        <span className="bg-[#18181B] dark:bg-[#F4F4F5] text-white dark:text-[#18181B] font-['Space_Mono',monospace] font-bold text-[10px] px-2 py-1 tracking-widest uppercase">
          15h 22m
        </span>
      </div>

      {/* List */}
      <div className="flex flex-col gap-4 mb-6">
        {missions.map((mission) => {
          const Icon = mission.icon;
          return (
            <div key={mission.id} className="flex items-center justify-between border-b-[3px] border-[#18181B] dark:border-white pb-4 last:border-0 last:pb-0 transition-colors">
              <div className="flex items-center gap-4">
                
                {/* Icon Box */}
                <div 
                  className="w-10 h-10 border-[3px] border-[#18181B] dark:border-white shadow-[2px_2px_0_#18181B] dark:shadow-[2px_2px_0_#F4F4F5] flex items-center justify-center transition-colors"
                  style={{ backgroundColor: mission.iconColor }}
                >
                  <Icon size={20} color="#18181B" strokeWidth={3} />
                </div>

                {/* Text */}
                <div className="flex flex-col">
                  <h4 className="font-black text-sm text-[#18181B] dark:text-[#F4F4F5]">{mission.title}</h4>
                  <span className="font-['Space_Mono',monospace] font-bold text-xs text-[#00E599]">{mission.reward}</span>
                </div>
              </div>

              {/* Action Button */}
              {mission.completed ? (
                <button className="bg-[#18181B] dark:bg-[#F4F4F5] text-[#00E599] dark:text-[#18181B] border-[2px] border-[#18181B] dark:border-transparent font-black text-xs px-3 py-2 flex items-center gap-1 transition-colors">
                  <Check size={14} strokeWidth={4} />
                  DONE
                </button>
              ) : (
                <button className="bg-[#F4F4F5] dark:bg-[#27272A] text-[#18181B] dark:text-[#F4F4F5] border-[2px] border-[#18181B] dark:border-[#F4F4F5] font-black text-xs px-4 py-2 hover:bg-[#E4E4E7] dark:hover:bg-[#3F3F46] transition-colors">
                  GO
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Claim Button */}
      <button className="w-full bg-[#00E599] text-[#18181B] font-black text-lg py-3 border-[3px] border-[#18181B] dark:border-white shadow-[4px_4px_0_#18181B] dark:shadow-[4px_4px_0_#F4F4F5] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#18181B] dark:hover:shadow-[2px_2px_0_#F4F4F5] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all uppercase">
        Claim All Rewards
      </button>

    </div>
  );
};

export default DailyMissionsCard;
