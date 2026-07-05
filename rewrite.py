import sys
import re

file_path = r'd:\piggypath_admin\src\pages\admin\PLBBuilder.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read().replace('\r\n', '\n')

changes = 0

# Change 1: State
old_state = 'const [blocks, setBlocks] = useState([]);\n  const [selectedBlockId, setSelectedBlockId] = useState(null);'
new_state = 'const [pages, setPages] = useState([{ id: \'page_1\', title: \'Page 1\', blocks: [] }]);\n  const [activePageId, setActivePageId] = useState(\'page_1\');\n  const [selectedBlockId, setSelectedBlockId] = useState(null);'
if old_state in content:
    content = content.replace(old_state, new_state)
    changes += 1
else:
    print("Could not find old_state")

# Change 2: Initial fetch
fetch_regex = re.compile(r'let parsedBlocks = \[\];\n\s*if \(Array\.isArray\(l\.components\)\) \{\n\s*parsedBlocks = l\.components;\n\s*\} else if \(typeof l\.components === \'string\'\) \{\n\s*try \{ parsedBlocks = JSON\.parse\(l\.components\); \} catch \(e\) \{ parsedBlocks = \[\]; \}\n\s*\}\n\s*setBlocks\(Array\.isArray\(parsedBlocks\) \? parsedBlocks : \[\]\);')
if fetch_regex.search(content):
    content = fetch_regex.sub('''let parsedData = [];
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
      setActivePageId(initialPages[0]?.id || 'page_1');''', content)
    changes += 1
else:
    print("Could not find fetch_regex")

# Change 3: Sync
sync_regex = re.compile(r'let parsedBlocks = \[\];\n\s*if \(typeof updatedLesson\.components === \'string\'\) \{\n\s*try \{ parsedBlocks = JSON\.parse\(updatedLesson\.components\); \} catch \(e\) \{ parsedBlocks = \[\]; \}\n\s*\} else if \(Array\.isArray\(updatedLesson\.components\)\) \{\n\s*parsedBlocks = updatedLesson\.components;\n\s*\}\n\s*setBlocks\(\(currentBlocks\) => \{\n\s*// Only update local state if the remote state is actually different\n\s*// This prevents feedback loops from our own saves\n\s*if \(JSON\.stringify\(currentBlocks\) !== JSON\.stringify\(parsedBlocks\)\) \{\n\s*return parsedBlocks;\n\s*\}\n\s*return currentBlocks;\n\s*\}\);')
if sync_regex.search(content):
    content = sync_regex.sub('''let parsedData = [];
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
          });''', content)
    changes += 1
else:
    print("Could not find sync_regex")

# Change 4: Save and Block ops
ops_regex = re.compile(r'const saveLesson = async \(currentBlocks\) => \{.*?setBlocks\(newBlocks\);\n\s*saveLesson\(newBlocks\);\n\s*\};', re.DOTALL)
if ops_regex.search(content):
    content = ops_regex.sub('''const saveLesson = async (currentPages) => {
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
  };''', content)
    changes += 1
else:
    print("Could not find ops_regex")

old_sel = 'const selectedBlock = blocks.find(b => b.id === selectedBlockId);'
new_sel = 'const activePage = pages.find(p => p.id === activePageId) || pages[0];\n  const activeBlocks = activePage?.blocks || [];\n  const selectedBlock = activeBlocks.find(b => b.id === selectedBlockId);'
if old_sel in content:
    content = content.replace(old_sel, new_sel)
    changes += 1
else:
    print("Could not find selectedBlock line")

content = content.replace('{blocks.length} BLOCKS', '{activeBlocks.length} BLOCKS')
content = content.replace('{blocks.length === 0', '{activeBlocks.length === 0')
content = content.replace('blocks.map((block', 'activeBlocks.map((block')

struct_regex = re.compile(r'<div>\n\s*<h2 className="font-black text-lg text-white">Structure</h2>\n\s*<div className="text-\[10px\] font-bold text-gray-500 uppercase tracking-widest mt-1">1 PAGES</div>\n\s*</div>\n\s*<button className="w-6 h-6 rounded-full bg-\[#00E599\] flex items-center justify-center hover:bg-\[#00D68F\] transition-all">\n\s*<Plus size=\{14\} strokeWidth=\{3\} className="text-black" />\n\s*</button>\n\s*</div>\n\s*<div className="p-4 flex-1 overflow-y-auto">\n\s*<div className="border-\[1px\] border-\[#3F3F46\] rounded-lg overflow-hidden bg-\[#27272A\]">\n\s*<div className="bg-\[#00E599\] p-2.5 text-black flex items-center gap-2 font-black text-sm">\n\s*<ChevronDown size=\{16\} strokeWidth=\{3\} /> P1 Page 1\n\s*</div>\n\s*<div className="p-1 flex flex-col gap-1 min-h-\[100px\]">\n.*?</div>\n\s*</div>\n\s*</div>', re.DOTALL)

if struct_regex.search(content):
    content = struct_regex.sub('''<div>
                <h2 className="font-black text-lg text-white">Structure</h2>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">{pages.length} PAGES</div>
              </div>
              <button onClick={addPage} className="w-6 h-6 rounded-full bg-[#00E599] flex items-center justify-center hover:bg-[#00D68F] transition-all">
                <Plus size={14} strokeWidth={3} className="text-black" />
              </button>
            </div>
            
            <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3">
              {pages.map((page) => {
                const isActive = activePageId === page.id;
                return (
                  <div key={page.id} className={`border-[1px] rounded-lg overflow-hidden transition-all ${isActive ? 'border-[#3F3F46] bg-[#27272A]' : 'border-transparent bg-transparent hover:border-[#3F3F46]/50'}`}>
                    <div 
                      onClick={() => { setActivePageId(page.id); setSelectedBlockId(null); }}
                      className={`p-2.5 flex items-center justify-between cursor-pointer font-black text-sm transition-colors ${isActive ? 'bg-[#00E599] text-black' : 'bg-transparent text-gray-400 hover:bg-[#27272A] hover:text-gray-200'}`}
                    >
                      <div className="flex items-center gap-2 truncate flex-1">
                        {isActive ? <ChevronDown size={16} strokeWidth={3} /> : <ArrowRight size={16} strokeWidth={3} />} 
                        {page.title}
                      </div>
                      {pages.length > 1 && (
                         <button 
                            onClick={(e) => deletePage(page.id, e)} 
                            className={`p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'hover:bg-black/20 text-black' : 'hover:bg-[#3F3F46] text-gray-400'}`}
                         >
                            <Trash2 size={14} strokeWidth={2} />
                         </button>
                      )}
                    </div>
                    
                    {isActive && (
                      <div className="p-1 flex flex-col gap-1 min-h-[100px]">
                        {page.blocks.length === 0 ? (
                          <div className="text-xs font-bold text-gray-500 p-3 text-center">Empty Page</div>
                        ) : (
                          page.blocks.map((block, index) => {
                            const Icon = iconMap[plbSchema[block.type]?.icon] || Type;
                            return (
                              <div 
                                key={block.id}
                                className={`group flex items-center justify-between p-2 rounded-md text-sm font-bold transition-colors text-left ${selectedBlockId === block.id ? 'bg-[#3F3F46] text-white' : 'text-gray-400 hover:bg-[#3F3F46]/50 hover:text-white'}`}
                              >
                                <button 
                                  className="flex items-center gap-2 flex-1 truncate"
                                  onClick={(e) => { e.stopPropagation(); setSelectedBlockId(block.id); }}
                                >
                                  <Icon size={14} strokeWidth={2} className={selectedBlockId === block.id ? "text-[#00E599]" : "text-gray-500 group-hover:text-[#00E599]"} /> 
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
            </div>''', content)
    changes += 1
else:
    print("Could not find structure panel")

content = content.replace('PAGE 1</span>', '{activePage?.title || \'PAGE 1\'}</span>')

print(f"Total changes made: {changes}")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
