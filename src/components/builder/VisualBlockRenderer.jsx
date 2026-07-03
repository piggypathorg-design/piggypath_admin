import React from 'react';
import { 
  Star, Coins, Award, Trophy, MessageCircle, ArrowRight, ArrowLeft, FastForward,
  PieChart, BarChart2, TrendingUp, Table as TableIcon, HelpCircle, Move, Link, ListOrdered, Sliders, Edit3, MousePointer2, MessageSquare
} from 'lucide-react';
import mascotImg from '../../assets/mascot.png';

const VisualBlockRenderer = ({ block, version }) => {
  const data = block[version] || {};
  
  // Helper to get alignment class
  const getAlign = (align) => {
    if (align === 'Center') return 'text-center justify-center';
    if (align === 'Right') return 'text-right justify-end';
    return 'text-left justify-start';
  };

  const alignClass = getAlign(data.alignment);
  const color = data.text_colour || '#1E293B';
  const font = data.font || 'Arial';

  switch (block.type) {
    // 1 Content Components
    case 'Title':
      return (
        <h1 
          className={`w-full h-full flex items-center ${alignClass} break-words overflow-hidden`}
          style={{ color, fontFamily: font, fontSize: `${data.font_size || 32}px`, fontWeight: '900' }}
        >
          {data.title_text || 'Enter Title'}
        </h1>
      );

    case 'Paragraph':
    case 'Rich Text':
      return (
        <p 
          className={`w-full h-full flex items-start ${alignClass} break-words overflow-hidden`}
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
      );

    case 'Divider':
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div 
            className="w-full" 
            style={{ 
              borderBottom: `2px ${data.style?.toLowerCase() || 'solid'} #E2E8F0`
            }}
          ></div>
        </div>
      );

    case 'Spacer':
      return (
        <div className="w-full h-full bg-blue-500/10 border-2 border-dashed border-blue-500/30 flex items-center justify-center text-blue-500 text-xs font-bold uppercase rounded">
          Spacer ({data.height || 16}px)
        </div>
      );

    case 'Card':
      return (
        <div 
          className="w-full h-full p-4 flex flex-col gap-2 overflow-hidden"
          style={{
            backgroundColor: data.block_colour || '#F1F5F9',
            border: `3px ${data.border?.toLowerCase() || 'solid'} ${data.border_colour || '#E2E8F0'}`,
            borderRadius: `${data.border_radius || 8}px`,
            color: data.text_colour || '#1E293B'
          }}
        >
          {data.title_text && <h3 className="font-bold text-lg">{data.title_text}</h3>}
          {data.body_text && <p className="text-sm opacity-90 leading-relaxed">{data.body_text}</p>}
        </div>
      );

    // 2 Media Components
    case 'Image':
    case 'Video':
    case 'Animation':
      return (
        <div 
          className={`w-full h-full flex flex-col ${alignClass}`}
        >
          <div 
            className="flex-1 bg-gray-200 dark:bg-gray-800 border-[3px] border-[#18181B] dark:border-white w-full h-full flex items-center justify-center overflow-hidden"
            style={{
              borderRadius: data.frame_shape === 'Circle' ? '50%' : `${data.frame_roundness || 0}px`
            }}
          >
            {data.source ? (
              block.type === 'Image' ? (
                <img src={data.source} alt={data.alt_text} className="w-full h-full object-cover" />
              ) : (
                <div className="text-[#18181B] dark:text-white font-bold">{block.type} Placeholder</div>
              )
            ) : (
              <span className="text-[#A1A1AA] font-bold text-sm">No Media Source</span>
            )}
          </div>
          {data.caption && <p className="text-xs text-center mt-2 text-[#71717A]">{data.caption}</p>}
        </div>
      );

    case 'Audio':
      return (
        <div className="w-full h-full bg-white dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-white rounded-full flex items-center px-4 py-2 gap-3 shadow-[4px_4px_0_#18181B]">
          <div className="w-8 h-8 rounded-full bg-[#00E599] flex items-center justify-center">
            <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-[#18181B] border-b-4 border-b-transparent ml-1"></div>
          </div>
          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-[#8B5CF6]"></div>
          </div>
        </div>
      );

    // 3 Mascot
    case 'Mascot Emotion':
      return (
        <div className={`w-full h-full flex ${alignClass} items-end`}>
          <div className="w-24 h-24 bg-[#F4F4F5] dark:bg-[#27272A] rounded-full border-[3px] border-[#18181B] flex items-center justify-center shadow-[4px_4px_0_#18181B] overflow-hidden">
            {data.source ? (
              <img src={data.source} alt="Mascot" className="w-full h-full object-cover" />
            ) : (
              <img src={mascotImg} alt="Mascot Placeholder" className="w-full h-full object-cover" />
            )}
          </div>
        </div>
      );

    case 'Mascot Bubble':
      return (
        <div className="w-full h-full relative">
          <div 
            className="w-full h-full p-4 border-[3px] border-[#18181B] rounded-2xl shadow-[6px_6px_0_#18181B] flex items-center justify-center overflow-hidden relative z-10"
            style={{
              backgroundColor: data.bubble_colour || '#FFFFFF',
              color: data.text_colour || '#1E293B',
              fontFamily: font,
              fontSize: `${data.font_size || 15}px`,
              fontWeight: data.font_style === 'Bold' ? 'bold' : 'normal',
              fontStyle: data.font_style === 'Italic' ? 'italic' : 'normal',
            }}
          >
            {data.text || 'Mascot says...'}
          </div>
          <div 
            className="absolute -bottom-3 left-8 w-6 h-6 border-b-[3px] border-r-[3px] border-[#18181B] bg-white transform rotate-45 z-0"
            style={{ backgroundColor: data.bubble_colour || '#FFFFFF' }}
          ></div>
        </div>
      );

    // 4 Activity
    case 'MCQ':
      return (
        <div className="w-full h-full flex flex-col gap-3 bg-white dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-white rounded-xl p-4 shadow-[4px_4px_0_#18181B]">
          <div className="flex items-start gap-2">
            <HelpCircle className="text-[#8B5CF6] shrink-0 mt-1" size={20} />
            <p className="font-bold text-[#18181B] dark:text-white leading-tight">{data.question || 'Multiple Choice Question?'}</p>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            {[data.option_a, data.option_b, data.option_c, data.option_d].filter(Boolean).map((opt, i) => (
              <div key={i} className="px-3 py-2 border-[2px] border-[#E4E4E7] dark:border-[#3F3F46] rounded-lg text-sm font-semibold text-[#71717A] dark:text-[#A1A1AA]">
                {opt}
              </div>
            ))}
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
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#F4F4F5] dark:bg-[#18181B] border-[3px] border-dashed border-[#8B5CF6] rounded-xl p-4">
          <div className="w-12 h-12 bg-[#8B5CF6] rounded-full flex items-center justify-center shadow-[4px_4px_0_#18181B]">
            <ActivityIcon className="text-white" size={24} strokeWidth={3} />
          </div>
          <p className="font-bold text-center text-[#18181B] dark:text-white">{data.question || `${block.type} Activity`}</p>
          <div className="text-xs font-semibold text-[#71717A] px-2 py-1 bg-white dark:bg-[#27272A] rounded border-[2px] border-[#E4E4E7] dark:border-[#3F3F46]">Interactive Component</div>
        </div>
      );

    // 5 Visualisation
    case 'Pie Chart':
    case 'Bar Graph':
    case 'Line Graph':
    case 'Table':
      const VizIcon = {
        'Pie Chart': PieChart, 'Bar Graph': BarChart2, 'Line Graph': TrendingUp, 'Table': TableIcon
      }[block.type] || PieChart;
      return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-white dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-white rounded-xl shadow-[4px_4px_0_#18181B] overflow-hidden p-4">
          <VizIcon className="text-[#00E599]" size={40} strokeWidth={2} />
          <p className="font-bold text-center text-[#18181B] dark:text-white">{data.title || `${block.type} Visualisation`}</p>
        </div>
      );

    // 6 Feedback
    case 'XP Reward':
      return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-[#FEF3C7] border-[3px] border-[#18181B] rounded-2xl shadow-[6px_6px_0_#18181B] p-4 transform -rotate-2">
          <Star className="text-[#F59E0B] fill-[#F59E0B]" size={48} strokeWidth={3} />
          <h2 className="text-2xl font-black text-[#18181B]">+{data.xp_amount || 10} XP</h2>
          <p className="text-sm font-bold text-[#92400E] uppercase">{data.label || 'You Earned!'}</p>
        </div>
      );
      
    case 'Coin Reward':
      return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-[#FEF08A] border-[3px] border-[#18181B] rounded-2xl shadow-[6px_6px_0_#18181B] p-4 transform rotate-2">
          <Coins className="text-[#CA8A04]" size={48} strokeWidth={3} />
          <h2 className="text-2xl font-black text-[#18181B]">+{data.coins_amount || 5}</h2>
          <p className="text-sm font-bold text-[#854D0E] uppercase">{data.label || 'Coins Earned!'}</p>
        </div>
      );

    case 'Badge':
    case 'Achievement Card':
      const FBIcon = block.type === 'Badge' ? Award : Trophy;
      return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] border-[3px] border-[#18181B] rounded-2xl shadow-[8px_8px_0_#18181B] p-6 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-2 border-[3px] border-white/40">
            <FBIcon size={32} strokeWidth={3} />
          </div>
          <h2 className="text-xl font-black">{data.title || data.badge_name || 'Achievement!'}</h2>
          {(data.body || data.label) && <p className="text-sm font-semibold opacity-90">{data.body || data.label}</p>}
        </div>
      );

    case 'Progress Bar':
      return (
        <div className="w-full h-full flex items-center p-4">
          <div className="w-full h-4 bg-[#E4E4E7] dark:bg-[#3F3F46] rounded-full border-[2px] border-[#18181B] overflow-hidden">
            <div className="h-full bg-[#00E599]" style={{ width: `${Math.min(100, Math.max(0, data.value || 50))}%` }}></div>
          </div>
        </div>
      );
      
    case 'Mascot Feedback':
      return (
        <div className="w-full h-full flex items-center gap-4 bg-white dark:bg-[#27272A] p-4 rounded-2xl border-[3px] border-[#18181B] shadow-[6px_6px_0_#18181B]">
          <div className="w-16 h-16 bg-[#F4F4F5] dark:bg-[#27272A] rounded-full border-[3px] border-[#18181B] shrink-0 flex items-center justify-center overflow-hidden">
            <img src={mascotImg} alt="Mascot" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-[#8B5CF6] text-xs uppercase mb-1">{data.tone || 'Happy'}</div>
            <p className="font-bold text-[#18181B] dark:text-white leading-snug">{data.message || 'Great job on this activity!'}</p>
          </div>
        </div>
      );

    // 7 Navigation Buttons
    case 'Continue Button':
    case 'Back Button':
    case 'Skip Button':
      const NavMap = {
        'Continue Button': { icon: ArrowRight, color: '#00E599', label: 'Continue' },
        'Back Button': { icon: ArrowLeft, color: '#F4F4F5', label: 'Back' },
        'Skip Button': { icon: FastForward, color: '#E4E4E7', label: 'Skip' }
      };
      const navConf = NavMap[block.type];
      const NavIcon = navConf.icon;
      return (
        <div className="w-full h-full flex items-center justify-center">
          <button 
            className="w-full h-full px-6 py-3 flex items-center justify-center gap-2 border-[3px] border-[#18181B] rounded-xl font-black shadow-[4px_4px_0_#18181B] text-[#18181B]"
            style={{ backgroundColor: navConf.color }}
          >
            {block.type === 'Back Button' && <NavIcon size={20} strokeWidth={3} />}
            {navConf.label}
            {block.type !== 'Back Button' && <NavIcon size={20} strokeWidth={3} />}
          </button>
        </div>
      );

    default:
      return (
        <div className="w-full h-full bg-white dark:bg-[#27272A] border-[3px] border-[#18181B] rounded-xl flex items-center justify-center text-center p-4">
          <p className="font-bold text-[#18181B] dark:text-white">{block.type}</p>
        </div>
      );
  }
};

export default VisualBlockRenderer;
