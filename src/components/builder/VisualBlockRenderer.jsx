import React, { useState } from 'react';
import { 
  Star, Coins, Award, Trophy, MessageCircle, ArrowRight, ArrowLeft, FastForward,
  PieChart, BarChart2, TrendingUp, Table as TableIcon, HelpCircle, Move, Link, ListOrdered, Sliders, Edit3, MousePointer2, MessageSquare, Check, GripVertical, Volume2
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
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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

  return map[opt] || map['Happy'];
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

const ChartQuiz = ({ blockId, data, interactionState, setInteractionState, isPreviewMode }) => {
  const shuffledOptions = useShuffledOptions(blockId, [
    { key: 'A', text: data.quiz_option_a },
    { key: 'B', text: data.quiz_option_b },
    { key: 'C', text: data.quiz_option_c },
    { key: 'D', text: data.quiz_option_d }
  ]);

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

const MatchPairsInteractive = ({ blockId, data, interactionState, setInteractionState, isPreviewMode }) => {
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
    if (!isPreviewMode) return;
    if (state.matchedPairs.includes(id)) return;
    
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
    if (!isPreviewMode) return;
    if (state.matchedPairs.includes(id)) return;
    if (!state.leftSelected) return;

    const isMatch = state.leftSelected === id;
    
    if (isMatch) {
      setInteractionState({
        ...interactionState,
        [blockId]: {
          ...state,
          leftSelected: null,
          matchedPairs: [...state.matchedPairs, id]
        }
      });
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
                  onClick={() => handleLeftClick(id)}
                  className={`flex-1 border-[3px] rounded-2xl px-4 py-3 shadow-[4px_4px_0_#18181B] font-bold text-sm text-center flex items-center justify-center break-words transition-colors select-none ${isPreviewMode && !isMatched ? 'cursor-pointer hover:-translate-y-0.5' : ''} ${bgClass} ${animClass}`}
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
                 onClick={() => handleRightClick(item.id)}
                 className={`px-3 py-1.5 border-[2px] shadow-[3px_3px_0_#18181B] rounded-lg text-xs font-bold transition-all select-none ${isPreviewMode ? 'cursor-pointer hover:-translate-y-0.5' : 'cursor-default'} ${bgClass} ${animClass}`}
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

const HotspotInteractive = ({ blockId, data, interactionState, setInteractionState, isPreviewMode }) => {
  const state = (interactionState && interactionState[blockId]) || { status: 'idle', clickX: null, clickY: null };

  const handleImageClick = (e) => {
    if (!isPreviewMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const targetX = parseFloat(data.hotspot_x || 50);
    const targetY = parseFloat(data.hotspot_y || 50);
    const size = parseInt(data.hotspot_size || 2, 10) * 5; // size 2 => 10% radius
    
    const dist = Math.sqrt(Math.pow(x - targetX, 2) + Math.pow(y - targetY, 2));
    const isCorrect = dist <= size;
    
    setInteractionState({
      ...interactionState,
      [blockId]: {
        status: isCorrect ? 'correct' : 'error',
        clickX: x,
        clickY: y,
        missCount: isCorrect ? (state.missCount || 0) : (state.missCount || 0) + 1
      }
    });

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
         className={`relative w-full max-w-sm aspect-square bg-gray-100 border-[3px] rounded-2xl overflow-hidden shadow-[4px_4px_0_#18181B] transition-colors ${state.status === 'correct' ? 'border-[#00E599]' : state.status === 'error' ? 'border-[#FF6B6B] animate-mascot-shake' : 'border-[#18181B]'}`}
         onClick={handleImageClick}
       >
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

const ArrangeSortableItem = ({ id, text, isPreviewMode }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: id, disabled: !isPreviewMode });

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

const ArrangeInteractive = ({ blockId, data, interactionState, setInteractionState, isPreviewMode }) => {
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
    if (!isPreviewMode) return;
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(p => p.id === active.id);
        const newIndex = items.findIndex(p => p.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      if (interactionState) {
        setInteractionState({ ...interactionState, [blockId]: { status: 'idle' } });
      }
    }
  };

  const handleCheck = () => {
    if (!isPreviewMode) return;
    const currentOrder = items.map(i => i.id).join(',');
    const correctOrder = originalItems.join(',');
    const isCorrect = currentOrder === correctOrder;
    
    if (interactionState) {
      setInteractionState({
        ...interactionState,
        [blockId]: { status: isCorrect ? 'correct' : 'error' }
      });
      
      if (!isCorrect) {
        setTimeout(() => {
          setInteractionState(prev => ({ ...prev, [blockId]: { status: 'idle' } }));
        }, 1000);
      }
    }
  };

  return (
    <div className="w-full px-6 py-4">
      <div className={`w-full flex flex-col gap-4 bg-white border-[4px] rounded-[32px] p-6 shadow-[8px_8px_0_#18181B] transition-colors ${state.status === 'correct' ? 'border-[#00E599]' : state.status === 'error' ? 'border-[#FF6B6B] animate-mascot-shake' : 'border-[#18181B]'}`}>
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
                <ArrangeSortableItem key={item.id} id={item.id} text={item.text} isPreviewMode={isPreviewMode} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
        
        {isPreviewMode && (
          <button 
            onClick={handleCheck}
            className={`mt-4 w-full py-3 rounded-xl font-black text-lg transition-all border-[3px] shadow-[4px_4px_0_#18181B] ${state.status === 'correct' ? 'bg-[#00E599] text-[#18181B] border-[#18181B]' : 'bg-[#18181B] text-white border-[#18181B] hover:bg-black hover:-translate-y-1 hover:shadow-[6px_6px_0_#18181B]'}`}
          >
            {state.status === 'correct' ? 'Correct!' : 'Check Answer'}
          </button>
        )}
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

const DragAndDropInteractive = ({ blockId, data, interactionState, setInteractionState, isPreviewMode }) => {
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
    } else {
      setBankItems(allItems);
      setBucketItems({ b1: [], b2: [], b3: [] });
    }
  }, [data, isPreviewMode]);

  const state = (interactionState && interactionState[blockId]) || { status: 'idle' };

  const handleDragEnd = (event) => {
    if (!isPreviewMode) return;
    const { active, over } = event;
    
    if (over) {
      const draggedItem = bankItems.find(i => i.id === active.id);
      if (draggedItem) {
        setBankItems(prev => prev.filter(i => i.id !== active.id));
        setBucketItems(prev => ({
          ...prev,
          [over.id]: [...prev[over.id], draggedItem]
        }));
        
        if (interactionState) {
          setInteractionState({ ...interactionState, [blockId]: { status: 'idle' } });
        }
      }
    }
  };
  
  const handleCheck = () => {
    if (!isPreviewMode) return;
    
    const allPlaced = bankItems.length === 0;
    
    let isCorrect = allPlaced;
    if (isCorrect) {
      ['b1', 'b2', 'b3'].forEach(bId => {
        bucketItems[bId].forEach(item => {
          if (item.bucket !== bId) isCorrect = false;
        });
      });
    }

    if (interactionState) {
      setInteractionState({
        ...interactionState,
        [blockId]: { status: isCorrect ? 'correct' : 'error' }
      });
      
      if (!isCorrect) {
        setTimeout(() => {
          setInteractionState(prev => ({ ...prev, [blockId]: { status: 'idle' } }));
        }, 1000);
      }
    }
  };

  const buckets = [];
  if (data.bucket_1_name || (!data.bucket_1_name && !data.bucket_2_name)) buckets.push({ id: 'b1', label: data.bucket_1_name || 'Needs' });
  if (data.bucket_2_name || (!data.bucket_1_name && !data.bucket_2_name)) buckets.push({ id: 'b2', label: data.bucket_2_name || 'Wants' });
  if (data.bucket_3_name) buckets.push({ id: 'b3', label: data.bucket_3_name });

  return (
    <div className="w-full px-6 py-4">
      <div className={`w-full flex flex-col gap-6 bg-[#F4F4F5] border-[4px] rounded-[32px] p-6 shadow-[8px_8px_0_#18181B] transition-colors ${state.status === 'correct' ? 'border-[#00E599]' : state.status === 'error' ? 'border-[#FF6B6B] animate-mascot-shake' : 'border-[#18181B]'}`}>
        {data.question && <p className="font-black text-center text-lg leading-tight text-[#18181B]">{data.question}</p>}
        
        <DndContext onDragEnd={handleDragEnd}>
          <div className="flex gap-4 w-full justify-center">
            {buckets.map(b => (
              <DroppableBucket key={b.id} id={b.id} label={b.label} items={bucketItems[b.id] || []} isCorrectState={state.status} />
            ))}
          </div>
          
          <div className="w-full h-[2px] bg-[#18181B]/10 my-2 rounded-full" />
          
          <div className="flex flex-wrap justify-center gap-3 min-h-[60px]">
            {bankItems.length === 0 ? (
              <div className="text-gray-400 font-bold text-sm">All items sorted!</div>
            ) : (
              bankItems.map(item => (
                <DraggablePill key={item.id} id={item.id} text={item.text} disabled={!isPreviewMode} />
              ))
            )}
          </div>
        </DndContext>
        
        {isPreviewMode && bankItems.length === 0 && (
          <button 
            onClick={handleCheck}
            className={`w-full py-3 rounded-xl font-black text-lg transition-all border-[3px] shadow-[4px_4px_0_#18181B] ${state.status === 'correct' ? 'bg-[#00E599] text-[#18181B] border-[#18181B]' : 'bg-[#18181B] text-white border-[#18181B] hover:bg-black hover:-translate-y-1 hover:shadow-[6px_6px_0_#18181B]'}`}
          >
            {state.status === 'correct' ? 'Correct!' : 'Check Answer'}
          </button>
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

const VisualBlockRenderer = ({ block, version, isPreviewMode, progressValue }) => {
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
        <div className={`w-full flex ${fbAlignClass} py-4 px-6 gap-4 items-end`}>
          <div className={`w-20 h-20 shrink-0 flex items-center justify-center z-10 ${getMascotAnimation(fbMascotType)}`}>
             <img 
                src={`/piggypath_admin/assets/mascots/${fbMascotType}.png?v=clean4`}
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
              className="absolute -left-2 bottom-6 w-6 h-6 border-l-[4px] border-b-[4px] border-[#18181B] transform rotate-45 z-0 bg-white"
            ></div>
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

    case 'Reflection': {
      return (
        <div className="w-full px-6 py-4 flex flex-col gap-4">
           {data.question && <p className="font-black text-center text-sm mb-2">{data.question}</p>}
           
           <textarea 
             className="w-full bg-white border-[3px] border-[#18181B] rounded-xl p-4 shadow-[4px_4px_0_#18181B] min-h-[100px] text-[#18181B] font-bold text-sm outline-none resize-none focus:ring-2 focus:ring-[#8B5CF6]"
             placeholder="Type your thoughts here..."
             value={interactionState?.reflectionText || ''}
             disabled={!isPreviewMode || interactionState?.revealedAnswer}
             onChange={(e) => {
               if (!isPreviewMode) return;
               setInteractionState({ ...interactionState, reflectionText: e.target.value });
             }}
           />

           {interactionState?.reflectionText?.trim().length > 0 && !interactionState?.revealedAnswer && (
             <button
               onClick={() => {
                 if (!isPreviewMode) return;
                 setInteractionState({ ...interactionState, revealedAnswer: true });
               }}
               className="mx-auto px-6 py-2 bg-[#8B5CF6] text-white font-black text-sm rounded-xl border-[2px] border-[#18181B] shadow-[4px_4px_0_#18181B] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#18181B] transition-all"
             >
               Reveal model answer
             </button>
           )}

           {interactionState?.revealedAnswer && data.model_answer && (
             <div className="mt-2 p-4 rounded-xl border-[2px] border-dashed border-[#00E599] bg-[#00E599]/10">
                <span className="text-xs font-bold text-[#00E599] uppercase tracking-wider block mb-1">Model Answer</span>
                <p className="text-sm font-bold text-[#18181B]">{data.model_answer}</p>
             </div>
           )}
           {interactionState?.revealedAnswer && data.xp_reward && (
             <div className="mt-1 text-center text-[#FFD100] font-black text-sm drop-shadow-[0_1px_0_#18181B]">+{data.xp_reward} XP</div>
           )}
        </div>
      );
    }

    case 'MCQ': {
      const mcqShuffled = useShuffledOptions(blockId, [
        { key: 'A', text: data.option_a },
        { key: 'B', text: data.option_b },
        { key: 'C', text: data.option_c },
        { key: 'D', text: data.option_d }
      ]);
      const correctOptKey = data.correct_option || 'A';
      const hasSelection = interactionState?.selectedKey !== undefined;
      const isCorrectSelection = hasSelection && interactionState?.selectedKey === correctOptKey;
      
      return (
        <div className="w-full px-6 py-2">
          <div className="w-full flex flex-col gap-3">
            <p className="font-black text-center text-sm mb-2">{data.question || 'Which item is most important to buy first?'}</p>
            
            {mcqShuffled.map((opt) => {
              const isSelected = interactionState?.selectedKey === opt.key;
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
                    if (isPreviewMode && !hasSelection) setInteractionState({ selectedKey: opt.key });
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
                {isCorrectSelection ? (data.why_correct || 'That is correct!') : (data.why_incorrect || 'That is incorrect, please try again.')}
              </div>
            )}
          </div>
        </div>
      );
    }

    case 'Fill in the Blank':
      const parts = (data.question || 'A ___ fund should cover 3 to 6 months of essential expenses.').split(/_{2,}/);
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

    case 'Slider':
      const min = parseInt(data.min_value || 0, 10);
      const max = parseInt(data.max_value || 100, 10);
      const target = parseInt(data.target_value || 50, 10);
      const tol = parseInt(data.tolerance || 5, 10);
      
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
                
                {/* Hint Band */}
                {interactionState?.hasAttempted && sliderStatus !== 'correct' && (
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
                  disabled={!isPreviewMode}
                  className="w-full absolute inset-0 opacity-0 cursor-pointer z-10"
                  onChange={(e) => {
                    if (!isPreviewMode) return;
                    setInteractionState({ ...interactionState, value: parseInt(e.target.value) });
                  }}
                  onMouseUp={() => {
                    if (!isPreviewMode) return;
                    const correct = Math.abs(val - target) <= tol;
                    setInteractionState({ ...interactionState, status: correct ? 'correct' : 'incorrect', hasAttempted: true });
                  }}
                  onTouchEnd={() => {
                    if (!isPreviewMode) return;
                    const correct = Math.abs(val - target) <= tol;
                    setInteractionState({ ...interactionState, status: correct ? 'correct' : 'incorrect', hasAttempted: true });
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

              {(sliderStatus === 'correct' || sliderStatus === 'incorrect') && (
                <div className={`mt-2 w-full max-w-[250px] p-4 rounded-lg border-[2px] border-[#18181B] shadow-[4px_4px_0_#18181B] text-sm font-bold text-left ${sliderStatus === 'correct' ? 'bg-[#00E599] text-[#18181B]' : 'bg-[#FF6B6B] text-white'}`}>
                  <span className="underline decoration-2 underline-offset-2 mb-1 block">Explanation</span>
                  {sliderStatus === 'correct' ? (data.why_correct || 'Correct!') : (data.why_incorrect || 'Incorrect, please try again.')}
                </div>
              )}
              {sliderStatus === 'correct' && data.xp_reward && (
                 <div className="mt-1 text-center text-[#FFD100] font-black text-sm drop-shadow-[0_1px_0_#18181B]">+{data.xp_reward} XP</div>
              )}
            </div>
          </div>
        </div>
      );

    case 'Drag & Drop':
      return <DragAndDropInteractive blockId={block.id} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} />;
    case 'Arrange':
      return <ArrangeInteractive blockId={block.id} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} />;
    case 'Hotspot':
      return <HotspotInteractive blockId={block.id} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} />;
    case 'Match Pairs':
      return <MatchPairsInteractive blockId={block.id} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} />;

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
           <div className="w-full border-[3px] border-[#18181B] rounded-2xl overflow-hidden shadow-[4px_4px_0_#18181B] bg-white">
              <table className="w-full text-sm font-bold text-left">
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
                const bgColor = slice.color;
                const textColor = '#18181B';
                
                return (
                  <div 
                    key={i} 
                    className="px-4 py-2 flex items-center gap-2 border-[3px] border-[#18181B] rounded-lg shadow-[4px_4px_0_#18181B] text-sm font-black transition-all cursor-default" 
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
          </div>
          <ChartQuiz blockId={block.id} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} />
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
          </div>
          <ChartQuiz blockId={block.id} data={data} interactionState={interactionState} setInteractionState={setInteractionState} isPreviewMode={isPreviewMode} />
        </div>
      );

    case 'Line Graph': {
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
      const trend = lastPoint >= firstPoint ? '↑ Growing' : '↓ Shrinking';
      const trendColor = lastPoint >= firstPoint ? 'text-[#00E599] bg-[#00E599]/10' : 'text-[#FF6B6B] bg-[#FF6B6B]/10';

      return (
        <div className="w-full px-6 py-4 flex flex-col items-center gap-6">
          <div className="flex items-center justify-between w-full max-w-[250px]">
            {data.title ? <p className="font-black text-center text-sm text-[#18181B] flex-1">{data.title}</p> : <div className="flex-1" />}
            {data.show_trend_label === 'On' && (
               <div className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border-[2px] ${trendColor.replace('text-', 'border-').split(' ')[0]} ${trendColor}`}>
                 {trend}
               </div>
            )}
          </div>
          
          <div className="w-full max-w-[250px] flex flex-col relative bg-white border-l-4 border-b-4 border-[#18181B] pt-4 pr-4">
             {data.y_axis_label && <span className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">{data.y_axis_label}</span>}
             <svg width="100%" height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="overflow-visible">
                <path d={pathData} fill="none" stroke={data.line_colour || '#3B82F6'} strokeWidth="4" strokeLinejoin="round" />
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
      return (
        <div className="w-full px-4 py-8 flex flex-col items-center justify-center relative">
          {isPreviewMode && <Confetti score={90} />}
          <div className="relative flex flex-col items-center">
            {/* Starburst rays */}
            <div className="absolute w-56 h-56 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNNTAgMEw1NSAzNUw5MCAxMEw2NSA0NUwxMDAgNTBMNjUgNTVMOTAgOTBMNTUgNjVMNTAgMTAwTDQ1IDY1TDEwIDkwTDM1IDU1TDAgNTBMMzUgNDVMMTAgMTBMNDUgMzVaIiBmaWxsPSIjRkZEODREIiBvcGFjaXR5PSIwLjI1Ii8+PC9zdmc+')] bg-center bg-no-repeat bg-contain animate-spin-slow -z-10"></div>
            
            <div className="w-32 h-32 bg-gradient-to-b from-[#806BFF] to-[#3F43BF] rounded-full border-[5px] border-[#18181B] shadow-[6px_6px_0_#18181B] flex flex-col items-center justify-center mb-6 relative overflow-hidden">
               {/* Shine reflection */}
               <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-white opacity-40 skew-x-[-20deg] animate-[shine_3s_ease-in-out_infinite]"></div>
               <Award size={52} strokeWidth={3} className="text-white drop-shadow-md" />
            </div>
            
            <div className="bg-[#01EF8E] px-6 py-3 rounded-full border-[3px] border-[#18181B] shadow-[4px_4px_0_#18181B] -mt-10 relative z-10 text-center flex items-center justify-center">
              <span className="font-black text-[14px] tracking-wide text-[#18181B] uppercase leading-none whitespace-nowrap">{data.badge_name || 'Badge Unlocked!'}</span>
            </div>
            
            {data.caption && <div className="mt-4 text-sm font-bold text-gray-600 text-center max-w-[220px] leading-snug">{data.caption}</div>}
          </div>
          
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
          {isPreviewMode && <Confetti score={100} />}
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
               src={`/piggypath_admin/assets/mascots/${data.mascot_type || 'Happy'}.png?v=clean4`}
               alt={data.mascot_type || 'Happy'}
               className="w-full h-full object-contain mix-blend-multiply drop-shadow-md"
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
