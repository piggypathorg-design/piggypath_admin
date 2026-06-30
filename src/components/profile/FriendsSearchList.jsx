import React from 'react';
import { Search } from 'lucide-react';

const friends = [];

const FriendsSearchList = () => {
  return (
    <div className="w-full bg-white dark:bg-[#18181B] border-[3px] border-[#18181B] dark:border-white shadow-[6px_6px_0_#8B5CF6] p-6 mb-6 transition-colors flex flex-col flex-1 min-h-0">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-black text-lg tracking-tight text-[#18181B] dark:text-[#F4F4F5] uppercase">Friends - 0</h3>
        <span className="bg-[#8B5CF6] text-white font-black text-[10px] px-2 py-1 tracking-widest uppercase border-2 border-transparent dark:border-[#18181B]">
          Search by ID
        </span>
      </div>

      {/* Search Input */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1 bg-[#F4F4F5] dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-[#F4F4F5] flex items-center px-4 transition-colors">
          <input 
            type="text" 
            placeholder="e.g. PP200199" 
            className="w-full bg-transparent outline-none font-['Space_Mono',monospace] text-sm text-[#18181B] dark:text-[#F4F4F5] placeholder:text-gray-400 dark:placeholder:text-[#71717A]"
          />
        </div>
        <button className="bg-[#18181B] dark:bg-[#F4F4F5] text-white dark:text-[#18181B] font-black text-xs px-4 py-3 flex items-center gap-2 hover:bg-[#27272A] dark:hover:bg-[#E4E4E7] transition-colors border-[3px] border-[#18181B] dark:border-transparent">
          <Search size={16} strokeWidth={3} />
          FIND
        </button>
      </div>

      {/* Friends List */}
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto min-h-0 pr-2 hide-scrollbar">
        {friends.length === 0 ? (
          <div className="text-center py-4 text-sm font-['Space_Mono',monospace] text-[#71717A] dark:text-[#A1A1AA]">
            Search by ID to add your first friend!
          </div>
        ) : (
          friends.map((friend) => (
            <div key={friend.id} className="w-full bg-[#F4F4F5] dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-[#F4F4F5] p-2 flex items-center justify-between transition-colors">
              <div className="flex items-center gap-3">
                {/* Avatar Box */}
                <div className="w-10 h-10 bg-white dark:bg-[#18181B] border-[2px] border-[#18181B] dark:border-transparent flex items-center justify-center p-1 shrink-0 transition-colors">
                  <div 
                    className="w-full h-full border-[1.5px] border-[#18181B] dark:border-[#F4F4F5] flex flex-col items-center justify-center relative transition-colors"
                    style={{ backgroundColor: friend.color }}
                  >
                    <div className="flex gap-1 mb-0.5">
                      <div className="w-1 h-1 bg-[#18181B] dark:bg-white"></div>
                      <div className="w-1 h-1 bg-[#18181B] dark:bg-white"></div>
                    </div>
                    <div className="w-2 h-0.5 bg-[#18181B] dark:bg-white"></div>
                  </div>
                </div>
                
                {/* Info */}
                <div className="flex flex-col">
                  <span className="font-black text-sm text-[#18181B] dark:text-[#F4F4F5]">{friend.name}</span>
                  <span className="font-['Space_Mono',monospace] text-[10px] text-[#71717A] dark:text-[#A1A1AA]">{friend.ppId}</span>
                </div>
              </div>

              {/* Level Badge */}
              <span className="bg-[#8B5CF6] text-white font-['Space_Mono',monospace] font-bold text-[10px] px-2 py-1 mr-2 border-2 border-transparent dark:border-[#18181B]">
                L{friend.level}
              </span>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default FriendsSearchList;
