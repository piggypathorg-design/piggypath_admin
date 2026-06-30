import React from 'react';
import { 
  PiggyBank, 
  Wallet, 
  TrendingUp, 
  Landmark, 
  ShieldCheck, 
  PieChart, 
  Coins, 
  CreditCard,
  Lock,
  Star
} from 'lucide-react';

const pathData = [
  {
    chapterId: 1,
    title: "Chapter 1: The Basics",
    description: "Build your financial foundation.",
    color: "#8B5CF6", // Purple
    nodes: [
      { id: 1, label: 'Budgeting 101', state: 'completed', xOffset: 0, icon: PiggyBank },
      { id: 2, label: 'Saving Strategies', state: 'completed', xOffset: -1, icon: Wallet },
      { id: 3, label: 'Emergency Funds', state: 'completed', xOffset: 1, icon: ShieldCheck },
      { id: 4, label: 'Banking Basics', state: 'active', xOffset: 0, icon: Landmark, progress: 65 },
    ]
  },
  {
    chapterId: 2,
    title: "Chapter 2: Investing",
    description: "Grow your wealth over time.",
    color: "#00E599", // Green
    nodes: [
      { id: 5, label: 'Intro to Stocks', state: 'locked', xOffset: 0, icon: TrendingUp },
      { id: 6, label: 'Diversification', state: 'locked', xOffset: -1, icon: PieChart },
      { id: 7, label: 'Index Funds', state: 'locked', xOffset: 1, icon: Coins },
      { id: 8, label: 'Credit Cards', state: 'locked', xOffset: 0, icon: CreditCard },
    ]
  }
];

const HEADER_HEIGHT = 160; 
const ROW_HEIGHT = 140; 
const PATH_OFFSET = 70; // How far left/right it zigs
const SVG_WIDTH = 400; // fixed internal coordinate width

const LearningPath = () => {
  
  // 1. Flatten nodes and calculate their exact Y positions
  let currentY = 0;
  const flatNodes = [];
  const chapterHeaders = [];

  pathData.forEach((chapter, cIndex) => {
    // Record chapter header position
    chapterHeaders.push({
      ...chapter,
      y: currentY,
      height: HEADER_HEIGHT
    });
    
    currentY += HEADER_HEIGHT;
    
    chapter.nodes.forEach((node, nIndex) => {
      const y = currentY + (ROW_HEIGHT / 2);
      const x = (SVG_WIDTH / 2) + (node.xOffset * PATH_OFFSET);
      
      flatNodes.push({
        ...node,
        globalY: y,
        globalX: x,
        isFirstInChapter: nIndex === 0,
        isLastInChapter: nIndex === chapter.nodes.length - 1,
        chapterColor: chapter.color
      });
      
      currentY += ROW_HEIGHT;
    });
  });

  const TOTAL_HEIGHT = currentY + ROW_HEIGHT / 2; // Extra padding at bottom

  // 2. Generate SVG connection paths
  const generatePaths = () => {
    const paths = [];
    
    for (let i = 0; i < flatNodes.length - 1; i++) {
      const start = flatNodes[i];
      const end = flatNodes[i + 1];
      
      // We'll draw a straight line if they have the same X, 
      // or an angled line if they differ.
      const d = `M ${start.globalX} ${start.globalY} L ${end.globalX} ${end.globalY}`;
      
      // Determine line state based on the 'end' node. 
      // If end node is locked, the line leading to it is locked.
      const isCompletedLine = start.state === 'completed' && (end.state === 'completed' || end.state === 'active');
      const strokeColor = isCompletedLine ? '#00E599' : '#3F3F46'; // Vibrant green or disabled gray
      const strokeOpacity = isCompletedLine ? 1 : 0.4;
      
      paths.push(
        <g key={`path-${start.id}-${end.id}`}>
          {/* Outer stroke for Neobrutalist border */}
          <path d={d} fill="none" stroke="#18181B" strokeWidth="26" opacity={isCompletedLine ? 1 : 0.5} strokeLinecap="round" />
          {/* Inner colored stroke */}
          <path d={d} fill="none" stroke={strokeColor} strokeWidth="20" strokeLinecap="round" opacity={strokeOpacity} />
        </g>
      );
    }
    
    // Line extending before the first node
    if (flatNodes.length > 0) {
       const first = flatNodes[0];
       const startD = `M ${first.globalX} 0 L ${first.globalX} ${first.globalY}`;
       paths.unshift(
         <g key="path-start">
           <path d={startD} fill="none" stroke="#18181B" strokeWidth="26" strokeLinecap="round" />
           <path d={startD} fill="none" stroke="#00E599" strokeWidth="20" strokeLinecap="round" />
         </g>
       );
    }
    
    // Line extending past the last node
    if (flatNodes.length > 0) {
       const last = flatNodes[flatNodes.length - 1];
       const endD = `M ${last.globalX} ${last.globalY} L ${last.globalX} ${TOTAL_HEIGHT}`;
       paths.push(
         <g key="path-end">
           <path d={endD} fill="none" stroke="#18181B" strokeWidth="26" opacity="0.5" strokeLinecap="round" />
           <path d={endD} fill="none" stroke="#3F3F46" strokeWidth="20" strokeLinecap="round" opacity="0.4" />
         </g>
       );
    }

    return paths;
  };

  return (
    <div className="w-full lg:w-[65%] min-h-screen relative flex flex-col items-center shrink-0">
      
      {/* Background SVG Canvas */}
      <div 
         className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] pointer-events-none" 
         style={{ height: TOTAL_HEIGHT }}
      >
        <svg 
           className="w-full h-full" 
           viewBox={`0 0 ${SVG_WIDTH} ${TOTAL_HEIGHT}`} 
           preserveAspectRatio="xMidYMin meet"
        >
          {generatePaths()}
        </svg>
      </div>

      {/* HTML Content Overlay */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center" style={{ height: TOTAL_HEIGHT }}>
        
        {/* Render Chapter Headers */}
        {chapterHeaders.map((chapter) => (
          <div 
            key={`header-${chapter.chapterId}`}
            className="absolute w-full px-4 flex items-center justify-center"
            style={{ top: chapter.y, height: chapter.height }}
          >
             <div 
                className="bg-white dark:bg-[#27272A] border-[4px] border-[#18181B] dark:border-white shadow-[8px_8px_0_#18181B] dark:shadow-[#FFFFFF] rounded-2xl p-4 w-full flex items-center justify-between"
             >
                <div className="flex flex-col">
                  <h2 className="text-xl md:text-2xl font-black text-[#18181B] dark:text-[#F4F4F5] uppercase tracking-tight">{chapter.title}</h2>
                  <p className="font-bold text-[#71717A] dark:text-[#A1A1AA] text-sm md:text-base">{chapter.description}</p>
                </div>
                <div 
                  className="w-12 h-12 rounded-xl border-[3px] border-[#18181B] flex items-center justify-center shadow-[4px_4px_0_#18181B]"
                  style={{ backgroundColor: chapter.color }}
                >
                  <Star fill="white" color="white" size={24} />
                </div>
             </div>
          </div>
        ))}

        {/* Render Nodes */}
        {flatNodes.map((node) => {
          const isCompleted = node.state === 'completed';
          const isActive = node.state === 'active';
          const isLocked = node.state === 'locked';
          const IconComponent = node.icon;
          
          // Calculate SVG-based progress ring
          const radius = 42;
          const circumference = 2 * Math.PI * radius;
          const progressOffset = isActive ? circumference - ((node.progress || 0) / 100) * circumference : 0;

          return (
            <div 
              key={`node-${node.id}`}
              className="absolute flex flex-col items-center justify-center group"
              // Center the node itself using absolute positioning
              style={{ 
                 top: node.globalY, 
                 left: `calc(50% + ${node.xOffset * PATH_OFFSET}px)`,
                 transform: 'translate(-50%, -50%)',
                 width: '160px' // give enough width so label wraps nicely beneath
              }}
            >
              
              {/* Node Button */}
              <button 
                className={`
                  relative w-24 h-24 rounded-full flex items-center justify-center 
                  transition-all duration-300 z-10
                  ${isActive ? 'scale-110' : 'hover:-translate-y-1 hover:scale-105'}
                  ${isLocked ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}
                `}
              >
                
                {/* SVG Progress Ring for Active Nodes */}
                {isActive && (
                  <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none drop-shadow-[0_0_8px_rgba(0,229,153,0.8)]" viewBox="0 0 100 100">
                     <circle cx="50" cy="50" r={radius} fill="none" stroke="#3F3F46" strokeWidth="8" />
                     <circle 
                       cx="50" 
                       cy="50" 
                       r={radius} 
                       fill="none" 
                       stroke="#00E599" 
                       strokeWidth="8" 
                       strokeDasharray={circumference} 
                       strokeDashoffset={progressOffset} 
                       strokeLinecap="round" 
                       className="transition-all duration-1000 ease-out"
                     />
                  </svg>
                )}

                {/* The actual colored circle */}
                <div className={`
                  absolute inset-2 rounded-full flex items-center justify-center border-[4px] border-[#18181B] dark:border-black
                  ${isCompleted ? 'bg-[#8B5CF6] shadow-[4px_6px_0_#18181B] dark:shadow-[4px_6px_0_black]' : ''}
                  ${isActive ? 'bg-white dark:bg-[#18181B] shadow-[4px_6px_0_#18181B] dark:shadow-[4px_6px_0_black]' : ''}
                  ${isLocked ? 'bg-[#E4E4E7] dark:bg-[#3F3F46] shadow-[4px_6px_0_#18181B] dark:shadow-[4px_6px_0_black]' : ''}
                `}>
                  
                  {isCompleted && <IconComponent className="w-8 h-8 text-white" strokeWidth={2.5} />}
                  {isActive && <IconComponent className="w-8 h-8 text-[#00E599]" strokeWidth={2.5} />}
                  {isLocked && <Lock className="w-8 h-8 text-[#A1A1AA]" strokeWidth={2.5} />}

                  {/* Crown symbol on completed nodes (optional flair) */}
                  {isCompleted && (
                    <div className="absolute -top-3 -right-2 bg-[#00E599] w-8 h-8 rounded-full border-[3px] border-[#18181B] flex items-center justify-center shadow-[2px_2px_0_#18181B]">
                       <Star size={12} fill="#18181B" color="#18181B" />
                    </div>
                  )}
                  
                </div>
              </button>

              {/* Node Label (Below the node) */}
              <div className="mt-4 text-center">
                <span className={`
                  font-black text-sm tracking-wide px-3 py-1.5 rounded-lg border-[3px] border-[#18181B] shadow-[3px_3px_0_#18181B]
                  ${isActive ? 'bg-[#00E599] text-[#18181B]' : 'bg-white dark:bg-[#27272A] text-[#18181B] dark:text-[#F4F4F5]'}
                  ${isLocked ? 'opacity-70 shadow-none border-[#A1A1AA] text-[#A1A1AA]' : ''}
                `}>
                  {node.label}
                </span>
              </div>
              
            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default LearningPath;
