import React, { useState } from 'react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { plbSchema } from '../../utils/plbSchema';
import { 
  Type, AlignLeft, FileText, Minus, Maximize2, Square, 
  Image as ImageIcon, Video, Film, Volume2, 
  Smile, MessageCircle, HelpCircle, Move, Link, ListOrdered, Sliders, Edit3, MousePointer2, MessageSquare, 
  PieChart, BarChart2, TrendingUp, Table as TableIcon, 
  Star, Coins, Award, Trophy, Percent, 
  ArrowRight, ArrowLeft, FastForward,
  Save, Download, Trash2, GripVertical 
} from 'lucide-react';
import Logo from '../../components/common/Logo';

// Helper to map string icon names to Lucide components
const iconMap = {
  'Type': Type,
  'AlignLeft': AlignLeft,
  'FileText': FileText,
  'Minus': Minus,
  'Maximize2': Maximize2,
  'Square': Square,
  'ImageIcon': ImageIcon,
  'Video': Video,
  'Film': Film,
  'Volume2': Volume2,
  'Smile': Smile,
  'MessageCircle': MessageCircle,
  'HelpCircle': HelpCircle,
  'Move': Move,
  'Link': Link,
  'ListOrdered': ListOrdered,
  'Sliders': Sliders,
  'Edit3': Edit3,
  'MousePointer2': MousePointer2,
  'MessageSquare': MessageSquare,
  'PieChart': PieChart,
  'BarChart2': BarChart2,
  'TrendingUp': TrendingUp,
  'Table': TableIcon,
  'Star': Star,
  'Coins': Coins,
  'Award': Award,
  'Trophy': Trophy,
  'Percent': Percent,
  'ArrowRight': ArrowRight,
  'ArrowLeft': ArrowLeft,
  'FastForward': FastForward
};

// Sortable Item Component
function SortableBlock({ id, block, isSelected, onClick, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Icon = iconMap[plbSchema[block.type]?.icon] || Type;

  return (
    <div ref={setNodeRef} style={style} className={`relative mb-3 bg-white dark:bg-[#27272A] border-[3px] ${isSelected ? 'border-[#8B5CF6] shadow-[4px_4px_0_#8B5CF6]' : 'border-[#18181B] dark:border-white shadow-[4px_4px_0_#18181B] dark:shadow-[#FFFFFF]'} rounded-xl p-4 flex items-center gap-4 cursor-pointer`} onClick={onClick}>
      <div {...attributes} {...listeners} className="cursor-grab hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg">
        <GripVertical size={20} className="text-gray-500" />
      </div>
      <div className="w-10 h-10 bg-[#F1F5F9] dark:bg-[#18181B] border-[2px] border-[#18181B] rounded-lg flex items-center justify-center">
        <Icon size={20} className="text-[#18181B] dark:text-white" />
      </div>
      <div className="flex-1 font-bold text-[#18181B] dark:text-white">
        {block.type} Block
      </div>
      <button onClick={(e) => { e.stopPropagation(); onDelete(id); }} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
        <Trash2 size={18} />
      </button>
    </div>
  );
}

const PLBBuilder = () => {
  const [version, setVersion] = useState('teen'); // 'teen' or 'adult'
  const [blocks, setBlocks] = useState([]);
  const [selectedBlockId, setSelectedBlockId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addBlock = (type) => {
    const schema = plbSchema[type];
    const newBlock = {
      id: `block_${Date.now()}`,
      type: type,
      teen: {},
      adult: {}
    };
    // Initialize defaults
    schema.fields.forEach(field => {
      newBlock.teen[field.name] = field.default;
      newBlock.adult[field.name] = field.default;
    });
    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
  };

  const deleteBlock = (id) => {
    setBlocks(blocks.filter(b => b.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const updateBlockData = (id, fieldName, value) => {
    setBlocks(blocks.map(block => {
      if (block.id === id) {
        return {
          ...block,
          [version]: {
            ...block[version],
            [fieldName]: value
          }
        };
      }
      return block;
    }));
  };

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);
  const selectedSchema = selectedBlock ? plbSchema[selectedBlock.type] : null;

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(blocks, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "lesson_export.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="h-screen flex flex-col font-sans bg-[#F4F4F5] dark:bg-[#18181B] text-[#18181B] dark:text-[#F4F4F5]">
      {/* Top Bar */}
      <header className="h-16 bg-white dark:bg-[#27272A] border-b-[3px] border-[#18181B] dark:border-white px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Logo className="text-2xl" />
          <span className="font-black text-lg bg-[#00E599] text-[#18181B] px-3 py-1 border-[2px] border-[#18181B] rounded-lg">Lesson Builder MVP</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-[#F1F5F9] dark:bg-[#18181B] border-[2px] border-[#18181B] dark:border-white rounded-lg overflow-hidden">
            <button 
              onClick={() => setVersion('teen')}
              className={`px-4 py-1.5 font-bold text-sm transition-colors ${version === 'teen' ? 'bg-[#8B5CF6] text-white' : 'text-[#71717A] hover:bg-gray-200 dark:hover:bg-gray-800'}`}
            >
              Teen Mode (13-20)
            </button>
            <button 
              onClick={() => setVersion('adult')}
              className={`px-4 py-1.5 font-bold text-sm transition-colors ${version === 'adult' ? 'bg-[#FF4444] text-white' : 'text-[#71717A] hover:bg-gray-200 dark:hover:bg-gray-800'}`}
            >
              Adult Mode (20-30+)
            </button>
          </div>
          <button onClick={exportJSON} className="flex items-center gap-2 bg-[#18181B] dark:bg-white text-white dark:text-[#18181B] px-4 py-2 rounded-lg font-bold hover:opacity-80 transition-opacity">
            <Download size={18} /> Export JSON
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Components */}
        <aside className="w-64 bg-white dark:bg-[#27272A] border-r-[3px] border-[#18181B] dark:border-white overflow-y-auto p-4 shrink-0">
          <h2 className="font-black text-sm text-[#71717A] uppercase tracking-wider mb-4">Components</h2>
          <div className="flex flex-col gap-3">
            {Object.keys(plbSchema).map(type => {
              const Icon = iconMap[plbSchema[type].icon] || Type;
              return (
                <button 
                  key={type}
                  onClick={() => addBlock(type)}
                  className="flex items-center gap-3 p-3 bg-[#F4F4F5] dark:bg-[#18181B] border-[2px] border-[#18181B] dark:border-gray-600 rounded-xl hover:border-[#00E599] hover:-translate-y-1 transition-all text-left group"
                >
                  <div className="w-8 h-8 bg-white dark:bg-[#27272A] border-[2px] border-[#18181B] dark:border-gray-600 rounded-md flex items-center justify-center group-hover:bg-[#00E599] group-hover:border-[#18181B] transition-colors">
                    <Icon size={16} className="text-[#18181B] dark:text-gray-300 group-hover:text-[#18181B]" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#18181B] dark:text-white">{type}</div>
                    <div className="text-xs text-[#71717A] font-medium">{plbSchema[type].category}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </aside>

        {/* Center Canvas */}
        <section className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-2xl mx-auto">
            {blocks.length === 0 ? (
              <div className="border-[3px] border-dashed border-gray-300 dark:border-gray-700 rounded-3xl h-64 flex flex-col items-center justify-center text-gray-400 font-bold">
                <div className="text-4xl mb-4">🐷</div>
                Click a component on the left to add it to the page
              </div>
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                  {blocks.map((block) => (
                    <SortableBlock 
                      key={block.id} 
                      id={block.id} 
                      block={block} 
                      isSelected={selectedBlockId === block.id}
                      onClick={() => setSelectedBlockId(block.id)}
                      onDelete={deleteBlock}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            )}
            
            {/* Phone Frame Overlay for preview? Or just list. */}
          </div>
        </section>

        {/* Right Properties Panel */}
        <aside className="w-80 bg-white dark:bg-[#27272A] border-l-[3px] border-[#18181B] dark:border-white overflow-y-auto p-6 shrink-0">
          <h2 className="font-black text-sm text-[#71717A] uppercase tracking-wider mb-6">Properties ({version} mode)</h2>
          
          {!selectedBlock ? (
            <div className="text-sm font-bold text-gray-400 text-center mt-10">Select a block on the canvas to edit its properties.</div>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="pb-4 border-b-[2px] border-gray-100 dark:border-gray-800">
                <h3 className="font-black text-xl text-[#18181B] dark:text-white">{selectedBlock.type}</h3>
                <p className="text-xs text-[#71717A] font-bold">ID: {selectedBlock.id}</p>
              </div>
              
              {selectedSchema.fields.map(field => {
                const value = selectedBlock[version][field.name] || '';
                return (
                  <div key={field.name} className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#18181B] dark:text-gray-300">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    
                    {field.type === 'text' || field.type === 'number' || field.type === 'color' ? (
                      <input 
                        type={field.type}
                        value={value}
                        onChange={(e) => updateBlockData(selectedBlock.id, field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border-[2px] border-[#18181B] dark:border-gray-600 bg-white dark:bg-[#18181B] font-medium text-sm ${field.type === 'color' ? 'h-10 p-1' : ''}`}
                      />
                    ) : field.type === 'textarea' ? (
                      <textarea 
                        value={value}
                        rows={4}
                        onChange={(e) => updateBlockData(selectedBlock.id, field.name, e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border-[2px] border-[#18181B] dark:border-gray-600 bg-white dark:bg-[#18181B] font-medium text-sm resize-y"
                      />
                    ) : field.type === 'select' ? (
                      <select
                        value={value}
                        onChange={(e) => updateBlockData(selectedBlock.id, field.name, e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border-[2px] border-[#18181B] dark:border-gray-600 bg-white dark:bg-[#18181B] font-medium text-sm"
                      >
                        {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}
        </aside>

      </main>
    </div>
  );
};

export default PLBBuilder;
