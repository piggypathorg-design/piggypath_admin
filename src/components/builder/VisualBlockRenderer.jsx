import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Star, Coins, Award, Trophy, MessageCircle, ArrowRight, ArrowLeft, FastForward,
  PieChart, BarChart2, TrendingUp, Table as TableIcon, HelpCircle, Move, Link, ListOrdered, Sliders, Edit3, MousePointer2, MessageSquare, Check, CheckCircle, GripVertical, Volume2
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
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

const MASCOT_IMAGES = {
  Happy: '/assets/mascots/Happy.png',
  Confused: '/assets/mascots/Confused.png',
  Surprised: '/assets/mascots/Surprised.png',
  Sleeping: '/assets/mascots/Sleeping.png',
  Smart: '/assets/mascots/Smart.png',
  Love: '/assets/mascots/Love.png',
  Angry: '/assets/mascots/Angry.png',
  Cool: '/assets/mascots/Cool.png',
  Laughing: '/assets/mascots/Laughing.png',
  Sad: '/assets/mascots/Sad.png',
  Thinking: '/assets/mascots/Thinking.png',
  Winking: '/assets/mascots/Winking.png'
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
         <div className={`w-16 h-16 bg-[#00E599] rounded-full border-[3px] border-[#18181B] flex items-center justify-center shadow-[4px_4px_0_#18181B] mb-2 transition-all duration-300 ${isPlaying ? 'animate-pulse scale-110 shadow-[8px_8px_0_#18181B]' : ''}`}>
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
            className={`px-4 py-3 rounded-lg text-sm font-bold shadow-[4px_4px_0_#18181B] border-[2px] break-words flex items-center justify-center gap-2 ${isSelected && !isChecking ? 'border-blue-500' : 'border-[#18181B]'} text-center transition-all animate-in fade-in slide-in-from-bottom-2 ${isPreviewMode && !isChecking ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#18181B] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2' : 'cursor-default focus:outline-none'} ${bgClass} ${animClass}`}
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
        <div className={`mt-2 p-4 rounded-lg border-[2px] border-[#18181B] shadow-[4px_4px_0_#18181B] text-sm font-bold ${isCorrectSelection ? 'bg-[#00E599] text-[#18181B]' : 'bg-[#FF6B6B] text-white'}`}>
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
                  tabIndex={isPreviewMode && !isMatched ? 0 : -1}
                  onKeyDown={(e) => {
                    if (isPreviewMode && !isMatched && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      handleLeftClick(id);
                    }
                  }}
                  onClick={() => handleLeftClick(id)}
                  className={`flex-1 border-[3px] rounded-2xl px-4 py-3 shadow-[4px_4px_0_#18181B] font-bold text-sm text-center flex items-center justify-center break-words transition-colors select-none ${isPreviewMode && !isMatched ? 'cursor-pointer hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2' : 'focus:outline-none'} ${bgClass} ${animClass}`}
                >
                  {data[`pair_${id}_a`] || `Pair ${id} A`}
                </div>
                
                <div className={`flex-1 border-[3px] rounded-2xl px-4 py-3 shadow-[4px_4px_0_#18181B] font-bold text-sm text-center flex items-center justify-center transition-colors select-none ${isMatched ? 'bg-[#00E599] border-[#18181B] text-[#18181B]' : 'bg-[#F4F4F5] border-[#18181B] border-dashed border-gray-400 text-gray-500'}`}>
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
                 className={`px-3 py-1.5 border-[2px] shadow-[3px_3px_0_#18181B] rounded-lg text-xs font-bold transition-all select-none ${isPreviewMode ? 'cursor-pointer hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2' : 'cursor-default focus:outline-none'} ${bgClass} ${animClass}`}
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
         className={`relative w-full max-w-sm ${data.image ? 'aspect-square' : 'py-8'} bg-gray-100 border-[3px] rounded-2xl overflow-hidden shadow-[4px_4px_0_#18181B] transition-colors ${state.status === 'correct' ? 'border-[#00E599]' : state.status === 'error' ? 'border-[#FF6B6B] animate-mascot-shake' : 'border-[#18181B]'}`}
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
      className={`w-full bg-white border-[3px] border-[#18181B] rounded-2xl p-4 flex items-center gap-3 shadow-[4px_4px_0_#18181B] transition-all font-bold text-[#18181B] ${isPreviewMode ? 'cursor-pointer hover:-translate-y-1 hover:shadow-[6px_6px_0_#18181B]' : 'cursor-default'}`}
    >
      <div 
        {...attributes} 
        {...listeners} 
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-[2px] border-[#18181B] bg-[#F4F4F5] ${isPreviewMode ? 'cursor-grab active:cursor-grabbing hover:bg-[#E4E4E7]' : ''}`}
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
      className={`px-4 py-2 bg-white border-[2px] border-[#18181B] shadow-[3px_3px_0_#18181B] rounded-full text-xs font-bold transition-transform ${disabled ? 'opacity-50 cursor-default' : 'cursor-grab active:cursor-grabbing hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#18181B]'}`}
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
        className={`w-full min-h-[120px] bg-white border-[3px] border-[#18181B] rounded-2xl p-2 flex flex-col gap-2 items-center transition-all ${isOver ? 'bg-[#FFD100]/20 scale-105' : ''} ${isCorrectState === 'error' ? 'border-[#FF6B6B] bg-[#FF6B6B]/10' : isCorrectState === 'correct' ? 'border-[#00E599] bg-[#00E599]/10' : ''}`}
      >
        {items.map(item => (
          <div key={item.id} className={`px-3 py-1.5 border-[2px] border-[#18181B] rounded-full text-[10px] font-bold shadow-[2px_2px_0_#18181B] truncate max-w-full ${isCorrectState === 'correct' ? 'bg-[#00E599]' : 'bg-white'}`}>
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
  const strokeW = isMultiRing ? Math.max(4, 40 / slices.length) : (isSolid ? 50 : 20);
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
              <circle r={isSolid ? 25 : 40} cx="50" cy="50" fill="transparent" stroke="#F4F4F5" strokeWidth={strokeW} strokeDasharray={`${isGauge ? (2 * Math.PI * (isSolid ? 25 : 40)) / 2 : 2 * Math.PI * (isSolid ? 25 : 40)} ${2 * Math.PI * (isSolid ? 25 : 40)}`}></circle>
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

              const r = isSolid ? 25 : 40;
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
         </svg>
         {!isSolid && (
           <div className={`relative z-10 flex flex-col items-center justify-center text-center ${isGauge ? 'mt-auto pb-2' : ''}`}>
              <span className="text-4xl font-black text-[#18181B] tracking-tighter leading-none">{displayCenterNum}</span>
              {(centerSublabel || (!centerLabel && !isGauge)) && <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{centerSublabel || (centerLabel ? '' : 'Total')}</span>}
           </div>
         )}
      </div>
    </ChartCard>
  );
};

const VisualBlockRenderer = ({ block, version, isPreviewMode, progressValue, externalInteractionState, setExternalInteractionState, isChecking, onAnswered, lives, playSound }) => {
  if (plbSchema[block.type]?.category === 'Legacy Navigation') {
    return null;
  }

  const data = block[version] || {};
  const [localInteractionState, setLocalInteractionState] = React.useState({});
  
  const interactionState = externalInteractionState || localInteractionState;
  const setInteractionState = setExternalInteractionState || setLocalInteractionState;
  
  const getAlign = (align) => {
    if (align === 'Center') return 'text-center justify-center';
    if (align === 'Right') return 'text-right justify-end items-end';
    return 'text-left justify-start items-start';
  };

  const alignClass = getAlign(data.alignment);
  const color = data.text_colour || '#1E293B';
  const font = data.font || 'Arial';

  switch (block.type) {
    case 'Icon': {
      const IconComponent = LucideIcons[data.icon_name] || LucideIcons.HelpCircle;
      const alignClass = data.align === 'left' ? 'justify-start' : data.align === 'right' ? 'justify-end' : 'justify-center';
      return (
        <div className={`flex w-full ${alignClass} py-4`} style={{ backgroundColor: data.block_colour || 'transparent' }}>
          <IconComponent size={data.size || 48} color={data.color || '#18181B'} />
        </div>
      );
    }
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
            className="break-words leading-relaxed whitespace-pre-wrap"
            style={{ 
              color, 
              fontFamily: font, 
              fontSize: `${data.font_size || 16}px`,
              fontWeight: data.bold === 'On' ? 'bold' : 'normal',
              fontStyle: data.italic === 'On' ? 'italic' : 'normal',
              textDecoration: data.underline === 'On' ? 'underline' : 'none',
            }}
          >
            {((data.content || data.text) || 'Enter text here...').replace(/\\n/g, '\n')}
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
            className={`bg-transparent flex items-center justify-center overflow-hidden w-full relative ${!data.source ? 'py-8 border-2 border-dashed border-gray-300 rounded-xl' : ''}`}
            style={{
              borderRadius: data.source ? (data.frame_shape === 'Circle' ? '50%' : `${data.frame_roundness || 16}px`) : undefined,
              aspectRatio: data.source ? (data.frame_shape === 'Square' || data.frame_shape === 'Circle' ? '1/1' : '16/9') : undefined
            }}
          >
            {data.source ? (
              block.type === 'Image' ? (
                <img 
                  src={data.source} 
                  alt={data.alt_text} 
                  className="w-full h-full"
                  style={{
                    objectFit: getObjectFit(data.object_fit),
                    objectPosition: `${data.image_x ?? 50}% ${data.image_y ?? 50}%`,
                    transform: `scale(${(data.image_scale ?? 100) / 100})`
                  }}
                />
              ) : (data.source.includes('youtube.com') || data.source.includes('youtu.be')) ? (
                <iframe
                  src={data.source.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                  className="w-full h-full"
                  style={{
                    objectFit: getObjectFit(data.object_fit)
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video 
                  src={data.source} 
                  className="w-full h-full z-10 relative pointer-events-auto" 
                  style={{
                    objectFit: getObjectFit(data.object_fit)
                  }}
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

    case 'Audio':
      return <AudioBlock data={data} isPreviewMode={isPreviewMode} />;

    case 'Mascot Feedback':
      const fbMascotType = data.mascot_type || 'Happy';
      const fbAlignClass = {
        'Left': 'justify-start',
        'Center': 'justify-center',
        'Right': 'justify-end'
      }[data.alignment || 'Center'];

      return (
        <div className={`w-full flex ${fbAlignClass} py-4 px-6 gap-4 items-center`}>
          <div className={`w-20 h-20 shrink-0 flex items-center justify-center z-10 ${getMascotAnimation(fbMascotType)}`}>
             <img 
                src={MASCOT_IMAGES[fbMascotType] || MASCOT_IMAGES.Happy}
                alt={fbMascotType}
                className="w-full h-full object-contain drop-shadow-md"
              />
          </div>
          <div className="relative flex-1 max-w-[75%]">
            <div 
              className="w-full p-4 border-[4px] border-[#18181B] rounded-3xl shadow-[6px_6px_0_#18181B] bg-white relative z-10 text-left font-bold text-sm text-[#18181B]"
            >
              {data.message || 'Great job!'}
            </div>
            <div 
              className="absolute -left-2 top-1/2 -translate-y-1/2 w-6 h-6 border-l-[4px] border-b-[4px] border-[#18181B] transform rotate-45 z-0 bg-white"
            ></div>
          </div>
        </div>
      );

    case 'Mascot Bubble':
    case 'Text Bubble (no mascot)':
      return (
        <div className="w-full px-6 py-4 relative flex justify-center">
          <div 
            className="w-[80%] p-5 border-[4px] border-[#18181B] rounded-3xl shadow-[8px_8px_0_#18181B] flex items-center justify-center relative z-10 whitespace-pre-wrap"
            style={{
              backgroundColor: data.bubble_colour || '#FFFFFF',
              color: data.text_colour || '#18181B',
              fontFamily: font,
              fontSize: `${data.font_size || 16}px`,
              fontWeight: data.font_style === 'Bold' ? '900' : 'bold',
              fontStyle: data.font_style === 'Italic' ? 'italic' : 'normal',
            }}
          >
            {(data.text || 'Mascot says...').replace(/\\n/g, '\n')}
          </div>
        </div>
      );

    case 'Reflection': {
      return (
        <div className="w-full px-6 py-4 flex flex-col gap-4">
           {data.question && <p className="font-black text-center text-sm mb-2">{data.question}</p>}
           
           <textarea 
             className="w-full bg-white border-[3px] border-[#18181B] rounded-xl p-4 shadow-[4px_4px_0_#18181B] min-h-[100px] text-[#18181B] font-bold text-sm outline-none resize-none focus:ring-2 focus:ring-[#8B5CF6]"
             placeholder="Type your thoughts here..."
             value={interactionState?.[block.id]?.reflectionText || ''}
             disabled={!isPreviewMode || interactionState?.[block.id]?.revealedAnswer || isChecking}
             onChange={(e) => {
               if (!isPreviewMode) return;
               const text = e.target.value;
               setInteractionState({ ...interactionState, [block.id]: { ...interactionState?.[block.id], reflectionText: text } });
               if (onAnswered) onAnswered({ isAnswered: text.trim().length > 0, isCorrect: true });
             }}
           />

           {interactionState?.[block.id]?.reflectionText?.trim().length > 0 && !interactionState?.[block.id]?.revealedAnswer && (
             <button
               onClick={() => {
                 if (!isPreviewMode) return;
                 setInteractionState({ ...interactionState, [block.id]: { ...interactionState?.[block.id], revealedAnswer: true } });
               }}
               className="mx-auto px-6 py-2 bg-[#8B5CF6] text-white font-black text-sm rounded-xl border-[2px] border-[#18181B] shadow-[4px_4px_0_#18181B] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#18181B] transition-all"
             >
               Reveal model answer
             </button>
           )}

           {interactionState?.[block.id]?.revealedAnswer && data.model_answer && (
             <div className="mt-2 p-4 rounded-xl border-[2px] border-dashed border-[#00E599] bg-[#00E599]/10">
                <span className="text-xs font-bold text-[#00E599] uppercase tracking-wider block mb-1">Model Answer</span>
                <p className="text-sm font-bold text-[#18181B]">{data.model_answer}</p>
             </div>
           )}
           {interactionState?.[block.id]?.revealedAnswer && data.xp_reward && (
             <div className="mt-1 text-center text-[#FFD100] font-black text-sm drop-shadow-[0_1px_0_#18181B]">+{data.xp_reward} XP</div>
           )}
        </div>
      );
    }

    case 'MCQ': {
      const mcqShuffled = useShuffledOptions(block.id, [
        { key: 'A', text: data.option_a },
        { key: 'B', text: data.option_b },
        { key: 'C', text: data.option_c },
        { key: 'D', text: data.option_d }
      ]);
      const correctOptKey = data.correct_option || 'A';
      const hasSelection = interactionState?.[block.id]?.selectedKey !== undefined;
      const isCorrectSelection = hasSelection && interactionState?.[block.id]?.selectedKey === correctOptKey;
      
      const containerVariants = {
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08
          }
        }
      };

      const itemVariants = {
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 22 } }
      };

      return (
        <div className="w-full px-6 py-2">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="w-full flex flex-col gap-3"
          >
            <p className="font-black text-center text-sm mb-2">{data.question || 'Which item is most important to buy first?'}</p>
            
            {mcqShuffled.map((opt, index) => {
              const isSelected = interactionState?.[block.id]?.selectedKey === opt.key;
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
                 bgClass = "bg-[#00E599]/30 text-[#18181B] border-[#00E599]";
              }

              return (
                <motion.div 
                  variants={itemVariants}
                  key={opt.key} 
                  role="button"
                  tabIndex={isPreviewMode && !isChecking ? 0 : -1}
                  onKeyDown={(e) => {
                    if (isPreviewMode && !isChecking && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      if (playSound) playSound('click');
                      setInteractionState({ ...interactionState, [block.id]: { selectedKey: opt.key } });
                      if (onAnswered) onAnswered({ isAnswered: true, isCorrect: opt.key === correctOptKey });
                    }
                  }}
                  onClick={() => {
                      if (isPreviewMode && !isChecking) {
                        if (playSound) playSound('click');
                        setInteractionState({ ...interactionState, [block.id]: { selectedKey: opt.key } });
                        if (onAnswered) onAnswered({ isAnswered: true, isCorrect: opt.key === correctOptKey });
                      }
                  }}
                  className={`px-4 py-3 rounded-lg text-sm font-bold shadow-[4px_4px_0_#18181B] border-[2px] break-words flex items-center justify-center gap-2 ${isSelected && !isChecking ? 'border-blue-500' : 'border-[#18181B]'} text-center transition-all ${isPreviewMode && !isChecking ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#18181B] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2' : 'cursor-default focus:outline-none'} ${bgClass} ${animClass}`}
                >
                  {isChecking && isSelected && opt.key === correctOptKey && <LucideIcons.CheckCircle size={16} />}
                  {isChecking && isSelected && opt.key !== correctOptKey && <LucideIcons.XCircle size={16} />}
                  {isChecking && !isSelected && opt.key === correctOptKey && hasSelection && <LucideIcons.CheckCircle size={16} />}
                  <span>{opt.text}</span>
                </motion.div>
              );
            })}
            
            {hasSelection && isChecking && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`mt-2 p-4 rounded-lg border-[2px] border-[#18181B] shadow-[4px_4px_0_#18181B] text-sm font-bold ${isCorrectSelection ? 'bg-[#00E599] text-[#18181B]' : 'bg-[#FF6B6B] text-white'}`}
              >
                <span className="underline decoration-2 underline-offset-2 mb-1 block">Explanation</span>
                {isCorrectSelection ? (data.why_correct || 'That is correct!') : (data.why_incorrect || 'That is incorrect, please try again.')}
              </motion.div>
            )}
          </motion.div>
        </div>
      );
    }

    case 'Fill in the Blank': {
      const parts = (data.question || 'A ___ fund should cover 3 to 6 months of essential expenses.').split(/_{2,}/);
      const val = interactionState?.[block.id]?.value || '';
      const isFillCorrect = isChecking && val.toLowerCase().trim() === (data.answer || '').toLowerCase().trim();
      const isFillIncorrect = isChecking && !isFillCorrect && val.trim() !== '';
      
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
                        disabled={!isPreviewMode || isChecking}
                        className={`w-20 sm:w-28 px-2 py-1 rounded-xl text-center font-bold text-sm outline-none transition-all shrink ${inputBorder} ${inputBg}`}
                        placeholder="Type..."
                        value={val}
                        onChange={(e) => {
                          const newVal = e.target.value;
                          setInteractionState({ ...interactionState, [block.id]: { value: e.target.value } });
                          const correct = newVal.toLowerCase().trim() === (data.answer || '').toLowerCase().trim();
                          if (onAnswered) onAnswered({ isAnswered: newVal.trim() !== '', isCorrect: correct });
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

            {(isFillCorrect || isFillIncorrect) && (
              <div className={`mt-2 p-4 rounded-lg border-[2px] border-[#18181B] shadow-[4px_4px_0_#18181B] text-sm font-bold ${isFillCorrect ? 'bg-[#00E599] text-[#18181B]' : 'bg-[#FF6B6B] text-white'}`}>
                <span className="underline decoration-2 underline-offset-2 mb-1 block">Explanation</span>
                {isFillCorrect ? (data.why_correct || 'Correct!') : (data.why_incorrect || 'Incorrect, please try again.')}
              </div>
            )}
            {isFillCorrect && data.xp_reward && (
               <div className="mt-1 text-center text-[#FFD100] font-black text-sm drop-shadow-[0_1px_0_#18181B]">+{data.xp_reward} XP</div>
            )}
          </div>
        </div>
      );
    }

    case 'Slider': {
      const min = parseInt(data.min_value || 0, 10);
      const max = parseInt(data.max_value || 100, 10);
      const target = parseInt(data.target_value || 50, 10);
      const tol = parseInt(data.tolerance || 5, 10);
      
      const val = interactionState?.[block.id]?.value ?? min;
      const isCorrect = Math.abs(val - target) <= tol;
      const hasAttempted = interactionState?.[block.id]?.hasAttempted;
      
      let trackColor = "bg-[#8B5CF6]";
      if (isChecking && isCorrect) trackColor = "bg-[#00E599]";
      if (isChecking && !isCorrect && hasAttempted) trackColor = "bg-[#FF6B6B]";

      return (
        <div className="w-full px-6 py-4">
          <div className="w-full flex flex-col gap-6">
            <p className="font-black text-center text-sm">{data.question || 'Move the slider to show how much you think should be saved.'}</p>
            
            <div className="flex flex-col items-center gap-2 mt-4">
              <div className="text-center font-black text-sm text-[#8B5CF6] mb-1">
                {formatChartNumber(val, data.number_format, data.currency_symbol)}{data.unit || ''}
              </div>
              
              <div className="relative w-full max-w-[250px] h-10 flex items-center justify-center mx-auto">
                {/* Custom track */}
                <div className={`absolute left-0 right-0 h-3 rounded-full border-[2px] border-[#18181B] ${trackColor} transition-colors duration-300`}></div>
                
                {/* Hint Band */}
                {hasAttempted && isChecking && !isCorrect && (
                  <div 
                    className="absolute h-3 rounded-full bg-[#00E599] opacity-40 pointer-events-none"
                    style={{
                      left: `${Math.max(0, (target - tol - min) / (max - min) * 100)}%`,
                      right: `${Math.max(0, 100 - ((target + tol - min) / (max - min) * 100))}%`
                    }}
                  ></div>
                )}
                
                {/* Range input visually hidden but functionally overlaid */}
                <input 
                  type="range"
                  min={min}
                  max={max}
                  value={val}
                  disabled={!isPreviewMode || isChecking}
                  className="w-full absolute inset-0 opacity-0 cursor-pointer z-10"
                  onChange={(e) => {
                    if (!isPreviewMode) return;
                    const newVal = parseInt(e.target.value);
                    setInteractionState({ ...interactionState, [block.id]: { value: newVal, hasAttempted: true } });
                    const correct = Math.abs(newVal - target) <= tol;
                    if (onAnswered) onAnswered({ isAnswered: true, isCorrect: correct });
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
                <span>{formatChartNumber(min, data.number_format, data.currency_symbol)}{data.unit || ''}</span>
                <span>{formatChartNumber(max, data.number_format, data.currency_symbol)}{data.unit || ''}</span>
              </div>

              {isChecking && hasAttempted && (
                <div className={`mt-2 w-full max-w-[250px] p-4 rounded-lg border-[2px] border-[#18181B] shadow-[4px_4px_0_#18181B] text-sm font-bold text-left ${isCorrect ? 'bg-[#00E599] text-[#18181B]' : 'bg-[#FF6B6B] text-white'}`}>
                  <span className="underline decoration-2 underline-offset-2 mb-1 block">Explanation</span>
                  {isCorrect ? (data.why_correct || 'Correct!') : (data.why_incorrect || 'Incorrect, please try again.')}
                </div>
              )}
              {isChecking && isCorrect && data.xp_reward && (
                 <div className="mt-1 text-center text-[#FFD100] font-black text-sm drop-shadow-[0_1px_0_#18181B]">+{data.xp_reward} XP</div>
              )}
            </div>
          </div>
        </div>
      );
    }

    case 'Drag & Drop':
      return <DragAndDropInteractive blockId={block.id} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} onAnswered={onAnswered} isChecking={isChecking} playSound={playSound} />;
    case 'Arrange':
      return <ArrangeInteractive blockId={block.id} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} onAnswered={onAnswered} isChecking={isChecking} playSound={playSound} />;
    case 'Chart Quiz':
      return <ChartQuiz blockId={block.id} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} onAnswered={onAnswered} isChecking={isChecking} playSound={playSound} />;
    case 'Hotspot':
      return <HotspotInteractive blockId={block.id} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} onAnswered={onAnswered} isChecking={isChecking} playSound={playSound} />;
    case 'Match Pairs':
      return <MatchPairsInteractive blockId={block.id} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} onAnswered={onAnswered} isChecking={isChecking} playSound={playSound} />;

    case 'Table': {
      const numCols = parseInt(data.number_of_columns || '2', 10);
      const numRows = parseInt(data.number_of_rows || '2', 10);
      
      const rawHeaders = data.headers ? data.headers.split(',').map(s => s.trim()).filter(Boolean) : ['Col 1', 'Col 2'];
      const headers = rawHeaders.slice(0, numCols);
      while(headers.length < numCols) headers.push(`Col ${headers.length + 1}`);

      const rows = [];
      for (let i = 1; i <= numRows; i++) {
        const rowKey = `row_${i}`;
        const rawRow = data[rowKey] ? data[rowKey].split(',').map(s => s.trim()) : [];
        const finalRow = rawRow.slice(0, numCols);
        while(finalRow.length < numCols) finalRow.push('');
        rows.push(finalRow);
      }
      
      const headerBg = data.header_bg || '#1E293B';
      const headerText = data.header_text_colour || '#FFFFFF';
      
      return (
        <div className="w-full px-6 py-4 flex flex-col items-center overflow-hidden">
           <div className="w-full border-[3px] border-[#18181B] rounded-2xl overflow-x-auto shadow-[4px_4px_0_#18181B] bg-white">
              <table className="w-full text-sm font-bold text-left whitespace-nowrap min-w-full">
                 <thead style={{ backgroundColor: headerBg, color: headerText }} className="border-b-[3px] border-[#18181B]">
                    <tr>
                       {headers.map((h, i) => (
                         <th key={i} className="p-3 border-r-[3px] border-[#18181B] last:border-r-0">{h}</th>
                       ))}
                    </tr>
                 </thead>
                 <tbody>
                    {rows.map((row, i) => (
                      <tr key={i} className={`border-b-[3px] border-[#18181B] last:border-b-0 ${data.alternate_rows !== 'Off' && i % 2 === 1 ? 'bg-[#F4F4F5]' : 'bg-white'}`}>
                         {row.map((cell, j) => (
                           <td key={j} className="p-3 border-r-[3px] border-[#18181B] last:border-r-0 text-[#18181B]">{cell}</td>
                         ))}
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      );
    }

    case 'Pie Chart':
      return <PieChartBlock blockId={block.id} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} onAnswered={onAnswered} isChecking={isChecking} />;

    case 'Bar Graph':
      return <BarGraphBlock blockId={block.id} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} onAnswered={onAnswered} isChecking={isChecking} />;
    case 'Line Graph':
      return <LineGraphBlock blockId={block.id} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} onAnswered={onAnswered} isChecking={isChecking} />;
    case 'Sparkle XP':
      return (
        <div className="w-full px-6 py-10 flex flex-col items-center justify-center relative">
          <div className="relative z-10 flex flex-col items-center gap-6">
            {data.title && (
              <h2 className="text-3xl font-black text-[#18181B] text-center tracking-tight">{data.title}</h2>
            )}
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-gray-400 mb-1">{data.label || 'Lifetime XP'}</span>
              <div className="flex items-center gap-2">
                <img src={xpImg} alt="XP" className="w-10 h-10 drop-shadow-sm" />
                <span className="text-5xl font-black text-[#18181B]">+{data.xp_amount || 84}</span>
              </div>
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
                 src={MASCOT_IMAGES[mascotIcon] || MASCOT_IMAGES.Happy}
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
          <img src={coinsImg} alt="Coins" className="w-14 h-14 drop-shadow-sm animate-mascot-bounce" />
          <span className="font-black text-[32px] text-[#18181B]">{data.coins_amount ?? 0}</span>
        </div>
      );

    case 'Gem Reward':
      return (
        <div className="w-full px-6 py-6 flex flex-row items-center justify-center gap-4">
          <img src={gemsImg} alt="Gems" className="w-14 h-14 drop-shadow-sm animate-mascot-float" />
          <span className="font-black text-[32px] text-[#18181B]">{data.gems_amount ?? 0}</span>
        </div>
      );

    case 'Badge':
      const badgeType = data.badge_type || 'Achievement Badge';
      const badgeName = data.badge_name || 'SCHOLAR';
      const badgeIconName = data.badge_icon || 'Scholar';
      const showCount = data.show_count === 'Yes';
      const countValue = Number(data.count_value) || 1;
      const leagueTier = data.league_tier || 'Bronze';
      
      let specificValue = 1;
      if (badgeType === 'Streak Badge') specificValue = Number(data.day_count || 7);
      if (badgeType === 'Combo Badge') specificValue = Number(data.combo_tier || 5);
      if (badgeType === 'Leaderboard Rank Badge') specificValue = Number((data.rank_number || 'Top 3').replace('Top ', ''));

      const getIcon = (name) => {
        const iconMap = {
          'Scholar': LucideIcons.GraduationCap,
          'Pro': LucideIcons.Rocket,
          'Horticulturist': LucideIcons.Flower2,
          'Champion': LucideIcons.Trophy,
          'Adventurer': LucideIcons.Compass,
          'Director': LucideIcons.Clapperboard,
          'Celebrity': LucideIcons.Star,
          'Magician': LucideIcons.Sparkles,
          'Scientist': LucideIcons.FlaskConical
        };
        const SelectedIcon = iconMap[name] || LucideIcons.Award;
        return <SelectedIcon size={48} strokeWidth={2.5} className="text-white drop-shadow-md" />;
      };

      const getAchievementColor = (name) => {
        const colors = {
          'Scholar': 'from-[#3B82F6] to-[#1D4ED8]', // Blue
          'Pro': 'from-[#38BDF8] to-[#0284C7]', // Light Blue
          'Horticulturist': 'from-[#F43F5E] to-[#BE123C]', // Rose/Red
          'Champion': 'from-[#F97316] to-[#C2410C]', // Orange
          'Adventurer': 'from-[#A855F7] to-[#7E22CE]', // Purple
          'Director': 'from-[#334155] to-[#0F172A]', // Slate
          'Celebrity': 'from-[#FACC15] to-[#A16207]', // Yellow
          'Magician': 'from-[#EC4899] to-[#BE185D]', // Pink
          'Scientist': 'from-[#84CC16] to-[#4D7C0F]', // Lime
        };
        return colors[name] || 'from-[#806BFF] to-[#3F43BF]';
      };

      const renderAchievementBadge = () => {
        const colorClass = getAchievementColor(badgeIconName);
        return (
          <div className="relative flex flex-col items-center animate-in zoom-in duration-500 spring mt-4">
            <div className={`w-32 h-36 bg-gradient-to-b ${colorClass} rounded-t-[20px] rounded-b-[60px] border-[4px] border-[#18181B] shadow-[4px_4px_0_#18181B] flex flex-col items-center justify-center relative overflow-hidden`}>
               <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-white opacity-20 skew-x-[-20deg] animate-[shine_3s_ease-in-out_infinite]"></div>
               <div className="mb-4">{getIcon(badgeIconName)}</div>
            </div>
            {showCount && (
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-[#FFD100] rounded-full border-[3px] border-[#18181B] shadow-[2px_2px_0_#18181B] flex items-center justify-center z-20 animate-bounce">
                <span className="font-black text-sm">x{countValue}</span>
              </div>
            )}
            <div className="bg-[#FFD100] px-6 py-2 border-[3px] border-[#18181B] shadow-[4px_4px_0_#18181B] -mt-6 relative z-10 text-center flex items-center justify-center">
              <div className="absolute -left-3 top-2 w-4 h-full bg-[#E5B800] border-[3px] border-[#18181B] -z-10 skew-y-[20deg]"></div>
              <div className="absolute -right-3 top-2 w-4 h-full bg-[#E5B800] border-[3px] border-[#18181B] -z-10 skew-y-[-20deg]"></div>
              <span className="font-black text-[12px] tracking-widest text-[#18181B] uppercase whitespace-nowrap">
                {badgeName}
              </span>
            </div>
          </div>
        );
      };

      const renderStreakBadge = () => {
        return (
          <div className="relative flex flex-col items-center animate-pulse mt-4">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <div className="absolute w-28 h-28 bg-[#FF7A1A] border-[3px] border-[#18181B] shadow-[4px_4px_0_#18181B] rotate-0"></div>
              <div className="absolute w-28 h-28 bg-[#FF7A1A] border-[3px] border-[#18181B] shadow-[4px_4px_0_#18181B] rotate-45"></div>
              <div className="absolute w-28 h-28 bg-[#FF7A1A] border-[3px] border-[#18181B] shadow-[4px_4px_0_#18181B] rotate-[22.5deg]"></div>
              <div className="absolute w-28 h-28 bg-[#FF7A1A] border-[3px] border-[#18181B] shadow-[4px_4px_0_#18181B] rotate-[67.5deg]"></div>
              
              <div className="absolute w-24 h-24 bg-gradient-to-br from-[#FFD84D] to-[#FF7A1A] rounded-full border-[3px] border-[#18181B] flex flex-col items-center justify-center z-10">
                 <LucideIcons.Star size={16} className="text-white fill-white absolute top-2" />
                 <span className="font-black text-4xl text-white drop-shadow-md leading-none mt-2">{specificValue}</span>
                 <span className="font-bold text-[10px] text-white/90 uppercase tracking-widest mt-1">Days</span>
              </div>
            </div>
          </div>
        );
      };

      const renderComboBadge = () => {
        return (
          <div className="relative flex flex-col items-center animate-bounce mt-4">
            <div className="w-32 h-32 bg-gradient-to-b from-[#38BDF8] to-[#0284C7] rounded-full border-[4px] border-[#18181B] shadow-[6px_6px_0_#18181B] flex flex-col items-center justify-center relative overflow-hidden">
               <div className="absolute top-0 w-full h-[40%] bg-white/20 rounded-b-full"></div>
               <span className="font-bold text-[10px] text-white uppercase tracking-widest mt-2">Combo</span>
               <span className="font-black text-4xl text-white drop-shadow-md leading-none mb-1">{specificValue}</span>
               <div className="flex gap-0.5 z-10 mb-2">
                 {[...Array(5)].map((_, i) => (
                   <LucideIcons.Star key={i} size={10} className="text-[#FFD100] fill-[#FFD100]" />
                 ))}
               </div>
            </div>
          </div>
        );
      };

      const renderLeagueBadge = () => {
        const leagueColors = {
          'Iron': 'from-[#94A3B8] to-[#475569]',
          'Bronze': 'from-[#FDBA74] to-[#C2410C]',
          'Silver': 'from-[#E2E8F0] to-[#94A3B8]',
          'Gold': 'from-[#FDE047] to-[#CA8A04]'
        };
        const ribbonColors = {
          'Iron': 'bg-[#EF4444]', // Red ribbon
          'Bronze': 'bg-[#8B5CF6]', // Purple ribbon
          'Silver': 'bg-[#3B82F6]', // Blue ribbon
          'Gold': 'bg-[#8B5CF6]' // Purple ribbon
        };
        const bg = leagueColors[leagueTier] || leagueColors['Bronze'];
        const rb = ribbonColors[leagueTier] || ribbonColors['Bronze'];

        return (
          <div className="relative flex flex-col items-center animate-in fade-in spin-in-12 duration-1000 mt-4">
            <div className={`w-32 h-36 bg-gradient-to-b ${bg} rounded-t-[10px] rounded-b-[50px] border-[4px] border-[#18181B] shadow-[4px_4px_0_#18181B] flex flex-col items-center justify-center relative overflow-hidden z-10`}>
               <div className="absolute top-0 w-full h-[50%] bg-white/20"></div>
               <LucideIcons.Crown size={48} className="text-white drop-shadow-md fill-white" />
            </div>
            
            <div className={`${rb} px-6 py-2 border-[3px] border-[#18181B] shadow-[4px_4px_0_#18181B] -mt-6 relative z-20 text-center flex items-center justify-center`}>
              <div className={`absolute -left-3 top-2 w-4 h-full ${rb} brightness-75 border-[3px] border-[#18181B] -z-10 skew-y-[20deg]`}></div>
              <div className={`absolute -right-3 top-2 w-4 h-full ${rb} brightness-75 border-[3px] border-[#18181B] -z-10 skew-y-[-20deg]`}></div>
              <span className="font-black text-[14px] tracking-widest text-white uppercase whitespace-nowrap drop-shadow-sm">
                {leagueTier}
              </span>
            </div>
          </div>
        );
      };

      const renderRankBadge = () => {
        let medalColor = 'from-[#475569] to-[#1E293B]'; // Dark
        if (specificValue === 1) medalColor = 'from-[#FDE047] to-[#CA8A04]';
        if (specificValue === 2) medalColor = 'from-[#E2E8F0] to-[#94A3B8]';
        if (specificValue === 3) medalColor = 'from-[#FDBA74] to-[#C2410C]';

        return (
          <div className="relative flex flex-col items-center animate-in slide-in-from-top-10 duration-500 mt-4 pb-8">
            <div className="absolute -bottom-6 flex gap-2 z-0">
               <div className="w-6 h-12 bg-[#EF4444] shadow-[0px_4px_0_rgba(0,0,0,0.5)] transform rotate-[15deg] flex" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)' }}></div>
               <div className="w-6 h-12 bg-[#3B82F6] shadow-[0px_4px_0_rgba(0,0,0,0.5)] transform -rotate-[15deg] flex" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)' }}></div>
            </div>
            
            <div className={`w-28 h-28 bg-gradient-to-b ${medalColor} rounded-full border-[4px] border-[#18181B] shadow-[4px_4px_0_#18181B] flex flex-col items-center justify-center relative z-10`}>
               <div className="w-20 h-20 rounded-full border-[2px] border-white/30 flex flex-col items-center justify-center">
                 <span className="font-black text-4xl text-white drop-shadow-md leading-none">{specificValue}</span>
                 <span className="font-bold text-[8px] text-white/80 uppercase tracking-widest mt-1">TOP</span>
               </div>
            </div>
          </div>
        );
      };

      return (
        <div className="w-full px-4 py-8 flex flex-col items-center justify-center relative">
          {isPreviewMode && lives !== 0 && badgeType === 'Achievement Badge' && <Confetti score={90} />}
          
          {badgeType === 'Achievement Badge' && renderAchievementBadge()}
          {badgeType === 'Streak Badge' && renderStreakBadge()}
          {badgeType === 'Combo Badge' && renderComboBadge()}
          {badgeType === 'League Badge' && renderLeagueBadge()}
          {badgeType === 'Leaderboard Rank Badge' && renderRankBadge()}
          
          <style>{`
            @keyframes shine {
              0% { left: -100%; }
              20% { left: 200%; }
              100% { left: 200%; }
            }
          `}</style>
        </div>
      );

    case 'Achievement Card':
      return (
        <div className="w-full px-4 py-6 flex justify-center relative">
          {isPreviewMode && lives !== 0 && <Confetti score={100} />}
          <div className="w-full max-w-[320px] flex flex-col items-center justify-center bg-gradient-to-br from-[#191A2E] to-[#2A2350] border-[4px] border-[#18181B] rounded-[32px] p-8 text-white text-center relative overflow-hidden shadow-[8px_8px_0_#18181B] hover:translate-y-[-4px] hover:shadow-[12px_12px_0_#18181B] transition-all">
            {/* Glow effects inside the dark card */}
            <div className="absolute w-40 h-40 bg-[#01EF8E] opacity-20 rounded-full top-[-40px] right-[-20px] blur-[30px] pointer-events-none"></div>
            <div className="absolute w-32 h-32 bg-[#FF73B5] opacity-20 rounded-full bottom-[-30px] left-[-30px] blur-[30px] pointer-events-none"></div>
            
            <div className="w-20 h-20 bg-gradient-to-br from-[#FFD84D] to-[#FF7A1A] rounded-[20px] flex items-center justify-center mb-5 relative z-10 shadow-[6px_6px_0_#18181B] border-[3px] border-[#18181B]">
              <Trophy size={40} strokeWidth={2.5} className="text-[#18181B]" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-wide leading-tight text-white mb-2 relative z-10">{data.title || 'Achievement Unlocked'}</h2>
            <p className="text-[14px] font-bold text-[#C9C9DE] relative z-10 leading-relaxed">{data.content || data.body || 'You finished the chapter!'}</p>
          </div>
        </div>
      );

    case 'Mascot Emotion':
    case 'Mascot Character':
      const fontForMascot = data.font || 'Montserrat';
      const mascotSize = data.size || 'Medium';
      const sizeClasses = {
        'Small': 'w-24 h-24',
        'Medium': 'w-40 h-40',
        'Large': 'w-64 h-64'
      }[mascotSize] || 'w-40 h-40';
      const showBubble = block.type === 'Mascot Character' ? (data.show_bubble !== 'Off') : false;

      const mAlignClass = {
        'Left': 'mr-auto',
        'Center': 'mx-auto',
        'Right': 'ml-auto'
      }[data.mascot_alignment || data.alignment || 'Center'];

      const bAlignClass = {
        'Left': 'mr-auto',
        'Center': 'mx-auto',
        'Right': 'ml-auto'
      }[data.bubble_alignment || data.alignment || 'Center'];

      const tAlignClass = {
        'Left': 'text-left',
        'Center': 'text-center',
        'Right': 'text-right'
      }[data.text_alignment || data.alignment || 'Center'];

      const tailClass = {
        'Left': 'left-8',
        'Center': 'left-1/2 -translate-x-1/2',
        'Right': 'right-8'
      }[data.mascot_alignment || data.alignment || 'Center'];

      return (
        <div className={`w-full flex flex-col py-4 px-6 gap-2`}>
          {showBubble && (
            <div className={`w-[80%] relative flex justify-center mb-2 ${bAlignClass}`}>
              <div 
                className={`w-full p-5 border-[4px] border-[#18181B] rounded-3xl shadow-[8px_8px_0_#18181B] flex flex-col justify-center relative z-10 ${tAlignClass}`}
                style={{
                  backgroundColor: data.bubble_colour || '#FFFFFF',
                  color: data.text_colour || '#18181B',
                  fontFamily: fontForMascot,
                  fontSize: `${data.font_size || 15}px`,
                  fontWeight: data.font_style === 'Bold' ? '900' : 'bold',
                  fontStyle: data.font_style === 'Italic' ? 'italic' : 'normal',
                }}
              >
                {data.text || 'Mascot says...'}
              </div>
              <div 
                className={`absolute -bottom-2 w-8 h-8 border-b-[4px] border-r-[4px] border-[#18181B] transform rotate-45 z-0 ${tailClass}`}
                style={{ backgroundColor: data.bubble_colour || '#FFFFFF' }}
              ></div>
            </div>
          )}
           <div className={`${sizeClasses} ${mAlignClass} flex items-center justify-center ${getMascotAnimation(data.mascot_type || 'Happy')}`}>
             <img 
               src={MASCOT_IMAGES[data.mascot_type || 'Happy'] || MASCOT_IMAGES.Happy}
               alt={data.mascot_type || 'Happy'}
               className="w-full h-full object-contain drop-shadow-md"
             />
           </div>
        </div>
      );

    case 'Progress Bar':
      const finalProgress = progressValue !== undefined ? progressValue : (data.value || 50);
      return (
        <div className="w-full px-6 py-4">
          <div className="w-full h-6 bg-white rounded-full border-[3px] border-[#18181B] shadow-[4px_4px_0_#18181B] overflow-hidden p-0.5">
            <div className="h-full bg-[#00E599] rounded-full border-r-[3px] border-[#18181B] transition-all duration-300" style={{ width: `${Math.min(100, Math.max(0, finalProgress))}%` }}></div>
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
              <img src={xpImg} alt="XP" className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 drop-shadow-sm" />
              <span className="font-black text-lg sm:text-xl text-[#18181B] truncate">{data.xp_amount ?? 0}</span>
            </div>

            {/* Coins */}
            <div className="flex items-center gap-1 shrink flex-1 justify-center">
              <img src={coinsImg} alt="Coins" className="w-7 h-7 sm:w-9 sm:h-9 shrink-0 drop-shadow-sm" />
              <span className="font-black text-lg sm:text-xl text-[#18181B] truncate">{data.coins_amount ?? 0}</span>
            </div>

            {/* Gems */}
            <div className="flex items-center gap-1 shrink flex-1 justify-center">
              <img src={gemsImg} alt="Gems" className="w-7 h-7 sm:w-9 sm:h-9 shrink-0 drop-shadow-sm" />
              <span className="font-black text-lg sm:text-xl text-[#18181B] truncate">{data.gems_amount ?? 0}</span>
            </div>

          </div>
        </div>
      );

    case 'Reward Icon':
      const renderIcon = () => {
        if (data.icon_type === 'Gold Coin') {
          return <img src={coinsImg} alt="Coins" className="w-14 h-14 drop-shadow-sm animate-mascot-bounce" />;
        } else if (data.icon_type === 'Green Gem') {
          return <img src={gemsImg} alt="Gems" className="w-14 h-14 drop-shadow-sm animate-mascot-float" />;
        } else {
          // XP Sparkle
          return <img src={xpImg} alt="XP" className="w-14 h-14 drop-shadow-sm animate-mascot-pulse" />;
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

    case 'Timer':
      return <TimerBlock blockId={block.id} data={data} isPreviewMode={isPreviewMode} />;
      
    case 'Streak Freeze':
      return (
        <div className="w-full px-6 py-2">
          <div className="w-full bg-[#18181B] text-white p-6 rounded-3xl border-[3px] border-white shadow-[0_0_15px_#FFD100] flex flex-col items-center gap-3 text-center">
             <LucideIcons.Flame size={48} className="text-[#FFD100] animate-pulse" />
             <h4 className="font-black text-2xl text-[#FFD100] uppercase tracking-wider">{data.title || 'Streak Freeze'}</h4>
             <p className="font-bold opacity-90">{data.description || 'You kept your streak alive!'}</p>
             <button className="mt-2 w-full py-3 bg-[#FFD100] text-[#18181B] font-black text-lg rounded-xl border-[3px] border-[#FFD100] hover:bg-transparent hover:text-[#FFD100] transition-colors">
               Equip for {data.price || 200} Gems
             </button>
          </div>
        </div>
      );
      
    case 'Fact Card':
      const isDark = data.theme === 'Dark';
      const isColorful = data.theme === 'Colorful';
      let cardBgClass = "bg-white text-[#18181B] border-[#18181B]";
      if (isDark) cardBgClass = "bg-[#18181B] text-white border-[#18181B]";
      if (isColorful) cardBgClass = "bg-gradient-to-br from-[#8B5CF6] to-[#00E599] text-white border-white shadow-[4px_4px_0_#18181B]";
      return (
        <div className="w-full px-6 py-2">
          <div className={`w-full p-6 border-[3px] shadow-[4px_4px_0_rgba(24,24,27,1)] rounded-3xl flex gap-4 ${cardBgClass}`}>
            <LucideIcons.Info size={32} className={`shrink-0 ${isDark || isColorful ? 'text-white' : 'text-[#8B5CF6]'}`} />
            <div className="flex flex-col gap-1">
               <h4 className="font-black text-lg uppercase tracking-wider">{data.title || 'Did You Know?'}</h4>
               <p className="font-bold opacity-90 leading-relaxed whitespace-pre-line">{data.fact_text}</p>
            </div>
          </div>
        </div>
      );

    case 'Audio Button':
      return (
        <div className="w-full px-6 py-2">
          <button 
            className="w-full flex items-center justify-center gap-3 p-4 bg-[#00E599] border-[3px] border-[#18181B] shadow-[4px_4px_0_#18181B] rounded-2xl active:translate-y-1 active:shadow-none transition-all text-[#18181B] font-black hover:-translate-y-1 hover:shadow-[6px_6px_0_#18181B]"
            onClick={() => {
              if (data.audio_url) {
                new Audio(data.audio_url).play().catch(() => {});
              }
            }}
          >
            <LucideIcons.Volume2 size={24} />
            <span className="text-xl tracking-wide">{data.label || 'Listen'}</span>
          </button>
        </div>
      );

    case 'Comparison':
      return (
        <div className="w-full px-6 py-2">
          <div className="flex gap-4 w-full h-full">
            <div className={`flex-1 p-5 rounded-3xl border-[3px] border-[#18181B] flex flex-col gap-2 shadow-[4px_4px_0_#18181B] ${data.highlight === 'Left' ? 'bg-[#00E599]' : 'bg-white'}`}>
              <h4 className="font-black text-lg text-center">{data.title_a || 'Option A'}</h4>
              <p className="font-bold text-sm text-center opacity-80 whitespace-pre-line">{data.desc_a}</p>
            </div>
            <div className="flex items-center justify-center font-black text-gray-400 shrink-0">VS</div>
            <div className={`flex-1 p-5 rounded-3xl border-[3px] border-[#18181B] flex flex-col gap-2 shadow-[4px_4px_0_#18181B] ${data.highlight === 'Right' ? 'bg-[#00E599]' : 'bg-white'}`}>
              <h4 className="font-black text-lg text-center">{data.title_b || 'Option B'}</h4>
              <p className="font-bold text-sm text-center opacity-80 whitespace-pre-line">{data.desc_b}</p>
            </div>
          </div>
        </div>
      );

    case 'Timeline': {
      const events = (data.events || '').split('\n').filter(Boolean).map(e => e.split('|'));
      return (
        <div className="w-full px-6 py-4">
           {data.title && <h3 className="font-black text-center mb-6 text-2xl uppercase tracking-wider">{data.title}</h3>}
           <div className="flex flex-col gap-0 relative pt-2">
             <div className="absolute left-6 top-4 bottom-4 w-1.5 bg-[#18181B] rounded-full" />
             {events.map((ev, i) => (
                <div key={i} className="flex items-start gap-6 py-3 relative z-10 animate-in fade-in slide-in-from-left-4" style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}>
                   <div className="w-[18px] shrink-0 flex justify-center mt-1">
                     <div className="w-5 h-5 rounded-full bg-[#00E599] border-[3px] border-[#18181B] shadow-[2px_2px_0_#18181B] z-10 -ml-[5px]" />
                   </div>
                   <div className="flex-1 bg-white p-4 rounded-2xl shadow-[4px_4px_0_#18181B] border-[3px] border-[#18181B]">
                     <span className="font-black text-sm text-[#8B5CF6] block mb-1 uppercase tracking-wider">{ev[0]}</span>
                     <p className="font-bold text-[#18181B]">{ev[1]}</p>
                   </div>
                </div>
             ))}
           </div>
        </div>
      );
    }
    
    case 'Text Reflection':
      return (
        <div className="w-full px-6 py-2 flex flex-col gap-3">
          <p className="font-black text-center text-sm mb-2">{data.prompt || 'Reflection Prompt'}</p>
          <textarea 
            className="w-full p-4 rounded-2xl border-[3px] border-[#18181B] shadow-[4px_4px_0_#18181B] font-bold outline-none focus:ring-2 focus:ring-[#8B5CF6] min-h-[120px] resize-none"
            placeholder={data.placeholder || 'Type your answer here...'}
            disabled={!isPreviewMode || isChecking}
            value={interactionState?.[block.id]?.text || ''}
            onChange={(e) => {
              const val = e.target.value;
              setInteractionState({ ...interactionState, [block.id]: { text: val } });
              const minLen = parseInt(data.min_length || '10', 10);
              if (onAnswered) onAnswered({ isAnswered: val.length >= minLen, isCorrect: true });
            }}
          />
          {interactionState?.[block.id]?.text && interactionState[block.id].text.length > 0 && interactionState[block.id].text.length < parseInt(data.min_length || '10', 10) && (
            <p className="text-xs text-[#FF6B6B] font-bold text-center">Keep going! Write a bit more.</p>
          )}
        </div>
      );

    case 'Share':
      return (
        <div className="w-full px-6 py-2">
          <div className="w-full bg-[#8B5CF6] text-white p-6 rounded-3xl border-[3px] border-[#18181B] shadow-[4px_4px_0_#18181B] flex flex-col items-center gap-3 text-center">
             <LucideIcons.Share2 size={40} className="text-white" />
             <h4 className="font-black text-2xl uppercase tracking-wider">{data.title || 'Share your progress!'}</h4>
             <button 
                className="mt-2 w-full py-3 bg-white text-[#8B5CF6] font-black text-lg rounded-xl border-[3px] border-[#18181B] shadow-[4px_4px_0_#18181B] active:translate-y-1 active:shadow-none hover:-translate-y-1 hover:shadow-[6px_6px_0_#18181B] transition-all flex items-center justify-center gap-2"
                onClick={() => {
                  if (navigator.share) navigator.share({ title: data.title, text: data.share_text });
                }}
             >
               <LucideIcons.Upload size={20} />
               Share
             </button>
          </div>
        </div>
      );

    case 'Back to Courses Button':
      return (
        <div className="w-full px-6 py-4 flex justify-center">
          <button className="w-full neo-btn text-white bg-gray-500 py-3 flex items-center justify-center gap-2">
            <LucideIcons.ArrowLeft strokeWidth={2.5} className="w-5 h-5 shrink-0" />
            <span className="truncate">{data.label || 'Back to courses'}</span>
          </button>
        </div>
      );

    case 'Path Map': {
      const numNodes = Math.min(10, Math.max(1, data.number_of_nodes || 4));
      
      const themeColors = {
        'Forest (Green)': 'bg-[#E8F5E9] border-[#2E7D32]',
        'Space (Dark Purple)': 'bg-[#191A2E] border-[#4C1D95]',
        'Desert (Orange)': 'bg-[#FBE9E7] border-[#D84315]',
        'Ocean (Blue)': 'bg-[#E1F5FE] border-[#0277BD]',
        'Default': 'bg-transparent border-transparent'
      };
      
      const pathBg = themeColors[data.theme || 'Default'] || themeColors['Default'];

      // Simple pseudo-random x positions for an S-curve look
      const xPositions = [50, 75, 50, 25, 50, 75, 50, 25, 50, 75];

      return (
        <div className={`w-full py-8 flex flex-col items-center relative overflow-hidden ${pathBg} border-y-4`}>
          {/* S-curve path SVG connecting the nodes */}
          <svg className="absolute top-0 bottom-0 left-0 right-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
             <path 
               d={`M ${xPositions[0]}% 40px ${Array.from({length: numNodes - 1}).map((_, i) => `S ${xPositions[i+1] === 50 ? 50 : xPositions[i]}% ${40 + (i * 90) + 45}px ${xPositions[i+1]}% ${40 + ((i+1) * 90)}px`).join(' ')}`}
               fill="none"
               stroke="#E4E4E7"
               strokeWidth="16"
               strokeLinecap="round"
             />
             <path 
               d={`M ${xPositions[0]}% 40px ${Array.from({length: numNodes - 1}).map((_, i) => `S ${xPositions[i+1] === 50 ? 50 : xPositions[i]}% ${40 + (i * 90) + 45}px ${xPositions[i+1]}% ${40 + ((i+1) * 90)}px`).join(' ')}`}
               fill="none"
               stroke="#F4F4F5"
               strokeWidth="10"
               strokeLinecap="round"
             />
          </svg>

          <div className="relative z-10 flex flex-col items-center w-full" style={{ height: `${numNodes * 90}px` }}>
            {Array.from({length: numNodes}).map((_, i) => {
               const state = data[`node_${i+1}_state`] || 'Locked';
               if (state === 'Hidden') return null;

               const iconName = data[`node_${i+1}_icon`] || 'Book';
               const IconComp = LucideIcons[iconName] || LucideIcons.Book;
               const label = data[`node_${i+1}_label`] || `Lesson ${i+1}`;
               const x = xPositions[i];

               let nodeStyle = 'bg-gray-200 border-gray-400 text-gray-400 scale-90 opacity-80'; // Locked
               let labelStyle = 'text-gray-400';
               let animateBounce = false;

               if (state === 'Completed') {
                 nodeStyle = 'bg-[#00E599] border-[#18181B] text-[#18181B] shadow-[0_4px_0_#18181B] scale-100';
                 labelStyle = 'text-[#18181B] font-black drop-shadow-[0_1px_0_white]';
               } else if (state === 'Crown') {
                 nodeStyle = 'bg-[#FFD100] border-[#18181B] text-[#18181B] shadow-[0_4px_0_#18181B] scale-110 ring-4 ring-yellow-200';
                 labelStyle = 'text-[#18181B] font-black drop-shadow-[0_1px_0_white]';
               } else if (state === 'Unlocked') {
                 nodeStyle = 'bg-[#FF73B5] border-[#18181B] text-white shadow-[0_4px_0_#18181B] scale-110 z-20';
                 labelStyle = 'text-[#18181B] font-black drop-shadow-[0_1px_0_white]';
                 animateBounce = true;
               }

               return (
                 <div key={i} className="absolute flex flex-col items-center justify-center transition-all duration-300 group" style={{ left: `${x}%`, top: `${i * 90}px`, transform: 'translateX(-50%)' }}>
                    <button className={`w-14 h-14 rounded-full flex items-center justify-center border-4 relative ${nodeStyle} ${animateBounce ? 'animate-bounce' : 'hover:-translate-y-1 hover:scale-105'} transition-all`}>
                      <IconComp size={24} strokeWidth={state==='Locked'? 2.5 : 3} className={state === 'Unlocked' ? 'animate-pulse' : ''} />
                      {state === 'Crown' && <LucideIcons.Crown size={16} className="absolute -top-4 text-yellow-500 fill-yellow-400 drop-shadow-[0_2px_0_#18181B]" />}
                    </button>
                    <span className={`mt-2 text-xs text-center max-w-[80px] whitespace-normal leading-tight ${labelStyle}`}>
                      {label}
                    </span>
                 </div>
               );
            })}
          </div>
        </div>
      );
    }

    case 'Weekly Recap': {
      return (
        <div className="w-full px-6 py-6 flex flex-col items-center gap-4">
           <h3 className="text-xl font-black text-[#18181B] text-center w-full mb-2">{data.title || 'Your Week'}</h3>
           
           <div className="grid grid-cols-2 gap-4 w-full">
              {/* Lessons */}
              <div className="bg-[#3B82F6] border-4 border-[#18181B] shadow-[4px_4px_0_#18181B] rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform">
                 <LucideIcons.BookOpen size={28} className="text-white mb-2" />
                 <span className="text-3xl font-black text-white">{data.lessons_completed || 0}</span>
                 <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider mt-1">Lessons</span>
              </div>
              
              {/* XP */}
              <div className="bg-[#FFD100] border-4 border-[#18181B] shadow-[4px_4px_0_#18181B] rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform">
                 <LucideIcons.Star size={28} className="text-[#18181B] fill-white mb-2" />
                 <span className="text-3xl font-black text-[#18181B]">{data.xp_earned || 0}</span>
                 <span className="text-[10px] font-bold text-[#18181B]/80 uppercase tracking-wider mt-1">XP Earned</span>
              </div>

              {/* Streak */}
              <div className="bg-[#FF6B6B] border-4 border-[#18181B] shadow-[4px_4px_0_#18181B] rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform">
                 <LucideIcons.Flame size={28} className="text-white fill-orange-300 mb-2" />
                 <span className="text-3xl font-black text-white">{data.streak_count || 0}</span>
                 <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider mt-1">Day Streak</span>
              </div>

              {/* League */}
              <div className="bg-[#8B5CF6] border-4 border-[#18181B] shadow-[4px_4px_0_#18181B] rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform">
                 <LucideIcons.Trophy size={28} className="text-white fill-yellow-300 mb-2" />
                 <span className="text-sm font-black text-white leading-tight mt-1">{data.league_status || 'Bronze'}</span>
                 <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider mt-1">League</span>
              </div>
           </div>
        </div>
      );
    }

    case 'Combo Banner': {
      const isSpeed = data.combo_type !== 'Accuracy';
      const bgColor = isSpeed ? 'bg-gradient-to-r from-[#FFD100] to-[#FF9800]' : 'bg-gradient-to-r from-[#00E599] to-[#00BFA5]';
      const Icon = isSpeed ? LucideIcons.Zap : LucideIcons.Target;
      
      return (
        <div className="w-full px-6 py-4">
           <div className={`w-full ${bgColor} border-4 border-[#18181B] shadow-[6px_6px_0_#18181B] rounded-2xl p-4 flex items-center justify-between animate-in slide-in-from-bottom-4 duration-500`}>
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-white border-2 border-[#18181B] rounded-full flex items-center justify-center shadow-[2px_2px_0_#18181B]">
                    <Icon size={20} className="text-[#18181B] fill-current" />
                 </div>
                 <div className="flex flex-col">
                    <span className="font-black text-[#18181B] text-lg uppercase leading-none italic">{data.combo_type || 'Speed'} Combo!</span>
                    <span className="font-bold text-[#18181B]/80 text-sm">Multiplier {data.multiplier || 'x2'}</span>
                 </div>
              </div>
              <div className="bg-white px-3 py-1 border-2 border-[#18181B] rounded-xl shadow-[2px_2px_0_#18181B] font-black text-[#8B5CF6]">
                 +{data.bonus_xp || 15} XP
              </div>
           </div>
        </div>
      );
    }

    case 'Streak Risk': {
      return (
        <div className="w-full px-6 py-4">
           <div className="w-full bg-[#18181B] border-4 border-[#FF4B4B] shadow-[6px_6px_0_#FF4B4B] rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#FF4B4B]/10 animate-pulse pointer-events-none"></div>
              
              <div className="flex items-center gap-3 w-full mb-2 z-10">
                 <div className="animate-bounce">
                    <LucideIcons.Flame size={32} className="text-[#FF4B4B] fill-[#FF4B4B] drop-shadow-[0_0_10px_rgba(255,75,75,0.8)]" />
                 </div>
                 <h3 className="text-[#FF4B4B] font-black text-xl uppercase tracking-wider flex-1">{data.hours_left || 2} Hours Left!</h3>
              </div>
              
              <p className="text-white font-bold text-sm w-full z-10 leading-snug">
                {data.message || 'Your streak is at risk! Complete a lesson now.'}
              </p>
           </div>
        </div>
      );
    }

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

export default VisualBlockRenderer;
