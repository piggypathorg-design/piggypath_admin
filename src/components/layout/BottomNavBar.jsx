import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Gamepad2, Map, TrendingUp, User } from 'lucide-react';

const navItems = [
  { path: '/',        label: 'HOME',    icon: LayoutDashboard },
  { path: '/games',   label: 'GAMES',   icon: Gamepad2 },
  { path: '/path',    label: 'PATH',    icon: Map },
  { path: '/stocks',  label: 'MARKET',  icon: TrendingUp },
  { path: '/profile', label: 'PROFILE', icon: User },
];

const BottomNavBar = () => (
  <div
    className="w-full fixed bottom-0 left-0 right-0 z-50"
    style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
  >
    <div
      className="w-full max-w-lg mx-auto flex justify-between items-center px-2 py-2"
      style={{
        background: '#0D0D2B',
        borderTop: '2px solid #00D4C8',
        boxShadow: '0 -4px 0px #004A45',
      }}
    >
      {navItems.map(({ path, label, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          className="relative flex flex-col items-center justify-center"
          style={{ width: 80, height: 72 }}
        >
          {({ isActive }) => (
            <>
              {/* Active tile highlight */}
              {isActive && (
                <div
                  className="absolute inset-0"
                  style={{ background: 'rgba(0,212,200,0.08)' }}
                />
              )}

              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 1.5}
                color={isActive ? '#00D4C8' : '#566C86'}
              />
              <span
                className="font-pixel mt-1"
                style={{
                  fontSize: 12,
                  color: isActive ? '#00D4C8' : '#566C86',
                }}
              >
                {label}
              </span>

              {/* 3-square lime underline indicator */}
              {isActive && (
                <div
                  className="absolute bottom-0 left-1/2 flex gap-[2px]"
                  style={{ transform: 'translateX(-50%)' }}
                >
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 6, height: 6, background: '#B8F400' }} />
                  ))}
                </div>
              )}
            </>
          )}
        </NavLink>
      ))}
    </div>
  </div>
);

export default BottomNavBar;
