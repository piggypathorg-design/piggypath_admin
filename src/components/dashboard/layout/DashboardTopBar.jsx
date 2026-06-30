import React, { useState, useEffect } from 'react';
import { MessageSquare, Mail, Trophy, Gem, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardTopBar = ({ 
  username = "New User", 
  handle = "newuser", 
  level = 1, 
  xp = 0, 
  maxXp = 100, 
  messages = 1, 
  mail = 0, 
  gems = 0 
}) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial dark mode from document
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const xpPercent = Math.min(100, Math.max(0, (xp / maxXp) * 100));

  return (
    <div className="w-full bg-white dark:bg-[#18181B] border-b-[3px] border-[#18181B] dark:border-[#F4F4F5] px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
      
      {/* Left: Avatar & Info */}
      <Link to="/app/profile" className="flex items-center gap-4 group cursor-pointer hover:opacity-80 transition-opacity">
        <div className="w-12 h-12 bg-[#00E599] border-[3px] border-[#18181B] dark:border-[#F4F4F5] shadow-[2px_2px_0_#18181B] dark:shadow-[2px_2px_0_#F4F4F5] group-hover:-translate-y-0.5 group-hover:shadow-[4px_4px_0_#18181B] dark:group-hover:shadow-[4px_4px_0_#F4F4F5] transition-all flex items-center justify-center relative overflow-hidden">
          <div className="w-4 h-4 bg-[#18181B] rounded-full absolute top-2 left-2"></div>
          <div className="w-6 h-1 bg-[#18181B] absolute bottom-3"></div>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h2 className="font-black text-xl tracking-tight text-[#18181B] dark:text-[#F4F4F5] leading-none">{username}</h2>
            <span className="bg-[#18181B] dark:bg-[#F4F4F5] text-[#00E599] dark:text-[#18181B] font-bold text-xs px-2 py-0.5 tracking-wider border-2 border-transparent dark:border-[#18181B]">
              LVL {level}
            </span>
          </div>
          <span className="text-[#71717A] dark:text-[#A1A1AA] font-medium text-sm font-['Space_Mono',monospace]">@{handle}</span>
        </div>
      </Link>

      {/* Center: XP Bar */}
      <div className="flex-1 max-w-md w-full flex flex-col gap-1">
        <div className="flex justify-end">
          <span className="font-black text-xs tracking-wider font-['Space_Mono',monospace] text-[#18181B] dark:text-[#F4F4F5]">
            {xp.toLocaleString()} / {maxXp.toLocaleString()} XP
          </span>
        </div>
        <div className="h-4 w-full bg-[#F4F4F5] dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-[#F4F4F5] relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-[#00E599] border-r-[3px] border-[#18181B] dark:border-[#F4F4F5]"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Chat */}
        <button className="w-10 h-10 bg-white dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-[#F4F4F5] shadow-[2px_2px_0_#18181B] dark:shadow-[2px_2px_0_#F4F4F5] flex items-center justify-center relative hover:-translate-y-0.5 transition-transform text-[#18181B] dark:text-[#F4F4F5]">
          <MessageSquare size={20} strokeWidth={2.5} />
          {messages > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#EF4444] text-white text-[10px] font-bold px-1.5 py-0.5 border-2 border-[#18181B] dark:border-[#F4F4F5]">
              {messages}
            </span>
          )}
        </button>

        {/* Mail */}
        <button className="w-10 h-10 bg-white dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-[#F4F4F5] shadow-[2px_2px_0_#18181B] dark:shadow-[2px_2px_0_#F4F4F5] flex items-center justify-center relative hover:-translate-y-0.5 transition-transform text-[#18181B] dark:text-[#F4F4F5]">
          <Mail size={20} strokeWidth={2.5} />
          {mail > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#EF4444] text-white text-[10px] font-bold px-1.5 py-0.5 border-2 border-[#18181B] dark:border-[#F4F4F5]">
              {mail}
            </span>
          )}
        </button>

        {/* Trophy */}
        <button className="w-10 h-10 bg-white dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-[#F4F4F5] shadow-[2px_2px_0_#18181B] dark:shadow-[2px_2px_0_#F4F4F5] flex items-center justify-center hover:-translate-y-0.5 transition-transform text-[#18181B] dark:text-[#F4F4F5]">
          <Trophy size={20} strokeWidth={2.5} />
        </button>

        {/* Gems */}
        <div className="h-10 bg-[#00E599] border-[3px] border-[#18181B] dark:border-[#F4F4F5] shadow-[2px_2px_0_#18181B] dark:shadow-[2px_2px_0_#F4F4F5] flex items-center px-3 gap-2 ml-2 text-[#18181B]">
          <Gem size={18} strokeWidth={2.5} />
          <span className="font-black">{gems}</span>
        </div>

        {/* Dark Mode Toggle */}
        <button 
          onClick={() => setIsDark(!isDark)}
          className="w-10 h-10 bg-white dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-[#F4F4F5] shadow-[2px_2px_0_#18181B] dark:shadow-[2px_2px_0_#F4F4F5] flex items-center justify-center hover:-translate-y-0.5 transition-transform text-[#18181B] dark:text-[#F4F4F5] ml-2"
        >
          {isDark ? <Moon size={20} /> : <Sun size={20} className="text-[#FFC107]" />}
        </button>

      </div>

    </div>
  );
};

export default DashboardTopBar;
