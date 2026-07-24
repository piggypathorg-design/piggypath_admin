import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Rnd } from 'react-rnd';
import { useParams, useNavigate } from 'react-router-dom';
import { plbSchema } from '../../utils/plbSchema';
import { starterTemplates } from '../../utils/starterTemplates';
import VisualBlockRenderer from '../../components/builder/VisualBlockRenderer';
import LessonPlayerPreview from '../../components/builder/LessonPlayerPreview';
import { SortablePageItem } from '../../components/builder/SortablePageItem';
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
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { 
  Type, AlignLeft, FileText, Minus, Maximize2, Square, 
  Image as ImageIcon, Video, Film, Volume2, 
  Smile, MessageCircle, HelpCircle, Move, Link, ListOrdered, Sliders, Edit3, MousePointer2, MessageSquare, 
  PieChart, BarChart2, TrendingUp, Table as TableIcon, 
  Star, Coins, Award, Trophy, Percent, 
  ArrowRight, ArrowLeft, FastForward,
  Save, Download, Trash2, GripVertical, Play, Smartphone, Tablet, Monitor, Home, ChevronLeft, Plus,
  Layers, ArrowUp, ArrowDown, Upload, ChevronDown, Check, Rocket, Eye, Search, Copy, Undo2, Redo2
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { getLesson, updateLesson } from '../../utils/api';
import { supabase } from '../../utils/supabaseClient';
import mascotGridImg from '../../assets/mascot_grid.png';

const allIconNames = Object.keys(LucideIcons).filter(name => /^[A-Z]/.test(name) && !name.endsWith('Icon') && name !== 'LucideProps' && name !== 'LucideProvider');

const IconSelectField = ({ value, onChange }) => {
  const [isOpen, React_useState] = React.useState(false);
  const [search, setSearch] = React.useState('');
  
  const filtered = React.useMemo(() => {
    return allIconNames.filter(name => name.toLowerCase().includes(search.toLowerCase())).slice(0, 100);
  }, [search]);

  const CurrentIcon = LucideIcons[value] || LucideIcons.Activity;

  return (
    <div className="relative">
      <div 
        onClick={() => React_useState(!isOpen)}
        className="w-full px-3 py-2 rounded-lg bg-white border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B] flex items-center justify-between cursor-pointer hover:-translate-y-0.5 transition-all"
      >
        <div className="flex items-center gap-3">
          <CurrentIcon size={18} />
          <span className="text-sm font-bold text-[#18181B] truncate">{value}</span>
        </div>
        <LucideIcons.ChevronDown size={14} className="text-gray-500" />
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => React_useState(false)}></div>
          <div className="absolute z-50 mt-2 w-full bg-white border-[3px] border-[#18181B] shadow-[4px_4px_0_0_#000] rounded-xl max-h-64 overflow-hidden flex flex-col">
            <div className="p-3 border-b-[3px] border-[#18181B] bg-gray-50 shrink-0">
              <div className="relative">
                <LucideIcons.Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  autoFocus
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search icons..."
                  className="w-full pl-8 pr-3 py-1.5 text-sm font-bold border-[2px] border-[#18181B] rounded-lg focus:outline-none focus:border-[#00E599]"
                />
              </div>
            </div>
            <div className="overflow-y-auto flex-1 p-2 flex flex-col gap-1">
              {filtered.map(name => {
                const IconComp = LucideIcons[name];
                return (
                  <div 
                    key={name}
                    onClick={() => { onChange(name); React_useState(false); setSearch(''); }}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${value === name ? 'bg-[#00E599] text-black font-black' : 'hover:bg-gray-100 font-bold text-gray-600 hover:text-black'}`}
                  >
                    <IconComp size={18} />
                    <span className="text-sm">{name}</span>
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <div className="p-4 text-center text-sm font-bold text-gray-500">No icons found.</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const iconMap = {
  'Type': Type, 'AlignLeft': AlignLeft, 'FileText': FileText, 'Minus': Minus, 'Maximize2': Maximize2, 'Square': Square, 
  'ImageIcon': ImageIcon, 'Video': Video, 'Film': Film, 'Volume2': Volume2, 
  'Smile': Smile, 'MessageCircle': MessageCircle, 'HelpCircle': HelpCircle, 'Move': Move, 'Link': Link, 'ListOrdered': ListOrdered, 'Sliders': Sliders, 'Edit3': Edit3, 'MousePointer2': MousePointer2, 'MessageSquare': MessageSquare, 
  'PieChart': PieChart, 'BarChart2': BarChart2, 'TrendingUp': TrendingUp, 'Table': TableIcon, 
  'Star': Star, 'Coins': Coins, 'Award': Award, 'Trophy': Trophy, 'Percent': Percent, 
  'ArrowRight': ArrowRight, 'ArrowLeft': ArrowLeft, 'FastForward': FastForward
};

const MediaUploadField = ({ value, onChange, label, required }) => {
  const [mode, setMode] = React.useState('url');
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError('');

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { data, error } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      onChange(publicUrlData.publicUrl);
    } catch (err) {
      console.error('Error uploading file:', err);
      setUploadError(err.message || 'Failed to upload file.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex bg-[#F4F4F5] rounded-md p-1 border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B]">
          <button 
            type="button"
            onClick={() => setMode('url')}
            className={`text-[10px] font-bold px-2 py-0.5 rounded transition-all ${mode === 'url' ? 'bg-[#00E599] text-black border-[2px] border-[#18181B]' : 'text-gray-500 border-[2px] border-transparent hover:text-black'}`}
          >
            URL
          </button>
          <button 
            type="button"
            onClick={() => setMode('upload')}
            className={`text-[10px] font-bold px-2 py-0.5 rounded transition-all ${mode === 'upload' ? 'bg-[#00E599] text-black border-[2px] border-[#18181B]' : 'text-gray-500 border-[2px] border-transparent hover:text-black'}`}
          >
            UPLOAD
          </button>
        </div>
      </div>
      
      {mode === 'url' ? (
        <div className="flex gap-2 items-center">
          <input 
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://..."
            className="flex-1 w-full px-3 py-2 rounded-lg bg-white border-[2px] border-[#18181B] text-[#18181B] shadow-[2px_2px_0_#18181B] text-sm focus:outline-none focus:border-[#00E599] transition-all min-w-0"
          />
          {value && (
            <button 
              type="button"
              onClick={() => onChange('')}
              className="p-2 text-red-500 hover:text-red-700 bg-white border-[2px] border-[#18181B] rounded-lg shadow-[2px_2px_0_#18181B] transition-all"
              title="Clear Media"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {value && (
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded border-[2px] border-gray-300 gap-2">
              <div className="text-[10px] font-bold text-[#18181B] truncate">
                Current: {value}
              </div>
              <button 
                type="button"
                onClick={() => onChange('')}
                className="text-red-500 hover:text-red-700 flex-shrink-0"
                title="Clear Media"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}
          <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-[#18181B] border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-colors shadow-[2px_2px_0_#18181B]">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {isUploading ? (
                <div className="w-6 h-6 border-4 border-[#00E599] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Upload size={20} className="mb-2 text-[#18181B]" />
                  <p className="text-xs font-bold text-gray-500">Click to upload file</p>
                </>
              )}
            </div>
            <input type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} accept="image/*,video/*,audio/*,.gif" />
          </label>
          {uploadError && <p className="text-xs text-red-500 font-bold">{uploadError}</p>}
        </div>
      )}
    </div>
  );
};

const PLBBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const userStr = localStorage.getItem('plb_user_v2');
  const user = userStr ? JSON.parse(userStr) : { role: 'Creator' };
  
  const [lesson, setLesson] = useState(null);
  const [pages, setPages] = useState([{ id: 'page_1', title: 'Page 1', blocks: [] }]);
  const [activePageId, setActivePageId] = useState('page_1');
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [version, setVersion] = useState('teen');

  const progressValues = useMemo(() => {
    let totalProgressBars = 0;
    const progressMap = {};
    
    pages.forEach(page => {
      page.blocks.forEach(b => {
        if (b.type === 'Progress Bar') totalProgressBars++;
      });
    });

    let currentCount = 0;
    pages.forEach(page => {
      page.blocks.forEach(b => {
        if (b.type === 'Progress Bar') {
          currentCount++;
          progressMap[b.id] = totalProgressBars > 0 ? Math.round((currentCount / totalProgressBars) * 100) : 0;
        }
      });
    });

    return progressMap;
  }, [pages]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  
  // New features state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [previewDevice, setPreviewDevice] = useState('mobile'); // mobile | tablet | laptop

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // History state
  const historyRef = useRef([]);
  const historyIndexRef = useRef(-1);
  const [historyTick, setHistoryTick] = useState(0);

  const pagesRef = useRef(pages);
  const activePageIdRef = useRef(activePageId);
  const selectedBlockIdRef = useRef(selectedBlockId);

  useEffect(() => {
    pagesRef.current = pages;
    activePageIdRef.current = activePageId;
    selectedBlockIdRef.current = selectedBlockId;
  }, [pages, activePageId, selectedBlockId]);

  const pushToHistory = useCallback((newPages) => {
    if (historyIndexRef.current >= 0 && JSON.stringify(newPages) === JSON.stringify(historyRef.current[historyIndexRef.current])) {
      return;
    }
    const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
    newHistory.push(JSON.parse(JSON.stringify(newPages)));
    if (newHistory.length > 50) newHistory.shift();
    historyRef.current = newHistory;
    historyIndexRef.current = newHistory.length - 1;
    setHistoryTick(t => t + 1);
  }, []);

  const handleUndo = useCallback(() => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current -= 1;
      const previousPages = historyRef.current[historyIndexRef.current];
      setPages(JSON.parse(JSON.stringify(previousPages)));
      setIsSaving(true);
      updateLesson(id, { components: previousPages, pagesCount: previousPages.length }, user.name || user.username || 'Someone').then(() => setIsSaving(false));
      setHistoryTick(t => t + 1);
    }
  }, [id, user]);

  const handleRedo = useCallback(() => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current += 1;
      const nextPages = historyRef.current[historyIndexRef.current];
      setPages(JSON.parse(JSON.stringify(nextPages)));
      setIsSaving(true);
      updateLesson(id, { components: nextPages, pagesCount: nextPages.length }, user.name || user.username || 'Someone').then(() => setIsSaving(false));
      setHistoryTick(t => t + 1);
    }
  }, [id, user]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        if (selectedBlockIdRef.current) {
          duplicateBlock(selectedBlockIdRef.current);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

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
      historyRef.current = [JSON.parse(JSON.stringify(initialPages))];
      historyIndexRef.current = 0;
      setHistoryTick(t => t + 1);
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

  const saveLesson = async (currentPages, bypassHistory = false) => {
    setIsSaving(true);
    if (!bypassHistory) {
      pushToHistory(currentPages);
    }
    const newLessonData = await updateLesson(id, { 
      components: currentPages,
      pagesCount: currentPages.length
    }, user.name || user.username || 'Someone');
    if (newLessonData) setLesson(newLessonData);
    setTimeout(() => setIsSaving(false), 500);
  };

  const handlePublishToggle = async () => {
    setIsSaving(true);
    let newStatus;
    
    if (user.role === 'Admin') {
      newStatus = lesson.status === 'Published' ? 'Draft' : 'Published';
    } else {
      newStatus = lesson.status === 'Pending Approval' ? 'Draft' : 'Pending Approval';
    }
    
    await updateLesson(id, { status: newStatus }, user.username || 'Admin');
    setLesson(prev => ({ ...prev, status: newStatus }));
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
    const filteredPages = pages.filter(p => p.id !== pageId);
    const newPages = filteredPages.map((p, index) => ({ ...p, title: `Page ${index + 1}` }));
    setPages(newPages);
    if (activePageId === pageId) {
      setActivePageId(newPages[newPages.length - 1].id);
    }
    setSelectedBlockId(null);
    saveLesson(newPages);
  };

  const handleDragEndPages = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setPages((items) => {
        const oldIndex = items.findIndex(p => p.id === active.id);
        const newIndex = items.findIndex(p => p.id === over.id);
        const newPages = arrayMove(items, oldIndex, newIndex);
        saveLesson(newPages);
        return newPages;
      });
    }
  };

  const duplicateBlock = (blockId) => {
    const currentPages = pagesRef.current;
    const currentActivePage = activePageIdRef.current;
    
    let clonedBlock = null;
    const newPages = currentPages.map(page => {
      if (page.id === currentActivePage) {
        const blockIndex = page.blocks.findIndex(b => b.id === blockId);
        if (blockIndex === -1) return page;
        const blockToClone = page.blocks[blockIndex];
        const newBlock = {
          ...JSON.parse(JSON.stringify(blockToClone)),
          id: `block_${Date.now()}`,
          x: blockToClone.x + 20,
          y: blockToClone.y + 20
        };
        clonedBlock = newBlock;
        const newBlocks = [...page.blocks];
        newBlocks.splice(blockIndex + 1, 0, newBlock);
        return { ...page, blocks: newBlocks };
      }
      return page;
    });
    
    if (clonedBlock) {
      setPages(newPages);
      setSelectedBlockId(clonedBlock.id);
      saveLesson(newPages);
    }
  };

  const applyTemplate = (template) => {
    const currentPages = pagesRef.current;
    const currentActivePage = activePageIdRef.current;
    
    let currentY = 20;
    
    // Find the max Y of existing blocks on this page to start below them
    const page = currentPages.find(p => p.id === currentActivePage);
    if (page && page.blocks && page.blocks.length > 0) {
      const maxY = Math.max(...page.blocks.map(b => (b.y || b.teen?.y || 20) + (b.height || b.teen?.height || 100)));
      if (!isNaN(maxY)) currentY = maxY + 40;
    }

    const newBlocks = template.blocks.map((b, idx) => {
      const type = b.type;
      const schema = plbSchema[type];
      const newBlock = {
        id: `block_${Date.now()}_${idx}`,
        type: type,
        teen: {},
        adult: {}
      };
      
      schema.fields.forEach(field => {
        newBlock.teen[field.name] = field.default;
        newBlock.adult[field.name] = field.default;
      });
      
      newBlock.teen.x = 20;
      newBlock.teen.y = currentY;
      newBlock.teen.width = 300;
      newBlock.teen.height = 'auto';
      
      newBlock.adult.x = 20;
      newBlock.adult.y = currentY;
      newBlock.adult.width = 300;
      newBlock.adult.height = 'auto';

      if (b.overrides) {
        Object.keys(b.overrides).forEach(key => {
          newBlock.teen[key] = b.overrides[key];
          newBlock.adult[key] = b.overrides[key];
        });
      }
      
      currentY += (b.height || 150) + 20;
      return newBlock;
    });

    const newPages = currentPages.map(page => {
      if (page.id === currentActivePage) {
        return { ...page, blocks: [...page.blocks, ...newBlocks] };
      }
      return page;
    });

    setPages(newPages);
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
    
    // Add initial bounds for Rnd
    const spawnY = 20;
    const spawnX = 20;

    newBlock.teen.x = spawnX;
    newBlock.teen.y = spawnY;
    newBlock.teen.width = 300;
    newBlock.teen.height = 'auto';
    
    newBlock.adult.x = spawnX;
    newBlock.adult.y = spawnY;
    newBlock.adult.width = 300;
    newBlock.adult.height = 'auto';
    
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
        <h2 className="text-2xl font-black text-[#18181B]">Loading Canvas...</h2>
      </div>
    );
  }

  if (errorMsg || !lesson) {
    return (
      <div className="h-screen w-screen bg-[#18181B] flex flex-col items-center justify-center font-sans p-4 text-center">
        <div className="bg-[#27272A] border-[4px] border-[#3F3F46] rounded-3xl p-8 max-w-md w-full">
          <h2 className="text-3xl font-black text-red-500 mb-4">Oops!</h2>
          <p className="text-[#18181B] font-bold mb-6">{errorMsg || "Lesson not found."}</p>
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

  const categories = ['ALL', 'TEMPLATES', 'CONTENT', 'MEDIA', 'MASCOT', 'ACTIVITY', 'VISUALISATION', 'FEEDBACK'];
  const filteredTypes = Object.keys(plbSchema).filter(type => {
    const matchesSearch = type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'ALL' || plbSchema[type].category.toUpperCase() === activeCategory;
    const isLegacy = plbSchema[type].category === 'Legacy Navigation';
    return matchesSearch && matchesCategory && !isLegacy;
  });

  return (
    <div className="h-screen w-screen bg-[#F8FAFC] font-sans overflow-hidden text-[#18181B] flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b-[3px] border-[#18181B] px-6 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-1.5 bg-white hover:bg-[#F4F4F5] rounded-full font-bold text-sm transition-all border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B] text-[#18181B]"
          >
            <ArrowLeft size={16} strokeWidth={3} /> Back
          </button>
          <div className="h-6 w-[1px] bg-[#3F3F46]"></div>
          <h1 className="font-black text-xl text-[#18181B] truncate max-w-xs">{lesson.title}</h1>
          <span className="px-3 py-1 bg-[#FFD100] text-black rounded-full text-[10px] font-black tracking-widest uppercase">
            {lesson.status}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-black text-gray-400 mr-4">
            {isSaving ? <span className="flex items-center gap-2"><div className="w-2 h-2 bg-gray-400 rounded-full animate-ping"></div> SAVING...</span> : <span className="flex items-center gap-2"><Check size={14} strokeWidth={3}/> SAVED</span>}
          </div>
          
          {/* Undo / Redo Buttons */}
          <div className="flex items-center gap-2 border-r-[2px] border-gray-200 pr-4">
            <button 
              onClick={handleUndo} 
              disabled={historyIndexRef.current <= 0}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-sm transition-all border-[2px] bg-white text-[#18181B] border-transparent hover:border-[#18181B] hover:shadow-[2px_2px_0_#18181B] hover:-translate-y-0.5 disabled:opacity-30 disabled:pointer-events-none"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 size={16} strokeWidth={3} />
              Undo
            </button>
            <button 
              onClick={handleRedo} 
              disabled={historyIndexRef.current >= historyRef.current.length - 1}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-sm transition-all border-[2px] bg-white text-[#18181B] border-transparent hover:border-[#18181B] hover:shadow-[2px_2px_0_#18181B] hover:-translate-y-0.5 disabled:opacity-30 disabled:pointer-events-none"
              title="Redo (Ctrl+Shift+Z)"
            >
              <Redo2 size={16} strokeWidth={3} />
              Redo
            </button>
          </div>
          
          <button 
            onClick={() => { setIsPreviewMode(!isPreviewMode); setSelectedBlockId(null); }}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg font-bold text-sm transition-all border-[2px] ${isPreviewMode ? 'bg-[#00E599] text-[#18181B] border-[#18181B] shadow-[2px_2px_0_#18181B]' : 'bg-white text-[#18181B] border-[#18181B] shadow-[2px_2px_0_#18181B] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#18181B]'}`}
          >
            <Eye size={16} strokeWidth={2} /> {isPreviewMode ? 'Exit Preview' : 'Preview'}
          </button>
          
          <button
              onClick={handlePublishToggle}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg font-bold text-sm transition-all border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#18181B] ${
                lesson?.status === 'Published' || lesson?.status === 'Pending Approval'
                  ? 'bg-red-500 text-white border-transparent shadow-none hover:bg-red-600'
                  : user.role === 'Admin' ? 'bg-[#8B5CF6] text-white' : 'bg-blue-500 text-white'
              }`}
            >
              {user.role === 'Admin' ? (
                lesson?.status === 'Published' ? 'Unpublish' : <><Rocket size={16} strokeWidth={2} /> Publish</>
              ) : (
                lesson?.status === 'Pending Approval' ? 'Cancel Submission' : <><Check size={16} strokeWidth={2} /> Submit for Approval</>
              )}
            </button>
        </div>
      </header>

      {/* 4-Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Column 1: Components Library */}
        {!isPreviewMode && (
          <aside className="w-72 bg-white border-r-[3px] border-[#18181B] flex flex-col shrink-0 z-10">
            <div className="p-4 border-b-[3px] border-[#18181B] flex justify-between items-baseline">
              <h2 className="font-black text-lg text-[#18181B]">Components</h2>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{activeBlocks.length} BLOCKS</span>
            </div>
            
            <div className="p-4 flex-1 flex flex-col gap-4 overflow-hidden">
              <div className="relative shrink-0">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border-[2px] border-[#18181B] rounded-lg pl-9 pr-3 py-2 text-sm text-[#18181B] shadow-[2px_2px_0_#18181B] focus:outline-none focus:border-[#00E599] transition-colors placeholder-gray-500"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 shrink-0">
                {categories.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-full border-[1px] text-[10px] font-bold tracking-wider transition-colors ${activeCategory === cat ? 'bg-[#00E599] text-[#18181B] border-[#18181B] shadow-[2px_2px_0_#18181B]' : 'bg-white text-[#18181B] border-[#18181B] shadow-[1px_1px_0_#18181B] hover:bg-[#F4F4F5]'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              
              {activeCategory === 'TEMPLATES' ? (
                <div className="grid grid-cols-1 gap-3 overflow-y-auto pb-10 custom-scrollbar pr-2">
                  {starterTemplates.map(template => {
                    const Icon = iconMap[template.icon] || Layers;
                    return (
                      <button 
                        key={template.id}
                        onClick={() => applyTemplate(template)}
                        className="flex items-center gap-3 p-3 bg-white border-[2px] border-[#18181B] rounded-xl hover:-translate-y-1 hover:shadow-[4px_4px_0_#18181B] transition-all shadow-[2px_2px_0_#18181B] group text-left"
                      >
                        <div className="w-10 h-10 bg-white rounded-full border-[2px] border-[#18181B] flex items-center justify-center shrink-0 group-hover:border-[#8B5CF6] transition-colors">
                          <Icon size={18} className="text-[#8B5CF6]" strokeWidth={2} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-[#18181B] leading-tight">{template.name}</span>
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">{template.blocks.length} Blocks</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 overflow-y-auto pb-10 custom-scrollbar pr-2">
                  {filteredTypes.map(type => {
                    const Icon = iconMap[plbSchema[type].icon] || Type;
                    return (
                      <button 
                        key={type}
                        onClick={() => addBlock(type)}
                        className="flex flex-col items-center justify-center gap-2 p-3 bg-white border-[2px] border-[#18181B] rounded-xl hover:-translate-y-1 hover:shadow-[4px_4px_0_#18181B] transition-all aspect-square shadow-[2px_2px_0_#18181B] group"
                      >
                        <div className="w-10 h-10 bg-white rounded-full border-[2px] border-[#18181B] flex items-center justify-center group-hover:border-[#00E599] transition-colors">
                          <Icon size={18} className="text-[#00E599]" strokeWidth={2} />
                        </div>
                        <div className="font-bold text-xs text-[#18181B] text-center leading-tight group-hover:text-[#18181B]">{type}</div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </aside>
        )}

        {/* Column 2: Structure Panel */}
        {!isPreviewMode && (
          <aside className="w-64 bg-white border-r-[3px] border-[#18181B] flex flex-col shrink-0 z-10">
            <div className="p-4 border-b-[3px] border-[#18181B] flex justify-between items-center">
              <div>
                <h2 className="font-black text-lg text-[#18181B]">Structure</h2>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">{pages.length} PAGES</div>
              </div>
              <button onClick={addPage} className="w-6 h-6 rounded-full bg-[#00E599] flex items-center justify-center hover:bg-[#00D68F] transition-all">
                <Plus size={14} strokeWidth={3} className="text-black" />
              </button>
            </div>
            
            <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3">
              <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEndPages}
              >
                <SortableContext 
                  items={pages.map(p => p.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {pages.map((page) => (
                    <SortablePageItem 
                      key={page.id}
                      page={page}
                      isActive={activePageId === page.id}
                      canDelete={pages.length > 1}
                      onSelect={() => { setActivePageId(page.id); setSelectedBlockId(null); }}
                      onDelete={(e) => { e.stopPropagation(); deletePage(page.id, e); }}
                      bringForward={bringForward}
                      sendBackward={sendBackward}
                      duplicateBlock={duplicateBlock}
                      deleteBlock={deleteBlock}
                      selectedBlockId={selectedBlockId}
                      setSelectedBlockId={setSelectedBlockId}
                      onToggleSkip={() => {
                        const newPages = pages.map(p => {
                          if (p.id === page.id) return { ...p, skippable: !p.skippable };
                          return p;
                        });
                        setPages(newPages);
                        saveLesson(newPages);
                      }}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          </aside>
        )}

        {/* Column 3: Main Canvas */}
        <main 
          className="flex-1 overflow-y-auto relative bg-[#F8FAFC] flex flex-col items-center p-8 custom-scrollbar"
          onClick={() => setSelectedBlockId(null)}
        >
          {/* Canvas Header */}
          <div className={`w-full ${previewDevice === 'laptop' ? 'max-w-[1024px]' : previewDevice === 'tablet' ? 'max-w-[768px]' : 'max-w-[400px]'} flex justify-between items-center mb-6 transition-all duration-300`}>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                 {previewDevice === 'mobile' && <Smartphone size={12}/>}
                 {previewDevice === 'tablet' && <Tablet size={12}/>}
                 {previewDevice === 'laptop' && <Monitor size={12}/>}
                 LIVE CANVAS
              </span>
              <span className="px-3 py-1 bg-white border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B] rounded-full text-[10px] font-black text-[#18181B] tracking-widest uppercase">{activePage?.title || 'PAGE 1'}</span>
            </div>
            
            {/* Device Toggles */}
            <div className="flex bg-white border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B] rounded-lg p-1">
              <button onClick={(e) => { e.stopPropagation(); setPreviewDevice('mobile'); }} className={`p-1.5 rounded-md transition-colors ${previewDevice === 'mobile' ? 'bg-white border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B] text-[#18181B]' : 'text-gray-500 hover:text-[#18181B]'}`}><Smartphone size={16} /></button>
              <button onClick={(e) => { e.stopPropagation(); setPreviewDevice('tablet'); }} className={`p-1.5 rounded-md transition-colors ${previewDevice === 'tablet' ? 'bg-white border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B] text-[#18181B]' : 'text-gray-500 hover:text-[#18181B]'}`}><Tablet size={16} /></button>
              <button onClick={(e) => { e.stopPropagation(); setPreviewDevice('laptop'); }} className={`p-1.5 rounded-md transition-colors ${previewDevice === 'laptop' ? 'bg-white border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B] text-[#18181B]' : 'text-gray-500 hover:text-[#18181B]'}`}><Monitor size={16} /></button>
            </div>

            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{activeBlocks.length} BLOCKS</span>
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
                  <div className="w-16 h-16 mb-4 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-[#18181B]">
                    <Plus size={24} />
                  </div>
                  <h3 className="text-lg font-black text-gray-800 mb-1">Blank Canvas</h3>
                  <p className="text-xs font-bold text-gray-400">Click components on the left to add them here.</p>
                </div>
              ) : isPreviewMode ? (
                  <LessonPlayerPreview 
                    pages={pages}
                    initialPageIndex={Math.max(0, pages.findIndex(p => p.id === activePageId))}
                    version={version} 
                    previewDevice={previewDevice} 
                    progressValues={progressValues}
                    onClose={() => setIsPreviewMode(false)}
                  />
                ) : (
                  <div className={`mx-auto min-h-screen relative overflow-y-auto overflow-x-hidden flex flex-col gap-6 pt-10 pb-32 bg-white shadow-sm rounded-lg sm:rounded-none sm:shadow-none transition-all duration-300 ${previewDevice === 'mobile' ? 'w-full max-w-[375px]' : 'w-full max-w-[600px]'}`}>
                    {activeBlocks.map((block) => {
                      const blockWidth = block[version]?.width || 320;
                      const safeWidth = typeof blockWidth === 'string' ? parseInt(blockWidth, 10) : blockWidth;
  
                      return (
                      <div
                        key={`${block.id}-${version}-${previewDevice}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isPreviewMode) setSelectedBlockId(block.id);
                        }}
                        className={`mx-auto relative group transition-none w-full ${selectedBlockId === block.id && !isPreviewMode ? 'ring-2 ring-offset-2 ring-[#8B5CF6] z-50' : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-300 z-10'}`}
                        style={{ maxWidth: `${safeWidth}px` }}
                      >
                        {!isPreviewMode && selectedBlockId === block.id && (
                          <div className="absolute -top-8 right-0 flex gap-1 z-50">
                            <button 
                              onPointerDown={(e) => { e.stopPropagation(); duplicateBlock(block.id); }} 
                              className="bg-white text-[#18181B] border-2 border-[#18181B] p-1.5 rounded-md shadow-md hover:bg-gray-100 transition-colors pointer-events-auto"
                              title="Duplicate (Ctrl+D)"
                            >
                              <Copy size={12} strokeWidth={3} />
                            </button>
                            <button 
                              onPointerDown={(e) => { e.stopPropagation(); deleteBlock(block.id); }} 
                              className="bg-white text-red-500 border-2 border-red-500 p-1.5 rounded-md shadow-md hover:bg-red-50 transition-colors pointer-events-auto"
                              title="Delete (Del)"
                            >
                              <Trash2 size={12} strokeWidth={3} />
                            </button>
                          </div>
                        )}
                        <div className={`w-full h-full relative ${isPreviewMode ? '' : 'pointer-events-none'}`}>
                           <VisualBlockRenderer block={block} version={version} isPreviewMode={false} progressValue={progressValues[block.id]} />
                        </div>
                      </div>
                      );
                    })}
                  </div>
              )}
            </div>
          </div>
          <div className="h-20 shrink-0"></div>
        </main>

        {/* Column 4: Properties Panel */}
        {!isPreviewMode && (
          <aside className="w-80 bg-white border-l-[3px] border-[#18181B] flex flex-col shrink-0 z-20">
            <div className="p-4 border-b-[3px] border-[#18181B]">
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
                    <div className="w-10 h-10 bg-[#8B5CF6] rounded-lg text-[#18181B] flex items-center justify-center">
                      <SettingsIcon type={selectedBlock.type} />
                    </div>
                    <h3 className="font-black text-lg text-[#18181B]">{selectedBlock.type}</h3>
                  </div>
                  
                  <div className="flex flex-col gap-5">
                    {selectedSchema ? selectedSchema.fields.map(field => {
                      const value = selectedBlock[version]?.[field.name] ?? field.default;
                      
                      // Dynamic Match Pairs Logic
                      if (selectedBlock.type === 'Match Pairs' && field.name.startsWith('pair_')) {
                        const pairIndex = parseInt(field.name.split('_')[1], 10);
                        const numPairs = parseInt(selectedBlock[version]['number_of_pairs'] || '3', 10);
                        if (pairIndex > numPairs) return null;
                      }
                      
                      // Dynamic Pie Chart / Bar Graph / Line Graph Logic
                      if (selectedBlock.type === 'Pie Chart' && field.name.startsWith('slice_')) {
                        const idx = parseInt(field.name.split('_').pop(), 10);
                        const numSlices = parseInt(selectedBlock[version]['number_of_slices'] || '4', 10);
                        if (idx > numSlices) return null;
                      }
                      if (selectedBlock.type === 'Bar Graph' && field.name.startsWith('bar_')) {
                        const idx = parseInt(field.name.split('_').pop(), 10);
                        const numBars = parseInt(selectedBlock[version]['number_of_bars'] || '4', 10);
                        if (idx > numBars) return null;
                      }
                      if (selectedBlock.type === 'Line Graph' && field.name.startsWith('point_')) {
                        const idx = parseInt(field.name.split('_')[1], 10);
                        const numPoints = parseInt(selectedBlock[version]['number_of_points'] || '4', 10);
                        if (idx > numPoints) return null;
                      }
                      
                      // Dynamic Table Logic
                      if (selectedBlock.type === 'Table' && field.name.startsWith('row_')) {
                        const idx = parseInt(field.name.split('_')[1], 10);
                        const numRows = parseInt(selectedBlock[version]['number_of_rows'] || '2', 10);
                        if (idx > numRows) return null;
                      }
                      
                      // Special handling for the Mascot grid selector
                      if ((selectedBlock.type === 'Mascot Feedback' || selectedBlock.type === 'Mascot Emotion' || selectedBlock.type === 'Mascot Platform') && field.name === 'mascot_type') {
                        return (
                          <div key={field.name} className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                              {field.label}
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                              {field.options.map(opt => (
                                <button
                                  key={opt}
                                  title={opt}
                                  onClick={() => updateBlockData(selectedBlock.id, field.name, opt)}
                                  className={`aspect-square rounded-xl border-2 transition-all flex items-center justify-center overflow-hidden bg-white ${value === opt ? 'border-[#00E599] ring-2 ring-[#00E599]/30' : 'border-transparent hover:border-gray-300'}`}
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
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                              {field.label} {field.required && <span className="text-red-500">*</span>}
                            </label>
                            <div className="flex gap-2">
                              <input 
                                type="text"
                                value={value}
                                placeholder="https://..."
                                onChange={(e) => updateBlockData(selectedBlock.id, field.name, e.target.value)}
                                className="flex-1 w-full px-3 py-2 rounded-lg bg-white border-[2px] border-[#18181B] text-[#18181B] shadow-[2px_2px_0_#18181B] text-sm focus:outline-none focus:border-[#00E599] transition-all"
                              />
                              <label className="bg-[#3F3F46] hover:bg-[#52525B] text-[#18181B] px-3 py-2 rounded-lg cursor-pointer text-sm font-bold flex items-center justify-center shrink-0 transition-all">
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
                        <div key={field.name} className="flex flex-col gap-2">
                          {field.type !== 'media' && (
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                              {field.label} {field.required && <span className="text-red-500">*</span>}
                            </label>
                          )}
                          
                          {field.type === 'text' || field.type === 'number' ? (
                            <input 
                              type={field.type}
                              value={value}
                              onChange={(e) => updateBlockData(selectedBlock.id, field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-white border-[2px] border-[#18181B] text-[#18181B] shadow-[2px_2px_0_#18181B] text-sm focus:outline-none focus:border-[#00E599] transition-all"
                            />
                          ) : field.type === 'color' ? (
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-3">
                                <input 
                                  type="color"
                                  value={value}
                                  onChange={(e) => updateBlockData(selectedBlock.id, field.name, e.target.value)}
                                  className="w-8 h-8 p-0 rounded-md border-0 bg-transparent cursor-pointer shrink-0"
                                />
                                <span className="text-sm font-bold text-[#18181B] uppercase">{value || '#000000'}</span>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {['#00E599', '#FFD100', '#8B5CF6', '#3B82F6', '#FF6B6B', '#A8A29E'].map(hex => (
                                  <button
                                    key={hex}
                                    onClick={() => updateBlockData(selectedBlock.id, field.name, hex)}
                                    className={`w-5 h-5 rounded-md border-[2px] transition-all shadow-[1px_1px_0_#18181B] ${value === hex ? 'border-[#18181B] scale-110 ring-2 ring-[#00E599]' : 'border-[#18181B] hover:scale-110'}`}
                                    style={{ backgroundColor: hex }}
                                    title={hex}
                                  />
                                ))}
                              </div>
                            </div>
                          ) : field.type === 'textarea' ? (
                            <textarea 
                              value={value}
                              rows={3}
                              onChange={(e) => updateBlockData(selectedBlock.id, field.name, e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-white border-[2px] border-[#18181B] text-[#18181B] shadow-[2px_2px_0_#18181B] text-sm focus:outline-none focus:border-[#00E599] transition-all resize-y"
                            />
                          ) : field.type === 'select' ? (
                            <div className="relative">
                              <select
                                value={value}
                                onChange={(e) => updateBlockData(selectedBlock.id, field.name, e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-white border-[2px] border-[#18181B] text-[#18181B] shadow-[2px_2px_0_#18181B] text-sm focus:outline-none focus:border-[#00E599] transition-all appearance-none cursor-pointer"
                              >
                                {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                              </select>
                              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                          ) : field.type === 'icon_select' ? (
                            <IconSelectField 
                              value={value}
                              onChange={(newVal) => updateBlockData(selectedBlock.id, field.name, newVal)}
                            />
                          ) : field.type === 'media' ? (
                            <MediaUploadField
                              value={value}
                              onChange={(newVal) => updateBlockData(selectedBlock.id, field.name, newVal)}
                              label={field.label}
                              required={field.required}
                            />
                          ) : null}
                        </div>
                      );
                    }) : (
                      <div className="p-4 bg-[#FF6B6B]/10 border-[2px] border-[#FF6B6B] rounded-xl text-[#FF6B6B] font-bold text-sm">
                        This block type "{selectedBlock.type}" is no longer supported or is missing from the schema.
                      </div>
                    )}
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
