import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Save, Download, Trash2, GripVertical, Play, Smartphone, Tablet, Monitor, Home, ChevronLeft
} from 'lucide-react';
import Logo from '../../components/common/Logo';
import { getLesson, updateLesson } from '../../utils/mockDatabase';

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

function SortableBlock({ id, block, isSelected, onClick, onDelete, isPreviewMode }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: id, disabled: isPreviewMode });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Icon = iconMap[plbSchema[block.type]?.icon] || Type;

  if (isPreviewMode) {
    return (
      <div className="mb-4 bg-[#12123A] border-2 border-[#29366F] rounded-xl p-6 flex flex-col gap-2 relative group overflow-hidden">
        <div className="absolute top-2 right-2 opacity-30 group-hover:opacity-100 transition-opacity">
          <Icon size={24} className="text-[#E0D7FF]" />
        </div>
        <div className="text-lg font-bold text-white">{block.type}</div>
        <div className="text-sm text-[#A1A1AA] line-clamp-3">
          {Object.entries(block.teen).map(([k, v]) => `${k}: ${v}`).join(' | ')}
        </div>
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} className={`relative mb-3 bg-[#12123A] border-[3px] ${isSelected ? 'border-[#00E599] shadow-[4px_4px_0_#00E599]' : 'border-[#29366F] shadow-[4px_4px_0_#09091A]'} rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-colors hover:border-[#8B5CF6]`} onClick={onClick}>
      <div {...attributes} {...listeners} className="cursor-grab hover:bg-[#1a1a45] p-2 rounded-lg touch-none">
        <GripVertical size={20} className="text-[#A1A1AA]" />
      </div>
      <div className="w-10 h-10 bg-[#0c0620] border-[2px] border-[#29366F] rounded-lg flex items-center justify-center">
        <Icon size={20} className="text-white" />
      </div>
      <div className="flex-1 font-bold text-white">
        {block.type}
      </div>
      <button onClick={(e) => { e.stopPropagation(); onDelete(id); }} className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors">
        <Trash2 size={18} />
      </button>
    </div>
  );
}

const PLBBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [lesson, setLesson] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  
  const [version, setVersion] = useState('teen');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [previewDevice, setPreviewDevice] = useState('desktop'); // mobile, tablet, desktop

  useEffect(() => {
    const l = getLesson(id);
    if (!l) {
      navigate('/');
      return;
    }
    setLesson(l);
    setBlocks(l.components || []);
  }, [id, navigate]);

  const saveLesson = (currentBlocks) => {
    const newLessonData = updateLesson(id, { 
      components: currentBlocks,
      pagesCount: Math.max(1, currentBlocks.length)
    });
    setLesson(newLessonData);
  };

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
        const newBlocks = arrayMove(items, oldIndex, newIndex);
        saveLesson(newBlocks);
        return newBlocks;
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
    schema.fields.forEach(field => {
      newBlock.teen[field.name] = field.default;
      newBlock.adult[field.name] = field.default;
    });
    
    const newBlocks = [...blocks, newBlock];
    setBlocks(newBlocks);
    setSelectedBlockId(newBlock.id);
    saveLesson(newBlocks);
  };

  const deleteBlock = (blockId) => {
    const newBlocks = blocks.filter(b => b.id !== blockId);
    setBlocks(newBlocks);
    if (selectedBlockId === blockId) setSelectedBlockId(null);
    saveLesson(newBlocks);
  };

  const updateBlockData = (blockId, fieldName, value) => {
    const newBlocks = blocks.map(block => {
      if (block.id === blockId) {
        return {
          ...block,
          [version]: {
            ...block[version],
            [fieldName]: value
          }
        };
      }
      return block;
    });
    setBlocks(newBlocks);
    saveLesson(newBlocks);
  };

  if (!lesson) return null;

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);
  const selectedSchema = selectedBlock ? plbSchema[selectedBlock.type] : null;

  // Determine canvas width based on preview device
  let canvasWidth = 'max-w-4xl';
  if (isPreviewMode) {
    if (previewDevice === 'mobile') canvasWidth = 'max-w-[375px]';
    if (previewDevice === 'tablet') canvasWidth = 'max-w-[768px]';
    if (previewDevice === 'desktop') canvasWidth = 'max-w-5xl';
  }

  return (
    <div className="h-screen flex flex-col font-sans bg-[#0c0620] text-white overflow-hidden relative">
      {/* Top Header / Toolbar */}
      <header className="h-16 bg-[#12123A] border-b-2 border-[#29366F] px-6 flex items-center justify-between shrink-0 shadow-sm z-20">
        
        {/* Left Side: Back & Meta */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#A1A1AA] hover:text-[#00E599] font-bold transition-colors"
          >
            <ChevronLeft size={20} /> Dashboard
          </button>
          
          <div className="h-8 w-px bg-[#29366F]"></div>
          
          <div>
            <h1 className="font-black text-lg text-white leading-tight">{lesson.title}</h1>
            <p className="text-xs font-bold text-[#A1A1AA]">{lesson.course} &bull; <span className="text-[#00E599]">{lesson.status}</span></p>
          </div>
        </div>
        
        {/* Center: View Controls */}
        <div className="flex items-center gap-4 bg-[#0c0620] p-1.5 rounded-xl border border-[#29366F]">
          <button 
            onClick={() => setIsPreviewMode(false)}
            className={`px-4 py-1.5 rounded-lg font-bold text-sm transition-all ${!isPreviewMode ? 'bg-[#29366F] text-white' : 'text-[#A1A1AA] hover:text-white'}`}
          >
            <Edit3 size={16} className="inline mr-2" /> Editor
          </button>
          <button 
            onClick={() => setIsPreviewMode(true)}
            className={`px-4 py-1.5 rounded-lg font-bold text-sm transition-all ${isPreviewMode ? 'bg-[#29366F] text-[#00E599]' : 'text-[#A1A1AA] hover:text-[#00E599]'}`}
          >
            <Play size={16} className="inline mr-2" /> Preview
          </button>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-4">
          <div className="flex bg-[#0c0620] rounded-lg p-1 border border-[#29366F]">
            <button 
              onClick={() => setVersion('teen')}
              className={`px-3 py-1 font-bold text-xs rounded-md transition-colors ${version === 'teen' ? 'bg-[#8B5CF6] text-white' : 'text-[#A1A1AA] hover:text-white'}`}
            >
              Teen
            </button>
            <button 
              onClick={() => setVersion('adult')}
              className={`px-3 py-1 font-bold text-xs rounded-md transition-colors ${version === 'adult' ? 'bg-orange-500 text-white' : 'text-[#A1A1AA] hover:text-white'}`}
            >
              Adult
            </button>
          </div>
        </div>
      </header>

      {/* Main Builder Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar (Components Library) - Hidden in Preview Mode */}
        {!isPreviewMode && (
          <aside className="w-72 bg-[#12123A] border-r-2 border-[#29366F] overflow-y-auto shrink-0 z-10 flex flex-col">
            <div className="p-5 border-b-2 border-[#29366F] bg-[#0c0620]">
              <h2 className="font-black text-xs text-[#E0D7FF] uppercase tracking-wider">Component Library</h2>
            </div>
            <div className="p-4 flex flex-col gap-2">
              {Object.keys(plbSchema).map(type => {
                const Icon = iconMap[plbSchema[type].icon] || Type;
                return (
                  <button 
                    key={type}
                    onClick={() => addBlock(type)}
                    className="flex items-center gap-3 p-3 bg-[#0c0620] border-[2px] border-[#29366F] rounded-xl hover:border-[#8B5CF6] hover:-translate-y-0.5 transition-all text-left group"
                  >
                    <div className="w-8 h-8 bg-[#12123A] border-[2px] border-[#29366F] rounded-md flex items-center justify-center group-hover:bg-[#8B5CF6] group-hover:border-[#8B5CF6] transition-colors">
                      <Icon size={16} className="text-[#A1A1AA] group-hover:text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">{type}</div>
                      <div className="text-[10px] text-[#A1A1AA] font-bold uppercase tracking-wide">{plbSchema[type].category}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </aside>
        )}

        {/* Center Canvas (Canva Style White Page) */}
        <main className={`flex-1 overflow-y-auto relative bg-transparent p-8 flex flex-col ${isPreviewMode ? 'items-center' : 'items-center'}`}>
          
          {/* Device Toggles overlay in Preview Mode */}
          {isPreviewMode && (
            <div className="sticky top-0 mb-6 bg-[#12123A]/90 backdrop-blur-md px-4 py-2 rounded-full border-2 border-[#29366F] shadow-lg flex items-center gap-2 z-30">
              <button onClick={() => setPreviewDevice('desktop')} className={`p-2 rounded-full transition-colors ${previewDevice==='desktop' ? 'bg-[#00E599] text-[#12123A]' : 'text-[#E0D7FF] hover:bg-[#29366F]'}`}>
                <Monitor size={18} />
              </button>
              <button onClick={() => setPreviewDevice('tablet')} className={`p-2 rounded-full transition-colors ${previewDevice==='tablet' ? 'bg-[#00E599] text-[#12123A]' : 'text-[#E0D7FF] hover:bg-[#29366F]'}`}>
                <Tablet size={18} />
              </button>
              <button onClick={() => setPreviewDevice('mobile')} className={`p-2 rounded-full transition-colors ${previewDevice==='mobile' ? 'bg-[#00E599] text-[#12123A]' : 'text-[#E0D7FF] hover:bg-[#29366F]'}`}>
                <Smartphone size={18} />
              </button>
            </div>
          )}

          {/* The White Canvas */}
          <div className={`w-full ${canvasWidth} min-h-[850px] bg-white text-gray-900 rounded-lg shadow-[0_0_40px_rgba(139,92,246,0.15)] border-4 border-[#29366F] p-8 md:p-12 transition-all duration-300 relative`}>
            
            {blocks.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                <div className="w-24 h-24 mb-6 rounded-full bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <Plus size={32} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Blank Canvas</h3>
                <p className="text-sm font-medium">Click components from the left sidebar to start building.</p>
              </div>
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                  <div className="flex flex-col">
                    {blocks.map((block) => (
                      <SortableBlock 
                        key={block.id} 
                        id={block.id} 
                        block={block} 
                        isSelected={selectedBlockId === block.id && !isPreviewMode}
                        onClick={() => !isPreviewMode && setSelectedBlockId(block.id)}
                        onDelete={deleteBlock}
                        isPreviewMode={isPreviewMode}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}

            {/* In mobile preview, we can render a fake phone notch */}
            {isPreviewMode && previewDevice === 'mobile' && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-100 rounded-b-xl border-x border-b border-gray-200"></div>
            )}
          </div>
          
          <div className="h-20 shrink-0"></div> {/* Bottom padding spacer */}
        </main>

        {/* Right Sidebar (Properties Panel) - Hidden in Preview Mode */}
        {!isPreviewMode && (
          <aside className="w-80 bg-[#12123A] border-l-2 border-[#29366F] overflow-y-auto shrink-0 z-10 flex flex-col">
            <div className="p-5 border-b-2 border-[#29366F] bg-[#0c0620] flex items-center justify-between">
              <h2 className="font-black text-xs text-[#E0D7FF] uppercase tracking-wider">Properties ({version})</h2>
            </div>
            
            <div className="p-6">
              {!selectedBlock ? (
                <div className="text-sm font-bold text-[#A1A1AA] text-center mt-10 p-6 bg-[#0c0620] rounded-xl border-2 border-dashed border-[#29366F]">
                  Select a block on the canvas to configure its settings.
                </div>
              ) : (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="pb-4 border-b-2 border-[#29366F]">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-[#8B5CF6] rounded text-white flex items-center justify-center">
                        <SettingsIcon type={selectedBlock.type} />
                      </div>
                      <h3 className="font-black text-xl text-white">{selectedBlock.type}</h3>
                    </div>
                    <p className="text-[10px] text-[#A1A1AA] font-bold font-mono bg-[#0c0620] px-2 py-1 rounded inline-block mt-2">{selectedBlock.id}</p>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    {selectedSchema.fields.map(field => {
                      const value = selectedBlock[version][field.name] || '';
                      return (
                        <div key={field.name} className="flex flex-col gap-1.5 group">
                          <label className="text-xs font-bold text-[#E0D7FF] flex justify-between">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                            <span className="text-[10px] text-[#A1A1AA] opacity-0 group-hover:opacity-100 transition-opacity">{field.type}</span>
                          </label>
                          
                          {field.type === 'text' || field.type === 'number' ? (
                            <input 
                              type={field.type}
                              value={value}
                              onChange={(e) => updateBlockData(selectedBlock.id, field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border-2 border-[#29366F] bg-[#0c0620] text-white font-medium text-sm focus:border-[#8B5CF6] focus:outline-none transition-colors"
                            />
                          ) : field.type === 'color' ? (
                            <div className="flex items-center gap-2">
                              <input 
                                type="color"
                                value={value}
                                onChange={(e) => updateBlockData(selectedBlock.id, field.name, e.target.value)}
                                className="w-10 h-10 p-1 rounded-lg border-2 border-[#29366F] bg-[#0c0620] cursor-pointer"
                              />
                              <span className="text-sm font-mono text-[#E0D7FF]">{value || '#000000'}</span>
                            </div>
                          ) : field.type === 'textarea' ? (
                            <textarea 
                              value={value}
                              rows={4}
                              onChange={(e) => updateBlockData(selectedBlock.id, field.name, e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border-2 border-[#29366F] bg-[#0c0620] text-white font-medium text-sm resize-y focus:border-[#8B5CF6] focus:outline-none transition-colors"
                            />
                          ) : field.type === 'select' ? (
                            <select
                              value={value}
                              onChange={(e) => updateBlockData(selectedBlock.id, field.name, e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border-2 border-[#29366F] bg-[#0c0620] text-white font-medium text-sm focus:border-[#8B5CF6] focus:outline-none transition-colors appearance-none cursor-pointer"
                            >
                              {field.options.map(opt => <option key={opt} value={opt} className="bg-[#0c0620]">{opt}</option>)}
                            </select>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

// Helper to get small icon for properties panel
const SettingsIcon = ({ type }) => {
  const Icon = iconMap[plbSchema[type]?.icon] || Type;
  return <Icon size={14} />;
};

export default PLBBuilder;
