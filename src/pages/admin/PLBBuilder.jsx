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
  Layers, ArrowUp, ArrowDown, Upload
} from 'lucide-react';
import Logo from '../../components/common/Logo';
import { getLesson, updateLesson } from '../../utils/mockDatabase';

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
  
  const [version, setVersion] = useState('teen');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [previewDevice, setPreviewDevice] = useState('desktop');

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
    
    // Basic validation to prevent massively oversized JSON exports (optional)
    if (file.size > 2 * 1024 * 1024) {
      alert("Please keep images under 2MB to ensure smooth exporting.");
      // We still process it, just a friendly warning
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      updateBlockData(blockId, fieldName, e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const exportLesson = () => {
    const exportData = {
      ...lesson,
      components: blocks // Ensure we have the latest blocks state
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `${lesson.title.replace(/\s+/g, '_')}_export.json`);
    dlAnchorElem.click();
  };

  if (!lesson) return null;

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);
  const selectedSchema = selectedBlock ? plbSchema[selectedBlock.type] : null;

  // Determine canvas width based on preview device
  let canvasWidth = 'max-w-4xl';
  let canvasHeight = 'min-h-[850px]';
  if (isPreviewMode) {
    if (previewDevice === 'mobile') { canvasWidth = 'max-w-[375px]'; canvasHeight = 'min-h-[812px]'; }
    if (previewDevice === 'tablet') { canvasWidth = 'max-w-[768px]'; canvasHeight = 'min-h-[1024px]'; }
    if (previewDevice === 'desktop') { canvasWidth = 'max-w-5xl'; canvasHeight = 'min-h-[850px]'; }
  }

  return (
    <div className="h-screen flex flex-col font-sans bg-[#F4F4F5] dark:bg-[#18181B] text-[#18181B] dark:text-[#F4F4F5] overflow-hidden transition-colors selection:bg-[#00E599] selection:text-[#18181B]">
      {/* Top Header / Toolbar */}
      <header className="h-20 bg-[#F4F4F5] dark:bg-[#18181B] border-b-[3px] border-[#18181B] dark:border-white px-6 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#18181B] dark:text-white hover:text-[#8B5CF6] dark:hover:text-[#8B5CF6] font-black transition-colors"
          >
            <ChevronLeft size={20} strokeWidth={3} /> Dashboard
          </button>
          <div className="h-8 w-[3px] bg-[#18181B] dark:bg-white"></div>
          <div>
            <h1 className="font-black text-lg text-[#18181B] dark:text-white leading-tight">{lesson.title}</h1>
            <p className="text-xs font-bold text-[#71717A] dark:text-[#A1A1AA]">{lesson.course} &bull; {lesson.status}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-white dark:bg-[#27272A] p-1.5 rounded-xl border-[3px] border-[#18181B] dark:border-white shadow-[4px_4px_0_#18181B] dark:shadow-[#FFFFFF]">
          <button 
            onClick={() => { setIsPreviewMode(false); setSelectedBlockId(null); }}
            className={`px-4 py-1.5 rounded-lg font-black text-sm transition-all border-[3px] ${!isPreviewMode ? 'bg-[#00E599] text-[#18181B] border-[#18181B]' : 'bg-transparent text-[#71717A] dark:text-[#A1A1AA] border-transparent hover:border-[#18181B] dark:hover:border-white hover:text-[#18181B] dark:hover:text-white'}`}
          >
            <Edit3 size={16} className="inline mr-2" strokeWidth={3} /> Editor
          </button>
          <button 
            onClick={() => { setIsPreviewMode(true); setSelectedBlockId(null); }}
            className={`px-4 py-1.5 rounded-lg font-black text-sm transition-all border-[3px] ${isPreviewMode ? 'bg-[#8B5CF6] text-white border-[#18181B] dark:border-white' : 'bg-transparent text-[#71717A] dark:text-[#A1A1AA] border-transparent hover:border-[#18181B] dark:hover:border-white hover:text-[#18181B] dark:hover:text-white'}`}
          >
            <Play size={16} className="inline mr-2" strokeWidth={3} /> Preview
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={exportLesson}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#27272A] text-[#18181B] dark:text-white font-black text-sm rounded-xl border-[3px] border-[#18181B] dark:border-white shadow-[4px_4px_0_#18181B] dark:shadow-[#FFFFFF] hover:-translate-y-1 transition-transform"
          >
            <Download size={16} strokeWidth={3} /> Export Lesson JSON
          </button>
          <div className="flex bg-white dark:bg-[#27272A] rounded-xl p-1 border-[3px] border-[#18181B] dark:border-white shadow-[4px_4px_0_#18181B] dark:shadow-[#FFFFFF]">
            <button 
              onClick={() => setVersion('teen')}
              className={`px-3 py-1 font-black text-xs rounded-lg transition-colors border-[2px] ${version === 'teen' ? 'bg-[#18181B] dark:bg-white text-white dark:text-[#18181B] border-[#18181B] dark:border-white' : 'bg-transparent border-transparent text-[#71717A] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-white'}`}
            >
              Teen
            </button>
            <button 
              onClick={() => setVersion('adult')}
              className={`px-3 py-1 font-black text-xs rounded-lg transition-colors border-[2px] ${version === 'adult' ? 'bg-[#18181B] dark:bg-white text-white dark:text-[#18181B] border-[#18181B] dark:border-white' : 'bg-transparent border-transparent text-[#71717A] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-white'}`}
            >
              Adult
            </button>
          </div>
        </div>
      </header>

      {/* Main Builder Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar (Components Library) */}
        {!isPreviewMode && (
          <aside className="w-72 bg-[#F4F4F5] dark:bg-[#18181B] border-r-[3px] border-[#18181B] dark:border-white overflow-y-auto shrink-0 z-10 flex flex-col">
            <div className="p-5 border-b-[3px] border-[#18181B] dark:border-white bg-white dark:bg-[#27272A]">
              <h2 className="font-black text-xs text-[#18181B] dark:text-white uppercase tracking-wider">Component Library</h2>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {Object.keys(plbSchema).map(type => {
                const Icon = iconMap[plbSchema[type].icon] || Type;
                return (
                  <button 
                    key={type}
                    onClick={() => addBlock(type)}
                    className="flex items-center gap-3 p-3 bg-white dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-white rounded-xl hover:border-[#8B5CF6] dark:hover:border-[#00E599] shadow-[4px_4px_0_#18181B] dark:shadow-[#FFFFFF] hover:-translate-y-1 transition-all text-left group"
                  >
                    <div className="w-8 h-8 bg-[#F4F4F5] dark:bg-[#18181B] border-[3px] border-[#18181B] dark:border-white rounded-lg flex items-center justify-center group-hover:bg-[#8B5CF6] dark:group-hover:bg-[#00E599] transition-colors">
                      <Icon size={16} className="text-[#18181B] dark:text-white" strokeWidth={3} />
                    </div>
                    <div>
                      <div className="font-black text-sm text-[#18181B] dark:text-white">{type}</div>
                      <div className="text-[10px] text-[#71717A] dark:text-[#A1A1AA] font-bold uppercase tracking-wide">{plbSchema[type].category}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </aside>
        )}

        {/* Center Canvas */}
        <main 
          className={`flex-1 overflow-y-auto relative bg-[#E4E4E7] dark:bg-[#000000] p-8 flex flex-col ${isPreviewMode ? 'items-center' : 'items-center'}`}
          onClick={() => setSelectedBlockId(null)}
        >
          {isPreviewMode && (
            <div className="sticky top-0 mb-6 bg-white dark:bg-[#27272A] px-4 py-2 rounded-xl border-[3px] border-[#18181B] dark:border-white shadow-[4px_4px_0_#18181B] dark:shadow-[#FFFFFF] flex items-center gap-2 z-30">
              <button onClick={() => setPreviewDevice('desktop')} className={`p-2 rounded-lg border-[3px] transition-colors ${previewDevice==='desktop' ? 'bg-[#00E599] text-[#18181B] border-[#18181B]' : 'bg-transparent text-[#71717A] dark:text-[#A1A1AA] border-transparent hover:border-[#18181B] dark:hover:border-white'}`}>
                <Monitor size={18} strokeWidth={3} />
              </button>
              <button onClick={() => setPreviewDevice('tablet')} className={`p-2 rounded-lg border-[3px] transition-colors ${previewDevice==='tablet' ? 'bg-[#00E599] text-[#18181B] border-[#18181B]' : 'bg-transparent text-[#71717A] dark:text-[#A1A1AA] border-transparent hover:border-[#18181B] dark:hover:border-white'}`}>
                <Tablet size={18} strokeWidth={3} />
              </button>
              <button onClick={() => setPreviewDevice('mobile')} className={`p-2 rounded-lg border-[3px] transition-colors ${previewDevice==='mobile' ? 'bg-[#00E599] text-[#18181B] border-[#18181B]' : 'bg-transparent text-[#71717A] dark:text-[#A1A1AA] border-transparent hover:border-[#18181B] dark:hover:border-white'}`}>
                <Smartphone size={18} strokeWidth={3} />
              </button>
            </div>
          )}

          <div 
            className={`w-full ${canvasWidth} ${canvasHeight} bg-white dark:bg-[#27272A] rounded-2xl shadow-[12px_12px_0_#18181B] dark:shadow-[#FFFFFF] border-[4px] border-[#18181B] dark:border-white transition-all duration-300 relative overflow-hidden`}
            onClick={(e) => { e.stopPropagation(); setSelectedBlockId(null); }}
          >
            {blocks.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#A1A1AA]">
                <div className="w-24 h-24 mb-6 rounded-2xl bg-[#F4F4F5] dark:bg-[#18181B] border-[3px] border-dashed border-[#A1A1AA] flex items-center justify-center">
                  <Plus size={32} className="text-[#A1A1AA]" />
                </div>
                <h3 className="text-xl font-black text-[#18181B] dark:text-white mb-2">Blank Canvas</h3>
                <p className="text-sm font-bold text-[#71717A]">Click components from the left sidebar to start building.</p>
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
                  style={{ zIndex: index }} // Layering based on array order
                  className={`group absolute ${selectedBlockId === block.id && !isPreviewMode ? 'ring-4 ring-[#00E599] ring-offset-2' : 'hover:ring-2 hover:ring-[#8B5CF6]'} ${isPreviewMode ? '!ring-0' : ''}`}
                >
                  {!isPreviewMode && selectedBlockId === block.id && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }} 
                      className="absolute -top-4 -right-4 bg-[#EF4444] text-white p-2 rounded-full border-[3px] border-[#18181B] shadow-[2px_2px_0_#18181B] z-30 hover:-translate-y-0.5 transition-transform"
                    >
                      <Trash2 size={16} strokeWidth={3} />
                    </button>
                  )}
                  
                  {/* Invisible overlay to intercept clicks so internal elements (like buttons) don't capture drag events */}
                  {!isPreviewMode && <div className="absolute inset-0 z-10 cursor-move"></div>}
                  
                  {/* The Visual Render */}
                  <div className="w-full h-full relative z-0">
                    <VisualBlockRenderer block={block} version={version} />
                  </div>
                </Rnd>
              ))
            )}
            
            {isPreviewMode && previewDevice === 'mobile' && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-100 rounded-b-xl border-x border-b border-gray-200 z-50 pointer-events-none"></div>
            )}
          </div>
          
          <div className="h-20 shrink-0"></div>
        </main>

        {/* Right Sidebar (Properties Panel) */}
        {!isPreviewMode && (
          <aside className="w-80 bg-[#F4F4F5] dark:bg-[#18181B] border-l-[3px] border-[#18181B] dark:border-white overflow-y-auto shrink-0 z-20 flex flex-col relative">
            <div className="p-5 border-b-[3px] border-[#18181B] dark:border-white bg-white dark:bg-[#27272A] flex items-center justify-between sticky top-0 z-10">
              <h2 className="font-black text-xs text-[#18181B] dark:text-white uppercase tracking-wider">Properties ({version})</h2>
            </div>
            
            <div className="p-6">
              {!selectedBlock ? (
                <div className="text-sm font-bold text-[#71717A] dark:text-[#A1A1AA] text-center mt-10 p-6 bg-white dark:bg-[#27272A] rounded-xl border-[3px] border-dashed border-[#18181B] dark:border-white shadow-[4px_4px_0_#18181B] dark:shadow-[#FFFFFF]">
                  Select an element on the canvas to configure its settings.
                </div>
              ) : (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="pb-4 border-b-[3px] border-[#18181B] dark:border-white">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 bg-[#8B5CF6] rounded-lg border-[3px] border-[#18181B] dark:border-white text-white flex items-center justify-center shadow-[2px_2px_0_#18181B] dark:shadow-[#FFFFFF]">
                        <SettingsIcon type={selectedBlock.type} />
                      </div>
                      <h3 className="font-black text-xl text-[#18181B] dark:text-white">{selectedBlock.type}</h3>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    {/* Layer Controls */}
                    <div className="flex flex-col gap-2 p-3 bg-[#E4E4E7] dark:bg-[#3F3F46] border-[3px] border-[#18181B] dark:border-white rounded-xl shadow-[4px_4px_0_#18181B] dark:shadow-[#FFFFFF]">
                      <div className="flex items-center gap-2 text-[#18181B] dark:text-white font-black text-xs uppercase mb-1">
                        <Layers size={14} /> Layer Management
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => bringForward(selectedBlock.id)}
                          disabled={blocks.findIndex(b => b.id === selectedBlock.id) === blocks.length - 1}
                          className="flex-1 flex items-center justify-center gap-1 bg-white dark:bg-[#27272A] border-[2px] border-[#18181B] dark:border-white py-1.5 rounded-lg text-[#18181B] dark:text-white font-bold text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F4F4F5] dark:hover:bg-[#18181B]"
                        >
                          <ArrowUp size={14} strokeWidth={3} /> Bring Forward
                        </button>
                        <button 
                          onClick={() => sendBackward(selectedBlock.id)}
                          disabled={blocks.findIndex(b => b.id === selectedBlock.id) === 0}
                          className="flex-1 flex items-center justify-center gap-1 bg-white dark:bg-[#27272A] border-[2px] border-[#18181B] dark:border-white py-1.5 rounded-lg text-[#18181B] dark:text-white font-bold text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F4F4F5] dark:hover:bg-[#18181B]"
                        >
                          <ArrowDown size={14} strokeWidth={3} /> Send Backward
                        </button>
                      </div>
                    </div>

                    {/* Spatial properties read-only */}
                    <div className="grid grid-cols-2 gap-2 mb-2 p-2 bg-[#F4F4F5] dark:bg-[#18181B] border-[2px] border-[#E4E4E7] dark:border-[#3F3F46] rounded-xl">
                      <div className="text-[10px] font-black text-[#71717A] dark:text-[#A1A1AA] uppercase">X: {selectedBlock.x}px</div>
                      <div className="text-[10px] font-black text-[#71717A] dark:text-[#A1A1AA] uppercase">Y: {selectedBlock.y}px</div>
                      <div className="text-[10px] font-black text-[#71717A] dark:text-[#A1A1AA] uppercase">W: {selectedBlock.width}px</div>
                      <div className="text-[10px] font-black text-[#71717A] dark:text-[#A1A1AA] uppercase">H: {selectedBlock.height}px</div>
                    </div>

                    {selectedSchema.fields.map(field => {
                      const value = selectedBlock[version][field.name] || '';
                      
                      // Special handler for Image Uploads
                      if (field.name === 'source' && ['Image', 'Video', 'Animation', 'Mascot Emotion'].includes(selectedBlock.type)) {
                        return (
                          <div key={field.name} className="flex flex-col gap-1.5 group">
                            <label className="text-xs font-black text-[#18181B] dark:text-white flex justify-between">
                              {field.label} (URL or Upload Base64) {field.required && <span className="text-red-500">*</span>}
                            </label>
                            <div className="flex gap-2">
                              <input 
                                type="text"
                                value={value}
                                placeholder="https://..."
                                onChange={(e) => updateBlockData(selectedBlock.id, field.name, e.target.value)}
                                className="flex-1 w-full px-3 py-2 rounded-xl border-[3px] border-[#18181B] dark:border-white bg-white dark:bg-[#27272A] text-[#18181B] dark:text-white font-bold text-sm focus:border-[#00E599] focus:outline-none focus:ring-4 focus:ring-[#00E599]/20 transition-all shadow-[2px_2px_0_#18181B] dark:shadow-[#FFFFFF]"
                              />
                              <label className="bg-[#18181B] dark:bg-white text-white dark:text-[#18181B] px-3 py-2 rounded-xl border-[3px] border-[#18181B] dark:border-white cursor-pointer text-sm font-black flex items-center justify-center shrink-0 shadow-[2px_2px_0_#18181B] dark:shadow-[#FFFFFF] hover:-translate-y-0.5 transition-transform">
                                <Upload size={16} />
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
                        <div key={field.name} className="flex flex-col gap-1.5 group">
                          <label className="text-xs font-black text-[#18181B] dark:text-white flex justify-between">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                          </label>
                          
                          {field.type === 'text' || field.type === 'number' ? (
                            <input 
                              type={field.type}
                              value={value}
                              onChange={(e) => updateBlockData(selectedBlock.id, field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                              className="w-full px-3 py-2 rounded-xl border-[3px] border-[#18181B] dark:border-white bg-white dark:bg-[#27272A] text-[#18181B] dark:text-white font-bold text-sm focus:border-[#00E599] focus:outline-none focus:ring-4 focus:ring-[#00E599]/20 transition-all shadow-[2px_2px_0_#18181B] dark:shadow-[#FFFFFF]"
                            />
                          ) : field.type === 'color' ? (
                            <div className="flex items-center gap-2">
                              <input 
                                type="color"
                                value={value}
                                onChange={(e) => updateBlockData(selectedBlock.id, field.name, e.target.value)}
                                className="w-12 h-12 p-1 rounded-xl border-[3px] border-[#18181B] dark:border-white bg-white dark:bg-[#27272A] cursor-pointer shadow-[2px_2px_0_#18181B] dark:shadow-[#FFFFFF]"
                              />
                              <span className="text-sm font-mono font-bold text-[#18181B] dark:text-white">{value || '#000000'}</span>
                            </div>
                          ) : field.type === 'textarea' ? (
                            <textarea 
                              value={value}
                              rows={3}
                              onChange={(e) => updateBlockData(selectedBlock.id, field.name, e.target.value)}
                              className="w-full px-3 py-2 rounded-xl border-[3px] border-[#18181B] dark:border-white bg-white dark:bg-[#27272A] text-[#18181B] dark:text-white font-bold text-sm resize-y focus:border-[#00E599] focus:outline-none focus:ring-4 focus:ring-[#00E599]/20 transition-all shadow-[2px_2px_0_#18181B] dark:shadow-[#FFFFFF]"
                            />
                          ) : field.type === 'select' ? (
                            <select
                              value={value}
                              onChange={(e) => updateBlockData(selectedBlock.id, field.name, e.target.value)}
                              className="w-full px-3 py-2 rounded-xl border-[3px] border-[#18181B] dark:border-white bg-white dark:bg-[#27272A] text-[#18181B] dark:text-white font-bold text-sm focus:border-[#00E599] focus:outline-none focus:ring-4 focus:ring-[#00E599]/20 transition-all appearance-none cursor-pointer shadow-[2px_2px_0_#18181B] dark:shadow-[#FFFFFF]"
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
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

const SettingsIcon = ({ type }) => {
  const Icon = iconMap[plbSchema[type]?.icon] || Type;
  return <Icon size={14} />;
};

export default PLBBuilder;
