import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { supabase } from '../../utils/supabaseClient';
import mascotGridImg from '../../assets/mascot_grid.png';

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
  const [pages, setPages] = useState([{ id: 'page_1', title: 'Page 1', blocks: [] }]);
  const [activePageId, setActivePageId] = useState('page_1');
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [version, setVersion] = useState('teen');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  
  // New features state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [previewDevice, setPreviewDevice] = useState('mobile'); // mobile | tablet | laptop

  useEffect(() => {
    const fetchLesson = async () => {
      setIsLoading(true);
      setErrorMsg(null);
      const l = await getLesson(id);
      if (!l) {
        setErrorMsg("Lesson not found or failed to load. Please return to dashboard.");
        setIsLoading(false);
        return;
      }
      setLesson(l);
      let parsedData = [];
      if (Array.isArray(l.components)) {
        parsedData = l.components;
      } else if (typeof l.components === 'string') {
        try { parsedData = JSON.parse(l.components); } catch (e) { parsedData = []; }
      }
      
      let initialPages = [{ id: 'page_1', title: 'Page 1', blocks: [] }];
      if (Array.isArray(parsedData) && parsedData.length > 0) {
        if (parsedData[0].blocks) {
          initialPages = parsedData;
        } else if (parsedData[0].type) {
          initialPages = [{ id: 'page_1', title: 'Page 1', blocks: parsedData }];
        }
      }
      setPages(initialPages);
      setActivePageId(initialPages[0]?.id || 'page_1');
      setIsLoading(false);
    };
    fetchLesson();

    const channel = supabase
      .channel(`lesson-sync-${id}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'lessons', filter: `id=eq.${id}` },
        (payload) => {
          const updatedLesson = payload.new;
          let parsedData = [];
          if (typeof updatedLesson.components === 'string') {
            try { parsedData = JSON.parse(updatedLesson.components); } catch (e) { parsedData = []; }
          } else if (Array.isArray(updatedLesson.components)) {
            parsedData = updatedLesson.components;
          }
          
          let remotePages = [{ id: 'page_1', title: 'Page 1', blocks: [] }];
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            if (parsedData[0].blocks) remotePages = parsedData;
            else if (parsedData[0].type) remotePages = [{ id: 'page_1', title: 'Page 1', blocks: parsedData }];
          }
          
          setPages((currentPages) => {
            if (JSON.stringify(currentPages) !== JSON.stringify(remotePages)) {
              return remotePages;
            }
            return currentPages;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  const user = JSON.parse(localStorage.getItem('plb_user_v2') || '{}');
  const isAdmin = user.username === 'admin' || user.username === 'shabnam' || user.username === 'piggypath'; // Allow a few obvious admin usernames

  const saveLesson = async (currentPages) => {
    setIsSaving(true);
    const newLessonData = await updateLesson(id, { 
      components: currentPages,
      pagesCount: currentPages.length
    }, user.name || user.username || 'Someone');
    if (newLessonData) setLesson(newLessonData);
    setTimeout(() => setIsSaving(false), 500);
  };

  const handlePublish = async () => {
    if (!isAdmin) {
      alert("Only the Admin is allowed to publish lessons!");
      return;
    }
    setIsSaving(true);
    const newLessonData = await updateLesson(id, { status: 'Published' }, user.name || user.username || 'Admin');
    if (newLessonData) setLesson(newLessonData);
    setIsSaving(false);
  };

  const addPage = () => {
    const newPage = {
      id: `page_${Date.now()}`,
      title: `Page ${pages.length + 1}`,
      blocks: []
    };
    const newPages = [...pages, newPage];
    setPages(newPages);
    setActivePageId(newPage.id);
    saveLesson(newPages);
  };

  const deletePage = (pageId, e) => {
    e.stopPropagation();
    if (pages.length <= 1) {
      alert("You must have at least one page.");
      return;
    }
    const newPages = pages.filter(p => p.id !== pageId);
    setPages(newPages);
    if (activePageId === pageId) {
      setActivePageId(newPages[newPages.length - 1].id);
    }
    setSelectedBlockId(null);
    saveLesson(newPages);
  };

  const updatePagesWithActiveBlocks = (blockMutator) => {
    const newPages = pages.map(page => {
      if (page.id === activePageId) {
        return { ...page, blocks: blockMutator(page.blocks) };
      }
      return page;
    });
    setPages(newPages);
    saveLesson(newPages);
  };

  const addBlock = (type) => {
    if (!activePageId) return;
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
    
    updatePagesWithActiveBlocks(blocks => [...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
  };

  const deleteBlock = (blockId) => {
    updatePagesWithActiveBlocks(blocks => blocks.filter(b => b.id !== blockId));
    if (selectedBlockId === blockId) setSelectedBlockId(null);
  };

  const bringForward = (blockId) => {
    updatePagesWithActiveBlocks(blocks => {
      const index = blocks.findIndex(b => b.id === blockId);
      if (index > 0) {
        const newBlocks = [...blocks];
        [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
        return newBlocks;
      }
      return blocks;
    });
  };
  
  const sendBackward = (blockId) => {
    updatePagesWithActiveBlocks(blocks => {
      const index = blocks.findIndex(b => b.id === blockId);
      if (index > -1 && index < blocks.length - 1) {
        const newBlocks = [...blocks];
        [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
        return newBlocks;
      }
      return blocks;
    });
  };

  const updateBlockData = (blockId, fieldName, value) => {
    updatePagesWithActiveBlocks(blocks => blocks.map(block => {
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
    }));
  };

  const handleFileUpload = (blockId, fieldName, file) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Security/Performance limit: Please keep images under 2MB.");
      return; 
    }
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
       alert("Security limit: Only image and video files are allowed.");
       return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      updateBlockData(blockId, fieldName, e.target.result);
    };
    reader.readAsDataURL(file);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-[#18181B] flex flex-col items-center justify-center font-sans">
        <div className="w-16 h-16 border-4 border-white border-t-[#00E599] rounded-full animate-spin mb-4"></div>
        <h2 className="text-2xl font-black text-white">Loading Canvas...</h2>
      </div>
    );
  }

  if (errorMsg || !lesson) {
    return (
      <div className="h-screen w-screen bg-[#18181B] flex flex-col items-center justify-center font-sans p-4 text-center">
        <div className="bg-[#27272A] border-[4px] border-[#3F3F46] rounded-3xl p-8 max-w-md w-full">
          <h2 className="text-3xl font-black text-red-500 mb-4">Oops!</h2>
          <p className="text-white font-bold mb-6">{errorMsg || "Lesson not found."}</p>
          <button 
            onClick={() => navigate('/')}
            className="w-full py-4 bg-[#00E599] text-black font-black rounded-xl hover:-translate-y-1 transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const activePage = pages.find(p => p.id === activePageId) || pages[0];
  const activeBlocks = activePage?.blocks || [];
  const selectedBlock = activeBlocks.find(b => b.id === selectedBlockId);
  const selectedSchema = selectedBlock ? plbSchema[selectedBlock.type] : null;

  const categories = ['ALL', 'CONTENT', 'MEDIA', 'MASCOT', 'ACTIVITY', 'VISUALISATION', 'FEEDBACK', 'NAVIGATION'];
  const filteredTypes = Object.keys(plbSchema).filter(type => {
    const matchesSearch = type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'ALL' || plbSchema[type].category.toUpperCase() === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-screen w-screen bg-[#F4F4F5] font-sans overflow-hidden text-[#18181B] flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b-[4px] border-[#18181B] px-6 flex items-center justify-between shrink-0 z-30 shadow-[0_4px_0_#18181B] relative">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-1.5 bg-white border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#18181B] rounded-lg font-bold text-sm transition-all"
          >
            <ArrowLeft size={16} strokeWidth={3} /> Back
          </button>
          <div className="h-6 w-[2px] bg-[#18181B]"></div>
          <h1 className="font-black text-xl text-[#18181B] truncate max-w-xs">{lesson.title}</h1>
          <span className="px-3 py-1 bg-[#FFD100] border-[2px] border-[#18181B] text-[#18181B] rounded-full text-[10px] font-black tracking-widest uppercase shadow-[2px_2px_0_#18181B]">
            {lesson.status}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-black text-gray-500 mr-4">
            {isSaving ? <span className="flex items-center gap-2"><div className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-ping border border-[#18181B]"></div> SAVING...</span> : <span className="flex items-center gap-2 text-[#00E599]"><Check size={16} strokeWidth={3}/> SAVED</span>}
          </div>
          
          <button 
            onClick={() => { setIsPreviewMode(!isPreviewMode); setSelectedBlockId(null); }}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg font-bold text-sm transition-all border-[2px] border-[#18181B] shadow-[4px_4px_0_#18181B] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#18181B] ${isPreviewMode ? 'bg-[#FFD100] text-[#18181B]' : 'bg-white text-[#18181B]'}`}
          >
            <Eye size={16} strokeWidth={2} /> {isPreviewMode ? 'Exit Preview' : 'Preview'}
          </button>
          
          <button 
            onClick={handlePublish}
            disabled={!isAdmin}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg font-bold text-sm transition-all border-[2px] border-[#18181B] shadow-[4px_4px_0_#18181B] ${isAdmin ? 'bg-[#8B5CF6] text-white hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#18181B] cursor-pointer' : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'}`}
            title={isAdmin ? "Publish this lesson" : "Only Admin can publish"}
          >
            <Rocket size={16} strokeWidth={2} /> Publish
          </button>
        </div>
      </header>

      {/* 4-Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Column 1: Components Library */}
        {!isPreviewMode && (
          <aside className="w-72 bg-[#F4F4F5] border-r-[4px] border-[#18181B] flex flex-col shrink-0 z-10">
            <div className="p-4 border-b-[4px] border-[#18181B] flex justify-between items-baseline bg-white">
              <h2 className="font-black text-lg text-[#18181B]">Components</h2>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{activeBlocks.length} BLOCKS</span>
            </div>
            
            <div className="p-4 flex-1 flex flex-col gap-4 overflow-hidden bg-[#F4F4F5]">
              <div className="relative shrink-0">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B] rounded-lg pl-9 pr-3 py-2 text-sm text-[#18181B] focus:outline-none focus:border-[#8B5CF6] focus:shadow-[4px_4px_0_#18181B] transition-all placeholder-gray-400 font-bold"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 shrink-0">
                {categories.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-full border-[2px] text-[10px] font-bold tracking-wider transition-all ${activeCategory === cat ? 'bg-[#8B5CF6] text-white border-[#18181B] shadow-[2px_2px_0_#18181B]' : 'bg-white text-gray-500 border-transparent hover:border-[#18181B] hover:shadow-[2px_2px_0_#18181B] hover:text-[#18181B]'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-3 overflow-y-auto pb-10 custom-scrollbar pr-2">
                {filteredTypes.map(type => {
                  const Icon = iconMap[plbSchema[type].icon] || Type;
                  return (
                    <button 
                      key={type}
                      onClick={() => addBlock(type)}
                      className="flex flex-col items-center justify-center gap-2 p-3 bg-white border-[2px] border-[#18181B] shadow-[4px_4px_0_#18181B] rounded-xl hover:-translate-y-1 hover:shadow-[6px_6px_0_#18181B] hover:bg-[#FFD100] transition-all aspect-square group"
                    >
                      <div className="w-10 h-10 bg-white rounded-full border-[2px] border-[#18181B] flex items-center justify-center group-hover:bg-white transition-colors">
                        <Icon size={18} className="text-[#18181B]" strokeWidth={3} />
                      </div>
                      <div className="font-bold text-xs text-[#18181B] text-center leading-tight">{type}</div>
                    </button>
                  )
                })}
              </div>
            </div>
          </aside>
        )}

        {/* Column 2: Structure Panel */}
        {!isPreviewMode && (
          <aside className="w-64 bg-white border-r-[4px] border-[#18181B] flex flex-col shrink-0 z-10">
            <div className="p-4 border-b-[4px] border-[#18181B] flex justify-between items-center">
              <div>
                <h2 className="font-black text-lg text-[#18181B]">Structure</h2>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">{pages.length} PAGES</div>
              </div>
              <button onClick={addPage} className="w-8 h-8 rounded-full bg-[#00E599] border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B] flex items-center justify-center hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#18181B] transition-all">
                <Plus size={16} strokeWidth={3} className="text-[#18181B]" />
              </button>
            </div>
            
            <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3">
              {pages.map((page) => {
                const isActive = activePageId === page.id;
                return (
                  <div key={page.id} className={`group border-[2px] rounded-xl overflow-hidden transition-all ${isActive ? 'border-[#18181B] shadow-[4px_4px_0_#18181B] bg-white' : 'border-transparent bg-transparent hover:border-[#18181B] hover:shadow-[2px_2px_0_#18181B] hover:bg-white'}`}>
                    <div 
                      onClick={() => { setActivePageId(page.id); setSelectedBlockId(null); }}
                      className={`p-2.5 flex items-center justify-between cursor-pointer font-black text-sm transition-colors ${isActive ? 'bg-[#00E599] text-[#18181B] border-b-[2px] border-[#18181B]' : 'bg-transparent text-gray-600'}`}
                    >
                      <div className="flex items-center gap-2 truncate flex-1">
                        {isActive ? <ChevronDown size={16} strokeWidth={3} /> : <ArrowRight size={16} strokeWidth={3} />} 
                        {page.title}
                      </div>
                      {pages.length > 1 && (
                         <button 
                            onClick={(e) => deletePage(page.id, e)} 
                            className={`p-1 rounded transition-opacity ${isActive ? 'hover:bg-white/50 text-[#18181B]' : 'hover:bg-gray-200 text-gray-500'}`}
                         >
                            <Trash2 size={14} strokeWidth={2} />
                         </button>
                      )}
                    </div>
                    
                    {isActive && (
                      <div className="p-2 flex flex-col gap-2 min-h-[100px] bg-white">
                        {page.blocks.length === 0 ? (
                          <div className="text-xs font-bold text-gray-500 p-3 text-center border-[2px] border-dashed border-gray-300 rounded-lg">Empty Page</div>
                        ) : (
                          page.blocks.map((block, index) => {
                            const Icon = iconMap[plbSchema[block.type]?.icon] || Type;
                            return (
                              <div 
                                key={block.id}
                                className={`group flex items-center justify-between p-2.5 rounded-lg text-sm font-bold transition-all text-left ${selectedBlockId === block.id ? 'bg-[#8B5CF6] text-white border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B]' : 'text-gray-600 hover:bg-gray-100 hover:text-[#18181B] border-[2px] border-transparent'}`}
                              >
                                <button 
                                  className="flex items-center gap-2 flex-1 truncate"
                                  onClick={(e) => { e.stopPropagation(); setSelectedBlockId(block.id); }}
                                >
                                  <Icon size={14} strokeWidth={3} className={selectedBlockId === block.id ? "text-[#FFD100]" : "text-gray-400 group-hover:text-[#18181B]"} /> 
                                  <span className="truncate">{block.type}</span>
                                </button>
                                
                                {selectedBlockId === block.id && (
                                  <div className="flex items-center gap-1">
                                     <button disabled={index === 0} onClick={(e) => { e.stopPropagation(); bringForward(block.id); }} className="text-gray-400 hover:text-white disabled:opacity-30"><ArrowUp size={14}/></button>
                                     <button disabled={index === page.blocks.length - 1} onClick={(e) => { e.stopPropagation(); sendBackward(block.id); }} className="text-gray-400 hover:text-white disabled:opacity-30"><ArrowDown size={14}/></button>
                                  </div>
                                )}
                              </div>
                            )
                          })
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </aside>
        )}

        {/* Column 3: Main Canvas */}
        <main 
          className="flex-1 overflow-y-auto relative bg-[#E4E4E7] flex flex-col items-center p-8 custom-scrollbar"
          onClick={() => setSelectedBlockId(null)}
        >
          {/* Canvas Header */}
          <div className={`w-full ${previewDevice === 'laptop' ? 'max-w-[1024px]' : previewDevice === 'tablet' ? 'max-w-[768px]' : 'max-w-[400px]'} flex justify-between items-center mb-6 transition-all duration-300`}>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[10px] font-black text-[#18181B] uppercase tracking-widest">
                 {previewDevice === 'mobile' && <Smartphone size={12}/>}
                 {previewDevice === 'tablet' && <Tablet size={12}/>}
                 {previewDevice === 'laptop' && <Monitor size={12}/>}
                 LIVE CANVAS
              </span>
              <span className="px-3 py-1 bg-white border-[2px] border-[#18181B] rounded-full text-[10px] font-black text-[#18181B] tracking-widest uppercase shadow-[2px_2px_0_#18181B]">{activePage?.title || 'PAGE 1'}</span>
            </div>
            
            {/* Device Toggles */}
            <div className="flex bg-white border-[2px] border-[#18181B] rounded-lg p-1 shadow-[4px_4px_0_#18181B]">
              <button onClick={(e) => { e.stopPropagation(); setPreviewDevice('mobile'); }} className={`p-1.5 rounded-md transition-all ${previewDevice === 'mobile' ? 'bg-[#FFD100] border-[2px] border-[#18181B] text-[#18181B]' : 'text-gray-500 hover:text-[#18181B] border-[2px] border-transparent'}`}><Smartphone size={16} strokeWidth={3} /></button>
              <button onClick={(e) => { e.stopPropagation(); setPreviewDevice('tablet'); }} className={`p-1.5 rounded-md transition-all ${previewDevice === 'tablet' ? 'bg-[#FFD100] border-[2px] border-[#18181B] text-[#18181B]' : 'text-gray-500 hover:text-[#18181B] border-[2px] border-transparent'}`}><Tablet size={16} strokeWidth={3} /></button>
              <button onClick={(e) => { e.stopPropagation(); setPreviewDevice('laptop'); }} className={`p-1.5 rounded-md transition-all ${previewDevice === 'laptop' ? 'bg-[#FFD100] border-[2px] border-[#18181B] text-[#18181B]' : 'text-gray-500 hover:text-[#18181B] border-[2px] border-transparent'}`}><Monitor size={16} strokeWidth={3} /></button>
            </div>

            <span className="text-[10px] font-black text-[#18181B] uppercase tracking-widest">{activeBlocks.length} BLOCKS</span>
          </div>

          {/* Dynamic Device Frame */}
          <div 
            className={`${previewDevice === 'laptop' ? 'w-[1024px] min-h-[768px] rounded-2xl' : previewDevice === 'tablet' ? 'w-[768px] min-h-[1024px] rounded-[30px]' : 'w-[375px] min-h-[812px] rounded-[45px]'} bg-white shadow-2xl border-[14px] border-[#18181B] overflow-hidden flex flex-col relative transition-all duration-300 ease-in-out`}
            onClick={(e) => { e.stopPropagation(); setSelectedBlockId(null); }}
          >
            {/* Phone Notch/Dynamic Island (Only on Mobile/Tablet) */}
            {previewDevice !== 'laptop' && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-[#18181B] rounded-b-2xl z-50"></div>}
            
            {/* Content Area */}
            <div className={`flex-1 w-full bg-[#F8FAFC] overflow-y-auto custom-scrollbar ${previewDevice === 'laptop' ? 'pt-4' : 'pt-10'} pb-8 flex flex-col`}>
              {activeBlocks.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                  <div className="w-16 h-16 mb-4 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-300">
                    <Plus size={24} />
                  </div>
                  <h3 className="text-lg font-black text-gray-800 mb-1">Blank Canvas</h3>
                  <p className="text-xs font-bold text-gray-400">Click components on the left to add them here.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-0 w-full">
                  {activeBlocks.map((block) => (
                    <div 
                      key={block.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isPreviewMode) setSelectedBlockId(block.id);
                      }}
                      className={`relative group transition-all w-full ${selectedBlockId === block.id && !isPreviewMode ? 'ring-4 ring-inset ring-[#8B5CF6] bg-[#8B5CF6]/10 z-10' : 'hover:ring-2 hover:ring-inset hover:ring-gray-300 z-0'}`}
                    >
                      {!isPreviewMode && selectedBlockId === block.id && (
                        <div className="absolute top-1 right-1 flex gap-1 z-50">
                          <button 
                            onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }} 
                            className="bg-red-500 text-white p-1.5 rounded-md shadow-md hover:bg-red-600 transition-colors"
                          >
                            <Trash2 size={12} strokeWidth={3} />
                          </button>
                        </div>
                      )}
                      
                      {/* Render block inline */}
                      <div className={`w-full relative z-0 ${!isPreviewMode ? 'pointer-events-none' : ''}`}>
                         <VisualBlockRenderer block={block} version={version} isPreviewMode={isPreviewMode} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="h-20 shrink-0"></div>
        </main>

        {/* Column 4: Properties Panel */}
        {!isPreviewMode && (
          <aside className="w-80 bg-[#F4F4F5] border-l-[4px] border-[#18181B] flex flex-col shrink-0 z-20">
            <div className="p-4 border-b-[4px] border-[#18181B] bg-white">
               <h2 className="font-black text-xl text-[#18181B]">Properties</h2>
               <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Select a block</div>
            </div>
            
            <div className="p-4 flex-1 overflow-y-auto">
              {!selectedBlock ? (
                <div className="flex-1 h-full flex items-center justify-center flex-col text-center opacity-30 mt-20">
                  <MousePointer2 size={32} strokeWidth={2} className="mb-4" />
                  <p className="font-bold text-sm max-w-[200px]">Click a block on the canvas to edit its properties here.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#8B5CF6] rounded-xl border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B] text-white flex items-center justify-center">
                      <SettingsIcon type={selectedBlock.type} />
                    </div>
                    <h3 className="font-black text-lg text-[#18181B]">{selectedBlock.type}</h3>
                  </div>
                  
                  <div className="flex flex-col gap-5">
                    {selectedSchema.fields.map(field => {
                      const value = selectedBlock[version][field.name] ?? field.default;
                      
                      // Dynamic Match Pairs Logic
                      if (selectedBlock.type === 'Match Pairs' && field.name.startsWith('pair_')) {
                        const pairIndex = parseInt(field.name.split('_')[1], 10);
                        const numPairs = parseInt(selectedBlock[version]['number_of_pairs'] || '3', 10);
                        if (pairIndex > numPairs) return null;
                      }
                      
                      // Special handling for the Mascot grid selector
                      if ((selectedBlock.type === 'Mascot Feedback' || selectedBlock.type === 'Mascot Emotion') && field.name === 'mascot_type') {
                        return (
                          <div key={field.name} className="flex flex-col gap-2">
                            <label className="text-xs font-black text-[#18181B] uppercase tracking-widest">
                              {field.label}
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                              {field.options.map(opt => (
                                <button
                                  key={opt}
                                  title={opt}
                                  onClick={() => updateBlockData(selectedBlock.id, field.name, opt)}
                                  className={`aspect-square rounded-xl border-[2px] transition-all flex items-center justify-center overflow-hidden bg-white ${value === opt ? 'border-[#00E599] shadow-[2px_2px_0_#00E599] -translate-y-0.5' : 'border-[#18181B] shadow-[2px_2px_0_#18181B] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#18181B]'}`}
                                >
                                  <img 
                                    src={`/piggypath_admin/assets/mascots/${opt}.png`} 
                                    alt={opt}
                                    className="w-[36px] h-[36px] object-contain"
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      if (field.name === 'source' && ['Image', 'Video', 'Animation'].includes(selectedBlock.type)) {
                        return (
                          <div key={field.name} className="flex flex-col gap-2">
                            <label className="text-xs font-black text-[#18181B] uppercase tracking-widest">
                              {field.label} {field.required && <span className="text-red-500">*</span>}
                            </label>
                            <div className="flex gap-2">
                              <input 
                                type="text"
                                value={value}
                                placeholder="https://..."
                                onChange={(e) => updateBlockData(selectedBlock.id, field.name, e.target.value)}
                                className="flex-1 w-full px-3 py-2 rounded-lg bg-white border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B] text-[#18181B] text-sm font-bold focus:outline-none focus:border-[#8B5CF6] transition-all"
                              />
                              <label className="bg-[#FFD100] border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#18181B] text-[#18181B] px-3 py-2 rounded-lg cursor-pointer text-sm font-black flex items-center justify-center shrink-0 transition-all">
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
                          <label className="text-xs font-black text-[#18181B] uppercase tracking-widest">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                          </label>
                          
                          {field.type === 'text' || field.type === 'number' ? (
                            <input 
                              type={field.type}
                              value={value}
                              onChange={(e) => updateBlockData(selectedBlock.id, field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-white border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B] text-[#18181B] text-sm font-bold focus:outline-none focus:border-[#8B5CF6] transition-all"
                            />
                          ) : field.type === 'color' ? (
                            <div className="flex items-center gap-3">
                              <input 
                                type="color"
                                value={value}
                                onChange={(e) => updateBlockData(selectedBlock.id, field.name, e.target.value)}
                                className="w-8 h-8 p-0 rounded-md border-0 bg-transparent cursor-pointer"
                              />
                              <span className="text-sm font-black text-[#18181B] uppercase">{value || '#000000'}</span>
                            </div>
                          ) : field.type === 'textarea' ? (
                            <textarea 
                              value={value}
                              rows={3}
                              onChange={(e) => updateBlockData(selectedBlock.id, field.name, e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-white border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B] text-[#18181B] text-sm font-bold focus:outline-none focus:border-[#8B5CF6] transition-all resize-y"
                            />
                          ) : field.type === 'select' ? (
                            <div className="relative">
                              <select
                                value={value}
                                onChange={(e) => updateBlockData(selectedBlock.id, field.name, e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-white border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B] text-[#18181B] text-sm font-bold focus:outline-none focus:border-[#8B5CF6] transition-all appearance-none cursor-pointer"
                              >
                                {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                              </select>
                              <ChevronDown size={16} strokeWidth={3} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#18181B] pointer-events-none" />
                            </div>
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
  return <Icon size={16} strokeWidth={2} />;
};

// Helper for Mascot CSS Sprite calculation
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

export default PLBBuilder;
