import React from 'react';

const stats = [
  { name: 'Budgeting', value: 10, angle: -90 },
  { name: 'Saving', value: 10, angle: -30 },
  { name: 'Investing', value: 10, angle: 30 },
  { name: 'Credit', value: 10, angle: 90 },
  { name: 'Risk Mgmt', value: 10, angle: 150 },
  { name: 'Wealth', value: 10, angle: 210 },
];

const FinancialSkillRadar = () => {
  const cx = 150;
  const cy = 150;
  const r = 100;

  // Generate SVG polygon points based on values
  const getPoint = (value, angle) => {
    const rad = (angle * Math.PI) / 180;
    const distance = (value / 100) * r;
    return `${cx + distance * Math.cos(rad)},${cy + distance * Math.sin(rad)}`;
  };

  const dataPolygon = stats.map(s => getPoint(s.value, s.angle)).join(' ');
  const outerPolygon = stats.map(s => getPoint(100, s.angle)).join(' ');
  const midPolygon = stats.map(s => getPoint(66, s.angle)).join(' ');
  const innerPolygon = stats.map(s => getPoint(33, s.angle)).join(' ');

  return (
    <div className="w-full bg-white dark:bg-[#18181B] border-[3px] border-[#18181B] dark:border-white shadow-[8px_8px_0_#8B5CF6] p-6 mb-6 transition-colors">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-black text-lg tracking-tight text-[#18181B] dark:text-[#F4F4F5] uppercase">Financial Skill Radar</h3>
        <span className="bg-[#00E599] text-[#18181B] font-black text-[10px] px-2 py-1 tracking-widest border-2 border-transparent dark:border-[#18181B]">
          10% LITERACY
        </span>
      </div>

      {/* SVG Radar Chart */}
      <div className="flex justify-center mb-8">
        <svg width="300" height="300" viewBox="0 0 300 300" className="overflow-visible">
          {/* Background Web */}
          <polygon points={outerPolygon} fill="none" strokeWidth="1.5" className="stroke-[#18181B] dark:stroke-white transition-colors" />
          <polygon points={midPolygon} fill="none" strokeWidth="1" className="stroke-[#E4E4E7] dark:stroke-[#3F3F46] transition-colors" />
          <polygon points={innerPolygon} fill="none" strokeWidth="1" className="stroke-[#E4E4E7] dark:stroke-[#3F3F46] transition-colors" />
          
          {/* Axes */}
          {stats.map((s, i) => {
            const endPt = getPoint(100, s.angle).split(',');
            return (
              <g key={i}>
                <line x1={cx} y1={cy} x2={endPt[0]} y2={endPt[1]} strokeWidth="1" className="stroke-[#18181B] dark:stroke-white transition-colors" />
                {/* Labels */}
                <text 
                  x={cx + (r + 25) * Math.cos((s.angle * Math.PI) / 180)} 
                  y={cy + (r + 20) * Math.sin((s.angle * Math.PI) / 180)}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  className="font-['Space_Mono',monospace] text-[10px] font-bold fill-[#18181B] dark:fill-[#F4F4F5] transition-colors"
                >
                  {s.name}
                </text>
              </g>
            );
          })}

          {/* Data Polygon */}
          <polygon 
            points={dataPolygon} 
            fill="rgba(0, 229, 153, 0.5)" 
            strokeWidth="3" 
            className="stroke-[#8B5CF6] transition-colors"
          />
        </svg>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#F4F4F5] dark:bg-[#27272A] border-[2px] border-[#18181B] dark:border-white py-3 flex flex-col items-center justify-center transition-colors">
            <span className="font-['Space_Mono',monospace] text-[9px] font-bold text-[#18181B] dark:text-[#A1A1AA] uppercase mb-1">{s.name}</span>
            <span className="font-black text-xl text-[#18181B] dark:text-[#F4F4F5]">{s.value}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default FinancialSkillRadar;
