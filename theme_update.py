import re

file_path = r'd:\piggypath_admin\src\pages\admin\PLBBuilder.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Main Backgrounds & Layout
content = content.replace('bg-[#09090B]', 'bg-[#F4F4F5]')
content = content.replace('bg-[#18181B]', 'bg-white')
content = content.replace('border-[#27272A]', 'border-[#18181B]')
content = content.replace('border-[#3F3F46]', 'border-[#18181B]')
# Increase border width for sidebars
content = content.replace('border-r-[1px]', 'border-r-2')
content = content.replace('border-b-[1px]', 'border-b-2')
content = content.replace('border-l-[1px]', 'border-l-2')

# 2. Text colors globally (that were white or gray in sidebars)
# Top Navbar header
content = content.replace('text-white', 'text-[#18181B]')
# Fix specifically where we want white text (like in save button if it's green)
# We will manually fix some buttons later.
content = content.replace('text-gray-400', 'text-gray-500')
content = content.replace('text-gray-500', 'text-gray-600')

# 3. Navbar Buttons
# Back button
content = content.replace('bg-[#27272A] hover:bg-[#3F3F46]', 'bg-white border-2 border-[#18181B] shadow-[2px_2px_0_#18181B] hover:shadow-[4px_4px_0_#18181B] hover:-translate-y-0.5')
# Save/Publish buttons (Wait, they have different classes)
content = re.sub(r'bg-\[#00E599\] text-black px-4 py-2 rounded-lg font-black text-sm flex items-center gap-2 hover:bg-\[#00D68F\] transition-colors',
                 r'bg-[#00E599] text-[#18181B] px-4 py-2 rounded-lg font-black text-sm flex items-center gap-2 border-2 border-[#18181B] shadow-[4px_4px_0_#18181B] hover:shadow-[6px_6px_0_#18181B] hover:-translate-y-0.5 transition-all', content)
content = re.sub(r'bg-white text-black px-4 py-2 rounded-lg font-black text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors',
                 r'bg-white text-[#18181B] px-4 py-2 rounded-lg font-black text-sm flex items-center gap-2 border-2 border-[#18181B] shadow-[4px_4px_0_#18181B] hover:shadow-[6px_6px_0_#18181B] hover:-translate-y-0.5 transition-all', content)

# 4. Components Sidebar
content = content.replace('bg-[#27272A] text-[#18181B]', 'bg-[#18181B] text-white border-2 border-[#18181B] shadow-[2px_2px_0_#18181B]') # For active category
content = content.replace('bg-[#27272A] border-[1px]', 'bg-white border-2 shadow-[2px_2px_0_#18181B]')
content = content.replace('bg-[#18181B] rounded-full border-[1px] border-[#18181B]', 'bg-white rounded-full border-2 border-[#18181B] shadow-[2px_2px_0_#18181B]')
content = content.replace('text-gray-300', 'text-[#18181B]')
content = content.replace('group-hover:text-[#18181B]', 'group-hover:text-[#00E599]')

# 5. Structure Panel
content = content.replace('bg-[#27272A]', 'bg-white shadow-[2px_2px_0_#18181B] border-2')
content = content.replace('bg-[#3F3F46]', 'bg-[#F4F4F5]')
# Page items in structure
content = content.replace('border-[1px] rounded-lg', 'border-2 rounded-lg')
content = content.replace('hover:bg-black/20 text-black', 'hover:bg-[#FF6B6B] text-white border-2 border-transparent hover:border-[#18181B] hover:shadow-[2px_2px_0_#18181B]')

# 6. Properties Panel
# Inputs & Selects
content = re.sub(r'bg-\[#F4F4F5\] border-\[#18181B\] text-\[#18181B\]', r'bg-white border-2 border-[#18181B] text-[#18181B] shadow-[2px_2px_0_#18181B]', content)
# Ensure we fix the old bg-[#09090B] which became bg-[#F4F4F5]
content = content.replace('bg-[#F4F4F5] border-[#18181B] rounded-lg px-3 py-2 text-sm font-bold w-full outline-none focus:border-[#00E599]', 'bg-white border-2 border-[#18181B] shadow-[2px_2px_0_#18181B] rounded-lg px-3 py-2 text-sm font-bold w-full outline-none focus:border-[#00E599] text-[#18181B]')
content = content.replace('text-gray-600 mb-1', 'text-[#18181B] mb-1 font-black') # labels

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Theme updated successfully!")
