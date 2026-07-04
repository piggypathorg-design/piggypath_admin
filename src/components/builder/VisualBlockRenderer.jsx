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
    'Laughing': 'animate-mascot-bounce',
    'Thinking': 'animate-mascot-float',
    'Love': 'animate-mascot-float',
    'Sad': 'animate-mascot-float',
    'Surprised': 'animate-mascot-wiggle',
    'Angry': 'animate-mascot-shake',
    'Confused': 'animate-mascot-wiggle',
    'Smart': 'animate-mascot-bounce',
    'Cool': 'animate-mascot-float',
    'Sleeping': 'animate-mascot-pulse opacity-80'
  };
  return map[opt] || '';
};

const VisualBlockRenderer = ({ block, version }) => {
  const data = block[version] || {};
  
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
        <div className={`w-full flex ${alignClass} py-4 px-6`}>
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
        <div className={`w-full flex ${alignClass} py-2 px-6`}>
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
            style={{ borderBottom: `3px ${data.style?.toLowerCase() || 'solid'} #E2E8F0` }}
          ></div>
        </div>
      );

    case 'Spacer':
      return (
        <div 
           className="w-full bg-transparent"
           style={{ height: `${data.height || 16}px` }}
        ></div>
      );

    case 'Card':
      return (
        <div className="w-full px-6 py-2">
          <div 
            className="w-full p-6 flex flex-col gap-3 shadow-[8px_8px_0_#18181B]"
            style={{
              backgroundColor: data.block_colour || '#FFFFFF',
              border: `4px ${data.border?.toLowerCase() || 'solid'} ${data.border_colour || '#18181B'}`,
              borderRadius: `${data.border_radius || 24}px`,
              color: data.text_colour || '#18181B'
            }}
          >
            {data.title_text && <h3 className="font-black text-xl">{data.title_text}</h3>}
            {data.body_text && <p className="text-sm font-bold opacity-90 leading-relaxed">{data.body_text}</p>}
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
              ) : (
                <div className="text-[#18181B] font-black text-xl">{block.type}</div>
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
               <div 
                  className="w-[100px] h-[100px]"
                  style={{
                    backgroundImage: `url(${mascotGridImg})`,
                    backgroundSize: '400% 300%', 
                    backgroundPosition: getMascotBackgroundPosition(mascotType),
                    transform: 'scale(1.4)', // Zoom in to crop blue borders
                    mixBlendMode: 'multiply' // Remove white background
                  }}
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
              {[data.option_a, data.option_b, data.option_c, data.option_d].filter(Boolean).map((opt, i) => (
                <div key={i} className="px-4 py-3 bg-[#F4F4F5] border-[3px] border-[#18181B] rounded-2xl text-sm font-bold text-[#18181B] shadow-[4px_4px_0_#18181B] hover:-translate-y-1 hover:shadow-[6px_6px_0_#18181B] transition-all cursor-pointer">
                  {opt}
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'Drag & Drop':
    case 'Match Pairs':
    case 'Arrange':
    case 'Slider':
    case 'Fill in the Blank':
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
          <div className="w-[80%] flex flex-col items-center justify-center gap-2 bg-[#FFD100] border-[4px] border-[#18181B] rounded-[32px] shadow-[12px_12px_0_#18181B] p-8 transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
            <Star className="text-white fill-white drop-shadow-[0_4px_0_#18181B]" size={64} strokeWidth={2} />
            <h2 className="text-4xl font-black text-[#18181B]">+{data.xp_amount || 10} XP</h2>
            <p className="text-sm font-black text-[#18181B] uppercase tracking-widest bg-white px-4 py-1 rounded-full border-[3px] border-[#18181B]">{data.label || 'You Earned!'}</p>
          </div>
        </div>
      );
      
    case 'Coin Reward':
      return (
        <div className="w-full px-6 py-6 flex justify-center">
          <div className="w-[80%] flex flex-col items-center justify-center gap-2 bg-[#00E599] border-[4px] border-[#18181B] rounded-[32px] shadow-[12px_12px_0_#18181B] p-8 transform rotate-3 hover:rotate-0 transition-transform cursor-pointer">
            <Coins className="text-white drop-shadow-[0_4px_0_#18181B]" size={64} strokeWidth={3} />
            <h2 className="text-4xl font-black text-[#18181B]">+{data.coins_amount || 5}</h2>
            <p className="text-sm font-black text-[#18181B] uppercase tracking-widest bg-white px-4 py-1 rounded-full border-[3px] border-[#18181B]">{data.label || 'Coins Earned!'}</p>
          </div>
        </div>
      );

    case 'Badge':
    case 'Achievement Card':
      const FBIcon = block.type === 'Badge' ? Award : Trophy;
      return (
        <div className="w-full px-6 py-6">
          <div className="w-full flex flex-col items-center justify-center gap-4 bg-[#8B5CF6] border-[4px] border-[#18181B] rounded-[32px] shadow-[12px_12px_0_#18181B] p-8 text-white text-center">
            <div className="w-20 h-20 bg-white rounded-2xl border-[4px] border-[#18181B] flex items-center justify-center shadow-[4px_4px_0_#18181B] transform rotate-6 mb-2">
              <FBIcon size={40} strokeWidth={3} className="text-[#8B5CF6]" />
            </div>
            <h2 className="text-2xl font-black">{data.title || data.badge_name || 'Achievement!'}</h2>
            {(data.body || data.label) && <p className="text-sm font-bold opacity-90">{data.body || data.label}</p>}
          </div>
        </div>
      );

    case 'Mascot Emotion':
      const mascotTypeEmotion = data.mascot_type || 'Happy';
      return (
        <div className={`w-full flex ${alignClass} py-4 px-6`}>
          <div className={`w-32 h-32 flex items-center justify-center ${getMascotAnimation(mascotTypeEmotion)}`}>
            <div 
                className="w-[120px] h-[120px]"
                style={{
                  backgroundImage: `url(${mascotGridImg})`,
                  backgroundSize: '400% 300%', 
                  backgroundPosition: getMascotBackgroundPosition(mascotTypeEmotion),
                  transform: 'scale(1.5)', // Zoom in to crop blue borders
                  mixBlendMode: 'multiply' // Remove white background
                }}
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
