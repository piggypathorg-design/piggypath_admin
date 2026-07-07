import re
import sys

file_path = r'd:\piggypath_admin\src\pages\admin\PLBBuilder.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

changes = 0

def replace(old, new, count=0):
    global content, changes
    if old in content:
        content = content.replace(old, new, count)
        changes += 1

# 1. Main UI background wrapper
replace('bg-[#09090B] text-white overflow-hidden', 'bg-[#F4F4F5] text-[#18181B] overflow-hidden font-bold')

# 2. Navbar
replace('bg-[#18181B] border-b-[1px] border-[#27272A]', 'bg-white border-b-4 border-[#18181B]')
# Back button in navbar
replace('bg-[#27272A] p-2 rounded-lg hover:bg-[#3F3F46] transition-colors', 'bg-white border-2 border-[#18181B] shadow-[2px_2px_0_#18181B] p-2 rounded-lg hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#18181B] transition-all')
replace('text-gray-400', 'text-gray-500') # general soften

# Save / Publish buttons
replace('bg-[#27272A] hover:bg-[#3F3F46] text-white', 'bg-white border-2 border-[#18181B] shadow-[4px_4px_0_#18181B] text-[#18181B] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#18181B]')
replace('bg-[#00E599] hover:bg-[#00D68F] text-black', 'bg-[#00E599] border-2 border-[#18181B] shadow-[4px_4px_0_#18181B] text-black hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#18181B]')
replace('bg-white hover:bg-gray-100 text-black', 'bg-[#FFD100] border-2 border-[#18181B] shadow-[4px_4px_0_#18181B] text-black hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#18181B]')

# 3. Components Sidebar
replace('aside className="w-72 bg-[#18181B] border-r-[1px] border-[#27272A]', 'aside className="w-72 bg-[#F4F4F5] border-r-4 border-[#18181B]')
replace('border-b-[1px] border-[#27272A]', 'border-b-4 border-[#18181B]')
replace('text-white', 'text-[#18181B]') # Title text

# Search input
replace('bg-[#09090B] border-[#27272A] text-white', 'bg-white border-2 border-[#18181B] shadow-[2px_2px_0_#18181B] text-[#18181B] placeholder:text-gray-400')

# Categories
replace('bg-[#27272A] text-white', 'bg-[#8B5CF6] border-2 border-[#18181B] shadow-[2px_2px_0_#18181B] text-white')
replace('text-gray-400 hover:text-white', 'text-gray-500 hover:text-[#18181B] border-2 border-transparent hover:border-[#18181B] hover:shadow-[2px_2px_0_#18181B] hover:bg-white')

# Component Buttons
replace('bg-[#27272A] border-[1px] border-[#3F3F46] rounded-xl hover:border-[#00E599] hover:bg-[#00E599]/10 transition-all aspect-square group', 'bg-white border-2 border-[#18181B] shadow-[4px_4px_0_#18181B] rounded-xl hover:-translate-y-1 hover:shadow-[6px_6px_0_#18181B] hover:bg-[#FFD100] transition-all aspect-square group')
replace('w-10 h-10 bg-[#18181B] rounded-full border-[1px] border-[#3F3F46]', 'w-10 h-10 bg-white rounded-full border-2 border-[#18181B]')
replace('text-gray-300 text-center leading-tight group-hover:text-white', 'text-[#18181B] text-center leading-tight')
replace('text-[#00E599]', 'text-[#18181B]') # Icon inside component button

# 4. Structure Panel
replace('aside className="w-64 bg-[#18181B] border-r-[1px] border-[#27272A]', 'aside className="w-64 bg-[#F4F4F5] border-r-4 border-[#18181B]')
replace('bg-[#00E599] flex items-center justify-center hover:bg-[#00D68F]', 'bg-[#00E599] border-2 border-[#18181B] shadow-[2px_2px_0_#18181B] flex items-center justify-center hover:-translate-y-0.5')

# Page tabs
content = re.sub(r"className={`border-\[1px\] rounded-lg overflow-hidden transition-all \$\{isActive \? 'border-\[#3F3F46\] bg-\[#27272A\]' : 'border-transparent bg-transparent hover:border-\[#3F3F46\]/50'}`}", 
                 "className={`border-2 rounded-xl overflow-hidden transition-all ${isActive ? 'border-[#18181B] shadow-[4px_4px_0_#18181B] bg-white' : 'border-transparent bg-transparent hover:border-[#18181B] hover:shadow-[2px_2px_0_#18181B] hover:bg-white'}`}", content)

content = re.sub(r"className={`p-2.5 flex items-center justify-between cursor-pointer font-black text-sm transition-colors \$\{isActive \? 'bg-\[#00E599\] text-black' : 'bg-transparent text-gray-400 hover:bg-\[#27272A\] hover:text-gray-200'}`}",
                 "className={`p-2.5 flex items-center justify-between cursor-pointer font-black text-sm transition-colors ${isActive ? 'bg-[#00E599] text-[#18181B] border-b-2 border-[#18181B]' : 'bg-transparent text-gray-600'}`}", content)

# Block items in Structure
content = re.sub(r"className={`group flex items-center justify-between p-2 rounded-md text-sm font-bold transition-colors text-left \$\{selectedBlockId === block.id \? 'bg-\[#3F3F46\] text-white' : 'text-gray-400 hover:bg-\[#3F3F46\]/50 hover:text-white'}`}",
                 "className={`group flex items-center justify-between p-2 rounded-lg text-sm font-bold transition-colors text-left ${selectedBlockId === block.id ? 'bg-[#8B5CF6] text-white border-2 border-[#18181B] shadow-[2px_2px_0_#18181B]' : 'text-gray-600 hover:bg-gray-100 hover:text-[#18181B]'}`}", content)

# 5. Canvas Header
replace('bg-[#09090B] flex flex-col', 'bg-[#E4E4E7] flex flex-col')
replace('bg-[#27272A] border border-[#3F3F46] rounded-full text-[10px] font-black text-white', 'bg-white border-2 border-[#18181B] shadow-[2px_2px_0_#18181B] rounded-full text-[10px] font-black text-[#18181B]')
replace('bg-[#27272A] border border-[#3F3F46] rounded-lg p-1', 'bg-white border-2 border-[#18181B] shadow-[4px_4px_0_#18181B] rounded-lg p-1')
replace("className={`p-1.5 rounded-md transition-colors ${previewDevice === 'mobile' ? 'bg-[#3F3F46] text-white' : 'text-gray-500 hover:text-white'}`}", 
        "className={`p-1.5 rounded-md transition-colors ${previewDevice === 'mobile' ? 'bg-[#FFD100] border-2 border-[#18181B] text-[#18181B]' : 'text-gray-500 hover:text-[#18181B]'}`}")
replace("className={`p-1.5 rounded-md transition-colors ${previewDevice === 'tablet' ? 'bg-[#3F3F46] text-white' : 'text-gray-500 hover:text-white'}`}",
        "className={`p-1.5 rounded-md transition-colors ${previewDevice === 'tablet' ? 'bg-[#FFD100] border-2 border-[#18181B] text-[#18181B]' : 'text-gray-500 hover:text-[#18181B]'}`}")
replace("className={`p-1.5 rounded-md transition-colors ${previewDevice === 'laptop' ? 'bg-[#3F3F46] text-white' : 'text-gray-500 hover:text-white'}`}",
        "className={`p-1.5 rounded-md transition-colors ${previewDevice === 'laptop' ? 'bg-[#FFD100] border-2 border-[#18181B] text-[#18181B]' : 'text-gray-500 hover:text-[#18181B]'}`}")

# Active Block Ring
replace("ring-2 ring-inset ring-[#8B5CF6] bg-[#8B5CF6]/5", "ring-4 ring-inset ring-[#8B5CF6] bg-[#8B5CF6]/10")

# 6. Properties Panel
replace('aside className="w-80 bg-[#18181B] border-l-[1px] border-[#27272A]', 'aside className="w-80 bg-[#F4F4F5] border-l-4 border-[#18181B]')
replace('text-gray-400', 'text-gray-500')
replace('bg-[#09090B] border-[1px] border-[#27272A] rounded-lg p-2.5 text-sm focus:border-[#00E599] text-white', 'bg-white border-2 border-[#18181B] shadow-[2px_2px_0_#18181B] rounded-lg p-2.5 text-sm focus:border-[#8B5CF6] focus:shadow-[4px_4px_0_#18181B] text-[#18181B]')
replace('bg-[#27272A] text-white hover:bg-[#3F3F46]', 'bg-white text-[#18181B] border-2 border-[#18181B] shadow-[2px_2px_0_#18181B] hover:shadow-[4px_4px_0_#18181B] hover:-translate-y-0.5')
replace('bg-[#09090B] border border-[#3F3F46]', 'bg-white border-2 border-[#18181B] shadow-[2px_2px_0_#18181B]')
replace('border-t-[1px] border-[#27272A]', 'border-t-2 border-[#18181B]')
replace('text-white font-bold', 'text-[#18181B] font-black')
replace('text-xs font-bold text-gray-400 mb-1', 'text-xs font-black text-[#18181B] mb-1 uppercase tracking-widest')
replace('bg-[#09090B] border-[1px] border-[#27272A]', 'bg-white border-2 border-[#18181B] shadow-[2px_2px_0_#18181B]') # Checkbox

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Total changes made: {changes}")
