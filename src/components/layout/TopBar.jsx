import React from 'react';
import { User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../common/Logo';

const TopBar = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/';

  return (
    <div className="w-full flex justify-between items-center py-6 px-8 relative z-10">
      {/* Dynamic Title based on route or Empty to match mockup */}
      {isDashboard ? (
        <h1 className="text-3xl font-bold uppercase tracking-wider text-white">Hero Section</h1>
      ) : (
        <div /> // Profile doesn't have a title in the top left in mockup, wait, Profile has Avatar. Let's just keep this simple.
      )}

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {isDashboard && (
          <Link to="/profile" className="flex items-center gap-2 glass-panel px-4 py-2 hover:bg-white/10 transition-colors">
            <User size={16} />
            <span className="text-sm font-medium">Profile</span>
          </Link>
        )}
        
        {/* Logo */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <Logo className="text-xl !text-white" />
          </div>
          <span className="text-[10px] text-gray-400 tracking-widest mt-0.5 mr-1 flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-piggy-teal"></div>
            <div className="w-1 h-1 rounded-full bg-piggy-blue"></div>
            <div className="w-1 h-1 rounded-full bg-pink-500"></div>
            Skills Before Bills
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
