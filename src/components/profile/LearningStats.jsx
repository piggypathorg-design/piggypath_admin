import React from 'react';
import { BookOpen, Star, Coins, Flame, Trophy, TrendingUp } from 'lucide-react';

const StatCard = ({ icon, label, value, subValue, iconColor = 'text-[#b8e92f]' }) => {
  return (
    <div className="inner-card-duo p-4 flex items-center gap-4 h-full">
      <div className={`w-12 h-12 flex items-center justify-center shrink-0 ${iconColor} bg-[#351f54] rounded-xl border border-[#6a3ba3]`}>
        {icon}
      </div>
      <div className="flex flex-col">
        <div className="text-[11px] text-[#a78bfa] font-bold tracking-widest uppercase mb-1">{label}</div>
        <div className="text-[18px] font-bold text-white tracking-tight leading-none">{value}</div>
        {subValue && <div className="text-[11px] text-[#f59e0b] font-medium mt-1.5">{subValue}</div>}
      </div>
    </div>
  );
};

const LearningStats = ({ stats, streaks, coins }) => {
  return (
    <div className="card-duo p-5 flex flex-col w-full h-full">
      <h3 className="text-[14px] font-bold tracking-widest uppercase text-[#a78bfa] mb-5">Learning Statistics</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
        <StatCard 
          icon={<BookOpen size={24} />} 
          label="Lessons Completed" 
          value={`${stats.lessonsCompleted} / ${stats.totalLessons}`} 
        />
        <StatCard 
          icon={<Star size={24} fill="currentColor" />} 
          label="Total XP Earned" 
          value={stats.totalXpEarned.toLocaleString()} 
          iconColor="text-[#38bdf8]"
        />
        <StatCard 
          icon={<Coins size={24} fill="currentColor" />} 
          label="Coins Earned" 
          value={coins.toLocaleString()} 
          iconColor="text-[#f59e0b]"
        />
        <StatCard 
          icon={<Flame size={24} fill="currentColor" />} 
          label="Current Streak" 
          value={`${streaks.current} Days`} 
          iconColor="text-[#f97316]"
        />
        <StatCard 
          icon={<Trophy size={24} />} 
          label="Longest Streak" 
          value={`${streaks.longest} Days`} 
          iconColor="text-[#f59e0b]"
        />
        <StatCard 
          icon={<TrendingUp size={24} />} 
          label="Debit Stats" 
          value={stats.debitStats} 
          subValue="! Debt Management"
        />
      </div>
    </div>
  );
};

export default LearningStats;
