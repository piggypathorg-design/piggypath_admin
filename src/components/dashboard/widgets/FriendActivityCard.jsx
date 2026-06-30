import React from 'react';

const activities = [];

const FriendActivityCard = () => {
  return (
    <div className="w-full bg-white dark:bg-[#18181B] border-[3px] border-[#18181B] dark:border-white shadow-[6px_6px_0_#18181B] dark:shadow-[6px_6px_0_#F4F4F5] p-6 transition-colors flex flex-col flex-1 min-h-0">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-black text-xl tracking-tight text-[#18181B] dark:text-[#F4F4F5]">FRIEND ACTIVITY</h3>
      </div>

      {/* Input */}
      <div className="w-full bg-[#F4F4F5] dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-[#F4F4F5] px-4 py-3 mb-6 transition-colors">
        <input 
          type="text" 
          placeholder="What's your next money goal?" 
          className="w-full bg-transparent outline-none font-['Space_Mono',monospace] text-sm text-[#18181B] dark:text-[#F4F4F5] placeholder:text-[#71717A] dark:placeholder:text-[#A1A1AA]"
        />
      </div>

      {/* Activity List */}
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto hide-scrollbar">
        {activities.length === 0 ? (
          <div className="text-center py-4 text-sm font-['Space_Mono',monospace] text-[#71717A] dark:text-[#A1A1AA]">
            Add friends to see their activity!
          </div>
        ) : (
          activities.map((act) => (
            <div key={act.id} className="flex items-start gap-4 p-2 border-[2px] border-transparent dark:border-[#27272A] hover:bg-gray-50 dark:hover:bg-[#27272A] transition-colors">
              
              {/* Avatar */}
              <div 
                className="w-10 h-10 border-[2px] border-[#18181B] dark:border-white shrink-0 flex items-center justify-center transition-colors"
                style={{ backgroundColor: act.color }}
              >
                {/* pixel eyes */}
                <div className="flex gap-1 mb-1">
                  <div className="w-1.5 h-1.5 bg-[#18181B]"></div>
                  <div className="w-1.5 h-1.5 bg-[#18181B]"></div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 pt-1">
                <p className="font-['Space_Mono',monospace] text-xs text-[#18181B] dark:text-[#F4F4F5] leading-snug">
                  <span className="font-bold">{act.name}</span> {act.action} <span className="font-bold">{act.target}</span>
                </p>
              </div>

              {/* Time */}
              <span className="font-['Space_Mono',monospace] text-[10px] text-[#71717A] dark:text-[#A1A1AA] pt-1">
                {act.time}
              </span>

            </div>
          ))
        )}
      </div>

      {/* Footer Link */}
      <button className="w-full mt-4 font-black text-xs tracking-widest text-[#18181B] dark:text-[#F4F4F5] hover:underline uppercase text-center">
        View All Friends
      </button>

    </div>
  );
};

export default FriendActivityCard;
