const fs = require('fs');

let content = fs.readFileSync('src/components/builder/VisualBlockRenderer.jsx', 'utf8');

const newComponents = `
const BarGraphBlock = ({ blockId, data, interactionState, setInteractionState, isPreviewMode, onAnswered, isChecking }) => {
  const bars = [];
  for (let i = 1; i <= 10; i++) {
    if (data[\`bar_label_\${i}\`] && data[\`bar_value_\${i}\`] > 0) {
      bars.push({ 
        id: String(i),
        label: data[\`bar_label_\${i}\`], 
        value: Number(data[\`bar_value_\${i}\`]),
        color: data[\`bar_color_\${i}\`] || (i % 2 === 0 ? '#00E599' : '#FFD100')
      });
    }
  }
  if (bars.length === 0) bars.push({ id: '1', label: 'Item 1', value: 30, color: '#FFD100' }, { id: '2', label: 'Item 2', value: 80, color: '#00E599' }, { id: '3', label: 'Item 3', value: 50, color: '#8B5CF6' });
  
  const maxVal = Math.max(1, ...bars.map(b => b.value));
  const isVertical = data.orientation !== 'Horizontal';

  const [animProgress, setAnimProgress] = React.useState(0);
  React.useEffect(() => {
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / 800, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setAnimProgress(easeProgress);
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, []);

  return (
    <div className="w-full px-6 py-4 flex flex-col items-center gap-6">
      <div className="w-full neo-card p-6 flex flex-col items-center shadow-[6px_6px_0_#18181B]">
        <p className="font-black text-center text-sm text-[#18181B] mb-6">{data.title || 'Bar Graph'}</p>
        <div className={\`w-full max-w-[250px] flex \${isVertical ? 'flex-row items-end h-48 border-b-4 border-l-4' : 'flex-col justify-end border-l-4 border-b-4'} border-[#18181B] gap-3 p-2 relative\`}>
           {bars.map((bar, i) => (
              <div key={i} className={\`flex \${isVertical ? 'flex-col items-center justify-end flex-1 h-full' : 'flex-row items-center justify-start w-full flex-1'} gap-1\`}>
                 {isVertical ? (
                    <>
                      <span className="text-[10px] font-bold text-[#18181B] -mb-1">{Math.floor(bar.value * animProgress)}</span>
                      <div className="w-full border-[2px] border-[#18181B] rounded-t-sm shadow-[2px_0_0_#18181B] transition-all relative overflow-hidden" style={{ height: \`\${(bar.value / maxVal) * 85 * animProgress}%\`, backgroundColor: bar.color }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      <span className="text-[10px] font-bold text-[#18181B] truncate w-full text-center mt-1">{bar.label}</span>
                    </>
                 ) : (
                    <>
                      <span className="text-[10px] font-bold text-[#18181B] truncate w-16 text-right pr-1 shrink-0">{bar.label}</span>
                      <div className="h-full border-[2px] border-[#18181B] rounded-r-sm shadow-[0_2px_0_#18181B] transition-all relative overflow-hidden" style={{ width: \`\${(bar.value / maxVal) * 85 * animProgress}%\`, backgroundColor: bar.color }}>
                         <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                      </div>
                      <span className="text-[10px] font-bold text-[#18181B] pl-1 shrink-0">{Math.floor(bar.value * animProgress)}</span>
                    </>
                 )}
              </div>
           ))}
        </div>
      </div>
      <ChartQuiz blockId={blockId} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} onAnswered={onAnswered} isChecking={isChecking} />
    </div>
  );
};

const LineGraphBlock = ({ blockId, data, interactionState, setInteractionState, isPreviewMode, onAnswered, isChecking }) => {
  const numPoints = parseInt(data.number_of_points || '5', 10);
  const points = [];
  for (let i = 1; i <= numPoints; i++) {
    if (data[\`point_\${i}_label\`] && data[\`point_\${i}_value\`] !== undefined && data[\`point_\${i}_value\`] !== '') {
      points.push({ 
        id: String(i),
        label: data[\`point_\${i}_label\`], 
        value: Number(data[\`point_\${i}_value\`])
      });
    }
  }
  if (points.length === 0) points.push({ id: '1', label: 'Jan', value: 10 }, { id: '2', label: 'Feb', value: 30 }, { id: '3', label: 'Mar', value: 20 }, { id: '4', label: 'Apr', value: 50 });
  
  const maxPoint = Math.max(...points.map(p => p.value), 1);
  const minPoint = Math.min(0, ...points.map(p => p.value));
  const range = maxPoint - minPoint || 1;
  
  const svgWidth = 250;
  const svgHeight = 150;
  const xStep = points.length > 1 ? svgWidth / (points.length - 1) : 0;
  
  const coordinates = points.map((p, i) => {
    const x = i * xStep;
    const y = svgHeight - ((p.value - minPoint) / range) * svgHeight;
    return { x, y, ...p };
  });
  
  const pathData = coordinates.length > 0 ? \`M \${coordinates.map(c => \`\${c.x},\${c.y}\`).join(' L ')}\` : '';
  
  const firstPoint = points[0]?.value || 0;
  const lastPoint = points[points.length - 1]?.value || 0;
  const trend = lastPoint >= firstPoint ? '📈 Growing' : '📉 Shrinking';
  const trendColor = lastPoint >= firstPoint ? 'text-[#00E599] bg-[#00E599]/10' : 'text-[#FF6B6B] bg-[#FF6B6B]/10';

  const [animProgress, setAnimProgress] = React.useState(0);
  const pathRef = React.useRef(null);
  const [pathLength, setPathLength] = React.useState(0);

  React.useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [pathData]);

  React.useEffect(() => {
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / 1000, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setAnimProgress(easeProgress);
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, []);

  return (
    <div className="w-full px-6 py-4 flex flex-col items-center gap-6">
      <div className="w-full neo-card p-6 flex flex-col items-center relative shadow-[6px_6px_0_#18181B]">
        <div className="flex items-center justify-between w-full mb-6 relative z-10">
          {data.title ? <p className="font-black text-center text-sm text-[#18181B] flex-1">{data.title}</p> : <div className="flex-1" />}
          {data.show_trend_label === 'On' && (
             <div className={\`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border-[2px] \${trendColor.replace('text-', 'border-').split(' ')[0]} \${trendColor}\`}>
               {trend}
             </div>
          )}
        </div>
        
        <div className="w-full max-w-[250px] flex flex-col relative border-l-4 border-b-4 border-[#18181B] pt-4 pr-4">
           {data.y_axis_label && <span className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">{data.y_axis_label}</span>}
           <svg width="100%" height={svgHeight} viewBox={\`0 0 \${svgWidth} \${svgHeight}\`} className="overflow-visible">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={data.line_colour || '#3B82F6'} />
                  <stop offset="100%" stopColor={data.line_colour || '#3B82F6'} stopOpacity="0.5" />
                </linearGradient>
              </defs>
              <path 
                ref={pathRef}
                d={pathData} 
                fill="none" 
                stroke="url(#lineGrad)" 
                strokeWidth="4" 
                strokeLinejoin="round" 
                strokeDasharray={pathLength}
                strokeDashoffset={pathLength * (1 - animProgress)}
                style={{ filter: 'drop-shadow(0px 4px 0px rgba(24,24,27,0.2))' }}
              />
              {coordinates.map((c, i) => (
                <circle 
                  key={i} 
                  cx={c.x} 
                  cy={c.y} 
                  r="6" 
                  fill={data.point_colour || '#18181B'} 
                  style={{ opacity: animProgress > (i / coordinates.length) ? 1 : 0, transition: 'opacity 0.2s ease-in' }}
                />
              ))}
           </svg>
           <div className="flex justify-between mt-2 w-full">
              {points.map((p, i) => (
                 <span key={i} className="text-[8px] font-bold text-[#18181B] truncate" style={{ width: \`\${100/points.length}%\`, textAlign: i===0?'left':i===points.length-1?'right':'center' }}>
                   {p.label}
                 </span>
              ))}
           </div>
        </div>
      </div>
      <ChartQuiz blockId={blockId} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} onAnswered={onAnswered} isChecking={isChecking} />
    </div>
  );
};
`;

content = content.replace('export default VisualBlockRenderer;', newComponents + '\nexport default VisualBlockRenderer;');

const barGraphRegex = /case 'Bar Graph':[\s\S]*?(?=case 'Line Graph':)/;
content = content.replace(barGraphRegex, `case 'Bar Graph':
      return <BarGraphBlock blockId={block.id} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} onAnswered={onAnswered} isChecking={isChecking} />;
    `);

const lineGraphRegex = /case 'Line Graph': \{[\s\S]*?(?=case 'Sparkle XP':)/;
content = content.replace(lineGraphRegex, `case 'Line Graph':
      return <LineGraphBlock blockId={block.id} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} onAnswered={onAnswered} isChecking={isChecking} />;
    `);

fs.writeFileSync('src/components/builder/VisualBlockRenderer.jsx', content);
console.log('Update successful');
