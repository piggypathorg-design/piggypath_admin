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
            className="bg-gray-200 border-[4px] border-[#18181B] flex items-center justify-center overflow-hidden shadow-[8px_8px_0_#18181B] w-full"
            style={{
              borderRadius: data.frame_shape === 'Circle' ? '50%' : `${data.frame_roundness || 16}px`,
              aspectRatio: data.frame_shape === 'Square' || data.frame_shape === 'Circle' ? '1/1' : '16/9'
            }}
          >
            {data.source ? (
              block.type === 'Image' ? (
                <img src={data.source} alt={data.alt_text} className="w-full h-full object-cover" />
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
                  className="w-full h-full object-cover z-10 relative" 
                  autoPlay={data.autoplay === 'On'} 
                  loop={data.loop === 'On'}
                  controls={block.type === 'Video'} 
                  muted={data.autoplay === 'On'}
                  playsInline
                  onClick={(e) => e.stopPropagation()}
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
        <div className={`w-full flex ${alignClass} py-6 px-6`}>
          <div className="w-full max-w-[320px] bg-white p-5 rounded-[32px] border-[4px] border-[#18181B] shadow-[8px_8px_0_#18181B] flex items-center gap-4 relative">
            <div className={`w-20 h-20 shrink-0 bg-[#F4F4F5] rounded-full border-[4px] border-[#18181B] flex items-center justify-center overflow-hidden shadow-[4px_4px_0_#18181B] ${getMascotAnimation(mascotType)}`}>
               <img 
                  src={`/piggypath_admin/assets/mascots/${mascotType}.png?v=clean4`}
                  alt={mascotType}
                  className="w-[60px] h-[60px] object-contain mix-blend-multiply"
                />
            </div>
            <div className="flex-1">
              <div className="font-black text-[#8B5CF6] text-[10px] uppercase tracking-widest mb-1 bg-[#8B5CF6]/10 inline-block px-2 py-0.5 rounded-full">{mascotType}</div>
              <p className="font-bold text-[#18181B] leading-snug">{data.message || 'Great job!'}</p>
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
      return (
        <div className="w-full px-6 py-4">
          <div className="w-full flex flex-col gap-4 bg-white border-[4px] border-[#18181B] rounded-[32px] p-6 shadow-[8px_8px_0_#18181B]">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#FFD100] rounded-full border-[3px] border-[#18181B] flex items-center justify-center shrink-0 shadow-[2px_2px_0_#18181B]">
                <HelpCircle className="text-[#18181B]" size={20} strokeWidth={3} />
              </div>
              <p className="font-black text-lg text-[#18181B] leading-tight pt-1">{data.question || 'Multiple Choice Question?'}</p>
            </div>
            <div className="flex flex-col gap-3 mt-2">
              {[data.option_a, data.option_b, data.option_c, data.option_d].filter(Boolean).map((opt, i) => {
                const isSelected = interactionState?.selectedIndex === i;
                let bgClass = "bg-[#F4F4F5] border-[#18181B]";
                let animClass = "";
                if (isSelected) {
                  if (i === correctOptIndex) {
                    bgClass = "bg-[#00E599] border-[#00E599] text-white";
                    animClass = "animate-mascot-bounce";
                  } else {
                    bgClass = "bg-[#FF6B6B] border-[#FF6B6B] text-white";
                    animClass = "animate-mascot-shake";
                  }
                }
                return (
                  <div 
                    key={i} 
                    onClick={() => {
                      if (isPreviewMode) setInteractionState({ selectedIndex: i });
                    }}
                    className={`px-4 py-3 rounded-2xl text-sm font-bold shadow-[4px_4px_0_#18181B] transition-all ${isPreviewMode ? 'cursor-pointer hover:-translate-y-1 hover:shadow-[6px_6px_0_#18181B]' : 'cursor-default'} ${bgClass} ${animClass} border-[3px]`}
                  >
                    {opt}
                  </div>
                );
              })}
            </div>
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
      
      let trackColor = "bg-[#18181B]";
      if (sliderStatus === 'correct') trackColor = "bg-[#00E599]";
      if (sliderStatus === 'incorrect') trackColor = "bg-[#FF6B6B]";

      return (
        <div className="w-full px-6 py-4">
          <div className="w-full flex flex-col gap-6 bg-white border-[4px] border-[#18181B] rounded-[32px] p-6 shadow-[8px_8px_0_#18181B]">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#FFD100] rounded-full border-[3px] border-[#18181B] flex items-center justify-center shrink-0 shadow-[2px_2px_0_#18181B]">
                <Sliders className="text-[#18181B]" size={20} strokeWidth={3} />
              </div>
              <p className="font-black text-lg text-[#18181B] leading-tight pt-1">{data.question || 'Estimate the value:'}</p>
            </div>
            
            <div className="flex flex-col gap-2 mt-4">
              <div className="text-center font-black text-3xl mb-2 text-[#8B5CF6]">
                {val} <span className="text-lg text-gray-500">{data.unit || '%'}</span>
              </div>
              
              <div className="relative w-full h-8 flex items-center">
                {/* Custom track */}
                <div className={`absolute left-0 right-0 h-4 rounded-full border-[3px] border-[#18181B] ${trackColor} transition-colors duration-300`}></div>
                
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
                
                {/* Custom thumb */}
                <div 
                  className="absolute w-8 h-8 bg-white border-[4px] border-[#18181B] rounded-full shadow-[2px_2px_0_#18181B] pointer-events-none transition-all duration-75 flex items-center justify-center z-0"
                  style={{ left: `calc(${((val - min) / (max - min)) * 100}% - 16px)` }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#18181B]"></div>
                </div>
              </div>
              
              <div className="flex justify-between w-full text-xs font-bold text-gray-400 mt-2">
                <span>{min}{data.unit || '%'}</span>
                <span>{max}{data.unit || '%'}</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'Drag & Drop':
    case 'Arrange':
    case 'Hotspot':
    case 'Reflection':
      const ActivityIcon = {
        'Drag & Drop': Move, 'Match Pairs': Link, 'Arrange': ListOrdered, 
        'Slider': Sliders, 'Fill in the Blank': Edit3, 'Hotspot': MousePointer2, 'Reflection': MessageSquare
      }[block.type] || HelpCircle;

      return (
        <div className="w-full px-6 py-4">
          <div className="w-full flex flex-col items-center justify-center gap-4 bg-[#8B5CF6]/10 border-[4px] border-dashed border-[#8B5CF6] rounded-[32px] p-8">
            <div className="w-16 h-16 bg-[#8B5CF6] rounded-2xl border-[4px] border-[#18181B] flex items-center justify-center shadow-[6px_6px_0_#18181B] transform -rotate-6">
              <ActivityIcon className="text-white" size={32} strokeWidth={3} />
            </div>
            <p className="font-black text-center text-xl text-[#18181B]">{data.question || `${block.type} Activity`}</p>
            <div className="text-[10px] font-black text-[#8B5CF6] px-3 py-1.5 bg-white rounded-full border-[3px] border-[#18181B] shadow-[2px_2px_0_#18181B] uppercase tracking-widest">Interactive Area</div>
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
    case 'Table':
      const VizIcon = {
        'Pie Chart': PieChart, 'Bar Graph': BarChart2, 'Line Graph': TrendingUp, 'Table': TableIcon
      }[block.type] || PieChart;
      return (
        <div className="w-full px-6 py-4">
          <div className="w-full flex flex-col items-center justify-center gap-4 bg-white border-[4px] border-[#18181B] rounded-[32px] shadow-[8px_8px_0_#18181B] overflow-hidden p-8">
            <div className="w-16 h-16 bg-[#00E599] rounded-full border-[4px] border-[#18181B] shadow-[4px_4px_0_#18181B] flex items-center justify-center">
              <VizIcon className="text-[#18181B]" size={32} strokeWidth={3} />
            </div>
            <p className="font-black text-center text-xl text-[#18181B]">{data.title || `${block.type} Visualisation`}</p>
          </div>
        </div>
      );

    case 'XP Reward':
      return (
        <div className="w-full px-6 py-6 flex justify-center">
          <div className="w-[80%] relative flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#FFD100] to-[#F97316] border-[4px] border-[#18181B] rounded-[32px] shadow-[12px_12px_0_#18181B] p-8 transform hover:scale-105 transition-transform cursor-pointer">
            <div className="absolute top-0 right-0 w-16 h-16 opacity-20 pointer-events-none">
               <Star className="text-white fill-white absolute -top-4 -right-4" size={48} />
            </div>
            <div className="w-20 h-20 bg-white rounded-full border-[4px] border-[#18181B] flex items-center justify-center shadow-[4px_4px_0_#18181B] animate-mascot-bounce z-10">
              <Star className="text-[#FFD100] fill-[#FFD100]" size={40} strokeWidth={2} />
            </div>
            <h2 className="text-4xl font-black text-[#18181B] z-10">+{data.xp_amount || data.xp_reward || 15} XP</h2>
            <p className="text-sm font-black text-[#18181B] uppercase tracking-widest bg-white px-4 py-1.5 rounded-full border-[3px] border-[#18181B] shadow-[2px_2px_0_#18181B] z-10 mt-2">{data.label || 'Awesome!'}</p>
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
      const NavMap = {
        'Continue Button': { icon: ArrowRight, color: '#00E599', label: 'Continue' },
        'Back Button': { icon: ArrowLeft, color: '#FFFFFF', label: 'Back' },
        'Skip Button': { icon: FastForward, color: '#F4F4F5', label: 'Skip' }
      };
      const navConf = NavMap[block.type];
      const NavIcon = navConf.icon;
      return (
        <div className="w-full px-6 py-4">
          <button 
            className="w-full px-6 py-4 flex items-center justify-center gap-3 border-[4px] border-[#18181B] rounded-[24px] font-black text-lg shadow-[6px_6px_0_#18181B] text-[#18181B] hover:translate-y-[2px] hover:shadow-[4px_4px_0_#18181B] active:translate-y-[6px] active:shadow-none transition-all"
            style={{ backgroundColor: navConf.color }}
          >
            {block.type === 'Back Button' && <NavIcon size={24} strokeWidth={3} />}
            {navConf.label}
            {block.type !== 'Back Button' && <NavIcon size={24} strokeWidth={3} />}
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
