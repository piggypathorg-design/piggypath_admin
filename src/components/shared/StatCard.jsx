import React from 'react';

const StatCard = ({ icon, label, value, subValue, iconBgColor = 'bg-piggy-teal/20', iconColor = 'text-piggy-teal' }) => {
  return (
    <div className="glass-panel p-4 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/5 ${iconBgColor}`}>
        {icon}
      </div>
      <div>
        <div className="text-xs text-gray-400 font-medium tracking-wide">{label}</div>
        <div className="text-lg font-bold text-white tracking-tight">{value}</div>
        {subValue && <div className="text-[10px] text-gray-500 mt-0.5">{subValue}</div>}
      </div>
    </div>
  );
};

export default StatCard;
