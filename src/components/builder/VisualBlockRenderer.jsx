import React, { useState, useEffect, useRef, useMemo } from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, errorInfo) { console.error("Block rendering error:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full p-6 border-2 border-red-200 bg-red-50 rounded-xl flex flex-col items-center justify-center">
          <span className="text-red-500 font-bold mb-1">Block Error</span>
          <span className="text-xs text-red-400 text-center">Something went wrong rendering this block.</span>
        </div>
      );
    }
    return this.props.children;
  }
}
import { 
  Star, Coins, Award, Trophy, MessageCircle, ArrowRight, ArrowLeft, FastForward,
  PieChart, BarChart2, TrendingUp, Table as TableIcon, HelpCircle, Move, Link, ListOrdered, Sliders, Edit3, MousePointer2, MessageSquare, Check, CheckCircle, GripVertical, Volume2
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, errorInfo) { console.error("Block rendering error:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full p-6 border-2 border-red-200 bg-red-50 rounded-xl flex flex-col items-center justify-center">
          <span className="text-red-500 font-bold mb-1">Block Error</span>
          <span className="text-xs text-red-400 text-center">Something went wrong rendering this block.</span>
        </div>
      );
    }
    return this.props.children;
  }
}
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable
} from '@dnd-kit/core';
import Confetti from '../ui/Confetti';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, errorInfo) { console.error("Block rendering error:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full p-6 border-2 border-red-200 bg-red-50 rounded-xl flex flex-col items-center justify-center">
          <span className="text-red-500 font-bold mb-1">Block Error</span>
          <span className="text-xs text-red-400 text-center">Something went wrong rendering this block.</span>
        </div>
      );
    }
    return this.props.children;
  }
}
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { plbSchema } from '../../utils/plbSchema';
import mascotGridImg from '../../assets/mascot_grid.png';
import coinsImg from '../../assets/components/Coins.png';
import gemsImg from '../../assets/components/gems.png';
import xpImg from '../../assets/components/XP Icon.png';
import mascotAngry from '../../assets/mascots/Angry.png';
import mascotConfused from '../../assets/mascots/Confused.png';
import mascotCool from '../../assets/mascots/Cool.png';
import mascotHappy from '../../assets/mascots/Happy.png';
import mascotLaughing from '../../assets/mascots/Laughing.png';
import mascotLove from '../../assets/mascots/Love.png';
import mascotSad from '../../assets/mascots/Sad.png';
import mascotSleeping from '../../assets/mascots/Sleeping.png';
import mascotSmart from '../../assets/mascots/Smart.png';
import mascotSurprised from '../../assets/mascots/Surprised.png';
import mascotThinking from '../../assets/mascots/Thinking.png';
import mascotWinking from '../../assets/mascots/Winking.png';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, errorInfo) { console.error("Block rendering error:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full p-6 border-2 border-red-200 bg-red-50 rounded-xl flex flex-col items-center justify-center">
          <span className="text-red-500 font-bold mb-1">Block Error</span>
          <span className="text-xs text-red-400 text-center">Something went wrong rendering this block.</span>
        </div>
      );
    }
    return this.props.children;
  }
}

const MASCOT_IMAGES = {
  Happy: mascotHappy,
  Confused: mascotConfused,
  Surprised: mascotSurprised,
  Sleeping: mascotSleeping,
  Smart: mascotSmart,
  Love: mascotLove,
  Angry: mascotAngry,
  Cool: mascotCool,
  Laughing: mascotLaughing,
  Sad: mascotSad,
  Thinking: mascotThinking,
  Winking: mascotWinking
};

const TimerBlock = ({ blockId, data, isPreviewMode }) => {
  const duration = parseInt(data.duration_seconds || '60', 10);
  const [timeLeft, setTimeLeft] = useState(duration);
  const isActive = isPreviewMode && (data.auto_start !== 'No');

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(t);
  }, [isActive, timeLeft]);

  const percentage = (timeLeft / duration) * 100;
  
  return (
    <div className="w-full px-6 py-4 flex flex-col items-center">
       <div className="w-32 h-32 rounded-full border-[6px] border-[#18181B] flex items-center justify-center relative bg-white shadow-[6px_6px_0_#18181B]">
          <div className="absolute inset-0 rounded-full flex items-center justify-center z-10">
            <span className="font-mono text-2xl font-black text-[#18181B]">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
          </div>
          <svg className="absolute inset-0 w-full h-full transform -rotate-90 z-0" viewBox="0 0 100 100">
             <circle cx="50" cy="50" r="44" fill="none" stroke="#E5E7EB" strokeWidth="8" />
             <circle cx="50" cy="50" r="44" fill="none" stroke={timeLeft <= 10 ? '#FF6B6B' : '#00E599'} strokeWidth="8" strokeDasharray={`${percentage * 2.76} 276`} className="transition-all duration-1000 linear" strokeLinecap="round" />
          </svg>
       </div>
    </div>
  );
};

const getObjectFit = (fit) => {
  switch (fit) {
    case 'Fit': return 'contain';
    case 'Stretch': return 'fill';
    case 'Tile': return 'none';
    case 'Center': return 'none';
    case 'Span': return 'cover';
    case 'Fill':
    default: return 'cover';
  }
};

const AudioBlock = ({ data, isPreviewMode }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef(null);
  const showIcon = data.show_icon !== 'Off';

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handlePause);
    };
  }, [data.source]);

  return (
    <div className={`w-full flex flex-col items-center justify-center py-4 px-6 gap-2`}>
       {showIcon && (
         <div className={`w-16 h-16 bg-[#00E599] rounded-full neo-border flex items-center justify-center neo-shadow mb-2 transition-all duration-300 ${isPlaying ? 'animate-pulse scale-110 shadow-[var(--neo-shadow-offset-xl)_var(--neo-shadow-offset-xl)_0_var(--neo-border-color)]' : ''}`}>
            <Volume2 size={32} className="text-[#18181B]" />
         </div>
       )}
       {data.source ? (
         <audio 
           ref={audioRef}
           src={data.source} 
           controls={data.show_controls !== 'Off'} 
           className={`w-full max-w-[250px] ${data.show_controls === 'Off' ? 'hidden' : ''}`} 
           autoPlay={data.autoplay === 'On' && isPreviewMode} 
           loop={data.loop === 'On'} 
           muted={true}
         />
       ) : (
         <span className="text-[#A1A1AA] font-black uppercase tracking-widest text-sm">No Audio Source</span>
       )}
    </div>
  );
};

const useShuffledOptions = (blockId, optionsArray) => {
  const [shuffled, setShuffled] = React.useState([]);
  
  React.useEffect(() => {
    const valid = [...optionsArray].filter(o => o.text);
    for (let i = valid.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [valid[i], valid[j]] = [valid[j], valid[i]];
    }
    setShuffled(valid);
  }, [blockId, ...optionsArray.map(o => o.text)]);
  
  return shuffled;
};

const ChartQuiz = ({ blockId, data, interactionState, setInteractionState, isPreviewMode, onAnswered, isChecking, playSound }) => {
  const shuffledOptions = useShuffledOptions(blockId, [
    { key: 'A', text: data.quiz_option_a },
    { key: 'B', text: data.quiz_option_b },
    { key: 'C', text: data.quiz_option_c },
    { key: 'D', text: data.quiz_option_d }
  ]);

  const correctOptKey = data.quiz_correct_option || 'A';
  const selectedKey = interactionState?.[blockId]?.chartQuizSelectedKey;
  const hasSelection = selectedKey !== undefined;
  const isCorrectSelection = hasSelection && selectedKey === correctOptKey;

  if (!data.quiz_question && !data.quiz_option_a) return null;

  return (
    <div className="w-full mt-6 flex flex-col gap-3">
      {data.quiz_question && <p className="font-black text-center text-sm mb-2">{data.quiz_question}</p>}
      
      {shuffledOptions.map((opt, index) => {
        const isSelected = selectedKey === opt.key;
        let bgClass = "bg-white text-[#18181B]";
        let animClass = "";
        
        if (isSelected) {
          if (isChecking) {
            if (opt.key === correctOptKey) {
              bgClass = "bg-[#00E599] text-[#18181B]";
              animClass = "animate-mascot-bounce";
            } else {
              bgClass = "bg-[#FF6B6B] text-white";
              animClass = "animate-mascot-shake";
            }
          } else {
            bgClass = "bg-blue-100 border-blue-500 text-blue-900";
            animClass = "scale-95";
          }
        } else if (isChecking && opt.key === correctOptKey && hasSelection) {
           // Show the correct one even if not selected
           bgClass = "bg-[#00E599]/30 text-[#18181B] border-[#00E599]";
        }
        
        return (
          <div 
            key={opt.key} 
            role="button"
            tabIndex={isPreviewMode && !isChecking ? 0 : -1}
            onKeyDown={(e) => {
              if (isPreviewMode && !isChecking && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                if (playSound) playSound('click');
                setInteractionState({ ...interactionState, [blockId]: { ...interactionState?.[blockId], chartQuizSelectedKey: opt.key } });
                if (onAnswered) onAnswered({ isAnswered: true, isCorrect: opt.key === correctOptKey });
              }
            }}
            onClick={() => {
              if (isPreviewMode && !isChecking) {
                if (playSound) playSound('click');
                setInteractionState({ ...interactionState, [blockId]: { ...interactionState?.[blockId], chartQuizSelectedKey: opt.key } });
                if (onAnswered) onAnswered({ isAnswered: true, isCorrect: opt.key === correctOptKey });
              }
            }}
            className={`px-4 py-3 rounded-[var(--neo-radius-xl)] text-sm font-bold shadow-[var(--neo-shadow-offset)_var(--neo-shadow-offset)_0_var(--neo-border-color)] border-[var(--neo-border-width)] break-words flex items-center justify-center gap-2 ${isSelected && !isChecking ? 'border-blue-500' : 'border-[var(--neo-border-color)]'} text-center transition-all animate-in fade-in slide-in-from-bottom-2 ${isPreviewMode && !isChecking ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-[var(--neo-shadow-offset-lg)_var(--neo-shadow-offset-lg)_0_var(--neo-border-color)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2' : 'cursor-default focus:outline-none'} ${bgClass} ${animClass}`}
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
          >
            {isChecking && isSelected && opt.key === correctOptKey && <LucideIcons.CheckCircle size={16} />}
            {isChecking && isSelected && opt.key !== correctOptKey && <LucideIcons.XCircle size={16} />}
            {isChecking && !isSelected && opt.key === correctOptKey && hasSelection && <LucideIcons.CheckCircle size={16} />}
            <span>{opt.text}</span>
          </div>
        );
      })}
      
      {hasSelection && isChecking && (
        <div className={`mt-2 p-4 rounded-[var(--neo-radius-lg)] border-[var(--neo-border-width)] border-[var(--neo-border-color)] shadow-[var(--neo-shadow-offset)_var(--neo-shadow-offset)_0_var(--neo-border-color)] text-sm font-bold ${isCorrectSelection ? 'bg-[#00E599] text-[#18181B]' : 'bg-[#FF6B6B] text-white'}`}>
          <span className="underline decoration-2 underline-offset-2 mb-1 block">Explanation</span>
          {isCorrectSelection ? (data.quiz_why_correct || 'That is correct!') : (data.quiz_why_incorrect || 'That is incorrect, please try again.')}
        </div>
      )}
    </div>
  );
};

const MatchPairsInteractive = ({ blockId, data, interactionState, setInteractionState, isPreviewMode, onAnswered, isChecking, playSound }) => {
  const numPairs = parseInt(data.number_of_pairs || '3', 10);
  
  const [shuffledRightItems, setShuffledRightItems] = React.useState([]);
  
  React.useEffect(() => {
    let rItems = [];
    for (let i = 1; i <= numPairs; i++) {
      rItems.push({ id: i, text: data[`pair_${i}_b`] || `Pair ${i} B` });
    }
    for (let i = rItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rItems[i], rItems[j]] = [rItems[j], rItems[i]];
    }
    setShuffledRightItems(rItems);
  }, [blockId, data, numPairs]);

  const state = (interactionState && interactionState[blockId]) || {
    leftSelected: null,
    rightSelected: null,
    matchedPairs: [],
    errorLeft: null,
    errorRight: null
  };

  const handleLeftClick = (id) => {
    if (!isPreviewMode || isChecking) return;
    if (state.matchedPairs.includes(id)) return;
    if (playSound) playSound('click');
    
    setInteractionState({
      ...interactionState,
      [blockId]: {
        ...state,
        leftSelected: id,
        errorLeft: null,
        errorRight: null
      }
    });
  };

  const handleRightClick = (id) => {
    if (!isPreviewMode || isChecking) return;
    if (state.matchedPairs.includes(id)) return;
    if (!state.leftSelected) return;

    const isMatch = state.leftSelected === id;
    
    if (playSound) {
      playSound(isMatch ? 'correct' : 'incorrect');
    }

    if (isMatch) {
      const newMatched = [...state.matchedPairs, id];
      setInteractionState({
        ...interactionState,
        [blockId]: {
          ...state,
          leftSelected: null,
          matchedPairs: newMatched
        }
      });
      if (onAnswered) {
        onAnswered({ isAnswered: newMatched.length === numPairs, isCorrect: true });
      }
    } else {
      const leftSelected = state.leftSelected;
      setInteractionState({
        ...interactionState,
        [blockId]: {
          ...state,
          leftSelected: null,
          errorLeft: leftSelected,
          errorRight: id
        }
      });
      setTimeout(() => {
        setInteractionState(prev => {
           const s = prev[blockId];
           if (s && s.errorLeft === leftSelected) {
             return {
               ...prev,
               [blockId]: { ...s, errorLeft: null, errorRight: null, leftSelected: null }
             };
           }
           return prev;
        });
      }, 1000);
    }
  };

  return (
    <div className="w-full px-6 py-4 flex flex-col gap-6">
      <div className="w-full flex flex-col gap-4 bg-white border-[4px] border-[#18181B] rounded-[32px] p-6 shadow-[8px_8px_0_#18181B]">
        <div className="flex items-start gap-3 mb-2">
          <div className="w-10 h-10 bg-[#FFD100] rounded-full border-[3px] border-[#18181B] flex items-center justify-center shrink-0 shadow-[2px_2px_0_#18181B]">
            <Link className="text-[#18181B]" size={20} strokeWidth={3} />
          </div>
          <p className="font-black text-lg text-[#18181B] leading-tight pt-1">{data.question || 'Match the pairs!'}</p>
        </div>
        
        <div className="flex flex-col gap-3">
          {Array.from({ length: numPairs }).map((_, i) => {
            const id = i + 1;
            const isMatched = state.matchedPairs.includes(id);
            const isSelected = state.leftSelected === id;
            const isError = state.errorLeft === id;
            
            let bgClass = "bg-[#F4F4F5] border-[#18181B] text-[#18181B]";
            let animClass = "";
            let matchedRightText = null;

            if (isMatched) {
              bgClass = "bg-[#00E599] border-[#18181B] text-[#18181B]";
              matchedRightText = data[`pair_${id}_b`] || `Pair ${id} B`;
            } else if (isError) {
              bgClass = "bg-[#FF6B6B] border-[#FF6B6B] text-white";
              animClass = "animate-mascot-shake";
            } else if (isSelected) {
              bgClass = "bg-[#FFD100] border-[#18181B] text-[#18181B]";
            }

            return (
              <div key={id} className="flex gap-4 w-full">
                <div 
                  role="button"
                  tabIndex={isPreviewMode && !isChecking && !isMatched ? 0 : -1}
                  onKeyDown={(e) => {
                    if (isPreviewMode && !isChecking && !isMatched && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      handleLeftClick(id);
                    }
                  }}
                  onClick={() => handleLeftClick(id)}
                  className={`flex-1 neo-border rounded-[var(--neo-radius-xl)] px-4 py-3 neo-shadow font-bold text-sm text-center flex items-center justify-center break-words transition-colors select-none ${isPreviewMode && !isMatched ? 'cursor-pointer hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2' : 'focus:outline-none'} ${bgClass} ${animClass}`}
                >
                  {data[`pair_${id}_a`] || `Pair ${id} A`}
                </div>
                
                <div className={`flex-1 neo-border rounded-[var(--neo-radius-xl)] px-4 py-3 neo-shadow font-bold text-sm text-center flex items-center justify-center transition-colors select-none ${isMatched ? 'bg-[#00E599] border-[var(--neo-border-color)] text-[#18181B]' : 'bg-[#F4F4F5] border-[var(--neo-border-color)] border-dashed border-gray-400 text-gray-500'}`}>
                  {isMatched ? matchedRightText : (state.leftSelected ? 'Tap below to match' : 'Tap left first')}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mt-4 pt-4 border-t-[2px] border-dashed border-gray-200 min-h-[60px]">
           {shuffledRightItems.map((item) => {
             const isMatched = state.matchedPairs.includes(item.id);
             if (isMatched) return null;
             
             const isError = state.errorRight === item.id;
             let bgClass = "bg-white border-[#18181B] text-[#18181B]";
             let animClass = "";
             
             if (isError) {
               bgClass = "bg-[#FF6B6B] border-[#FF6B6B] text-white";
               animClass = "animate-mascot-shake";
             }
             
             return (
               <div 
                 key={item.id} 
                 role="button"
                 tabIndex={isPreviewMode ? 0 : -1}
                 onKeyDown={(e) => {
                   if (isPreviewMode && (e.key === 'Enter' || e.key === ' ')) {
                     e.preventDefault();
                     handleRightClick(item.id);
                   }
                 }}
                 onClick={() => handleRightClick(item.id)}
                 className={`px-3 py-1.5 border-[var(--neo-border-width)] border-[var(--neo-border-color)] shadow-[var(--neo-shadow-offset)_var(--neo-shadow-offset)_0_var(--neo-border-color)] rounded-[var(--neo-radius-md)] text-xs font-bold transition-all select-none ${isPreviewMode ? 'cursor-pointer hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2' : 'focus:outline-none'} ${bgClass} ${animClass}`}
               >
                  {item.text}
               </div>
             );
           })}
        </div>
      </div>
    </div>
  );
};

const HotspotInteractive = ({ blockId, data, interactionState, setInteractionState, isPreviewMode, onAnswered, isChecking, playSound }) => {
  const state = (interactionState && interactionState[blockId]) || { status: 'idle', clickX: null, clickY: null };

  const handleImageClick = (e) => {
    if (!isPreviewMode || isChecking) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const targetX = parseFloat(data.hotspot_x || 50);
    const targetY = parseFloat(data.hotspot_y || 50);
    const size = parseInt(data.hotspot_size || 2, 10) * 5; // size 2 => 10% radius
    
    const dist = Math.sqrt(Math.pow(x - targetX, 2) + Math.pow(y - targetY, 2));
    const isCorrect = dist <= size;
    
    if (playSound) {
      playSound(isCorrect ? 'correct' : 'incorrect');
    }

    setInteractionState({
      ...interactionState,
      [blockId]: {
        status: isCorrect ? 'correct' : 'error',
        clickX: x,
        clickY: y,
        missCount: isCorrect ? (state.missCount || 0) : (state.missCount || 0) + 1
      }
    });

    if (onAnswered) onAnswered({ isAnswered: true, isCorrect });

    if (!isCorrect) {
      setTimeout(() => {
        setInteractionState(prev => {
          if (prev[blockId]?.status === 'error') {
            return { ...prev, [blockId]: { ...prev[blockId], status: 'idle', clickX: null, clickY: null } };
          }
          return prev;
        });
      }, 1000);
    }
  };

  return (
    <div className="w-full px-6 py-4 flex flex-col gap-4 items-center">
       {data.question && <p className="font-black text-center text-lg leading-tight">{data.question}</p>}
       <div 
         className={`relative w-full max-w-sm ${data.image ? 'aspect-square' : 'py-8'} bg-gray-100 neo-border rounded-[var(--neo-radius-xl)] overflow-hidden neo-shadow transition-colors ${state.status === 'correct' ? 'border-[#00E599]' : state.status === 'error' ? 'border-[#FF6B6B] animate-mascot-shake' : 'border-[var(--neo-border-color)]'}`}
         onClick={handleImageClick}
       >
          {isPreviewMode && !isChecking && (
            <button 
              type="button"
              className="opacity-0 absolute top-0 left-0 w-full h-full cursor-crosshair focus:opacity-100 focus:bg-[#8B5CF6]/20 focus:outline-none focus:ring-4 focus:ring-inset focus:ring-[#8B5CF6] transition-all z-10 text-transparent focus:text-[#18181B] font-bold flex items-center justify-center"
              aria-label="Select hotspot region"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setInteractionState({ ...interactionState, [blockId]: { status: 'correct', clickX: parseFloat(data.hotspot_x || 50), clickY: parseFloat(data.hotspot_y || 50), missCount: 0 }});
                  if (onAnswered) onAnswered({ isAnswered: true, isCorrect: true });
                }
              }}
            >
              <span className="sr-only">Activate hotspot region</span>
            </button>
          )}
          {data.image ? (
            <img src={data.image} alt="Hotspot area" className={`w-full h-full object-cover transition-opacity ${isPreviewMode && state.status !== 'correct' ? 'cursor-crosshair hover:opacity-90' : ''}`} draggable={false} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold uppercase text-xs tracking-wider">No Image</div>
          )}
          
          {(!isPreviewMode || state.status === 'correct') && (
            <div 
              className={`absolute border-[4px] rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all ${state.status === 'correct' ? 'border-[#00E599] bg-[#00E599]/20' : 'border-[#F97316] border-dashed opacity-50 bg-[#F97316]/20'}`}
              style={{
                left: `${data.hotspot_x || 50}%`,
                top: `${data.hotspot_y || 50}%`,
                width: `${(data.hotspot_size || 2) * 10}%`,
                height: `${(data.hotspot_size || 2) * 10}%`
              }}
            >
              {state.status === 'correct' && <CheckCircle size={32} className="text-[#00E599] drop-shadow-[0_2px_0_#18181B]" />}
            </div>
          )}

          {isPreviewMode && state.status !== 'correct' && (state.missCount || 0) >= 3 && (
            <div 
              className="absolute rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping opacity-30 bg-white z-0 pointer-events-none"
              style={{
                left: `${data.hotspot_x || 50}%`,
                top: `${data.hotspot_y || 50}%`,
                width: `${(data.hotspot_size || 2) * 10}%`,
                height: `${(data.hotspot_size || 2) * 10}%`
              }}
            ></div>
          )}

          {state.status === 'error' && state.clickX !== null && (
            <div 
              className="absolute w-4 h-4 rounded-full bg-[#FF6B6B] border-[2px] border-white transform -translate-x-1/2 -translate-y-1/2 animate-mascot-bounce shadow-md pointer-events-none"
              style={{ left: `${state.clickX}%`, top: `${state.clickY}%` }}
            ></div>
          )}
       </div>

       {(state.status === 'correct' || (state.status === 'error' && state.missCount > 0)) && (
         <div className={`mt-2 p-4 w-full max-w-sm rounded-lg border-[2px] border-[#18181B] shadow-[4px_4px_0_#18181B] text-sm font-bold ${state.status === 'correct' ? 'bg-[#00E599] text-[#18181B]' : 'bg-[#FF6B6B] text-white'}`}>
           <span className="underline decoration-2 underline-offset-2 mb-1 block">Explanation</span>
           {state.status === 'correct' ? (data.why_correct || 'Correct!') : (data.why_incorrect || 'Incorrect, keep looking.')}
         </div>
       )}
       {state.status === 'correct' && data.xp_reward && (
          <div className="mt-2 text-center text-[#FFD100] font-black text-sm drop-shadow-[0_1px_0_#18181B]">+{data.xp_reward} XP</div>
       )}
    </div>
  );
};

const ArrangeSortableItem = ({ id, text, isPreviewMode, isChecking }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: id, disabled: !isPreviewMode || isChecking });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    position: 'relative',
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`w-full bg-white neo-border rounded-[var(--neo-radius-xl)] p-4 flex items-center gap-3 neo-shadow transition-all font-bold text-[#18181B] ${isPreviewMode ? 'cursor-pointer hover:-translate-y-1 hover:shadow-[var(--neo-shadow-offset-lg)_var(--neo-shadow-offset-lg)_0_var(--neo-border-color)]' : 'cursor-default'}`}
    >
      <div 
        {...attributes} 
        {...listeners} 
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-[var(--neo-border-width)] border-[var(--neo-border-color)] bg-[#F4F4F5] ${isPreviewMode ? 'cursor-grab active:cursor-grabbing hover:bg-[#E4E4E7]' : ''}`}
      >
        <GripVertical size={16} strokeWidth={3} className="text-[#18181B]" />
      </div>
      <span className="flex-1 text-sm">{text}</span>
    </div>
  );
};

const ArrangeInteractive = ({ blockId, data, interactionState, setInteractionState, isPreviewMode, onAnswered, isChecking, playSound }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [items, setItems] = React.useState([]);
  const [originalItems, setOriginalItems] = React.useState([]);
  
  React.useEffect(() => {
    const rawItems = (data.items || '').split(',').map(s => s.trim()).filter(Boolean);
    if (rawItems.length === 0) rawItems.push('Item 1', 'Item 2', 'Item 3');
    
    const objects = rawItems.map((text, i) => ({ id: `arr_${i}`, text }));
    setOriginalItems(objects.map(o => o.id));
    
    if (isPreviewMode) {
      const shuffled = [...objects];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setItems(shuffled);
    } else {
      setItems(objects);
    }
  }, [data.items, isPreviewMode]);

  const state = (interactionState && interactionState[blockId]) || { status: 'idle' };

  const handleDragEnd = (event) => {
    if (!isPreviewMode || isChecking) return;
    const { active, over } = event;
    if (over && active.id !== over.id) {
      if (playSound) playSound('click');
      setItems((items) => {
        const oldIndex = items.findIndex(p => p.id === active.id);
        const newIndex = items.findIndex(p => p.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        if (onAnswered) {
          const currentOrder = newItems.map(i => i.id).join(',');
          const correctOrder = originalItems.join(',');
          onAnswered({ isAnswered: true, isCorrect: currentOrder === correctOrder });
        }
        
        return newItems;
      });
      if (interactionState) {
        setInteractionState({ ...interactionState, [blockId]: { status: 'idle' } });
      }
    }
  };

  const isCorrectState = isChecking && originalItems.join(',') === items.map(i => i.id).join(',');

  return (
    <div className="w-full px-6 py-4">
      <div className={`w-full flex flex-col gap-4 bg-white border-[4px] rounded-[32px] p-6 shadow-[8px_8px_0_#18181B] transition-colors ${isChecking ? (isCorrectState ? 'border-[#00E599]' : 'border-[#FF6B6B]') : 'border-[#18181B]'}`}>
        <div className="flex items-start gap-3 mb-2">
          <div className="w-10 h-10 bg-[#FFD100] rounded-full border-[3px] border-[#18181B] flex items-center justify-center shrink-0 shadow-[2px_2px_0_#18181B]">
            <ListOrdered className="text-[#18181B]" size={20} strokeWidth={3} />
          </div>
          <p className="font-black text-lg text-[#18181B] leading-tight pt-1">{data.question || 'Put these in the correct order:'}</p>
        </div>
        
        <div className="flex flex-col gap-3">
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={items.map(i => i.id)}
              strategy={verticalListSortingStrategy}
            >
              {items.map((item) => (
                <ArrangeSortableItem key={item.id} id={item.id} text={item.text} isPreviewMode={isPreviewMode} isChecking={isChecking} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
        
      </div>
    </div>
  );
};

const DraggablePill = ({ id, text, disabled }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id, disabled });
  
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 50,
  } : undefined;
  
  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes}
      className={`px-4 py-2 bg-white border-[var(--neo-border-width)] border-[var(--neo-border-color)] shadow-[var(--neo-shadow-offset)_var(--neo-shadow-offset)_0_var(--neo-border-color)] rounded-full text-xs font-bold transition-transform ${disabled ? 'opacity-50 cursor-default' : 'cursor-grab active:cursor-grabbing hover:-translate-y-0.5 hover:shadow-[var(--neo-shadow-offset-lg)_var(--neo-shadow-offset-lg)_0_var(--neo-border-color)]'}`}
    >
      {text}
    </div>
  );
};

const DroppableBucket = ({ id, label, items, isCorrectState }) => {
  const { isOver, setNodeRef } = useDroppable({ id });
  
  return (
    <div className="flex-1 max-w-[150px] flex flex-col items-center">
      <div className="text-sm font-black mb-2 text-center break-words w-full text-[#18181B]">{label}</div>
      <div 
        ref={setNodeRef}
        className={`w-full min-h-[120px] bg-white neo-border rounded-[var(--neo-radius-xl)] p-2 flex flex-col gap-2 items-center transition-all ${isOver ? 'bg-[#FFD100]/20 scale-105' : ''} ${isCorrectState === 'error' ? 'border-[#FF6B6B] bg-[#FF6B6B]/10' : isCorrectState === 'correct' ? 'border-[#00E599] bg-[#00E599]/10' : ''}`}
      >
        {items.map(item => (
          <div key={item.id} className={`px-3 py-1.5 border-[var(--neo-border-width)] border-[var(--neo-border-color)] rounded-full text-[10px] font-bold shadow-[var(--neo-shadow-offset-sm)_var(--neo-shadow-offset-sm)_0_var(--neo-border-color)] truncate max-w-full ${isCorrectState === 'correct' ? 'bg-[#00E599]' : 'bg-white'}`}>
            {item.text}
          </div>
        ))}
        {items.length === 0 && (
          <div className="flex-1 w-full flex items-center justify-center opacity-30">
            <Move size={24} className="text-[#18181B]" />
          </div>
        )}
      </div>
    </div>
  );
};

const DragAndDropInteractive = ({ blockId, data, interactionState, setInteractionState, isPreviewMode, onAnswered, isChecking, playSound }) => {
  const [bankItems, setBankItems] = React.useState([]);
  const [bucketItems, setBucketItems] = React.useState({ b1: [], b2: [], b3: [] });
  
  React.useEffect(() => {
    let allItems = [];
    const b1 = data.bucket_1_items ? data.bucket_1_items.split(',').map(s => s.trim()).filter(Boolean) : [];
    const b2 = data.bucket_2_items ? data.bucket_2_items.split(',').map(s => s.trim()).filter(Boolean) : [];
    const b3 = data.bucket_3_items ? data.bucket_3_items.split(',').map(s => s.trim()).filter(Boolean) : [];
    
    b1.forEach((t, i) => allItems.push({ id: `b1_${i}`, text: t, bucket: 'b1' }));
    b2.forEach((t, i) => allItems.push({ id: `b2_${i}`, text: t, bucket: 'b2' }));
    b3.forEach((t, i) => allItems.push({ id: `b3_${i}`, text: t, bucket: 'b3' }));
    
    if (allItems.length === 0) {
       allItems = [
         { id: 'b1_0', text: 'Water', bucket: 'b1' },
         { id: 'b1_1', text: 'Medicine', bucket: 'b1' },
         { id: 'b2_0', text: 'New Phone', bucket: 'b2' },
         { id: 'b2_1', text: 'Ice Cream', bucket: 'b2' },
       ];
    }
    
    if (isPreviewMode) {
      const shuffled = [...allItems].sort(() => Math.random() - 0.5);
      setBankItems(shuffled);
      setBucketItems({ b1: [], b2: [], b3: [] });
      if (onAnswered) onAnswered({ isAnswered: false, isCorrect: false });
    } else {
      setBankItems(allItems);
      setBucketItems({ b1: [], b2: [], b3: [] });
    }
  }, [data, isPreviewMode]);

  const state = (interactionState && interactionState[blockId]) || { status: 'idle' };

  const handleDragEnd = (event) => {
    if (!isPreviewMode || isChecking) return;
    const { active, over } = event;
    
    if (over) {
      if (playSound) playSound('click');
      const draggedItem = bankItems.find(i => i.id === active.id);
      if (draggedItem) {
        setBankItems(prev => {
          const newBank = prev.filter(i => i.id !== active.id);
          setBucketItems(prevBuckets => {
            const newBuckets = {
              ...prevBuckets,
              [over.id]: [...prevBuckets[over.id], draggedItem]
            };
            
            // Check correctness
            const allPlaced = newBank.length === 0;
            let isCorrect = allPlaced;
            if (isCorrect) {
              ['b1', 'b2', 'b3'].forEach(bId => {
                newBuckets[bId].forEach(item => {
                  if (item.bucket !== bId) isCorrect = false;
                });
              });
            }
            if (onAnswered) onAnswered({ isAnswered: allPlaced, isCorrect });
            
            return newBuckets;
          });
          return newBank;
        });
      }
    }
  };
  
  const allPlaced = bankItems.length === 0;
  let isCorrectState = false;
  if (allPlaced) {
    isCorrectState = true;
    ['b1', 'b2', 'b3'].forEach(bId => {
      bucketItems[bId].forEach(item => {
        if (item.bucket !== bId) isCorrectState = false;
      });
    });
  }

  const buckets = [];
  if (data.bucket_1_name || (!data.bucket_1_name && !data.bucket_2_name)) buckets.push({ id: 'b1', label: data.bucket_1_name || 'Needs' });
  if (data.bucket_2_name || (!data.bucket_1_name && !data.bucket_2_name)) buckets.push({ id: 'b2', label: data.bucket_2_name || 'Wants' });
  if (data.bucket_3_name) buckets.push({ id: 'b3', label: data.bucket_3_name });

  return (
    <div className="w-full px-6 py-4">
      <div className={`w-full flex flex-col gap-6 bg-[#F4F4F5] border-[4px] rounded-[32px] p-6 shadow-[8px_8px_0_#18181B] transition-colors ${isChecking ? (isCorrectState ? 'border-[#00E599]' : 'border-[#FF6B6B]') : 'border-[#18181B]'}`}>
        {data.question && <p className="font-black text-center text-lg leading-tight text-[#18181B]">{data.question}</p>}
        
        <DndContext onDragEnd={handleDragEnd}>
          <div className="flex gap-4 w-full justify-center">
            {buckets.map(b => (
              <DroppableBucket key={b.id} id={b.id} label={b.label} items={bucketItems[b.id] || []} isCorrectState={isChecking ? (isCorrectState ? 'correct' : 'error') : 'idle'} />
            ))}
          </div>
          
          <div className="w-full h-[2px] bg-[#18181B]/10 my-2 rounded-full" />
          
          <div className="flex flex-wrap justify-center gap-3 min-h-[60px]">
            {bankItems.length === 0 ? (
              <div className="text-gray-400 font-bold text-sm">All items sorted!</div>
            ) : (
              bankItems.map(item => (
                <DraggablePill key={item.id} id={item.id} text={item.text} disabled={!isPreviewMode || isChecking} />
              ))
            )}
          </div>
        </DndContext>
        
        {isPreviewMode && bankItems.length === 0 && isChecking && (
          <div className={`w-full p-4 rounded-xl text-center font-bold text-[#18181B] ${isCorrectState ? 'bg-[#00E599]' : 'bg-[#FF6B6B] text-white'}`}>
            {isCorrectState ? 'Excellent sorting!' : 'Some items might be in the wrong bucket!'}
          </div>
        )}
      </div>
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

const formatChartNumber = (val, format, symbol) => {
  if (format === 'Percentage') return `${val}%`;
  if (format === 'Currency') return `${symbol || '$'}${val.toLocaleString()}`;
  return val.toLocaleString();
};

const ChartCard = ({ title, children, isVisual, legendElement, quizElement }) => (
  <div className="w-full px-4 py-6 flex flex-col items-center justify-center relative">
    <div className={`w-full max-w-[320px] flex flex-col items-center justify-center bg-white border-[4px] border-[#18181B] rounded-[24px] p-6 relative overflow-hidden shadow-[8px_8px_0_#18181B] transition-all`}>
      {title && <p className="font-black text-center text-sm text-[#18181B] uppercase tracking-widest opacity-60 mb-6">{title}</p>}
      {children}
      {legendElement && <div className="mt-6 w-full">{legendElement}</div>}
    </div>
    {!isVisual && quizElement && (
      <div className="mt-8 w-full max-w-[320px]">
        {quizElement}
      </div>
    )}
  </div>
);

const PieChartBlock = ({ blockId, data, interactionState, setInteractionState, isPreviewMode, onAnswered, isChecking }) => {
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
    
    const total = Math.max(1, slices.reduce((acc, s) => acc + s.value, 0));
    
    const chartStyle = data.chart_style || 'Full Donut';
    const isVisual = data.type === 'Visual';
    const legendStyle = data.legend_style || 'Chips';
    const centerLabel = data.center_label || '';
    const centerSublabel = data.center_sublabel || '';
    
    const [animatedTotal, setAnimatedTotal] = React.useState(0);
    const [dashOffsetMultiplier, setDashOffsetMultiplier] = React.useState(1);
    
    React.useEffect(() => {
      let start = null;
      const duration = 800; // ms
      const finalVal = centerLabel ? (Number(centerLabel) || 0) : total;
      const canAnimateNumber = !isNaN(finalVal) && centerLabel !== '';
      
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        setDashOffsetMultiplier(1 - easeProgress);
        if (canAnimateNumber) {
          setAnimatedTotal(Math.floor(easeProgress * finalVal));
        }
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    }, [total, centerLabel]);
  
    const displayCenterNum = centerLabel ? (isNaN(Number(centerLabel)) ? centerLabel : formatChartNumber(animatedTotal, data.number_format, data.currency_symbol)) : formatChartNumber(animatedTotal, data.number_format, data.currency_symbol);
  
    const isGauge = chartStyle === 'Half Gauge';
    const isSolid = chartStyle === 'Solid Pie';
    const isMultiRing = chartStyle === 'Multi-Ring Donut';
    const isDualRing = data.number_of_rings === '2' && !isMultiRing && !isSolid && !isGauge;

    const innerSlices = [];
    if (isDualRing) {
      for (let i = 1; i <= 10; i++) {
        if (data[`slice_label_${i}`] && data[`slice_inner_value_${i}`] > 0) {
          innerSlices.push({
            id: String(i),
            label: data[`slice_label_${i}`],
            value: Number(data[`slice_inner_value_${i}`]),
            color: data[`slice_color_${i}`] || '#FFD100'
          });
        }
      }
    }
    const innerTotal = Math.max(1, innerSlices.reduce((acc, s) => acc + s.value, 0));
    let innerCumulativeValue = 0;

    const strokeW = isMultiRing ? Math.max(4, 40 / slices.length) : (isSolid ? 50 : (isDualRing ? 12 : 20));
    const outerR = isSolid ? 25 : (isDualRing ? 42 : 40);
    const innerR = 25;
    const maxVal = Math.max(1, ...slices.map(s => s.value));
  
    let cumulativeValue = 0;
  
    const legendElement = legendStyle === 'Chips' ? (
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 w-full">
         {slices.map((slice, i) => (
            <div key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${isVisual ? 'bg-gray-50 border border-gray-200' : 'border-2 border-[#18181B] bg-white'}`}>
               <div className="w-3 h-3 rounded-full shadow-inner shrink-0" style={{ backgroundColor: slice.color }}></div>
               <div className="flex flex-col items-start leading-none truncate max-w-[120px]">
                  <span className="text-xs font-bold text-gray-600 truncate w-full">{slice.label}</span>
                  <span className="text-[10px] font-black text-[#18181B] mt-0.5 truncate w-full">
                     {formatChartNumber(slice.value, data.number_format, data.currency_symbol)}
                  </span>
               </div>
            </div>
         ))}
      </div>
    ) : (
      <div className="flex flex-col w-full gap-2 mx-auto">
         {slices.map((slice, i) => (
            <div key={i} className="flex items-center justify-between gap-4">
               <div className="flex items-center gap-2 truncate">
                 <div className="w-3 h-3 rounded-full shadow-inner shrink-0" style={{ backgroundColor: slice.color }}></div>
                 <span className="text-sm font-bold text-gray-600 truncate">{slice.label}</span>
               </div>
               <span className="text-sm font-black text-[#18181B] shrink-0">
                  {formatChartNumber(slice.value, data.number_format, data.currency_symbol)}
               </span>
            </div>
         ))}
      </div>
    );
  
    const quizElement = !isVisual ? (
       <ChartQuiz blockId={blockId} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} onAnswered={onAnswered} isChecking={isChecking} />
    ) : null;
  
    return (
      <ChartCard title={data.title || 'Pie Chart'} isVisual={isVisual} legendElement={legendElement} quizElement={quizElement}>
        <div className={`relative flex flex-col items-center justify-center mt-2 mb-4 ${isGauge ? 'w-48 h-24 overflow-hidden' : 'w-48 h-48'}`}>
           <svg viewBox={isGauge ? "0 0 100 50" : "0 0 100 100"} className={`absolute ${isGauge ? 'inset-x-0 bottom-0 h-48 origin-bottom' : 'inset-0 w-full h-full'} transform ${isGauge ? "-rotate-180" : "-rotate-90"} filter ${isVisual ? 'drop-shadow-lg' : 'drop-shadow-md'}`}>
              <defs>
                {slices.map((slice, i) => (
                  <linearGradient key={`grad-${i}`} id={`grad-${blockId}-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={slice.color} />
                    <stop offset="100%" stopColor={slice.color} stopOpacity={0.6} />
                  </linearGradient>
                ))}
              </defs>
              
              {isMultiRing ? (
                slices.map((slice, i) => {
                  const r = 45 - strokeW / 2 - i * (strokeW + 1);
                  if (r <= 0) return null;
                  const circumference = 2 * Math.PI * r;
                  return <circle key={`bg-${i}`} r={r} cx="50" cy="50" fill="transparent" stroke="#F4F4F5" strokeWidth={strokeW} strokeDasharray={`${circumference} ${circumference}`}></circle>
                })
              ) : (
                <>
                  <circle r={outerR} cx="50" cy="50" fill="transparent" stroke="#F4F4F5" strokeWidth={strokeW} strokeDasharray={`${isGauge ? (2 * Math.PI * outerR) / 2 : 2 * Math.PI * outerR} ${2 * Math.PI * outerR}`}></circle>
                  {isDualRing && (
                    <circle r={innerR} cx="50" cy="50" fill="transparent" stroke="#F4F4F5" strokeWidth={strokeW} strokeDasharray={`${2 * Math.PI * innerR} ${2 * Math.PI * innerR}`}></circle>
                  )}
                </>
              )}
  
              {slices.map((slice, i) => {
                if (total === 0) return null;
                
                if (isMultiRing) {
                  const r = 45 - strokeW / 2 - i * (strokeW + 1);
                  if (r <= 0) return null;
                  const circumference = 2 * Math.PI * r;
                  const sliceLength = (slice.value / maxVal) * circumference;
                  const animatedOffset = circumference - (circumference * dashOffsetMultiplier);
                  return (
                    <circle 
                      key={i} 
                      r={r} 
                      cx="50" 
                      cy="50" 
                      fill="transparent" 
                      stroke={`url(#grad-${blockId}-${i})`} 
                      strokeWidth={strokeW} 
                      strokeDasharray={`${sliceLength} ${circumference}`} 
                      strokeDashoffset={animatedOffset}
                      strokeLinecap="round"
                      className="transition-all duration-300 ease-out"
                    />
                  );
                }
  
                const r = outerR;
                const circumference = 2 * Math.PI * r;
                const arcLength = isGauge ? circumference / 2 : circumference;
                
                const sliceLength = (slice.value / total) * arcLength;
                const sliceOffset = (cumulativeValue / total) * arcLength;
                const animatedOffset = -sliceOffset - (circumference * dashOffsetMultiplier);
                cumulativeValue += slice.value;
                return (
                  <circle 
                    key={i} 
                    r={r} 
                    cx="50" 
                    cy="50" 
                    fill="transparent" 
                    stroke={`url(#grad-${blockId}-${i})`} 
                    strokeWidth={strokeW} 
                    strokeDasharray={`${sliceLength} ${circumference}`} 
                    strokeDashoffset={animatedOffset}
                    className="transition-all duration-300 ease-out"
                  />
                )
              })}

              {isDualRing && innerSlices.map((slice, i) => {
                const r = innerR;
                const circumference = 2 * Math.PI * r;
                const sliceLength = (slice.value / innerTotal) * circumference;
                const sliceOffset = (innerCumulativeValue / innerTotal) * circumference;
                const animatedOffset = -sliceOffset - (circumference * dashOffsetMultiplier);
                innerCumulativeValue += slice.value;
                return (
                  <circle 
                    key={`inner-${i}`} 
                    r={r} 
                    cx="50" 
                    cy="50" 
                    fill="transparent" 
                    stroke={`url(#grad-${blockId}-${i})`} 
                    strokeWidth={strokeW} 
                    strokeDasharray={`${sliceLength} ${circumference}`} 
                    strokeDashoffset={animatedOffset}
                    className="transition-all duration-300 ease-out"
                  />
                )
              })}
           </svg>
           
           {!isGauge && !isMultiRing && (
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none rounded-full">
               <div className={`flex flex-col items-center justify-center text-center ${isSolid ? 'bg-white/80 p-2 rounded-full min-w-[60px] min-h-[60px] shadow-sm backdrop-blur-sm' : ''}`}>
                  <span className={`font-black text-[#18181B] tracking-tighter leading-none ${isSolid ? 'text-xl' : 'text-3xl'}`}>{displayCenterNum}</span>
                  {centerSublabel && <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">{centerSublabel}</span>}
               </div>
             </div>
           )}

           {isGauge && (
             <div className={`relative z-10 flex flex-col items-center justify-center text-center ${isGauge ? 'mt-auto pb-2' : ''}`}>
                <span className="text-4xl font-black text-[#18181B] tracking-tighter leading-none">{displayCenterNum}</span>
                {(centerSublabel || (!centerLabel && !isGauge)) && <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{centerSublabel || (centerLabel ? '' : 'Total')}</span>}
             </div>
           )}
        </div>
      </ChartCard>
    );
  };


const BarGraphBlock = ({ blockId, data, interactionState, setInteractionState, isPreviewMode, onAnswered, isChecking }) => {
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
  
  const maxVal = Math.max(1, ...bars.map(b => b.value));
  const isVertical = data.orientation !== 'Horizontal';

  const [animTime, setAnimTime] = React.useState(0);
  React.useEffect(() => {
    let start = null;
    const duration = 600 + (bars.length * 150); // Staggered duration
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setAnimTime(progress);
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [bars.length]);

  const quizElement = !isVisual ? (
     <ChartQuiz blockId={blockId} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} onAnswered={onAnswered} isChecking={isChecking} />
  ) : null;

  return (
    <ChartCard title={data.title || 'Bar Graph'} isVisual={isVisual} quizElement={quizElement}>
      <div className={`w-full max-w-[250px] flex ${isVertical ? 'flex-row items-end h-48 border-b-[3px] border-l-[3px]' : 'flex-col justify-end border-l-[3px] border-b-[3px]'} border-[#18181B] gap-3 p-2 relative`}>
         {bars.map((bar, i) => {
            const barStart = i * 0.1;
            const barDuration = 0.4;
            const barProgress = Math.max(0, Math.min((animTime - barStart) / barDuration, 1));
            const easeProgress = 1 - Math.pow(1 - barProgress, 3);
            const currentVal = Math.floor(bar.value * easeProgress);

            return (
              <div key={i} className={`flex ${isVertical ? 'flex-col items-center justify-end flex-1 h-full' : 'flex-row items-center justify-start w-full flex-1'} gap-1`}>
                 {isVertical ? (
                    <>
                      <span className="text-[10px] font-bold text-[#18181B] -mb-1">{formatChartNumber(currentVal, data.number_format, data.currency_symbol)}</span>
                      <div className="w-full border-[2px] border-[#18181B] rounded-t-sm shadow-[2px_0_0_#18181B] transition-all relative overflow-hidden" style={{ height: `${(bar.value / maxVal) * 85 * easeProgress}%`, backgroundImage: `linear-gradient(to top, ${bar.color}, ${bar.color}90)` }}>
                        <div className="absolute inset-x-0 top-0 h-1/3 bg-white/20"></div>
                      </div>
                      <span className="text-[10px] font-bold text-[#18181B] truncate w-full text-center mt-1">{bar.label}</span>
                    </>
                 ) : (
                    <>
                      <span className="text-[10px] font-bold text-[#18181B] truncate w-16 text-right pr-1 shrink-0">{bar.label}</span>
                      <div className="h-full border-[2px] border-[#18181B] rounded-r-sm shadow-[0_2px_0_#18181B] transition-all relative overflow-hidden" style={{ width: `${(bar.value / maxVal) * 85 * easeProgress}%`, backgroundImage: `linear-gradient(to right, ${bar.color}, ${bar.color}90)` }}>
                         <div className="absolute inset-y-0 right-0 w-1/3 bg-white/20"></div>
                      </div>
                      <span className="text-[10px] font-bold text-[#18181B] pl-1 shrink-0">{formatChartNumber(currentVal, data.number_format, data.currency_symbol)}</span>
                    </>
                 )}
              </div>
            )
         })}
      </div>
    </ChartCard>
  );
};

const LineGraphBlock = ({ blockId, data, interactionState, setInteractionState, isPreviewMode, onAnswered, isChecking }) => {
  const numPoints = parseInt(data.number_of_points || '5', 10);
  const points = [];
  for (let i = 1; i <= numPoints; i++) {
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

  const quizElement = !isVisual ? (
     <ChartQuiz blockId={blockId} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} onAnswered={onAnswered} isChecking={isChecking} />
  ) : null;

  const trendElement = data.show_trend_label === 'On' ? (
    <div className="w-full flex justify-end mb-2">
       <div className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border-[2px] ${trendColor.replace('text-', 'border-').split(' ')[0]} ${trendColor} flex items-center gap-1`}>
         <span>{lastPoint >= firstPoint ? '↑' : '↓'}</span>
         <span>{lastPoint >= firstPoint ? 'Growing' : 'Shrinking'}</span>
       </div>
    </div>
  ) : null;

  return (
    <ChartCard title={data.title || 'Line Graph'} isVisual={isVisual} quizElement={quizElement}>
      <div className="w-full max-w-[250px] flex flex-col relative border-l-[3px] border-b-[3px] border-[#18181B] pt-4 pr-4">
         {trendElement}
         {data.y_axis_label && <span className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">{data.y_axis_label}</span>}
         <svg width="100%" height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="overflow-visible">
            <defs>
              <linearGradient id={`lineGrad-${blockId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={data.line_colour || '#3B82F6'} />
                <stop offset="100%" stopColor={data.line_colour || '#3B82F6'} stopOpacity="0.3" />
              </linearGradient>
            </defs>
            
            {/* Fill under the line (optional, gives it more volume) */}
            {pathData && (
              <path
                d={`${pathData} L ${coordinates[coordinates.length-1].x},${svgHeight} L 0,${svgHeight} Z`}
                fill={`url(#lineGrad-${blockId})`}
                opacity={animProgress}
                style={{ transition: 'opacity 1s ease-out' }}
              />
            )}

            <path 
              ref={pathRef}
              d={pathData} 
              fill="none" 
              stroke={data.line_colour || '#3B82F6'} 
              strokeWidth="4" 
              strokeLinejoin="round" 
              strokeDasharray={pathLength}
              strokeDashoffset={pathLength * (1 - animProgress)}
              style={{ filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.3))' }}
            />
            {coordinates.map((c, i) => (
              <g key={i} style={{ opacity: animProgress > (i / (coordinates.length - 1 || 1)) ? 1 : 0, transition: 'opacity 0.2s ease-in' }}>
                <circle cx={c.x} cy={c.y} r="6" fill={data.point_colour || '#18181B'} stroke="white" strokeWidth="2" style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.4))' }} />
                <text x={c.x} y={c.y - 12} fontSize="10" fontWeight="bold" fill="#18181B" textAnchor={i === 0 ? 'start' : i === coordinates.length - 1 ? 'end' : 'middle'}>
                  {formatChartNumber(c.value, data.number_format, data.currency_symbol)}
                </text>
              </g>
            ))}
         </svg>
         <div className="flex justify-between mt-2 w-full border-t-[3px] border-[#18181B] pt-2 relative -left-[3px] w-[calc(100%+3px)]">
            {points.map((p, i) => (
               <span key={i} className="text-[10px] font-bold text-[#18181B] truncate" style={{ width: `${100/points.length}%`, textAlign: i===0?'left':i===points.length-1?'right':'center' }}>
                 {p.label}
               </span>
            ))}
         </div>
      </div>
    </ChartCard>
  );
};

const VisualBlockRenderer = (props) => (
  <ErrorBoundary>
    <VisualBlockRendererInner {...props} />
  </ErrorBoundary>
);
export default VisualBlockRenderer;
