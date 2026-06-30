import React from 'react';
import { TrendingUp } from 'lucide-react';

const data = [
  { date: 'Jun 04', xp: 0 },
  { date: 'Jun 05', xp: 0 },
  { date: 'Jun 06', xp: 0 },
  { date: 'Jun 07', xp: 0 },
  { date: 'Jun 08', xp: 0 },
  { date: 'Jun 09', xp: 0 },
  { date: 'Jun 10', xp: 0 },
  { date: 'Jun 11', xp: 0 },
  { date: 'Jun 12', xp: 0 },
  { date: 'Jun 13', xp: 0 },
  { date: 'Jun 14', xp: 0 },
  { date: 'Jun 15', xp: 0 },
  { date: 'Jun 16', xp: 0 },
  { date: 'Jun 17', xp: 0 },
];

const XpGrowthChart = () => {
  const chartWidth = 400;
  const chartHeight = 150;
  const paddingX = 40;
  const paddingY = 20;

  const maxXP = 2600;
  
  // Helpers
  const getX = (index) => paddingX + (index / (data.length - 1)) * (chartWidth - paddingX * 2);
  const getY = (value) => chartHeight - paddingY - (value / maxXP) * (chartHeight - paddingY * 2);

  const pointsStr = data.map((d, i) => `${getX(i)},${getY(d.xp)}`).join(' ');

  // Y axis labels
  const yLabels = [0, 650, 1300, 1950, 2600];

  return (
    <div className="w-full bg-[#18181B] border-[3px] border-transparent dark:border-white shadow-[8px_8px_0_#00E599] p-6 mb-6 transition-colors">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-white">
          <TrendingUp size={20} color="#00E599" strokeWidth={3} />
          <h3 className="font-black text-sm tracking-widest uppercase">XP Growth • 14 Days</h3>
        </div>
        <span className="bg-[#00E599] text-[#18181B] font-['Space_Mono',monospace] font-bold text-[10px] px-2 py-1 tracking-widest">
          +0 XP
        </span>
      </div>

      {/* Chart Container */}
      <div className="w-full overflow-x-auto hide-scrollbar">
        <div className="min-w-[400px]">
          <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="overflow-visible">
            
            {/* Axes */}
            <line x1={paddingX} y1={paddingY} x2={paddingX} y2={chartHeight - paddingY} strokeWidth="1" className="stroke-[#71717A] dark:stroke-[#A1A1AA] transition-colors" />
            <line x1={paddingX} y1={chartHeight - paddingY} x2={chartWidth - paddingX} y2={chartHeight - paddingY} strokeWidth="1" className="stroke-[#71717A] dark:stroke-[#A1A1AA] transition-colors" />

            {/* Y Labels */}
            {yLabels.map((lbl, i) => {
              const y = chartHeight - paddingY - (lbl / maxXP) * (chartHeight - paddingY * 2);
              return (
                <g key={i}>
                  <text 
                    x={paddingX - 10} 
                    y={y} 
                    fontSize="8" 
                    fontFamily="'Space Mono', monospace" 
                    textAnchor="end" 
                    alignmentBaseline="middle"
                    className="fill-[#A1A1AA] dark:fill-[#D4D4D8] transition-colors"
                  >
                    {lbl}
                  </text>
                  <line x1={paddingX - 3} y1={y} x2={paddingX} y2={y} strokeWidth="1" className="stroke-[#71717A] dark:stroke-[#A1A1AA] transition-colors" />
                </g>
              );
            })}

            {/* X Labels (Every other date) */}
            {data.map((d, i) => {
              if (i % 2 !== 0) return null; // Skip odd indexes for spacing
              const x = getX(i);
              return (
                <g key={i}>
                  <text 
                    x={x} 
                    y={chartHeight - paddingY + 15} 
                    fontSize="8" 
                    fontFamily="'Space Mono', monospace" 
                    textAnchor="middle"
                    className="fill-[#A1A1AA] dark:fill-[#D4D4D8] transition-colors"
                  >
                    {d.date}
                  </text>
                  <line x1={x} y1={chartHeight - paddingY} x2={x} y2={chartHeight - paddingY + 3} strokeWidth="1" className="stroke-[#71717A] dark:stroke-[#A1A1AA] transition-colors" />
                </g>
              );
            })}

            {/* Line Path */}
            <polyline 
              points={pointsStr} 
              fill="none" 
              stroke="#00E599" 
              strokeWidth="3" 
              strokeLinejoin="round" 
              strokeLinecap="round" 
            />

            {/* Data Points */}
            {data.map((d, i) => (
              <circle 
                key={i} 
                cx={getX(i)} 
                cy={getY(d.xp)} 
                r="3" 
                fill="#8B5CF6" 
                strokeWidth="1.5" 
                className="stroke-[#18181B] dark:stroke-[#F4F4F5] transition-colors"
              />
            ))}
          </svg>
        </div>
      </div>

    </div>
  );
};

export default XpGrowthChart;
