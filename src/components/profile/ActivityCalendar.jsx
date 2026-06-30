import React from 'react';
import { Flame } from 'lucide-react';

const ActivityCalendar = () => {
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  const emptySlots = 1; // Starts on Monday
  const daysInMonth = 30;
  const today = 18; 
  const accountCreatedDate = 15;
  
  // New user state: active on 16th and 18th
  const activeDays = [16, 18];

  return (
    <div className="w-full bg-white dark:bg-[#18181B] border-[3px] border-[#18181B] dark:border-white shadow-[6px_6px_0_#18181B] dark:shadow-[6px_6px_0_#F4F4F5] p-6 mb-6 transition-colors">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-black text-lg tracking-tight text-[#18181B] dark:text-[#F4F4F5] uppercase">Streak Calendar</h3>
        <span className="font-['Space_Mono',monospace] font-bold text-sm text-[#18181B] dark:text-[#A1A1AA] uppercase">
          June 2026
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {/* Days of Week */}
        {daysOfWeek.map((day, i) => (
          <div key={`header-${i}`} className="text-center font-black text-[#A1A1AA] text-xs uppercase mb-2">
            {day}
          </div>
        ))}
        
        {/* Empty slots before the 1st of the month */}
        {Array.from({ length: emptySlots }).map((_, i) => (
           <div key={`empty-${i}`} className="aspect-square"></div>
        ))}
        
        {/* Actual Days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
           const date = i + 1;
           const isToday = date === today;
           const isActive = activeDays.includes(date);
           const isFuture = date > today;
           const isBeforeAccount = date < accountCreatedDate;
           const isMissed = !isFuture && !isActive && !isBeforeAccount && !isToday;

           return (
             <div 
               key={date} 
               className={`
                 aspect-square flex flex-col items-center justify-center border-[2.5px] transition-colors relative rounded-md
                 ${isActive 
                   ? 'bg-[#FF9800] border-[#18181B] dark:border-[#F4F4F5] text-white shadow-[2px_2px_0_#18181B] dark:shadow-[2px_2px_0_#F4F4F5]' 
                   : isMissed
                     ? 'bg-transparent border-[#EF4444] text-[#EF4444]'
                     : isToday 
                       ? 'bg-[#FFC107] border-[#18181B] dark:border-[#F4F4F5] text-[#18181B] shadow-[2px_2px_0_#18181B] dark:shadow-[2px_2px_0_#F4F4F5]' 
                       : isFuture
                         ? 'bg-[#F4F4F5] dark:bg-[#27272A] border-transparent text-[#A1A1AA] opacity-50'
                         : 'bg-white dark:bg-[#18181B] border-transparent text-[#A1A1AA]'}
               `}
             >
               <span className="font-black text-sm z-10">{date}</span>
               
               {/* Background flame watermark for active days */}
               {isActive && (
                 <div className="absolute inset-0 flex items-center justify-center opacity-30">
                   <Flame size={24} fill="#FFF" strokeWidth={0} />
                 </div>
               )}
               
               {/* Tiny flame indicator for active days */}
               {isActive && (
                 <div className="absolute -top-1.5 -right-1.5 bg-white dark:bg-[#18181B] rounded-full border-[1.5px] border-[#18181B] dark:border-white p-0.5 shadow-[1px_1px_0_#18181B] dark:shadow-[1px_1px_0_#F4F4F5]">
                   <Flame size={10} color="#FF9800" fill="#FF9800" />
                 </div>
               )}
             </div>
           )
        })}
      </div>

    </div>
  );
};

export default ActivityCalendar;
