import React, { useState } from 'react';
import { 
  Star, Coins, Award, Trophy, MessageCircle, ArrowRight, ArrowLeft, FastForward,
  PieChart, BarChart2, TrendingUp, Table as TableIcon, HelpCircle, Move, Link, ListOrdered, Sliders, Edit3, MousePointer2, MessageSquare, Check
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
            className={`px-4 py-3 rounded-lg text-sm font-bold shadow-[4px_4px_0_#18181B] border-[2px] border-[#18181B] text-center transition-all ${isPreviewMode && !hasSelection ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#18181B]' : 'cursor-default'} ${bgClass} ${animClass}`}
          >
            {opt.text}
          </div>
        );
      })}
      
      {hasSelection && (
        <div className={`mt-2 p-4 rounded-lg border-[2px] border-[#18181B] shadow-[4px_4px_0_#18181B] text-sm font-bold ${isCorrectSelection ? 'bg-[#00E599] text-[#18181B]' : 'bg-[#FF6B6B] text-white'}`}>
          <span className="underline decoration-2 underline-offset-2 mb-1 block">Explanation</span>
          {isCorrectSelection ? (data.quiz_why_correct || 'Correct!') : (data.quiz_why_incorrect || 'Incorrect, please try again.')}
        </div>
      )}
    </div>
  );
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
            
            {[data.option_a || 'Option A', data.option_b || 'Option B', data.option_c, data.option_d].filter(Boolean).map((opt, i) => {
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
      const parts = (data.question || 'Fill in the blank ___').split('___');
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
                        className={`w-20 sm:w-28 px-2 py-1 rounded-xl text-center font-bold text-sm outline-none transition-all shrink ${inputBorder} ${inputBg}`}
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
      const slices = [];
      for (let i = 1; i <= 10; i++) {
        if (data[`slice_label_${i}`] && data[`slice_value_${i}`] > 0) {
          slices.push({ 
            id: String(i),
            label: data[`slice_label_${i}`], 
            value: Number(data[`slice_value_${i}`]), 
            color: data[`slice_color_${i}`] || '#FFD100'
          });
        }
      }
      if (slices.length === 0) slices.push({ id: '1', label: 'Savings', value: 50, color: '#FFD100' }, { id: '2', label: 'Food', value: 50, color: '#00E599' });
      
      const total = slices.reduce((acc, s) => acc + s.value, 0);
      let cumulativeOffset = 0;
      const correctAnswer = String(data.correct_slice || '1');

      return (
        <div className="w-full px-6 py-4 flex flex-col items-center gap-6">
          <p className="font-black text-center text-sm text-[#18181B]">{data.title || 'Pie Chart'}</p>
          
          <div className="w-48 h-48 relative">
             <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 filter drop-shadow-md rounded-full bg-white border-[3px] border-[#18181B]">
                {slices.map((slice, i) => {
                  if (total === 0) return null;
                  const dashLength = (slice.value / total) * 157.08;
                  const dashOffset = -cumulativeOffset;
                  cumulativeOffset += dashLength;
                  return (
                    <circle key={i} r="25" cx="50" cy="50" fill="transparent" stroke={slice.color} strokeWidth="50" strokeDasharray={`${dashLength} 157.08`} strokeDashoffset={dashOffset}></circle>
                  )
                })}
             </svg>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 w-full max-w-[250px]">
             {slices.map((slice, i) => {
                const isSelected = interactionState?.pieSelectedAnswer === slice.id;
                const isCorrect = slice.id === correctAnswer;
                
                let bgColor = slice.color;
                let textColor = '#18181B';
                
                if (isPreviewMode && isSelected) {
                  bgColor = isCorrect ? '#00E599' : '#FF6B6B';
                }

                return (
                  <div 
                    key={i} 
                    onClick={() => {
                      if (isPreviewMode) setInteractionState({ ...interactionState, pieSelectedAnswer: slice.id });
                    }}
                    className={`px-4 py-2 flex items-center gap-2 border-[3px] border-[#18181B] rounded-lg shadow-[4px_4px_0_#18181B] text-sm font-black transition-all ${isPreviewMode ? 'cursor-pointer hover:-translate-y-1 hover:shadow-[5px_5px_0_#18181B] active:translate-y-1 active:shadow-none' : ''}`} 
                    style={{ backgroundColor: bgColor, color: textColor }}
                  >
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] uppercase tracking-wider font-bold opacity-80 leading-tight">
                          {slice.label}
                        </span>
                        <span className="text-sm font-black mt-0.5 leading-tight">
                          {slice.value}{data.show_percentage === 'Yes' ? '%' : ''}
                        </span>
                      </div>
                    </div>
                );
             })}
             <ChartQuiz blockId={block.id} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} />

          </div>
        </div>
      );

    case 'Bar Graph':
      const bars = [];
      for (let i = 1; i <= 10; i++) {
        if (data[`bar_label_${i}`] && data[`bar_value_${i}`] > 0) {
          bars.push({ 
            id: String(i),
            label: data[`bar_label_${i}`], 
            value: Number(data[`bar_value_${i}`]),
            color: data[`bar_color_${i}`] || (i % 2 === 0 ? '#00E599' : '#FFD100')
          });
        }
      }
      if (bars.length === 0) bars.push({ id: '1', label: 'Item 1', value: 30, color: '#FFD100' }, { id: '2', label: 'Item 2', value: 80, color: '#00E599' }, { id: '3', label: 'Item 3', value: 50, color: '#8B5CF6' });
      
      const maxVal = Math.max(...bars.map(b => b.value));
      const isVertical = data.orientation !== 'Horizontal';

      return (
        <div className="w-full px-6 py-4 flex flex-col items-center gap-6">
          <p className="font-black text-center text-sm text-[#18181B]">{data.title || 'Bar Graph'}</p>
          
          <div className={`w-full max-w-[250px] flex ${isVertical ? 'flex-row items-end h-48 border-b-4 border-l-4' : 'flex-col justify-end border-l-4 border-b-4'} border-[#18181B] gap-3 p-2 relative bg-white`}>
             {bars.map((bar, i) => (
                <div key={i} className={`flex ${isVertical ? 'flex-col items-center justify-end flex-1 h-full' : 'flex-row items-center justify-start w-full flex-1'} gap-1`}>
                   {isVertical ? (
                      <>
                        <span className="text-[10px] font-bold text-[#18181B] -mb-1">{bar.value}</span>
                        <div className="w-full border-[2px] border-[#18181B] rounded-t-sm shadow-[2px_0_0_#18181B] transition-all" style={{ height: `${(bar.value / maxVal) * 85}%`, backgroundColor: bar.color }}></div>
                        <span className="text-[10px] font-bold text-[#18181B] truncate w-full text-center mt-1">{bar.label}</span>
                      </>
                   ) : (
                      <>
                        <span className="text-[10px] font-bold text-[#18181B] truncate w-16 text-right pr-1 shrink-0">{bar.label}</span>
                        <div className="h-full border-[2px] border-[#18181B] rounded-r-sm shadow-[0_2px_0_#18181B] transition-all" style={{ width: `${(bar.value / maxVal) * 85}%`, backgroundColor: bar.color }}></div>
                        <span className="text-[10px] font-bold text-[#18181B] pl-1 shrink-0">{bar.value}</span>
                      </>
                   )}
                </div>
             ))}
             <ChartQuiz blockId={block.id} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} />

          </div>
        </div>
      );

    case 'Line Graph': {
      const points = [];
      for (let i = 1; i <= 10; i++) {
        if (data[`point_${i}_label`] && data[`point_${i}_value`] !== undefined && data[`point_${i}_value`] !== '') {
          points.push({ 
            id: String(i),
            label: data[`point_${i}_label`], 
            value: Number(data[`point_${i}_value`])
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
      
      const pathData = coordinates.length > 0 ? `M ${coordinates.map(c => `${c.x},${c.y}`).join(' L ')}` : '';

      return (
        <div className="w-full px-6 py-4 flex flex-col items-center gap-6">
          {data.title && <p className="font-black text-center text-sm text-[#18181B]">{data.title}</p>}
          
          <div className="w-full max-w-[250px] flex flex-col relative bg-white border-l-4 border-b-4 border-[#18181B] pt-4 pr-4">
             <svg width="100%" height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="overflow-visible">
                <path d={pathData} fill="none" stroke={data.line_colour || '#00E599'} strokeWidth="4" strokeLinejoin="round" />
                {coordinates.map((c, i) => (
                  <circle key={i} cx={c.x} cy={c.y} r="6" fill={data.point_colour || '#18181B'} />
                ))}
             </svg>
             <div className="flex justify-between mt-2 w-full">
                {points.map((p, i) => (
                   <span key={i} className="text-[8px] font-bold text-[#18181B] truncate" style={{ width: `${100/points.length}%`, textAlign: i===0?'left':i===points.length-1?'right':'center' }}>
                     {p.label}
                   </span>
                ))}
             </div>
          </div>
          <ChartQuiz blockId={block.id} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} />
        </div>
      );
    }



    case 'Sparkle XP':
      return (
        <div className="w-full px-6 py-10 flex flex-col items-center justify-center relative">
          <div className="relative z-10 flex flex-col items-center gap-6">
            {data.title && (
              <h2 className="text-3xl font-black text-[#18181B] text-center tracking-tight">{data.title}</h2>
            )}
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-gray-400 mb-1">{data.label || 'Lifetime XP'}</span>
              <span className="text-5xl font-black text-[#18181B]">+{data.xp_amount || 84}</span>
            </div>
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
              { top: '25%', left: '60%', size: 18, delay: '0.1s' },
              { top: '10%', left: '45%', size: 14, delay: '0.5s' },
              { top: '50%', left: '85%', size: 22, delay: '0.3s' },
              { top: '85%', left: '20%', size: 16, delay: '0.4s' },
              { top: '45%', left: '30%', size: 12, delay: '0.7s' },
              { top: '60%', left: '10%', size: 18, delay: '0.2s' },
              { top: '15%', left: '75%', size: 20, delay: '0.6s' }
            ].map((sparkle, i) => (
              <svg 
                key={i} 
                className="absolute text-[#8B5CF6] animate-mascot-pulse" 
                style={{ top: sparkle.top, left: sparkle.left, width: sparkle.size, height: sparkle.size, animationDelay: sparkle.delay }} 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" />
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
        <div className="w-full px-6 py-6 flex flex-row items-center justify-center gap-4">
          <svg viewBox="0 0 40 40" className="w-14 h-14 drop-shadow-sm animate-mascot-bounce">
            <circle cx="20" cy="20" r="16" fill="#F59E0B" stroke="#18181B" strokeWidth="3" />
            <circle cx="20" cy="18.5" r="14.5" fill="#FDE047" />
            <circle cx="20" cy="18.5" r="10" fill="none" stroke="#D97706" strokeWidth="1.5" opacity="0.5" />
            <circle cx="16.5" cy="15.5" r="4.5" fill="#FBBF24" stroke="#18181B" strokeWidth="2" />
            <circle cx="22" cy="19" r="4.5" fill="#FBBF24" stroke="#18181B" strokeWidth="2" />
          </svg>
          <span className="font-black text-[32px] text-[#18181B]">{data.coins_amount ?? 0}</span>
        </div>
      );

    case 'Gem Reward':
      return (
        <div className="w-full px-6 py-6 flex flex-row items-center justify-center gap-4">
          <svg viewBox="0 0 40 40" className="w-14 h-14 drop-shadow-sm animate-mascot-float">
            <polygon points="20,4 34,12 34,28 20,36 6,28 6,12" fill="#10B981" stroke="#18181B" strokeWidth="3" strokeLinejoin="round" />
            <polygon points="20,6.5 31.5,13 31.5,27 20,33.5 8.5,27 8.5,13" fill="#34D399" />
            <polygon points="8.5,22 31.5,10 31.5,15 8.5,27" fill="#ffffff" opacity="0.3" />
            <polyline points="11,17 11,25 20,30 29,25 29,17" fill="none" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-black text-[32px] text-[#18181B]">{data.gems_amount ?? 0}</span>
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
        'Back Button': { icon: ArrowLeft, color: '#00E599', label: 'Back' },
        'Skip Button': { icon: FastForward, color: '#00E599', label: 'Skip' }
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

    case 'Next Lesson Button':
      return (
        <div className="w-full px-6 py-4">
          <button 
            type="button"
            className="w-full px-6 py-2.5 flex items-center justify-center border-[2px] border-[#18181B] rounded-md shadow-[4px_4px_0_#18181B] text-[#18181B] font-bold text-lg hover:-translate-y-[2px] hover:shadow-[5px_5px_0_#18181B] active:translate-y-[2px] active:shadow-[2px_2px_0_#18181B] transition-all"
            style={{ backgroundColor: '#00E599' }}
          >
            {data.label || 'Next lesson'}
          </button>
        </div>
      );
    case 'Rewards Summary':
      return (
        <div className="w-full px-2 py-4">
          <div className="w-full mx-auto max-w-[400px] bg-white border-[3px] border-[#18181B] rounded-[8px] shadow-[4px_4px_0_#18181B] py-2 px-2 flex flex-row items-center justify-between gap-1 overflow-hidden">
            
            {/* XP */}
            <div className="flex items-center gap-1 shrink flex-1 justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8 text-[#8B5CF6] shrink-0" fill="currentColor">
                <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" />
              </svg>
              <span className="font-black text-lg sm:text-xl text-[#18181B] truncate">{data.xp_amount ?? 0}</span>
            </div>

            {/* Coins */}
            <div className="flex items-center gap-1 shrink flex-1 justify-center">
              <svg viewBox="0 0 40 40" className="w-7 h-7 sm:w-9 sm:h-9 drop-shadow-sm shrink-0">
                <circle cx="20" cy="20" r="16" fill="#F59E0B" stroke="#18181B" strokeWidth="3" />
                <circle cx="20" cy="18.5" r="14.5" fill="#FDE047" />
                <circle cx="20" cy="18.5" r="10" fill="none" stroke="#D97706" strokeWidth="1.5" opacity="0.5" />
                <circle cx="16.5" cy="15.5" r="4.5" fill="#FBBF24" stroke="#18181B" strokeWidth="2" />
                <circle cx="22" cy="19" r="4.5" fill="#FBBF24" stroke="#18181B" strokeWidth="2" />
              </svg>
              <span className="font-black text-lg sm:text-xl text-[#18181B] truncate">{data.coins_amount ?? 0}</span>
            </div>

            {/* Gems */}
            <div className="flex items-center gap-1 shrink flex-1 justify-center">
              <svg viewBox="0 0 40 40" className="w-7 h-7 sm:w-9 sm:h-9 drop-shadow-sm shrink-0">
                <polygon points="20,4 34,12 34,28 20,36 6,28 6,12" fill="#10B981" stroke="#18181B" strokeWidth="3" strokeLinejoin="round" />
                <polygon points="20,6.5 31.5,13 31.5,27 20,33.5 8.5,27 8.5,13" fill="#34D399" />
                <polygon points="8.5,22 31.5,10 31.5,15 8.5,27" fill="#ffffff" opacity="0.3" />
                <polyline points="11,17 11,25 20,30 29,25 29,17" fill="none" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-black text-lg sm:text-xl text-[#18181B] truncate">{data.gems_amount ?? 0}</span>
            </div>

          </div>
        </div>
      );

    case 'Reward Icon':
      const renderIcon = () => {
        if (data.icon_type === 'Gold Coin') {
          return (
            <svg viewBox="0 0 40 40" className="w-14 h-14 drop-shadow-sm animate-mascot-bounce">
              <circle cx="20" cy="20" r="16" fill="#F59E0B" stroke="#18181B" strokeWidth="3" />
              <circle cx="20" cy="18.5" r="14.5" fill="#FDE047" />
              <circle cx="20" cy="18.5" r="10" fill="none" stroke="#D97706" strokeWidth="1.5" opacity="0.5" />
              <circle cx="16.5" cy="15.5" r="4.5" fill="#FBBF24" stroke="#18181B" strokeWidth="2" />
              <circle cx="22" cy="19" r="4.5" fill="#FBBF24" stroke="#18181B" strokeWidth="2" />
            </svg>
          );
        } else if (data.icon_type === 'Green Gem') {
          return (
            <svg viewBox="0 0 40 40" className="w-14 h-14 drop-shadow-sm animate-mascot-float">
              <polygon points="20,4 34,12 34,28 20,36 6,28 6,12" fill="#10B981" stroke="#18181B" strokeWidth="3" strokeLinejoin="round" />
              <polygon points="20,6.5 31.5,13 31.5,27 20,33.5 8.5,27 8.5,13" fill="#34D399" />
              <polygon points="8.5,22 31.5,10 31.5,15 8.5,27" fill="#ffffff" opacity="0.3" />
              <polyline points="11,17 11,25 20,30 29,25 29,17" fill="none" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          );
        } else {
          // XP Sparkle
          return (
            <svg viewBox="0 0 24 24" className="w-14 h-14 text-[#8B5CF6] animate-mascot-pulse" fill="currentColor">
              <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" />
            </svg>
          );
        }
      };

      return (
        <div className="w-full px-6 py-6 flex flex-row items-center justify-center gap-4">
          {renderIcon()}
          {data.show_value !== 'Off' && (
            <span className="font-black text-[32px] text-[#18181B]">{data.value ?? 0}</span>
          )}
        </div>
      );

    case 'Back to Courses Button':
      return (
        <div className="w-full px-6 py-4">
          <button 
            type="button" 
            className="w-full px-4 py-2.5 flex items-center justify-center gap-2 border-[2px] border-[#18181B] rounded-md shadow-[4px_4px_0_#18181B] bg-white text-[#18181B] font-bold text-base hover:-translate-y-[2px] hover:shadow-[5px_5px_0_#18181B] active:translate-y-[2px] active:shadow-[2px_2px_0_#18181B] transition-all whitespace-nowrap"
          >
            <ArrowLeft strokeWidth={2.5} className="w-5 h-5 shrink-0" />
            <span className="truncate">{data.label || 'Back to courses'}</span>
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
