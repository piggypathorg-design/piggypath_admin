import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Rnd } from 'react-rnd';
import { plbSchema } from '../../utils/plbSchema';
import VisualBlockRenderer from '../../components/builder/VisualBlockRenderer';
import { 
  Type, AlignLeft, FileText, Minus, Maximize2, Square, 
  Image as ImageIcon, Video, Film, Volume2, 
  Smile, MessageCircle, HelpCircle, Move, Link, ListOrdered, Sliders, Edit3, MousePointer2, MessageSquare, 
  PieChart, BarChart2, TrendingUp, Table as TableIcon, 
  Star, Coins, Award, Trophy, Percent, 
  ArrowRight, ArrowLeft, FastForward,
  Save, Download, Trash2, GripVertical, Play, Smartphone, Tablet, Monitor, Home, ChevronLeft, Plus,
  Layers, ArrowUp, ArrowDown, Upload, ChevronDown, Check, Rocket, Eye, Search
} from 'lucide-react';
import { getLesson, updateLesson } from '../../utils/api';

const iconMap = {
  'Type': Type, 'AlignLeft': AlignLeft, 'FileText': FileText, 'Minus': Minus, 'Maximize2': Maximize2, 'Square': Square, 
  'ImageIcon': ImageIcon, 'Video': Video, 'Film': Film, 'Volume2': Volume2, 
  'Smile': Smile, 'MessageCircle': MessageCircle, 'HelpCircle': HelpCircle, 'Move': Move, 'Link': Link, 'ListOrdered': ListOrdered, 'Sliders': Sliders, 'Edit3': Edit3, 'MousePointer2': MousePointer2, 'MessageSquare': MessageSquare, 
  'PieChart': PieChart, 'BarChart2': BarChart2, 'TrendingUp': TrendingUp, 'Table': TableIcon, 
  'Star': Star, 'Coins': Coins, 'Award': Award, 'Trophy': Trophy, 'Percent': Percent, 
  'ArrowRight': ArrowRight, 'ArrowLeft': ArrowLeft, 'FastForward': FastForward
};

const PLBBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [lesson, setLesson] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [version, setVersion] = useState('teen');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  // New features state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');

  useEffect(() => {
    const fetchLesson = async () => {
      const l = await getLesson(id);
      if (!l) {
        navigate('/');
        return;
      }
      setLesson(l);
      setBlocks(l.components || []);
    };
    fetchLesson();
  }, [id, navigate]);

  const saveLesson = async (currentBlocks) => {
    setIsSaving(true);
    const newLessonData = await updateLesson(id, { 
      components: currentBlocks,
      pagesCount: Math.max(1, currentBlocks.length)
    });
    if (newLessonData) setLesson(newLessonData);
    
    // Artificial delay to show saving state smoothly
    setTimeout(() => setIsSaving(false), 500);
  };

  const addBlock = (type) => {
    const schema = plbSchema[type];
    
    // Default Dimensions
    let w = 300; let h = 100;
    if (schema.category === 'Media') { w = 300; h = 200; }
    if (schema.category === 'Mascot') { w = 150; h = 150; }
    if (schema.category === 'Activity') { w = 350; h = 200; }
    if (schema.category === 'Feedback') { w = 300; h = 200; }
    if (schema.category === 'Navigation') { w = 200; h = 60; }
    if (type === 'Title') { w = 350; h = 80; }
    if (type === 'Divider') { w = 300; h = 40; }
    if (type === 'Mascot Bubble') { w = 250; h = 120; }
    
    // Stagger spawn positions so they don't exactly overlap
    const spawnX = 50 + (blocks.length % 5) * 20;
    const spawnY = 50 + (blocks.length % 5) * 20;

    const newBlock = {
      id: `block_${Date.now()}`,
      type: type,
      x: spawnX,
      y: spawnY,
      width: w,
      height: h,
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

  const bringForward = (blockId) => {
    const index = blocks.findIndex(b => b.id === blockId);
    if (index < blocks.length - 1) {
      const newBlocks = [...blocks];
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
      setBlocks(newBlocks);
      saveLesson(newBlocks);
    }
  };
  
  const sendBackward = (blockId) => {
    const index = blocks.findIndex(b => b.id === blockId);
    if (index > 0) {
      const newBlocks = [...blocks];
      [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
      setBlocks(newBlocks);
      saveLesson(newBlocks);
    }
  };

  const updateBlockSpatial = (blockId, spatialUpdates) => {
    const newBlocks = blocks.map(block => {
      if (block.id === blockId) {
        return { ...block, ...spatialUpdates };
      }
      return block;
    });
    setBlocks(newBlocks);
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

  const handleFileUpload = (blockId, fieldName, file) => {
    if (!file) return;
    
    // SECURITY: Strict file size limit to prevent huge JSON blobs and DOS
    if (file.size > 2 * 1024 * 1024) {
      alert("Security/Performance limit: Please keep images under 2MB.");
      return; 
    }
    // SECURITY: Check mime type
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
       alert("Security limit: Only image and video files are allowed.");
       return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      // FileReader result is a base64 string, safe to store as text
      updateBlockData(blockId, fieldName, e.target.result);
    };
    reader.readAsDataURL(file);
  };

  if (!lesson) return null;

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);
  const selectedSchema = selectedBlock ? plbSchema[selectedBlock.type] : null;

  // Filter components for sidebar
  const categories = ['ALL', 'CONTENT', 'MEDIA', 'CHARACTER', 'ACTIVITY', 'VISUALIZATION', 'FEEDBACK', 'NAVIGATION', 'LAYOUT'];
  const filteredTypes = Object.keys(plbSchema).filter(type => {
    const matchesSearch = type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'ALL' || plbSchema[type].category.toUpperCase() === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-screen w-screen p-4 bg-[#E4E4E7] font-sans overflow-hidden">
      {/* Outer Wrapper for Neo-Brutalist "Window" effect */}
      <div className="w-full h-full bg-white border-[3px] border-black rounded-3xl overflow-hidden shadow-[8px_8px_0_0_rgba(0,0,0,1)] flex flex-col">
        
        {/* Header */}
        <header className="h-20 bg-white border-b-[3px] border-black px-6 flex items-center justify-between shrink-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 bg-white border-[3px] border-black rounded-full font-black hover:-translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] transition-all"
            >
              <ArrowLeft size={18} strokeWidth={3} /> Back
            </button>
            <div className="h-8 w-[3px] bg-black"></div>
            <h1 className="font-black text-xl text-black truncate max-w-xs">{lesson.title}</h1>
            <span className="px-3 py-1 bg-[#FFD100] border-[3px] border-black rounded-full text-[10px] font-black tracking-widest uppercase">
              {lesson.status}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-black text-gray-500 mr-4">
              {isSaving ? <span className="flex items-center gap-2"><div className="w-2 h-2 bg-gray-500 rounded-full animate-ping"></div> SAVING...</span> : <span className="flex items-center gap-2"><Check size={16} strokeWidth={3}/> SAVED</span>}
            </div>
            
            <button 
              onClick={() => { setIsPreviewMode(!isPreviewMode); setSelectedBlockId(null); }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black transition-all border-[3px] border-black shadow-[4px_4px_0_0_#000] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] ${isPreviewMode ? 'bg-[#00E599]' : 'bg-white'}`}
            >
              <Eye size={18} strokeWidth={3} /> {isPreviewMode ? 'Exit Preview' : 'Preview'}
            </button>
            
            <button 
              onClick={() => {/* Publish Logic */}}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#8B5CF6] text-white rounded-xl font-black transition-all border-[3px] border-black shadow-[4px_4px_0_0_#000] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000]"
            >
              <Rocket size={18} strokeWidth={3} /> Publish
            </button>
          </div>
        </header>

        {/* 4-Column Layout */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Column 1: Components Library */}
          {!isPreviewMode && (
            <aside className="w-72 bg-white border-r-[3px] border-black overflow-y-auto shrink-0 z-10 flex flex-col p-5 gap-4">
              <div className="flex justify-between items-baseline">
                <h2 className="font-black text-lg text-black">Components</h2>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{blocks.length} BLOCKS</span>
              </div>
              
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border-[3px] border-black rounded-xl pl-9 pr-3 py-2 text-sm font-bold focus:outline-none focus:shadow-[2px_2px_0_0_#000] transition-shadow placeholder-gray-400"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 mb-2">
                {categories.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full border-[2px] border-black text-[10px] font-black tracking-wider transition-colors ${activeCategory === cat ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-3 overflow-y-auto pb-10">
                {filteredTypes.map(type => {
                  const Icon = iconMap[plbSchema[type].icon] || Type;
                  return (
                    <button 
                      key={type}
                      onClick={() => addBlock(type)}
                      className="flex flex-col items-center justify-center gap-2 p-3 bg-white border-[3px] border-black rounded-2xl hover:bg-[#00E599]/10 shadow-[4px_4px_0_0_#000] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] transition-all aspect-square"
                    >
                      <div className="w-10 h-10 bg-[#00E599] rounded-full border-[3px] border-black flex items-center justify-center">
                        <Icon size={18} className="text-black" strokeWidth={3} />
                      </div>
                      <div className="font-black text-xs text-black text-center leading-tight">{type}</div>
                    </button>
                  )
                })}
              </div>
            </aside>
          )}

          {/* Column 2: Structure Panel */}
          {!isPreviewMode && (
            <aside className="w-64 bg-white border-r-[3px] border-black overflow-y-auto shrink-0 z-10 flex flex-col p-5 gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-black text-lg text-black">Structure</h2>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">1 PAGES</div>
                </div>
                <button className="w-8 h-8 rounded-full bg-[#00E599] border-[3px] border-black flex items-center justify-center shadow-[2px_2px_0_0_#000] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_#000] transition-all">
                  <Plus size={16} strokeWidth={4} className="text-black" />
                </button>
              </div>
              
              <div className="border-[3px] border-black rounded-xl overflow-hidden shadow-[4px_4px_0_0_#000]">
                <div className="bg-[#00E599] p-3 border-b-[3px] border-black flex items-center gap-2 font-black text-sm">
                  <ChevronDown size={16} strokeWidth={3} /> P1 Page 1
                </div>
                <div className="p-2 flex flex-col gap-1 bg-white min-h-[100px]">
                  {blocks.length === 0 ? (
                    <div className="text-xs font-bold text-gray-400 p-2 text-center">Empty Page</div>
                  ) : (
                    blocks.map(block => {
                      const Icon = iconMap[plbSchema[block.type]?.icon] || Type;
                      return (
                        <button 
                          key={block.id}
                          onClick={() => setSelectedBlockId(block.id)}
                          className={`flex items-center gap-2 p-2 rounded-lg text-sm font-bold transition-colors text-left ${selectedBlockId === block.id ? 'bg-gray-100 border-2 border-black' : 'hover:bg-gray-50 border-2 border-transparent'}`}
                        >
                          <Icon size={14} strokeWidth={3} className="text-gray-500 shrink-0" /> 
                          <span className="truncate">{block.type}</span>
                        </button>
                      )
                    })
                  )}
                </div>
              </div>
            </aside>
          )}

          {/* Column 3: Main Canvas */}
          <main 
            className={`flex-1 overflow-y-auto relative bg-[#F4F4F5] flex flex-col items-center p-8`}
            onClick={() => setSelectedBlockId(null)}
          >
            {/* Canvas Header */}
            <div className="w-full max-w-[800px] flex justify-between items-center mb-6 px-4">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[10px] font-black text-gray-500 uppercase tracking-widest"><Smartphone size={12}/> LIVE CANVAS</span>
                <span className="px-3 py-1 bg-white border-[2px] border-black rounded-full text-[10px] font-black tracking-widest uppercase">PAGE 1</span>
              </div>
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{blocks.length} BLOCKS</span>
            </div>

            <div 
              className={`w-full max-w-[800px] min-h-[850px] bg-white rounded-[40px] shadow-[16px_16px_0_0_#000] border-[4px] border-black transition-all duration-300 relative overflow-hidden`}
              onClick={(e) => { e.stopPropagation(); setSelectedBlockId(null); }}
            >
              {blocks.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                  <div className="w-24 h-24 mb-6 rounded-3xl bg-gray-100 border-[3px] border-dashed border-gray-300 flex items-center justify-center">
                    <Plus size={32} className="text-gray-300" strokeWidth={3} />
                  </div>
                  <h3 className="text-xl font-black text-black mb-2">Blank Canvas</h3>
                  <p className="text-sm font-bold text-gray-500">Drag components or click them to build.</p>
                </div>
              ) : (
                blocks.map((block, index) => (
                  <Rnd
                    key={block.id}
                    bounds="parent"
                    size={{ width: block.width || 300, height: block.height || 100 }}
                    position={{ x: block.x || 0, y: block.y || 0 }}
                    onDragStop={(e, d) => updateBlockSpatial(block.id, { x: d.x, y: d.y })}
                    onResizeStop={(e, direction, ref, delta, position) => {
                      updateBlockSpatial(block.id, {
                        width: parseInt(ref.style.width, 10),
                        height: parseInt(ref.style.height, 10),
                        ...position
                      });
                    }}
                    disableDragging={isPreviewMode}
                    enableResizing={!isPreviewMode ? undefined : false}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isPreviewMode) setSelectedBlockId(block.id);
                    }}
                    style={{ zIndex: index }}
                    className={`group absolute ${selectedBlockId === block.id && !isPreviewMode ? 'ring-4 ring-[#8B5CF6] ring-offset-2 rounded-lg' : 'hover:ring-4 hover:ring-gray-200 hover:rounded-lg'} ${isPreviewMode ? '!ring-0' : ''}`}
                  >
                    {!isPreviewMode && selectedBlockId === block.id && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }} 
                        className="absolute -top-4 -right-4 bg-red-500 text-white p-2 rounded-full border-[3px] border-black shadow-[2px_2px_0_0_#000] z-30 hover:-translate-y-0.5 transition-transform"
                      >
                        <Trash2 size={16} strokeWidth={3} />
                      </button>
                    )}
                    
                    {!isPreviewMode && <div className="absolute inset-0 z-10 cursor-move"></div>}
                    
                    <div className="w-full h-full relative z-0">
                      <VisualBlockRenderer block={block} version={version} />
                    </div>
                  </Rnd>
                ))
              )}
            </div>
            <div className="h-20 shrink-0"></div>
          </main>

          {/* Column 4: Properties Panel */}
          {!isPreviewMode && (
            <aside className="w-80 bg-white border-l-[3px] border-black overflow-y-auto shrink-0 z-20 flex flex-col relative p-5">
              <h2 className="font-black text-xl text-black">Properties</h2>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 mb-6">Select a block</div>
              
              {!selectedBlock ? (
                <div className="flex-1 flex items-center justify-center flex-col text-center opacity-50">
                  <MousePointer2 size={32} strokeWidth={3} className="mb-4" />
                  <p className="font-bold text-sm">Click a block on the canvas to edit its properties here.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="pb-4 border-b-[3px] border-black">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#8B5CF6] rounded-xl border-[3px] border-black text-white flex items-center justify-center shadow-[2px_2px_0_0_#000]">
                        <SettingsIcon type={selectedBlock.type} />
                      </div>
                      <h3 className="font-black text-lg text-black">{selectedBlock.type}</h3>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-5">
                    {/* Layer Controls */}
                    <div className="flex flex-col gap-2 p-3 bg-gray-50 border-[3px] border-black rounded-xl shadow-[4px_4px_0_0_#000]">
                      <div className="flex items-center gap-2 text-black font-black text-xs uppercase mb-1">
                        <Layers size={14} strokeWidth={3} /> Layer Management
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => bringForward(selectedBlock.id)}
                          disabled={blocks.findIndex(b => b.id === selectedBlock.id) === blocks.length - 1}
                          className="flex-1 flex items-center justify-center gap-1 bg-white border-[2px] border-black py-1.5 rounded-lg text-black font-bold text-xs shadow-[2px_2px_0_0_#000] disabled:opacity-50 active:translate-y-[2px] active:shadow-none hover:bg-gray-100"
                        >
                          <ArrowUp size={14} strokeWidth={3} /> Forward
                        </button>
                        <button 
                          onClick={() => sendBackward(selectedBlock.id)}
                          disabled={blocks.findIndex(b => b.id === selectedBlock.id) === 0}
                          className="flex-1 flex items-center justify-center gap-1 bg-white border-[2px] border-black py-1.5 rounded-lg text-black font-bold text-xs shadow-[2px_2px_0_0_#000] disabled:opacity-50 active:translate-y-[2px] active:shadow-none hover:bg-gray-100"
                        >
                          <ArrowDown size={14} strokeWidth={3} /> Backward
                        </button>
                      </div>
                    </div>

                    {selectedSchema.fields.map(field => {
                      const value = selectedBlock[version][field.name] || '';
                      
                      if (field.name === 'source' && ['Image', 'Video', 'Animation', 'Mascot Emotion'].includes(selectedBlock.type)) {
                        return (
                          <div key={field.name} className="flex flex-col gap-2">
                            <label className="text-xs font-black text-black">
                              {field.label} {field.required && <span className="text-red-500">*</span>}
                            </label>
                            <div className="flex gap-2">
                              <input 
                                type="text"
                                value={value}
                                placeholder="https://..."
                                onChange={(e) => updateBlockData(selectedBlock.id, field.name, e.target.value)}
                                className="flex-1 w-full px-3 py-2 rounded-xl border-[3px] border-black bg-white text-black font-bold text-sm focus:outline-none shadow-[2px_2px_0_0_#000] focus:shadow-none focus:translate-y-[2px] transition-all"
                              />
                              <label className="bg-black text-white px-3 py-2 rounded-xl border-[3px] border-black cursor-pointer text-sm font-black flex items-center justify-center shrink-0 hover:-translate-y-[1px] shadow-[2px_2px_0_0_#000] active:translate-y-[2px] active:shadow-none transition-all">
                                <Upload size={16} strokeWidth={3} />
                                <input 
                                  type="file" 
                                  className="hidden" 
                                  accept={selectedBlock.type === 'Video' ? 'video/*' : 'image/*'} 
                                  onChange={(e) => handleFileUpload(selectedBlock.id, field.name, e.target.files[0])} 
                                />
                              </label>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={field.name} className="flex flex-col gap-2">
                          <label className="text-xs font-black text-black">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                          </label>
                          
                          {field.type === 'text' || field.type === 'number' ? (
                            <input 
                              type={field.type}
                              value={value}
                              onChange={(e) => updateBlockData(selectedBlock.id, field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                              className="w-full px-3 py-2 rounded-xl border-[3px] border-black bg-white text-black font-bold text-sm focus:outline-none shadow-[2px_2px_0_0_#000] focus:shadow-none focus:translate-y-[2px] transition-all"
                            />
                          ) : field.type === 'color' ? (
                            <div className="flex items-center gap-3">
                              <input 
                                type="color"
                                value={value}
                                onChange={(e) => updateBlockData(selectedBlock.id, field.name, e.target.value)}
                                className="w-10 h-10 p-0 rounded-lg border-[3px] border-black bg-white cursor-pointer shadow-[2px_2px_0_0_#000]"
                              />
                              <span className="text-sm font-black text-black uppercase">{value || '#000000'}</span>
                            </div>
                          ) : field.type === 'textarea' ? (
                            <textarea 
                              value={value}
                              rows={3}
                              onChange={(e) => updateBlockData(selectedBlock.id, field.name, e.target.value)}
                              className="w-full px-3 py-2 rounded-xl border-[3px] border-black bg-white text-black font-bold text-sm resize-y focus:outline-none shadow-[2px_2px_0_0_#000] focus:shadow-none focus:translate-y-[2px] transition-all"
                            />
                          ) : field.type === 'select' ? (
                            <select
                              value={value}
                              onChange={(e) => updateBlockData(selectedBlock.id, field.name, e.target.value)}
                              className="w-full px-3 py-2 rounded-xl border-[3px] border-black bg-white text-black font-bold text-sm focus:outline-none shadow-[2px_2px_0_0_#000] focus:shadow-none focus:translate-y-[2px] transition-all appearance-none cursor-pointer"
                            >
                              {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

const SettingsIcon = ({ type }) => {
  const Icon = iconMap[plbSchema[type]?.icon] || Type;
  return <Icon size={16} strokeWidth={3} />;
};

export default PLBBuilder;
