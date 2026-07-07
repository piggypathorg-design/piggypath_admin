import sys
import re

file_path = r'd:\piggypath_admin\src\pages\admin\PLBBuilder.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Main Backgrounds
content = content.replace('bg-[#09090B]', 'bg-[#F8FAFC]') # Main window bg
content = content.replace('bg-[#18181B]', 'bg-white') # Sidebar bg
content = content.replace('bg-[#27272A]', 'bg-white') # Inner element bg
content = content.replace('bg-[#3F3F46]', 'bg-[#F1F5F9]') # Hover / active states

# 2. Text colors
content = content.replace('text-white', 'text-[#18181B]')
content = content.replace('text-gray-400', 'text-[#71717A] font-bold')
content = content.replace('text-gray-300', 'text-[#18181B] font-bold')
content = content.replace('text-gray-500', 'text-[#71717A] font-bold')

# 3. Borders & Shadows (Neo brutalism)
content = content.replace('border-[#27272A]', 'border-[#18181B]')
content = content.replace('border-[#3F3F46]', 'border-[#18181B]')
# Replace border-b-[1px] with border-b-[3px] border-[#18181B]
content = content.replace('border-b-[1px]', 'border-b-[3px]')
content = content.replace('border-r-[1px]', 'border-r-[3px]')
content = content.replace('border-l-[1px]', 'border-l-[3px]')
content = content.replace('border-[1px]', 'border-[3px]')

# Fix specific elements that need offset shadow
# Top header buttons
content = content.replace('bg-[#00E599] text-[#18181B] px-4 py-2 rounded-lg font-black text-sm flex items-center gap-2 hover:bg-[#00D68F] transition-colors', 'bg-[#00E599] text-[#18181B] px-4 py-2 rounded-lg font-black text-sm flex items-center gap-2 border-[3px] border-[#18181B] shadow-[4px_4px_0_#18181B] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#18181B] active:translate-y-[0px] active:shadow-[2px_2px_0_#18181B] transition-all')

# Ensure we write it back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Theme updated!")
