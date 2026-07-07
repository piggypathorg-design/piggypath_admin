import sys
import re

file_path = r'd:\piggypath_admin\src\pages\admin\PLBBuilder.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace main dark backgrounds
content = content.replace('bg-[#09090B]', 'bg-[#F4F4F5]')
content = content.replace('bg-[#18181B]', 'bg-white')
content = content.replace('bg-[#27272A]', 'bg-white')
content = content.replace('bg-[#3F3F46]', 'bg-[#F4F4F5]')

# Replace border colors with black and increase thickness
content = content.replace('border-[#27272A]', 'border-[#18181B]')
content = content.replace('border-[#3F3F46]', 'border-[#18181B]')
content = content.replace('border-r-[1px]', 'border-r-[3px]')
content = content.replace('border-b-[1px]', 'border-b-[3px]')
content = content.replace('border-l-[1px]', 'border-l-[3px]')
content = content.replace('border-t-[1px]', 'border-t-[3px]')
content = content.replace('border border-', 'border-[2px] border-')

# Fix text colors
content = content.replace('text-white', 'text-[#18181B]')
# (Keep some white text specifically for buttons if needed, we'll fix buttons below)
content = content.replace('text-gray-400', 'text-gray-500 font-bold')
content = content.replace('text-gray-300', 'text-[#18181B] font-bold')

# Specific Navbar Buttons Fix
# Publish / Save Button
content = re.sub(r'bg-\[#00E599\] text-black px-4 py-2 rounded-lg font-black',
                 r'bg-[#00E599] text-[#18181B] px-4 py-2 rounded-lg font-black border-[3px] border-[#18181B] shadow-[4px_4px_0_#18181B] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#18181B]', content)
# Back Button
content = re.sub(r'bg-white text-black px-4 py-2 rounded-lg font-black',
                 r'bg-white text-[#18181B] px-4 py-2 rounded-lg font-black border-[3px] border-[#18181B] shadow-[4px_4px_0_#18181B] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#18181B]', content)

# Structure Panel Page & Block Items
content = content.replace('bg-[#00E599] text-black', 'bg-[#00E599] text-[#18181B] border-[3px] border-[#18181B] shadow-[2px_2px_0_#18181B]')
content = content.replace('bg-transparent text-[#18181B]', 'bg-transparent text-gray-500 hover:text-[#18181B]')

# Sidebar Components categories
content = content.replace("bg-white text-[#18181B] rounded-lg", "bg-[#00E599] text-[#18181B] rounded-lg border-[3px] border-[#18181B] shadow-[2px_2px_0_#18181B]")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Theme properly fixed!")
