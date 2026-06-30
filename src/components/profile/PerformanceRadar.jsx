import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const PerformanceRadar = ({ skills }) => {
  return (
    <div className="card-duo p-5 flex flex-col h-full">
      <h3 className="text-[14px] font-bold tracking-widest text-[#a78bfa] uppercase mb-4">Performance</h3>
      <div className="flex-1 w-full h-full relative -mx-2 flex items-center justify-center min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skills}>
            <PolarGrid stroke="#6a3ba3" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#a78bfa', fontSize: 11, fontWeight: 600 }} 
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar 
              name="Skills" 
              dataKey="value" 
              stroke="#b8e92f" 
              strokeWidth={2}
              fill="#b8e92f" 
              fillOpacity={0.2} 
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceRadar;
