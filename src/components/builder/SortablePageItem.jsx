import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronDown, ArrowRight, Trash2, ArrowUp, ArrowDown, Copy, GripVertical } from 'lucide-react';

export const SortablePageItem = ({ 
  page, 
  isActive, 
  canDelete,
  onSelect,
  onDelete, 
  bringForward, 
  sendBackward, 
  duplicateBlock, 
  deleteBlock,
  selectedBlockId,
  setSelectedBlockId,
  onToggleSkip
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: page.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 1,
    position: 'relative'
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`group border-[1px] rounded-lg overflow-hidden transition-all ${isActive ? 'border-[#18181B] bg-white border-[2px] shadow-[2px_2px_0_#18181B]' : 'border-transparent bg-transparent hover:border-[#18181B] hover:border-[2px]'}`}
    >
      <div className={`p-2.5 flex items-center justify-between font-black text-sm transition-colors ${isActive ? 'bg-[#00E599] text-black' : 'bg-transparent text-gray-500 hover:bg-[#F4F4F5] hover:text-[#18181B]'}`}>
        <div className="flex items-center gap-2 truncate flex-1">
          <div 
            {...attributes} 
            {...listeners} 
            className="cursor-grab active:cursor-grabbing hover:bg-black/10 rounded p-0.5"
            title="Drag to reorder"
          >
            <GripVertical size={16} strokeWidth={3} />
          </div>
          <div onClick={onSelect} className="cursor-pointer flex-1 flex items-center gap-2 truncate py-1">
            {isActive ? <ChevronDown size={16} strokeWidth={3} /> : <ArrowRight size={16} strokeWidth={3} />} 
            {page.title}
          </div>
        </div>
        {canDelete && (
           <button 
              onClick={onDelete} 
              className={`p-1 rounded transition-opacity ${isActive ? 'hover:bg-black/20 text-black' : 'hover:bg-[#3F3F46] text-gray-400'}`}
              title="Delete page"
           >
              <Trash2 size={14} strokeWidth={2} />
           </button>
        )}
      </div>
      
      {isActive && (
        <div className="flex flex-col border-t border-[#18181B]/10">
          <div className="px-3 py-2 flex justify-end bg-gray-50/50">
             <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest cursor-pointer hover:text-[#18181B] transition-colors" onClick={(e) => e.stopPropagation()}>
               <input type="checkbox" checked={!!page.skippable} onChange={onToggleSkip} className="accent-[#00E599] w-3.5 h-3.5 cursor-pointer" />
               Skippable Page
             </label>
          </div>
          <div className="p-1 flex flex-col gap-1 min-h-[50px] max-h-[300px] overflow-y-auto custom-scrollbar">
          {page.blocks.length === 0 ? (
            <div className="text-xs font-bold text-gray-500 p-3 text-center">Empty Page</div>
          ) : (
            page.blocks.map((block, index) => (
              <div 
                key={block.id} 
                className={`group flex items-center justify-between p-2 rounded-md text-sm font-bold transition-colors text-left ${selectedBlockId === block.id ? 'bg-white border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B] text-[#18181B]' : 'bg-[#F4F4F5] border-[2px] border-transparent hover:bg-white hover:border-[#18181B] hover:shadow-[2px_2px_0_#18181B] hover:text-[#18181B] text-gray-500'}`}
              >
                <button 
                  className="flex items-center gap-2 flex-1 truncate"
                  onClick={(e) => { e.stopPropagation(); setSelectedBlockId(block.id); }}
                >
                  <div className="w-5 h-5 bg-white border-[2px] border-[#18181B] rounded-full flex items-center justify-center shrink-0 font-black text-[10px] text-[#18181B]">
                    {index + 1}
                  </div>
                  <span className="truncate">{block.type}</span>
                </button>
                
                {selectedBlockId === block.id && (
                  <div className="flex items-center gap-1 bg-white pl-2">
                     <button disabled={index === 0} onClick={(e) => { e.stopPropagation(); bringForward(block.id); }} className="text-gray-400 hover:text-[#18181B] disabled:opacity-30"><ArrowUp size={14}/></button>
                     <button disabled={index === page.blocks.length - 1} onClick={(e) => { e.stopPropagation(); sendBackward(block.id); }} className="text-gray-400 hover:text-[#18181B] disabled:opacity-30"><ArrowDown size={14}/></button>
                     <button onClick={(e) => { e.stopPropagation(); duplicateBlock(block.id); }} className="text-gray-400 hover:text-[#00E599] ml-1" title="Duplicate (Ctrl+D)"><Copy size={14}/></button>
                     <button onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }} className="text-gray-400 hover:text-[#FF6B6B] ml-1"><Trash2 size={14}/></button>
                  </div>
                )}
              </div>
            ))
          )}
          </div>
        </div>
      )}
    </div>
  );
};
