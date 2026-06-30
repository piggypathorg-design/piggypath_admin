import React from 'react';
import { Settings, Bell, Lock, Shield, Globe, Eye, HelpCircle, Database } from 'lucide-react';

const settingButtons = [
  { id: 1, label: 'ACCOUNT SETTINGS', icon: Settings },
  { id: 2, label: 'NOTIFICATIONS', icon: Bell },
  { id: 3, label: 'PRIVACY & SECURITY', icon: Lock },
  { id: 4, label: 'BLOCKED USERS', icon: Shield },
  { id: 5, label: 'LANGUAGE', icon: Globe },
  { id: 6, label: 'APPEARANCE', icon: Eye },
  { id: 7, label: 'HELP & SUPPORT', icon: HelpCircle },
  { id: 8, label: 'DATA MANAGEMENT', icon: Database },
];

const AccountAndSettings = () => {
  return (
    <div className="w-full bg-white dark:bg-[#18181B] border-[3px] border-[#18181B] dark:border-white shadow-[8px_8px_0_#18181B] dark:shadow-[8px_8px_0_#F4F4F5] p-8 mb-6 transition-colors">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <h3 className="font-black text-xl tracking-tight text-[#18181B] dark:text-[#F4F4F5] uppercase">
          Account & Settings
        </h3>
        <span className="font-['Space_Mono',monospace] text-[10px] text-[#71717A] dark:text-[#A1A1AA]">
          aria@piggypath.app
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {settingButtons.map((btn) => {
          const Icon = btn.icon;
          return (
            <button 
              key={btn.id}
              className="bg-[#F4F4F5] dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-white p-4 flex items-center gap-3 hover:bg-[#E4E4E7] dark:hover:bg-[#3F3F46] transition-colors shadow-[2px_2px_0_#18181B] dark:shadow-[2px_2px_0_#F4F4F5] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-[#18181B] dark:text-[#F4F4F5]"
            >
              <Icon size={20} strokeWidth={2.5} />
              <span className="font-['Space_Mono',monospace] font-bold text-xs">
                {btn.label}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default AccountAndSettings;
