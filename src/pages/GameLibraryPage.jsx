import React, { useState } from 'react';
import { Search, Bell, Play, Star, Target, CheckCircle2 } from 'lucide-react';

const GameLibraryPage = () => {
  const [activeTab, setActiveTab] = useState('GAMES');

  const games = [
    { id: 1, title: 'HANGMAN', type: 'budget', color: 'bg-[#00E599]', icon: '❓', xp: '+XP' },
    { id: 2, title: 'BUDGET BUILDER', type: 'budget', color: 'bg-[#FF9500]', icon: '😋', xp: '+XP' },
    { id: 3, title: 'INVEST QUEST', type: 'invest', color: 'bg-[#8B5CF6]', icon: '😉', xp: '+XP' },
    { id: 4, title: 'BUDGET QUEST', type: 'budget', color: 'bg-[#FF9500]', icon: '😢', xp: '+XP' },
    { id: 5, title: 'HANGMAN', type: 'budget', color: 'bg-[#8B5CF6]', icon: '😃', xp: '+XP' },
    { id: 6, title: 'INVEST QUEST', type: 'invest', color: 'bg-[#C1FF00]', icon: '🤑', xp: '+XP' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 pb-24">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#18181B] dark:text-white">
          Game Library
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative flex-1 md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#71717A] dark:text-[#A1A1AA]" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border-[3px] border-[#18181B] dark:border-white rounded-xl bg-white dark:bg-[#18181B] font-bold focus:outline-none focus:ring-2 focus:ring-[#00E599] text-[#18181B] dark:text-white shadow-[2px_2px_0_#18181B] dark:shadow-[#FFFFFF]"
            />
          </div>
          <button className="p-2 border-[3px] border-[#18181B] dark:border-white rounded-xl bg-white dark:bg-[#18181B] hover:-translate-y-1 hover:shadow-[4px_4px_0_#18181B] dark:hover:shadow-[4px_4px_0_#FFFFFF] shadow-[2px_2px_0_#18181B] dark:shadow-[#FFFFFF] transition-all">
            <Bell className="h-6 w-6 text-[#18181B] dark:text-white" />
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 border-b-[3px] border-[#18181B] dark:border-white pb-4 overflow-x-auto">
        {['Recent', 'GAMES', 'Favorites'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full font-black border-[3px] border-[#18181B] dark:border-white whitespace-nowrap transition-all shadow-[2px_2px_0_#18181B] dark:shadow-[#FFFFFF] ${
              activeTab === tab
                ? 'bg-[#00E599] text-[#18181B]'
                : 'bg-white dark:bg-[#27272A] text-[#18181B] dark:text-white hover:-translate-y-1 hover:shadow-[4px_4px_0_#18181B] dark:hover:shadow-[4px_4px_0_#FFFFFF]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area (Left) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Featured Game */}
          <div className="border-[4px] border-[#18181B] dark:border-white rounded-3xl bg-white dark:bg-[#27272A] p-6 shadow-[6px_6px_0_#18181B] dark:shadow-[#FFFFFF] flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-1/3 aspect-square bg-[#8B5CF6] rounded-2xl border-[3px] border-[#18181B] dark:border-white relative overflow-hidden flex items-end justify-center pb-4">
              {/* Fake game cover art */}
              <div className="absolute top-3 left-3 bg-[#C1FF00] text-[#18181B] text-xs font-black px-2 py-1 rounded-md border-[2px] border-[#18181B] flex items-center gap-1">
                <span className="text-xl leading-none">⚡</span> FEATURED
              </div>
              <div className="flex gap-2 items-end">
                <div className="w-8 h-16 bg-[#FF9500] border-[2px] border-[#18181B]"></div>
                <div className="w-8 h-10 bg-[#C1FF00] border-[2px] border-[#18181B]"></div>
                <div className="w-8 h-20 bg-[#00E599] border-[2px] border-[#18181B]"></div>
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-black uppercase text-[#18181B] dark:text-white">Market Crash Master</h2>
              <p className="font-bold text-[#71717A] dark:text-[#A1A1AA] leading-tight">
                Create a simple text-based financial learning game, focusing on profit.
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#FF9500] text-[#18181B] px-3 py-1 rounded-full font-black border-[2px] border-[#18181B] text-sm">Medium</span>
                <span className="bg-white text-[#18181B] px-3 py-1 rounded-full font-black border-[2px] border-[#18181B] text-sm">15 mins</span>
                <span className="bg-[#FCD34D] text-[#18181B] px-3 py-1 rounded-full font-black border-[2px] border-[#18181B] text-sm">+500 coins</span>
                <span className="bg-[#C1FF00] text-[#18181B] px-3 py-1 rounded-full font-black border-[2px] border-[#18181B] text-sm">+120 XP</span>
              </div>
              
              <div className="flex items-center gap-4 pt-2">
                <button className="flex items-center gap-2 bg-[#00E599] text-[#18181B] px-6 py-3 rounded-xl border-[3px] border-[#18181B] font-black hover:-translate-y-1 hover:shadow-[4px_4px_0_#18181B] shadow-[2px_2px_0_#18181B] transition-all">
                  <Play size={20} fill="currentColor" /> PLAY NOW
                </button>
                <div className="flex text-[#FCD34D]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={24} fill="currentColor" strokeWidth={1} stroke="#18181B" className="drop-shadow-[1px_1px_0_#18181B]" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* All Games Grid */}
          <div>
            <h3 className="text-xl font-black mb-6 uppercase tracking-wider text-[#18181B] dark:text-white">All Games</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {games.map(game => (
                <div key={game.id} className="border-[4px] border-[#18181B] dark:border-white rounded-3xl bg-white dark:bg-[#27272A] p-6 shadow-[4px_4px_0_#18181B] dark:shadow-[#FFFFFF] flex flex-col items-center gap-4 hover:-translate-y-2 hover:shadow-[8px_8px_0_#18181B] dark:hover:shadow-[8px_8px_0_#00E599] transition-all cursor-pointer">
                  <div className={`w-20 h-20 rounded-2xl border-[3px] border-[#18181B] flex items-center justify-center text-4xl shadow-[4px_4px_0_#18181B] ${game.color}`}>
                    {game.icon}
                  </div>
                  <h4 className="font-black text-center text-lg leading-tight uppercase text-[#18181B] dark:text-white">
                    {game.title}
                  </h4>
                  <div className="mt-auto bg-[#C1FF00] text-[#18181B] px-4 py-1 rounded-lg font-black border-[2px] border-[#18181B]">
                    {game.xp}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>

        {/* Sidebar (Right) */}
        <div className="space-y-6">
          
          {/* Progress Widget */}
          <div className="border-[4px] border-[#18181B] dark:border-white rounded-3xl bg-white dark:bg-[#27272A] p-6 shadow-[4px_4px_0_#18181B] dark:shadow-[#FFFFFF]">
            <h3 className="text-xl font-black mb-6 uppercase tracking-wider text-[#18181B] dark:text-white border-b-[3px] border-[#18181B] dark:border-white pb-4">
              Your Progress
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b-[2px] border-dashed border-[#A1A1AA] pb-2">
                <span className="font-bold text-[#71717A] dark:text-[#A1A1AA]">Games Played</span>
                <span className="font-black text-xl text-[#00E599]">20 <span className="text-[#FF9500] text-lg ml-2">15</span></span>
              </div>
              <div className="flex justify-between items-center border-b-[2px] border-dashed border-[#A1A1AA] pb-2">
                <span className="font-bold text-[#71717A] dark:text-[#A1A1AA]">Total XP</span>
                <span className="font-black text-xl text-[#C1FF00]">1270</span>
              </div>
              <div className="flex justify-between items-center border-b-[2px] border-dashed border-[#A1A1AA] pb-2">
                <span className="font-bold text-[#71717A] dark:text-[#A1A1AA]">Coins</span>
                <span className="font-black text-xl text-[#FCD34D]">+500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#71717A] dark:text-[#A1A1AA]">Win Rate</span>
                <span className="font-black text-xl text-[#00E599]">88.7%</span>
              </div>
            </div>
          </div>

          {/* Daily Challenge Widget */}
          <div className="border-[4px] border-[#18181B] dark:border-white rounded-3xl bg-[#00E599] p-6 shadow-[4px_4px_0_#18181B] dark:shadow-[#FFFFFF]">
            <div className="flex items-center gap-2 mb-4">
              <Target size={24} className="text-[#18181B]" strokeWidth={3} />
              <h3 className="text-xl font-black uppercase tracking-wider text-[#18181B]">
                Daily Challenge
              </h3>
            </div>
            <div className="w-full bg-[#18181B] rounded-full h-4 mb-6 border-[2px] border-[#18181B] overflow-hidden">
              <div className="bg-[#C1FF00] h-full" style={{ width: '60%' }}></div>
            </div>
            <button className="w-full bg-[#18181B] text-white py-3 rounded-xl font-black hover:-translate-y-1 transition-transform border-[2px] border-[#18181B]">
              START NOW →
            </button>
          </div>

          {/* Total Coins Widget */}
          <div className="border-[4px] border-[#18181B] dark:border-white rounded-3xl bg-[#00E599] p-6 shadow-[4px_4px_0_#18181B] dark:shadow-[#FFFFFF]">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-black uppercase tracking-wider text-[#18181B]">
                Total Coins
              </h3>
            </div>
            <div className="w-full bg-[#18181B] rounded-full h-4 mb-6 border-[2px] border-[#18181B] overflow-hidden">
              <div className="bg-[#C1FF00] h-full" style={{ width: '30%' }}></div>
            </div>
            <button className="w-full bg-[#18181B] text-white py-3 rounded-xl font-black hover:-translate-y-1 transition-transform border-[2px] border-[#18181B]">
              START NOW →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GameLibraryPage;
