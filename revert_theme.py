import sys
import re

file_path = r'd:\piggypath_admin\original_PLBBuilder.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Import Rnd
if "from 'react-rnd'" not in content:
    content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect } from 'react';\nimport { Rnd } from 'react-rnd';")

# 2. Add defaults in addBlock
old_add_block = """    schema.fields.forEach(field => {
      newBlock.teen[field.name] = field.default;
      newBlock.adult[field.name] = field.default;
    });
    
    updatePagesWithActiveBlocks(blocks => [...blocks, newBlock]);"""

new_add_block = """    schema.fields.forEach(field => {
      newBlock.teen[field.name] = field.default;
      newBlock.adult[field.name] = field.default;
    });
    
    // Add initial bounds for Rnd
    newBlock.teen.x = 20;
    newBlock.teen.y = 20 + (pages.find(p => p.id === activePageId)?.blocks?.length || 0) * 80;
    newBlock.teen.width = 300;
    newBlock.teen.height = 'auto';
    
    newBlock.adult.x = 20;
    newBlock.adult.y = 20 + (pages.find(p => p.id === activePageId)?.blocks?.length || 0) * 80;
    newBlock.adult.width = 300;
    newBlock.adult.height = 'auto';
    
    updatePagesWithActiveBlocks(blocks => [...blocks, newBlock]);"""

content = content.replace(old_add_block, new_add_block)

# 3. Replace canvas map with Rnd mapping
old_canvas = """              ) : (
                <div className="flex flex-col gap-0 w-full">
                  {activeBlocks.map((block) => (
                    <div 
                      key={block.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isPreviewMode) setSelectedBlockId(block.id);
                      }}
                      className={`relative group transition-all w-full ${selectedBlockId === block.id && !isPreviewMode ? 'ring-2 ring-inset ring-[#8B5CF6] bg-[#8B5CF6]/5 z-10' : 'hover:ring-2 hover:ring-inset hover:ring-gray-300 z-0'}`}
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
              )}"""

new_canvas = """              ) : (
                <div className="w-full h-[3000px] relative overflow-hidden">
                  {activeBlocks.map((block) => (
                    <Rnd
                      key={block.id}
                      default={{
                        x: block[version].x || 20,
                        y: block[version].y || 20,
                        width: block[version].width || 320,
                        height: block[version].height || 'auto',
                      }}
                      position={{ x: block[version].x || 20, y: block[version].y || 20 }}
                      size={{ width: block[version].width || 320, height: block[version].height || 'auto' }}
                      onDragStop={(e, d) => {
                        updateBlockData(block.id, 'x', d.x);
                        updateBlockData(block.id, 'y', d.y);
                      }}
                      onResizeStop={(e, direction, ref, delta, position) => {
                        updateBlockData(block.id, 'width', parseInt(ref.style.width, 10));
                        updateBlockData(block.id, 'height', parseInt(ref.style.height, 10));
                        updateBlockData(block.id, 'x', position.x);
                        updateBlockData(block.id, 'y', position.y);
                      }}
                      disableDragging={isPreviewMode}
                      enableResizing={!isPreviewMode}
                      bounds="parent"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isPreviewMode) setSelectedBlockId(block.id);
                      }}
                      className={`group transition-none ${selectedBlockId === block.id && !isPreviewMode ? 'ring-2 ring-offset-2 ring-[#8B5CF6] z-50' : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-300 z-10'} ${isPreviewMode ? '' : 'cursor-move'}`}
                      style={{ position: 'absolute' }}
                    >
                      {!isPreviewMode && selectedBlockId === block.id && (
                        <div className="absolute -top-8 right-0 flex gap-1 z-50">
                          <button 
                            onPointerDown={(e) => { e.stopPropagation(); deleteBlock(block.id); }} 
                            className="bg-red-500 text-white p-1.5 rounded-md shadow-md hover:bg-red-600 transition-colors pointer-events-auto"
                          >
                            <Trash2 size={12} strokeWidth={3} />
                          </button>
                        </div>
                      )}
                      
                      {/* Render block inline */}
                      <div className={`w-full h-full relative z-0 ${!isPreviewMode ? 'pointer-events-none' : ''}`}>
                         <VisualBlockRenderer block={block} version={version} isPreviewMode={isPreviewMode} />
                      </div>
                    </Rnd>
                  ))}
                </div>
              )}"""

content = content.replace(old_canvas, new_canvas)

with open(r'd:\piggypath_admin\src\pages\admin\PLBBuilder.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Reverted theme and applied Rnd!")
