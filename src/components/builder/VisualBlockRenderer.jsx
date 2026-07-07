import React from 'react';
import { 
  Star, Coins, Award, Trophy, MessageCircle, ArrowRight, ArrowLeft, FastForward,
  PieChart, BarChart2, TrendingUp, Table as TableIcon, HelpCircle, Move, Link, ListOrdered, Sliders, Edit3, MousePointer2, MessageSquare
} from 'lucide-react';
import mascotGridImg from '../../assets/mascot_grid.png';

const getMascotBackgroundPosition = (opt) => {
  const map = {
    'Happy': '0% 0%',
    'Winking': '33.33% 0%',
    'Laughing': '66.66% 0%',
    'Surprised': '100% 0%',
    'Confused': '0% 50%',
    'Thinking': '33.33% 50%',
    'Angry': '66.66% 50%',
    'Sad': '100% 50%',
    'Smart': '0% 100%',
    'Love': '33.33% 100%',
    'Cool': '66.66% 100%',
    'Sleeping': '100% 100%'
  };
  return map[opt] || '0% 0%';
};

const getMascotAnimation = (opt) => {
  const map = {
    'Happy': 'animate-mascot-bounce',
    'Winking': 'animate-mascot-pop',
    'Laughing': 'animate-mascot-fast-bounce',
    'Surprised': 'animate-mascot-surprise',
    'Confused': 'animate-mascot-wiggle',
    'Thinking': 'animate-mascot-float',
    'Angry': 'animate-mascot-shake',
    'Sad': 'animate-mascot-droop',
    'Smart': 'animate-mascot-pop',
    'Love': 'animate-mascot-pulse',
    'Cool': 'animate-mascot-float',
    'Sleeping': 'animate-mascot-sleep'
  };
  return map[opt] || '';
};

const VisualBlockRenderer = ({ block, version, isPreviewMode }) => {
  const data = block[version] || {};
  const [interactionState, setInteractionState] = React.useState({});
  
  const getAlign = (align) => {
    if (align === 'Center') return 'text-center justify-center';
    if (align === 'Right') return 'text-right justify-end items-end';
    return 'text-left justify-start items-start';
  };

  const alignClass = getAlign(data.alignment);
  const color = data.text_colour || '#1E293B';
  const font = data.font || 'Arial';

  switch (block.type) {
    case 'Title':
      return (
        <div className={`w-full flex ${alignClass} py-4 px-6`} style={{ backgroundColor: data.block_colour || 'transparent' }}>
          <h1 
            className="break-words leading-tight"
            style={{ color, fontFamily: font, fontSize: `${data.font_size || 32}px`, fontWeight: '900' }}
          >
            {data.title_text || 'Enter Title'}
          </h1>
        </div>
      );

    case 'Paragraph':
    case 'Rich Text':
      return (
        <div className={`w-full flex ${alignClass} py-2 px-6`} style={{ backgroundColor: data.block_colour || 'transparent' }}>
          <p 
            className="break-words leading-relaxed"
            style={{ 
              color, 
              fontFamily: font, 
              fontSize: `${data.font_size || 16}px`,
              fontWeight: data.bold === 'On' ? 'bold' : 'normal',
              fontStyle: data.italic === 'On' ? 'italic' : 'normal',
            }}
          >
            {data.text || 'Enter your text here...'}
          </p>
        </div>
      );

    case 'Divider':
      return (
        <div className="w-full flex items-center justify-center py-6 px-6">
          <div 
            className="w-full" 
            style={{ borderBottom: `${data.thickness || 3}px ${data.style?.toLowerCase() || 'solid'} ${data.line_colour || '#E2E8F0'}` }}
          ></div>
        </div>
      );

    case 'Spacer':
      return (
        <div 
           className="w-full"
           style={{ height: `${data.height || 16}px`, backgroundColor: data.block_colour || 'transparent' }}
        ></div>
      );

    case 'Card':
      return (
        <div className="w-full px-6 py-2">
          <div 
            className="w-full p-6 flex flex-col gap-3 shadow-[8px_8px_0_#18181B]"
            style={{
              backgroundColor: data.block_colour || '#FFFFFF',
              border: data.border === 'None' ? 'none' : `4px ${data.border?.toLowerCase() || 'solid'} ${data.border_colour || '#18181B'}`,
              borderRadius: `${data.border_radius !== undefined ? data.border_radius : 24}px`,
              color: data.text_colour || '#18181B'
            }}
          >
            {data.title_text && (
              <h3 
                className="leading-tight"
                style={{
                  fontSize: `${data.heading_font_size || 24}px`,
                  fontWeight: data.heading_font_style === 'Normal' ? 'normal' : data.heading_font_style === 'Italic' ? 'normal' : '900',
                  fontStyle: data.heading_font_style === 'Italic' ? 'italic' : 'normal'
                }}
              >
                {data.title_text}
              </h3>
            )}
            {data.body_text && (
              <p 
                className="opacity-90 leading-relaxed"
                style={{
                  fontSize: `${data.body_font_size || 16}px`,
                  fontWeight: data.body_font_style === 'Bold' ? 'bold' : 'normal',
                  fontStyle: data.body_font_style === 'Italic' ? 'italic' : 'normal'
                }}
              >
                {data.body_text}
              </p>
            )}
          </div>
        </div>
      );

    case 'Image':
    case 'Video':
    case 'Animation':
      return (
        <div className={`w-full flex flex-col ${alignClass} py-4 px-6`}>
          <div 
            className="bg-transparent flex items-center justify-center overflow-hidden w-full relative"
            style={{
              borderRadius: data.frame_shape === 'Circle' ? '50%' : `${data.frame_roundness || 16}px`,
              aspectRatio: data.frame_shape === 'Square' || data.frame_shape === 'Circle' ? '1/1' : '16/9'
            }}
          >
            {data.source ? (
              block.type === 'Image' ? (
                <img 
                  src={data.source} 
                  alt={data.alt_text} 
                  className="w-full h-full"
                  style={{
                    objectFit: data.object_fit === 'Fit (Contain)' ? 'contain' : data.object_fit === 'Original Size' ? 'none' : 'cover',
                    objectPosition: `${data.image_x ?? 50}% ${data.image_y ?? 50}%`,
                    transform: `scale(${(data.image_scale ?? 100) / 100})`
                  }}
                />
              ) : (data.source.includes('youtube.com') || data.source.includes('youtu.be')) ? (
                <iframe
                  src={data.source.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                  className="w-full h-full object-cover"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video 
                  src={data.source} 
                  className="w-full h-full object-cover z-10 relative pointer-events-auto" 
                  autoPlay={data.autoplay === 'On'} 
                  loop={data.loop === 'On'}
                  controls={block.type === 'Video' || block.type === 'Animation'} 
                  muted={data.autoplay === 'On'}
                  playsInline
                  onClick={(e) => {
                    // Stop propagation so clicking the video doesn't select the block, allowing controls to work
                    e.stopPropagation();
                  }}
                />
              )
            ) : (
              <span className="text-[#A1A1AA] font-black uppercase tracking-widest text-sm">No Media</span>
            )}
          </div>
          {data.caption && <p className="text-xs text-center mt-3 font-bold text-[#71717A] uppercase tracking-wider">{data.caption}</p>}
        </div>
      );

    case 'Mascot Feedback':
      const mascotType = data.mascot_type || 'Happy';
      return (
        <div className={`w-full flex ${alignClass} py-4 px-6`}>
          <div className="w-full bg-white p-6 rounded-[16px] border-[3px] border-[#18181B] shadow-[6px_6px_0_#18181B] flex items-center gap-6">
            <div className={`w-20 h-20 shrink-0 flex items-center justify-center ${getMascotAnimation(mascotType)}`}>
               <img 
                  src={`/piggypath_admin/assets/mascots/${mascotType}.png?v=clean4`}
                  alt={mascotType}
                  className="w-full h-full object-contain"
                />
            </div>
            <div className="flex-1 text-[#18181B]">
              <p className="font-bold leading-snug text-sm sm:text-base">"{data.message || 'Great job!'}"</p>
            </div>
          </div>
        </div>
      );

    case 'Mascot Bubble':
      return (
        <div className="w-full px-6 py-4 relative flex justify-center">
          <div 
            className="w-[80%] p-5 border-[4px] border-[#18181B] rounded-3xl shadow-[8px_8px_0_#18181B] flex items-center justify-center relative z-10"
            style={{
              backgroundColor: data.bubble_colour || '#FFFFFF',
              color: data.text_colour || '#18181B',
              fontFamily: font,
              fontSize: `${data.font_size || 16}px`,
              fontWeight: data.font_style === 'Bold' ? '900' : 'bold',
              fontStyle: data.font_style === 'Italic' ? 'italic' : 'normal',
            }}
          >
            {data.text || 'Mascot says...'}
          </div>
          <div 
            className="absolute -bottom-2 left-12 w-8 h-8 border-b-[4px] border-r-[4px] border-[#18181B] transform rotate-45 z-0"
            style={{ backgroundColor: data.bubble_colour || '#FFFFFF' }}
          ></div>
        </div>
      );

    case 'MCQ':
      const correctOptIndex = ['A', 'B', 'C', 'D'].indexOf(data.correct_option || 'A');
      const hasSelection = interactionState?.selectedIndex !== undefined;
      const isCorrectSelection = hasSelection && interactionState?.selectedIndex === correctOptIndex;
      
      return (
        <div className="w-full px-6 py-2">
          <div className="w-full flex flex-col gap-3">
            <p className="font-black text-center text-sm mb-2">{data.question || 'Which item is most important to buy first?'}</p>
            
            {[data.option_a, data.option_b, data.option_c, data.option_d].filter(Boolean).map((opt, i) => {
              const isSelected = interactionState?.selectedIndex === i;
              let bgClass = "bg-white text-[#18181B]";
              let animClass = "";
              if (isSelected) {
                if (i === correctOptIndex) {
                  bgClass = "bg-[#00E599] text-[#18181B]";
                  animClass = "animate-mascot-bounce";
                } else {
                  bgClass = "bg-[#FF6B6B] text-white";
                  animClass = "animate-mascot-shake";
                }
              }
              return (
                <div 
                  key={i} 
                  onClick={() => {
                    if (isPreviewMode) setInteractionState({ selectedIndex: i });
                  }}
                  className={`px-4 py-3 rounded-lg text-sm font-bold shadow-[4px_4px_0_#18181B] border-[2px] border-[#18181B] text-center transition-all ${isPreviewMode ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#18181B]' : 'cursor-default'} ${bgClass} ${animClass}`}
                >
                  {opt}
                </div>
              );
            })}
            
            {hasSelection && (
              <div className={`mt-2 p-4 rounded-lg border-[2px] border-[#18181B] shadow-[4px_4px_0_#18181B] text-sm font-bold ${isCorrectSelection ? 'bg-[#00E599] text-[#18181B]' : 'bg-[#FF6B6B] text-white'}`}>
                <span className="underline decoration-2 underline-offset-2 mb-1 block">Explanation</span>
                {data.explanation || (isCorrectSelection ? 'That is correct!' : 'That is incorrect, please try again.')}
              </div>
            )}
          </div>
        </div>
      );

    case 'Fill in the Blank':
      const parts = (data.question || 'Fill in the ___').split('___');
      const isFillCorrect = interactionState?.status === 'correct';
      const isFillIncorrect = interactionState?.status === 'incorrect';
      
      let inputBorder = "border-[#18181B] border-[3px]";
      let inputBg = "bg-[#F4F4F5]";
      if (isFillCorrect) {
        inputBorder = "border-[#00E599] border-[3px]";
        inputBg = "bg-[#00E599]/20";
      } else if (isFillIncorrect) {
        inputBorder = "border-[#FF6B6B] border-[3px]";
        inputBg = "bg-[#FF6B6B]/20";
      }

      return (
        <div className="w-full px-6 py-4">
          <div className="w-full flex flex-col gap-4 bg-white border-[4px] border-[#18181B] rounded-[32px] p-6 shadow-[8px_8px_0_#18181B]">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#8B5CF6] rounded-full border-[3px] border-[#18181B] flex items-center justify-center shrink-0 shadow-[2px_2px_0_#18181B]">
                <Edit3 className="text-white" size={20} strokeWidth={3} />
              </div>
              <div className="font-black text-lg text-[#18181B] leading-loose pt-1 flex flex-wrap items-center gap-2">
                {parts.map((part, index) => (
                  <React.Fragment key={index}>
                    <span>{part}</span>
                    {index < parts.length - 1 && (
                      <input 
                        type="text"
                        disabled={!isPreviewMode}
                        className={`w-32 px-3 py-1 rounded-xl text-center font-bold text-sm outline-none transition-all ${inputBorder} ${inputBg}`}
                        placeholder="Type..."
                        value={interactionState?.value || ''}
                        onChange={(e) => setInteractionState({ ...interactionState, value: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const correct = e.target.value.toLowerCase().trim() === (data.answer || '').toLowerCase().trim();
                            setInteractionState({ ...interactionState, status: correct ? 'correct' : 'incorrect' });
                          }
                        }}
                        onBlur={(e) => {
                          if (e.target.value) {
                            const correct = e.target.value.toLowerCase().trim() === (data.answer || '').toLowerCase().trim();
                            setInteractionState({ ...interactionState, status: correct ? 'correct' : 'incorrect' });
                          }
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            {data.hint && (
              <p className="text-sm font-bold text-gray-400 mt-2">Hint: {data.hint}</p>
            )}
          </div>
        </div>
      );

    case 'Slider':
      const min = data.min_value || 0;
      const max = data.max_value || 100;
      const target = data.target_value || 50;
      const tol = data.tolerance || 5;
      
      const val = interactionState?.value ?? min;
      const sliderStatus = interactionState?.status;
      
      let trackColor = "bg-[#8B5CF6]";
      if (sliderStatus === 'correct') trackColor = "bg-[#00E599]";
      if (sliderStatus === 'incorrect') trackColor = "bg-[#FF6B6B]";

      return (
        <div className="w-full px-6 py-4">
          <div className="w-full flex flex-col gap-6">
            <p className="font-black text-center text-sm">{data.question || 'Move the slider to show how much you think should be saved.'}</p>
            
            <div className="flex flex-col items-center gap-2 mt-4">
              <div className="text-center font-black text-sm text-[#8B5CF6] mb-1">
                {data.currency_symbol || '₹'}{val}{data.unit || ''}
              </div>
              
              <div className="relative w-full max-w-[250px] h-10 flex items-center justify-center mx-auto">
                {/* Custom track */}
                <div className={`absolute left-0 right-0 h-3 rounded-full border-[2px] border-[#18181B] ${trackColor} transition-colors duration-300`}></div>
                
                {/* Range input visually hidden but functionally overlaid */}
                <input 
                  type="range"
                  min={min}
                  max={max}
                  value={val}
                  disabled={!isPreviewMode}
                  className="w-full absolute inset-0 opacity-0 cursor-pointer z-10"
                  onChange={(e) => {
                    if (!isPreviewMode) return;
                    setInteractionState({ value: parseInt(e.target.value), status: null });
                  }}
                  onMouseUp={() => {
                    if (!isPreviewMode) return;
                    const correct = Math.abs(val - target) <= tol;
                    setInteractionState({ ...interactionState, status: correct ? 'correct' : 'incorrect' });
                  }}
                  onTouchEnd={() => {
                    if (!isPreviewMode) return;
                    const correct = Math.abs(val - target) <= tol;
                    setInteractionState({ ...interactionState, status: correct ? 'correct' : 'incorrect' });
                  }}
                />
                
                {/* Custom thumb (Triangle pointing up) */}
                <div 
                  className="absolute pointer-events-none transition-all duration-75 flex flex-col items-center justify-center z-0"
                  style={{ left: `calc(${((val - min) / (max - min)) * 100}%)`, transform: 'translateX(-50%)', top: '16px' }}
                >
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-[#00E599] drop-shadow-[0_2px_0_#18181B]"></div>
                </div>
              </div>
              
              <div className="flex justify-between w-full max-w-[250px] text-xs font-bold text-gray-500 mt-2">
                <span>{data.currency_symbol || '₹'}{min}{data.unit || ''}</span>
                <span>{data.currency_symbol || '₹'}{max}{data.unit || ''}</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'Drag & Drop':
    case 'Arrange':
    case 'Hotspot':
      return (
        <div className="w-full px-6 py-4 flex flex-col gap-6">
           <div className="flex gap-4 w-full">
              {/* Box 1 */}
              <div className="flex-1 flex flex-col items-center">
                 <div className="text-xs font-bold mb-2">{data.bucket_1 || 'Needs'}</div>
                 <div className="w-full aspect-square bg-white border-[2px] border-[#18181B] shadow-[4px_4px_0_#18181B] rounded-lg"></div>
              </div>
              {/* Box 2 */}
              <div className="flex-1 flex flex-col items-center">
                 <div className="text-xs font-bold mb-2">{data.bucket_2 || 'Wants'}</div>
                 <div className="w-full aspect-square bg-white border-[2px] border-[#18181B] shadow-[4px_4px_0_#18181B] rounded-lg"></div>
              </div>
           </div>
           
           <div className="flex flex-wrap justify-center gap-3">
              {['Water', 'Medicine', 'New Phone', 'Ice Cream'].map((pill, i) => (
                 <div key={i} className="px-3 py-1.5 bg-white border-[2px] border-[#18181B] shadow-[3px_3px_0_#18181B] rounded-full text-xs font-bold cursor-pointer hover:-translate-y-0.5 transition-transform">
                    {pill}
                 </div>
              ))}
           </div>
        </div>
      );

    case 'Match Pairs':
      const numPairs = parseInt(data.number_of_pairs || '3', 10);
      return (
        <div className="w-full px-6 py-4">
          <div className="w-full flex flex-col gap-4 bg-white border-[4px] border-[#18181B] rounded-[32px] p-6 shadow-[8px_8px_0_#18181B]">
            <div className="flex items-start gap-3 mb-2">
              <div className="w-10 h-10 bg-[#FFD100] rounded-full border-[3px] border-[#18181B] flex items-center justify-center shrink-0 shadow-[2px_2px_0_#18181B]">
                <Link className="text-[#18181B]" size={20} strokeWidth={3} />
              </div>
              <p className="font-black text-lg text-[#18181B] leading-tight pt-1">{data.question || 'Match the pairs!'}</p>
            </div>
            
            <div className="flex flex-col gap-3">
              {Array.from({ length: numPairs }).map((_, i) => (
                <div key={i} className="flex gap-4 w-full">
                  <div className="flex-1 bg-[#F4F4F5] border-[3px] border-[#18181B] rounded-2xl px-4 py-3 shadow-[4px_4px_0_#18181B] font-bold text-sm text-[#18181B] text-center flex items-center justify-center break-words">
                    {data[`pair_${i+1}_a`] || `Pair ${i+1} A`}
                  </div>
                  <div className="flex-1 bg-[#F4F4F5] border-[3px] border-[#18181B] rounded-2xl px-4 py-3 shadow-[4px_4px_0_#18181B] font-bold text-sm text-[#18181B] text-center flex items-center justify-center border-dashed border-[#8B5CF6]/50">
                    Drop matching item here
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'Pie Chart':
    case 'Bar Graph':
    case 'Line Graph':
      return (
        <div className="w-full px-6 py-4 flex flex-col items-center gap-6">
          <p className="font-black text-center text-sm">{data.title || 'How Kids Spend ₹100'}</p>
          
          {/* SVG Pie Chart Mockup */}
          <div className="w-48 h-48 relative">
             <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 filter drop-shadow-md">
                <circle r="50" cx="50" cy="50" fill="#FFD100" stroke="#18181B" strokeWidth="1" strokeDasharray="314" strokeDashoffset="0"></circle>
                <circle r="50" cx="50" cy="50" fill="#00E599" stroke="#18181B" strokeWidth="1" strokeDasharray="314" strokeDashoffset="78.5"></circle>
                <circle r="50" cx="50" cy="50" fill="#8B5CF6" stroke="#18181B" strokeWidth="1" strokeDasharray="314" strokeDashoffset="157"></circle>
                <circle r="50" cx="50" cy="50" fill="#3B82F6" stroke="#18181B" strokeWidth="1" strokeDasharray="314" strokeDashoffset="235.5"></circle>
             </svg>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 w-full max-w-[250px]">
             {['Savings', 'Food', 'Entertainment', 'School'].map((legend, i) => {
                const colors = ['bg-[#FFD100]', 'bg-[#00E599]', 'bg-[#8B5CF6]', 'bg-[#3B82F6]'];
                return (
                   <div key={i} className={`px-4 py-2 w-[110px] text-center border-[2px] border-[#18181B] rounded-lg shadow-[3px_3px_0_#18181B] text-xs font-bold ${legend === 'Entertainment' ? colors[1] : 'bg-white'}`}>
                      {legend}
                   </div>
                );
             })}
          </div>
        </div>
      );

    case 'Sparkle XP':
      return (
        <div className="w-full px-6 py-10 flex flex-col items-center justify-center relative">
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-xs font-bold text-gray-400 mb-1">{data.label || 'Lifetime XP'}</span>
            <span className="text-5xl font-black text-[#18181B]">+{data.xp_amount || 84}</span>
          </div>
          
          {/* Floating Sparkles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[
              { top: '20%', left: '20%', size: 16, delay: '0s' },
              { top: '15%', left: '30%', size: 12, delay: '0.2s' },
              { top: '40%', left: '15%', size: 24, delay: '0.4s' },
              { top: '70%', left: '25%', size: 14, delay: '0.1s' },
              { top: '80%', left: '45%', size: 20, delay: '0.5s' },
              { top: '30%', left: '70%', size: 16, delay: '0.3s' },
              { top: '65%', left: '80%', size: 12, delay: '0.6s' },
              { top: '75%', left: '65%', size: 28, delay: '0.2s' },
            ].map((sparkle, i) => (
              <svg 
                key={i} 
                className="absolute text-[#8B5CF6] animate-mascot-pulse" 
                style={{ top: sparkle.top, left: sparkle.left, width: sparkle.size, height: sparkle.size, animationDelay: sparkle.delay }} 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            ))}
          </div>
        </div>
      );

    case 'Mascot Platform':
      const mascotIcon = data.mascot_type || 'Happy';
      return (
        <div className="w-full px-6 py-12 flex flex-col items-center justify-center">
           <div className="relative flex flex-col items-center">
             {/* Mascot Head */}
             <div className="w-24 h-24 z-10 animate-mascot-float relative drop-shadow-xl">
               <img 
                 src={`/piggypath_admin/assets/mascots/${mascotIcon}.png?v=clean4`}
                 alt={mascotIcon}
                 className="w-full h-full object-contain"
               />
             </div>
             
             {/* Platform Shadow */}
             <div className="w-16 h-4 bg-black/5 rounded-[100%] absolute top-28 filter blur-sm"></div>
             
             {/* 3D Isometric Platform SVG */}
             <div className="w-32 h-16 mt-4 relative z-0">
               <svg viewBox="0 0 100 60" className="w-full h-full drop-shadow-[0_8px_0_rgba(0,0,0,0.1)]">
                  {/* Top Face */}
                  <polygon points="50,0 100,25 50,50 0,25" fill="#00E599" stroke="#00A36C" strokeWidth="1"/>
                  {/* Left Face */}
                  <polygon points="0,25 50,50 50,60 0,35" fill="#00A36C"/>
                  {/* Right Face */}
                  <polygon points="100,25 50,50 50,60 100,35" fill="#008055"/>
                  
                  {/* Circle and Checkmark */}
                  <ellipse cx="50" cy="25" rx="16" ry="8" fill="#00A36C" />
                  <path d="M44 25 L48 28 L56 21" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
               </svg>
             </div>
           </div>
        </div>
      );
      
    case 'Coin Reward':
      return (
        <div className="w-full px-6 py-6 flex justify-center">
          <div className="w-[80%] flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#00E599] to-[#00A36C] border-[4px] border-[#18181B] rounded-[32px] shadow-[12px_12px_0_#18181B] p-8 transform hover:scale-105 transition-transform cursor-pointer">
            <div className="w-20 h-20 bg-white rounded-full border-[4px] border-[#18181B] flex items-center justify-center shadow-[4px_4px_0_#18181B] animate-mascot-bounce z-10">
              <Coins className="text-[#00E599]" size={40} strokeWidth={3} />
            </div>
            <h2 className="text-4xl font-black text-white drop-shadow-[0_4px_0_#18181B] z-10">+{data.coins_amount || 5}</h2>
            <p className="text-sm font-black text-[#18181B] uppercase tracking-widest bg-white px-4 py-1.5 rounded-full border-[3px] border-[#18181B] shadow-[2px_2px_0_#18181B] z-10 mt-2">{data.label || 'Coins Earned!'}</p>
          </div>
        </div>
      );

    case 'Badge':
    case 'Achievement Card':
      const FBIcon = block.type === 'Badge' ? Award : Trophy;
      return (
        <div className="w-full px-6 py-6 flex justify-center">
          <div className="w-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] border-[4px] border-[#18181B] rounded-[32px] shadow-[12px_12px_0_#18181B] p-8 text-white text-center transform hover:scale-105 transition-all">
            <div className="w-24 h-24 bg-[#FFD100] rounded-full border-[4px] border-[#18181B] flex items-center justify-center shadow-[4px_4px_0_#18181B] animate-mascot-wiggle mb-2 relative">
              <div className="absolute w-full h-full border-[4px] border-dashed border-[#F97316] rounded-full animate-spin-slow opacity-50"></div>
              <FBIcon size={48} strokeWidth={3} className="text-[#18181B] z-10" />
            </div>
            <h2 className="text-3xl font-black drop-shadow-[0_3px_0_#18181B]">{data.title || data.badge_name || 'Achievement!'}</h2>
            {(data.body || data.label) && <p className="text-sm font-bold opacity-100 bg-[#18181B]/20 px-4 py-2 rounded-xl mt-1 border-[2px] border-white/10">{data.body || data.label}</p>}
          </div>
        </div>
      );

    case 'Mascot Emotion':
      const mascotSize = data.size || 'Medium';
      const sizeClasses = {
        'Small': 'w-24 h-24',
        'Medium': 'w-40 h-40',
        'Large': 'w-64 h-64'
      }[mascotSize] || 'w-40 h-40';
      return (
        <div className={`w-full flex ${alignClass} py-4 px-6`}>
           <div className={`${sizeClasses} flex items-center justify-center ${getMascotAnimation(data.mascot_type || 'Happy')}`}>
             <img 
               src={`/piggypath_admin/assets/mascots/${data.mascot_type || 'Happy'}.png?v=clean4`}
               alt={data.mascot_type || 'Happy'}
               className="w-full h-full object-contain mix-blend-multiply drop-shadow-md"
             />
           </div>
        </div>
      );

    case 'Progress Bar':
      return (
        <div className="w-full px-6 py-4">
          <div className="w-full h-6 bg-white rounded-full border-[3px] border-[#18181B] shadow-[4px_4px_0_#18181B] overflow-hidden p-0.5">
            <div className="h-full bg-[#00E599] rounded-full border-r-[3px] border-[#18181B]" style={{ width: `${Math.min(100, Math.max(0, data.value || 50))}%` }}></div>
          </div>
        </div>
      );

    case 'Continue Button':
    case 'Back Button':
    case 'Skip Button':
    case 'Next Lesson Button':
      const NavMap = {
        'Continue Button': { icon: ArrowRight, color: '#00E599', label: 'Continue' },
        'Back Button': { icon: ArrowLeft, color: '#00E599', label: 'Back' },
        'Skip Button': { icon: FastForward, color: '#00E599', label: 'Skip' },
        'Next Lesson Button': { icon: ArrowRight, color: '#00E599', label: 'Next lesson' }
      };
      const navConf = NavMap[block.type];
      const NavIcon = navConf.icon;
      return (
        <div className="w-full px-6 py-4">
          <button 
            type="button"
            className="w-full px-6 py-3 flex items-center justify-center gap-3 border-[2px] border-[#18181B] rounded-lg font-bold text-sm shadow-[4px_4px_0_#18181B] text-[#18181B] hover:-translate-y-[2px] hover:shadow-[5px_5px_0_#18181B] active:translate-y-[2px] active:shadow-[2px_2px_0_#18181B] transition-all"
            style={{ backgroundColor: navConf.color }}
          >
            {block.type === 'Back Button' && <NavIcon size={16} strokeWidth={3} />}
            {navConf.label}
            {block.type !== 'Back Button' && <NavIcon size={16} strokeWidth={3} />}
          </button>
        </div>
      );

    default:
      return (
        <div className="w-full px-6 py-2">
          <div className="w-full bg-white border-[4px] border-[#18181B] rounded-[24px] shadow-[4px_4px_0_#18181B] flex items-center justify-center text-center p-6">
            <p className="font-black text-[#18181B]">{block.type}</p>
          </div>
        </div>
      );
  }
};

export default VisualBlockRenderer;
