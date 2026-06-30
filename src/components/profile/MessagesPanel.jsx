import React from 'react';
import { Mail } from 'lucide-react';

const messages = [
  { id: 1, name: 'PiggyPath Team', text: 'Welcome to PiggyPath!', time: '1M', isNew: true, color: '#00E599' },
];

const MessagesPanel = () => {
  return (
    <div className="w-full bg-white dark:bg-[#18181B] border-[3px] border-[#18181B] dark:border-white shadow-[6px_6px_0_#8B5CF6] p-6 mb-6 transition-colors flex flex-col flex-1 min-h-0">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-[#18181B] dark:text-[#F4F4F5]">
          <Mail size={20} strokeWidth={3} />
          <h3 className="font-black text-lg tracking-tight uppercase">Messages</h3>
        </div>
        <span className="bg-[#EF4444] text-white font-black text-[10px] px-2 py-1 tracking-widest uppercase border-2 border-transparent dark:border-[#18181B]">
          1 NEW
        </span>
      </div>

      {/* Messages List */}
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto min-h-0 pr-2 hide-scrollbar">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`w-full border-[3px] border-[#18181B] dark:border-[#F4F4F5] p-3 flex items-start justify-between gap-3 transition-colors
              ${msg.isNew ? 'bg-[#FFC107] dark:bg-[#B45309]' : 'bg-[#E4E4E7] dark:bg-[#27272A]'}
            `}
          >
            <div className="flex items-start gap-3 w-full">
              {/* Avatar Box */}
              <div 
                className="w-10 h-10 border-[2px] border-[#18181B] dark:border-[#F4F4F5] flex flex-col items-center justify-center relative shrink-0 transition-colors"
                style={{ backgroundColor: msg.color }}
              >
                <div className="flex gap-1 mb-1">
                  <div className="w-1.5 h-1.5 bg-[#18181B] dark:bg-white transition-colors"></div>
                  <div className="w-1.5 h-1.5 bg-[#18181B] dark:bg-white transition-colors"></div>
                </div>
                <div className="w-3 h-0.5 bg-[#18181B] dark:bg-white transition-colors"></div>
              </div>
              
              {/* Info */}
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-black text-sm text-[#18181B] dark:text-[#F4F4F5] truncate">{msg.name}</span>
                  {msg.isNew && <div className="w-2 h-2 bg-[#EF4444]"></div>}
                </div>
                <span className={`font-['Space_Mono',monospace] text-[10px] truncate w-full ${msg.isNew ? 'text-[#18181B] dark:text-[#F4F4F5]' : 'text-[#18181B] opacity-80 dark:opacity-100 dark:text-[#A1A1AA]'}`}>
                  {msg.text}
                </span>
              </div>
            </div>

            {/* Time */}
            <span className={`font-['Space_Mono',monospace] text-[10px] font-bold shrink-0 mt-1 ${msg.isNew ? 'text-[#18181B] dark:text-[#F4F4F5]' : 'text-[#18181B] dark:text-[#A1A1AA]'}`}>
              {msg.time}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MessagesPanel;
