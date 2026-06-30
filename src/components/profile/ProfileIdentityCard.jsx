import React from 'react';

const ProfileIdentityCard = ({ 
  name = "New User", 
  handle = "newuser", 
  id = "PP104583",
  title = "NOVICE",
  level = 1,
  xp = 0,
  balance = 0,
  streak = 0,
  longestStreak = 0,
  friendsCount = 0
}) => {
  return (
    <div className="w-full bg-[#8B5CF6] border-[3px] border-[#18181B] dark:border-white shadow-[8px_8px_0_#18181B] dark:shadow-[8px_8px_0_#F4F4F5] p-8 flex flex-col items-center relative mb-6 transition-colors">
      
      {/* Avatar Section */}
      <div className="relative mb-6">
        <div className="w-32 h-32 bg-[#00E599] border-[3px] border-[#18181B] dark:border-[#F4F4F5] shadow-[4px_4px_0_#18181B] dark:shadow-[4px_4px_0_#F4F4F5] relative transition-colors">
          {/* Badge Overlapping Avatar */}
          <span className="absolute -top-3 -right-6 bg-[#18181B] dark:bg-[#F4F4F5] text-[#00E599] dark:text-[#18181B] font-['Space_Mono',monospace] font-bold text-[10px] px-2 py-1 tracking-widest whitespace-nowrap transition-colors">
            {title}
          </span>
        </div>
      </div>

      {/* Identity Info */}
      <h2 className="font-black text-3xl tracking-tight text-[#18181B] mb-1">{name}</h2>
      <p className="font-['Space_Mono',monospace] text-sm text-[#18181B] opacity-80 mb-4">@{handle}</p>
      <div className="bg-[#18181B] dark:bg-[#F4F4F5] text-[#00E599] dark:text-[#18181B] font-['Space_Mono',monospace] font-bold text-xs px-3 py-1.5 tracking-widest mb-8 transition-colors">
        ID: {id}
      </div>

      {/* Stats Grid */}
      <div className="w-full grid grid-cols-2 gap-3">
        
        {/* Level */}
        <div className="bg-white dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-[#F4F4F5] p-3 flex flex-col transition-colors">
          <span className="font-['Space_Mono',monospace] text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase mb-1">LEVEL</span>
          <span className="font-black text-2xl text-[#8B5CF6] dark:text-[#A78BFA]">{level}</span>
        </div>
        
        {/* XP */}
        <div className="bg-white dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-[#F4F4F5] p-3 flex flex-col transition-colors">
          <span className="font-['Space_Mono',monospace] text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase mb-1">XP</span>
          <span className="font-black text-2xl text-[#18181B] dark:text-[#F4F4F5]">{xp.toLocaleString()}</span>
        </div>

        {/* Balance */}
        <div className="bg-white dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-[#F4F4F5] p-3 flex flex-col transition-colors">
          <span className="font-['Space_Mono',monospace] text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase mb-1 flex items-center gap-1">
            VIRTUAL <span className="text-[8px]">₹</span>
          </span>
          <span className="font-black text-2xl text-[#00E599]">{balance.toLocaleString()}</span>
        </div>

        {/* Streak */}
        <div className="bg-white dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-[#F4F4F5] p-3 flex flex-col transition-colors">
          <span className="font-['Space_Mono',monospace] text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase mb-1">STREAK</span>
          <span className="font-black text-2xl text-[#18181B] dark:text-[#F4F4F5]">{streak}</span>
        </div>

        {/* Longest */}
        <div className="bg-white dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-[#F4F4F5] p-3 flex flex-col transition-colors">
          <span className="font-['Space_Mono',monospace] text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase mb-1">LONGEST</span>
          <span className="font-black text-2xl text-[#18181B] dark:text-[#F4F4F5]">{longestStreak}</span>
        </div>

        {/* Friends */}
        <div className="bg-white dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-[#F4F4F5] p-3 flex flex-col transition-colors">
          <span className="font-['Space_Mono',monospace] text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase mb-1">FRIENDS</span>
          <span className="font-black text-2xl text-[#18181B] dark:text-[#F4F4F5]">{friendsCount}</span>
        </div>

      </div>

    </div>
  );
};

export default ProfileIdentityCard;
