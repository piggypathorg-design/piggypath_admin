import React from 'react';

const LoginCalendar = () => {
  const daysInMonth = 30;
  const activeDays = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
  const emptyDays = Array(3).fill(null);
  
  return (
    <div className="card-duo p-5 flex flex-col justify-between h-full">
      <h3 className="text-[14px] font-bold tracking-widest text-[#a78bfa] uppercase mb-4">Login Calendar</h3>
      
      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] text-[#a78bfa] font-bold mb-2 uppercase">
          <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
        </div>
        
        <div className="grid grid-cols-7 gap-1.5 flex-1 min-h-[160px] items-stretch">
          {emptyDays.map((_, i) => (
            <div key={`empty-${i}`} className="rounded-full border border-transparent" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isActive = activeDays.includes(day);
            return (
              <div 
                key={day} 
                className={`rounded-full flex items-center justify-center text-[12px] font-bold transition-all
                  ${isActive 
                    ? 'bg-[#b8e92f]/20 text-[#b8e92f] border border-[#b8e92f]/30' 
                    : 'bg-transparent text-[#a78bfa] border border-transparent hover:border-[#6a3ba3]'
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-5 text-center text-[12px] text-[#b8e92f] font-bold flex items-center justify-center gap-2">
         <div className="w-2 h-2 rounded-full bg-[#b8e92f]"></div>
         Login Streak Active
      </div>
    </div>
  );
};

export default LoginCalendar;
