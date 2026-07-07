const fs = require('fs');
const path = require('path');

const filePath = path.join('d:', 'piggypath_admin', 'src', 'pages', 'admin', 'PLBBuilder.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Sidebar Component Buttons
content = content.replaceAll(
  'bg-[#27272A] border-[1px] border-[#3F3F46] rounded-xl hover:border-[#00E599] hover:bg-[#00E599]/10 transition-all aspect-square group',
  'bg-white border-[2px] border-[#18181B] rounded-xl hover:-translate-y-1 hover:shadow-[4px_4px_0_#18181B] transition-all aspect-square shadow-[2px_2px_0_#18181B] group'
);

// Search Bar
content = content.replaceAll(
  'bg-[#27272A] border-[1px] border-[#3F3F46] rounded-lg pl-9 pr-3 py-2 text-sm text-[#18181B] focus:outline-none focus:border-[#00E599]',
  'bg-white border-[2px] border-[#18181B] rounded-lg pl-9 pr-3 py-2 text-sm text-[#18181B] shadow-[2px_2px_0_#18181B] focus:outline-none focus:border-[#00E599]'
);

// Inner icons inside the component buttons
content = content.replaceAll(
  'bg-[#18181B] rounded-full border-[1px] border-[#3F3F46]',
  'bg-white rounded-full border-[2px] border-[#18181B]'
);

// Category Pills
content = content.replaceAll(
  "bg-transparent text-gray-400 border-[#3F3F46] hover:bg-[#27272A]",
  "bg-white text-[#18181B] border-[#18181B] shadow-[1px_1px_0_#18181B] hover:bg-[#F4F4F5]"
);

content = content.replaceAll(
  "bg-[#00E599] text-black border-[#00E599]",
  "bg-[#00E599] text-[#18181B] border-[#18181B] shadow-[2px_2px_0_#18181B]"
);

// Structure Panel items
content = content.replaceAll(
  "border-[#3F3F46] bg-[#27272A]",
  "border-[#18181B] bg-white border-[2px] shadow-[2px_2px_0_#18181B]"
);
content = content.replaceAll(
  "border-transparent bg-transparent hover:border-[#3F3F46]/50",
  "border-transparent bg-transparent hover:border-[#18181B] hover:border-[2px]"
);
content = content.replaceAll(
  "bg-transparent text-gray-400 hover:bg-[#27272A] hover:text-gray-200",
  "bg-transparent text-gray-500 hover:bg-[#F4F4F5] hover:text-[#18181B]"
);
content = content.replaceAll(
  "bg-[#3F3F46] text-[#18181B]",
  "bg-white border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B] text-[#18181B]"
);
content = content.replaceAll(
  "text-gray-400 hover:bg-[#3F3F46]/50 hover:text-[#18181B]",
  "text-gray-500 hover:bg-white hover:border-[2px] hover:border-[#18181B] hover:shadow-[2px_2px_0_#18181B] hover:text-[#18181B]"
);

// Device Toggles
content = content.replaceAll(
  "bg-[#3F3F46] text-[#18181B]",
  "bg-[#00E599] text-[#18181B] border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B]"
);

// Empty Page / State texts
content = content.replaceAll(
  "text-gray-300",
  "text-[#18181B]"
);

// Top navbar borders
content = content.replaceAll(
  "border-b-[1px] border-[#27272A]",
  "border-b-[3px] border-[#18181B]"
);
content = content.replaceAll(
  "border-r-[1px] border-[#27272A]",
  "border-r-[3px] border-[#18181B]"
);
content = content.replaceAll(
  "border-l-[1px] border-[#27272A]",
  "border-l-[3px] border-[#18181B]"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed PLBBuilder.jsx theme.');
