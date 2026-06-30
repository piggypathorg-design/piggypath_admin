import React, { useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, Gamepad2, TrendingUp } from 'lucide-react';

const AppShell = () => {
  // Sync local dark mode preference
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    // If we want to read from localStorage we could do it here
  }, []);

  return (
    <div 
      className="w-full min-h-[100dvh] flex flex-col text-[#18181B] dark:text-[#F4F4F5] bg-[#F4F4F5] dark:bg-[#18181B] relative font-['Space_Mono',monospace] transition-colors"
      style={{
        backgroundImage: 'radial-gradient(var(--tw-gradient-stops))',
      }}
    >
      <style>{`
        .dark div[style*="radial-gradient"] {
          background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px) !important;
        }
        div[style*="radial-gradient"] {
          background-image: radial-gradient(#D4D4D8 1px, transparent 1px) !important;
          background-size: 16px 16px !important;
        }
      `}</style>
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-[80px]">
        <Outlet />
      </main>

      {/* ── Bottom Navigation Bar ──────────────────────────────────── */}
      <nav 
        className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#27272A] border-t-[3px] border-[#18181B] dark:border-[#F4F4F5] flex items-stretch z-50 h-[80px] transition-colors"
      >
        <NavItem to="/app" end label="DASHBOARD" icon={<LayoutDashboard size={24} strokeWidth={2.5} />} />
        <NavItem to="/app/path" label="PATH" icon={<Map size={24} strokeWidth={2.5} />} />
        <NavItem to="/app/games" label="GAMES" icon={<Gamepad2 size={24} strokeWidth={2.5} />} />
        <NavItem to="/app/stocks" label="STOCKS" icon={<TrendingUp size={24} strokeWidth={2.5} />} />
      </nav>
    </div>
  );
};

const NavItem = ({ to, label, icon, end }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `
        flex-1 flex flex-col items-center justify-center gap-1 
        border-r-[3px] border-[#18181B] dark:border-[#F4F4F5] last:border-r-0
        transition-colors font-black text-sm tracking-wider
        ${isActive ? 'bg-[#00E599] text-[#18181B]' : 'hover:bg-gray-50 dark:hover:bg-[#18181B]'}
      `}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export default AppShell;
