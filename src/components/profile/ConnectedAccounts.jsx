import React from 'react';
import { Mail, Link as LinkIcon, Chrome, Apple } from 'lucide-react';

const ConnectedAccounts = ({ accounts }) => {
  return (
    <div className="card-duo p-5 flex flex-col justify-between h-full">
      <div className="flex justify-between items-start mb-5">
        <h3 className="text-[14px] font-bold tracking-widest text-[#a78bfa] uppercase leading-tight">Accounts</h3>
        <LinkIcon size={16} className="text-[#a78bfa]" />
      </div>
      
      <div className="flex flex-col gap-5 flex-1 justify-center">
        {accounts.map((acc, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#351f54] border border-[#6a3ba3] flex items-center justify-center shrink-0">
                {acc.provider === 'Google' && <Chrome size={18} className="text-[#38bdf8]" />}
                {acc.provider === 'Apple' && <Apple size={18} className="text-[#a78bfa]" />}
                {acc.provider === 'Email' && <Mail size={18} className="text-[#b8e92f]" />}
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-white leading-tight">{acc.provider}</span>
                <span className="text-[11px] text-[#a78bfa] font-medium leading-tight mt-0.5">{acc.email}</span>
              </div>
            </div>
            <span className="text-[12px] font-bold text-[#b8e92f]">Connected</span>
          </div>
        ))}
      </div>
      
      <button className="w-full py-2.5 bg-[#281643] hover:bg-[#6a3ba3] border border-[#6a3ba3] rounded-xl text-[13px] text-white font-bold transition-colors mt-6">
        Disconnect
      </button>
    </div>
  );
};

export default ConnectedAccounts;
