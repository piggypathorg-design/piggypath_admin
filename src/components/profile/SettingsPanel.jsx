import React, { useState } from 'react';
import { Settings } from 'lucide-react';

const SettingsPanel = () => {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState(false);
  const [privacy, setPrivacy] = useState('options');

  return (
    <div className="card-duo p-5 relative flex flex-col flex-1">
      <div className="flex justify-between items-start mb-5">
        <h3 className="text-[14px] font-bold uppercase tracking-widest text-[#a78bfa]">Settings</h3>
        <Settings size={18} className="text-[#a78bfa]" />
      </div>
      
      <div className="flex gap-5 border-b border-[#552e85] mb-5 pb-2 text-[13px] text-[#a78bfa]">
        <div className="text-[#b8e92f] border-b-2 border-[#b8e92f] pb-2 -mb-[3px] font-bold px-1">Notifications</div>
        <div className="px-1 hover:text-white cursor-pointer transition-colors font-medium">Privacy</div>
        <div className="px-1 hover:text-white cursor-pointer transition-colors font-medium">Account</div>
      </div>
      
      <div className="flex flex-col gap-5 flex-1">
        <div className="flex justify-between items-center text-[14px]">
          <span className="text-white font-medium">Notifications</span>
          <button 
            onClick={() => setNotifications(!notifications)} 
            className={`w-11 h-6 rounded-full flex items-center p-1 transition-colors border ${notifications ? 'bg-[#b8e92f] border-[#7fa618]' : 'bg-[#281643] border-[#552e85]'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${notifications ? 'translate-x-5 bg-[#281643]' : 'translate-x-0'}`} />
          </button>
        </div>
        
        <div className="flex justify-between items-center text-[14px]">
          <span className="text-white font-medium">Language</span>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setLanguage(!language)} 
              className={`w-11 h-6 rounded-full flex items-center p-1 transition-colors border ${language ? 'bg-[#b8e92f] border-[#7fa618]' : 'bg-[#281643] border-[#552e85]'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${language ? 'translate-x-5 bg-[#281643]' : 'translate-x-0'}`} />
            </button>
            <select className="bg-[#281643] border border-[#552e85] rounded-lg px-2 py-1 text-[12px] font-medium text-white outline-none">
              <option>English</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-between mt-auto pt-5 border-t border-[#552e85]">
           <div className="flex flex-col gap-3">
             <span className="text-[11px] font-bold text-[#a78bfa] tracking-widest uppercase">Privacy</span>
             <div className="flex items-center gap-4 text-[12px] text-white font-medium">
               <label className="flex items-center gap-2 cursor-pointer">
                 <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${privacy === 'options' ? 'border-[#b8e92f]' : 'border-[#552e85] bg-[#281643]'}`}>
                   {privacy === 'options' && <div className="w-2 h-2 rounded-full bg-[#b8e92f]" />}
                 </div>
                 Options
               </label>
               <label className="flex items-center gap-2 cursor-pointer">
                 <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${privacy === 'envirer' ? 'border-[#b8e92f]' : 'border-[#552e85] bg-[#281643]'}`}>
                   {privacy === 'envirer' && <div className="w-2 h-2 rounded-full bg-[#b8e92f]" />}
                 </div>
                 Erivier
               </label>
             </div>
           </div>
           <div className="flex flex-col gap-3 items-end">
             <span className="text-[11px] font-bold text-[#a78bfa] tracking-widest uppercase">Account</span>
             <div className="flex items-center gap-2">
                <button className="text-[12px] font-bold text-white hover:bg-[#552e85] transition-colors border border-[#552e85] rounded-lg px-3 py-1 bg-[#281643]">Security</button>
                <button className="text-[12px] font-bold text-[#ef4444] hover:bg-[#7f1d1d] transition-colors border border-[#7f1d1d] rounded-lg px-3 py-1 bg-[#450a0a]">Reset</button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
