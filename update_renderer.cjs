const fs = require('fs');

const file = 'd:/piggypath_admin/src/components/builder/VisualBlockRenderer.jsx';
let content = fs.readFileSync(file, 'utf8');

const chartQuizComponent = `
const ChartQuiz = ({ blockId, data, interactionState, setInteractionState, isPreviewMode }) => {
  const [shuffledOptions, setShuffledOptions] = React.useState([]);
  
  React.useEffect(() => {
    const options = [
      { key: 'A', text: data.quiz_option_a },
      { key: 'B', text: data.quiz_option_b },
      { key: 'C', text: data.quiz_option_c },
      { key: 'D', text: data.quiz_option_d }
    ].filter(o => o.text);
    
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    setShuffledOptions(options);
  }, [blockId, data.quiz_option_a, data.quiz_option_b, data.quiz_option_c, data.quiz_option_d]);

  const correctOptKey = data.quiz_correct_option || 'A';
  const selectedKey = interactionState?.chartQuizSelectedKey;
  const hasSelection = selectedKey !== undefined;
  const isCorrectSelection = hasSelection && selectedKey === correctOptKey;

  if (!data.quiz_question && !data.quiz_option_a) return null; // Fallback if quiz isn't configured

  return (
    <div className="w-full mt-6 flex flex-col gap-3">
      {data.quiz_question && <p className="font-black text-center text-sm mb-2">{data.quiz_question}</p>}
      
      {shuffledOptions.map((opt) => {
        const isSelected = selectedKey === opt.key;
        let bgClass = "bg-white text-[#18181B]";
        let animClass = "";
        if (isSelected) {
          if (opt.key === correctOptKey) {
            bgClass = "bg-[#00E599] text-[#18181B]";
            animClass = "animate-mascot-bounce";
          } else {
            bgClass = "bg-[#FF6B6B] text-white";
            animClass = "animate-mascot-shake";
          }
        }
        return (
          <div 
            key={opt.key} 
            onClick={() => {
              if (isPreviewMode && !hasSelection) {
                setInteractionState({ ...interactionState, chartQuizSelectedKey: opt.key, chartQuizStatus: opt.key === correctOptKey ? 'correct' : 'incorrect' });
              }
            }}
            className={\`px-4 py-3 rounded-lg text-sm font-bold shadow-[4px_4px_0_#18181B] border-[2px] border-[#18181B] text-center transition-all \${isPreviewMode && !hasSelection ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#18181B]' : 'cursor-default'} \${bgClass} \${animClass}\`}
          >
            {opt.text}
          </div>
        );
      })}
      
      {hasSelection && (
        <div className={\`mt-2 p-4 rounded-lg border-[2px] border-[#18181B] shadow-[4px_4px_0_#18181B] text-sm font-bold \${isCorrectSelection ? 'bg-[#00E599] text-[#18181B]' : 'bg-[#FF6B6B] text-white'}\`}>
          <span className="underline decoration-2 underline-offset-2 mb-1 block">Explanation</span>
          {isCorrectSelection ? (data.quiz_why_correct || 'Correct!') : (data.quiz_why_incorrect || 'Incorrect, please try again.')}
        </div>
      )}
    </div>
  );
};
`;

// Inject ChartQuiz component if not already there
if (!content.includes('const ChartQuiz =')) {
    // Put it after getMascotBackgroundPosition
    content = content.replace(/(const getMascotBackgroundPosition =.*?};\n)/s, '$1\n' + chartQuizComponent + '\n');
}

// 1. Update Pie Chart loop bounds and add ChartQuiz
content = content.replace(/case 'Pie Chart':\n      const slices = \[\];\n      for \(let i = 1; i <= 6; i\+\+\) {/g, "case 'Pie Chart':\n      const slices = [];\n      for (let i = 1; i <= 10; i++) {");

// Inject ChartQuiz in Pie Chart
content = content.replace(
    /(\s*)<\/div>\n(\s*)<\/div>\n(\s*)\);\n\n(\s*)case 'Bar Graph':/s,
    "$1   <ChartQuiz blockId={block.id} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} />\n$1</div>\n$2</div>\n$3);\n\n$4case 'Bar Graph':"
);

// 2. Update Bar Graph loop bounds, colors, and add ChartQuiz
content = content.replace(/case 'Bar Graph':\n      const bars = \[\];\n      for \(let i = 1; i <= 8; i\+\+\) {/g, "case 'Bar Graph':\n      const bars = [];\n      for (let i = 1; i <= 10; i++) {");
content = content.replace(/color: i % 2 === 0 \? '#00E599' : '#FFD100'/g, "color: data[`bar_color_${i}`] || (i % 2 === 0 ? '#00E599' : '#FFD100')");

// Inject ChartQuiz in Bar Graph
content = content.replace(
    /(\s*)<\/div>\n(\s*)<\/div>\n(\s*)\);\n\n(\s*)case 'Sparkle XP':/s,
    "$1   <ChartQuiz blockId={block.id} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} />\n$1</div>\n$2</div>\n$3);\n\n$4case 'Sparkle XP':"
);

// 3. Add Line Graph back before Sparkle XP
const lineGraphComponent = `
    case 'Line Graph': {
      const points = [];
      for (let i = 1; i <= 10; i++) {
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

      return (
        <div className="w-full px-6 py-4 flex flex-col items-center gap-6">
          {data.title && <p className="font-black text-center text-sm text-[#18181B]">{data.title}</p>}
          
          <div className="w-full max-w-[250px] flex flex-col relative bg-white border-l-4 border-b-4 border-[#18181B] pt-4 pr-4">
             <svg width="100%" height={svgHeight} viewBox={\`0 0 \${svgWidth} \${svgHeight}\`} className="overflow-visible">
                <path d={pathData} fill="none" stroke={data.line_colour || '#00E599'} strokeWidth="4" strokeLinejoin="round" />
                {coordinates.map((c, i) => (
                  <circle key={i} cx={c.x} cy={c.y} r="6" fill={data.point_colour || '#18181B'} />
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
          <ChartQuiz blockId={block.id} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} />
        </div>
      );
    }
`;

if (!content.includes("case 'Line Graph':")) {
    content = content.replace(/(\s*)case 'Sparkle XP':/, "\n" + lineGraphComponent + "\n$1case 'Sparkle XP':");
}

fs.writeFileSync(file, content, 'utf8');
console.log("SUCCESS");
