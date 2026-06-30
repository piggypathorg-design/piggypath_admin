import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Rocket, TrendingUp, CreditCard, Coins, Trophy, Flame, Gift, Wallet, PiggyBank, Diamond } from 'lucide-react';

const JourneyPreviewSection = () => {
  return (
    <section id="journey" className="w-full bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#F4F4F5] py-24 relative overflow-hidden border-t-[3px] border-[#18181B] dark:border-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col gap-32">
        
        {/* 7. LEARNING JOURNEY PREVIEW */}
        <div>
          <div className="mb-16">
            <div className="inline-block px-4 py-1.5 border-[3px] border-[#18181B] dark:border-white rounded-full bg-white dark:bg-[#27272A] text-[#18181B] dark:text-[#F4F4F5] font-black uppercase text-xs mb-6 shadow-[#18181B] dark:shadow-[#FFFFFF]">
              Your Roadmap
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight uppercase">
              Your Journey To <br className="hidden md:block" /> <span className="text-[#8B5CF6]">Financial Freedom</span>
            </h2>
            <p className="text-xl font-medium text-[#3F3F46] dark:text-[#A1A1AA] max-w-2xl">
              Every journey is broken into milestones and levels,
               designed to be completed in just a few minutes.
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative w-full overflow-x-auto pb-10 pt-4 hidden-scrollbar">
            <div className="min-w-[900px] flex justify-between items-start relative px-4">
               {/* Background Lines */}
               <div className="absolute top-10 left-16 right-16 h-1 flex items-center -z-10">
                 <div className="w-1/5 bg-[#00E599] h-1 border-y border-[#00E599]"></div>
                 <div className="w-1/5 bg-[#00E599] h-1 border-y border-[#00E599]"></div>
                 <div className="w-1/5 bg-[#00E599] h-1 border-y border-[#00E599]"></div>
                 <div className="w-1/5 border-t-[3px] border-dashed border-[#D4D4D8] dark:border-white h-1"></div>
                 <div className="w-1/5 border-t-[3px] border-dashed border-[#D4D4D8] dark:border-white h-1"></div>
               </div>

               {[
                 { id: 1, title: 'MONEY BASICS', status: 'completed', icon: <Coins size={32} strokeWidth={2.5} /> },
                 { id: 2, title: 'BUDGETING', status: 'completed', icon: <Wallet size={32} strokeWidth={2.5} /> },
                 { id: 3, title: 'SAVING', status: 'completed', icon: <PiggyBank size={32} strokeWidth={2.5} /> },
                 { id: 4, title: 'CREDIT', status: 'in-progress', icon: <CreditCard size={32} strokeWidth={2.5} /> },
                 { id: 5, title: 'INVESTING', status: 'locked', icon: <TrendingUp size={32} strokeWidth={2.5} /> },
                 { id: 6, title: 'WEALTH BUILDING', status: 'locked', icon: <Diamond size={32} strokeWidth={2.5} /> },
               ].map((node, i) => (
                 <div key={node.id} className="flex flex-col items-center w-32 relative group cursor-pointer hover:-translate-y-2 transition-transform">
                   {/* Node Box */}
                   <div className={`relative w-20 h-20 rounded-2xl border-[4px] border-[#18181B] dark:border-white flex items-center justify-center shadow-[#18181B] dark:shadow-[#FFFFFF] mb-4 z-10 transition-colors
                     ${node.status === 'completed' ? 'bg-[#00E599] text-[#18181B]' : 
                       node.status === 'in-progress' ? 'bg-[#8B5CF6] text-white' : 
                       'bg-white dark:bg-[#27272A] text-[#18181B] dark:text-[#F4F4F5]'}`}
                   >
                     {node.icon}
                     
                     {/* Number Badge */}
                     <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#18181B] dark:bg-white text-white dark:text-[#18181B] rounded-full flex items-center justify-center font-black text-[10px] border-2 border-transparent dark:border-white">
                       {node.id}
                     </div>
                   </div>

                   {/* Title */}
                   <div className="font-black text-sm text-center mb-2 leading-tight text-[#18181B] dark:text-[#F4F4F5]">
                     {node.title}
                   </div>

                   {/* Pill */}
                   <div className={`px-3 py-1 rounded-full border-2 border-[#18181B] dark:border-white font-black text-[10px] uppercase shadow-[2px_2px_0_#18181B] dark:shadow-[#FFFFFF]
                     ${node.status === 'completed' ? 'bg-[#00E599] text-[#18181B]' : 
                       node.status === 'in-progress' ? 'bg-[#8B5CF6] text-white' : 
                       'bg-white dark:bg-[#27272A] text-[#18181B] dark:text-[#F4F4F5]'}`}
                   >
                     {node.status.replace('-', ' ')}
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* 8. GAMES & SIMULATIONS */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Learn Through Play</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Budget Survivor', desc: 'Can you survive a month on your first salary without going broke?', color: '#FF4444', icon: <ShoppingCart size={40} className="text-[#18181B] dark:text-[#F4F4F5] dark:text-white" /> },
              { title: 'Startup Challenge', desc: 'Manage a growing business, handle cash flow, and expand.', color: '#FBBF24', icon: <Rocket size={40} className="text-[#18181B] dark:text-[#F4F4F5] dark:text-white" /> },
              { title: 'Investment Quest', desc: 'Build your first portfolio and watch the compound interest magic.', color: '#00E599', icon: <TrendingUp size={40} className="text-[#18181B] dark:text-[#F4F4F5] dark:text-white" /> },
              { title: 'Credit Score Rescue', desc: 'Recover from financial mistakes and build an 800+ credit score.', color: '#8B5CF6', icon: <CreditCard size={40} className="text-[#18181B] dark:text-[#F4F4F5] dark:text-white" /> },
            ].map((game, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-gray-100 dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-white rounded-3xl p-6 shadow-[#000] dark:shadow-[#FFFFFF] flex gap-6 items-center hover:bg-gray-200 dark:hover:bg-[#3F3F46] transition-colors"
              >
                 <div className="w-20 h-20 shrink-0 rounded-2xl border-[3px] border-[#18181B] dark:border-white shadow-[#000] dark:shadow-[#FFFFFF] flex items-center justify-center text-4xl" style={{ background: game.color }}>
                   {game.icon}
                 </div>
                 <div>
                   <h3 className="text-2xl font-black mb-2 transition-colors">{game.title}</h3>
                   <p className="font-medium text-[#3F3F46] dark:text-[#A1A1AA] transition-colors">{game.desc}</p>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 9. VIRTUAL INVESTING PREVIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
             <motion.div 
                initial={{ opacity: 0, rotate: -2, x: -50 }}
                whileInView={{ opacity: 1, rotate: 0, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#F4F4F5] dark:bg-[#18181B] dark:bg-zinc-900 rounded-3xl p-6 border-[4px] border-[#18181B] dark:border-white shadow-[12px_12px_0_#8B5CF6] relative"
             >
                <div className="flex justify-between items-center mb-6 border-b-2 border-[#D4D4D8] dark:border-zinc-700 pb-4">
                   <div>
                     <div className="text-xs font-bold text-[#71717A] dark:text-zinc-400 uppercase tracking-wider">Portfolio Value</div>
                     <div className="text-4xl font-black text-[#18181B] dark:text-[#F4F4F5] dark:text-white">$12,450.00</div>
                     <div className="text-[#00E599] font-bold text-sm mt-1">↑ $1,200 (10.4%) All Time</div>
                   </div>
                   <div className="px-4 py-2 bg-[#8B5CF6] text-white font-bold rounded-xl border-2 border-[#18181B] dark:border-white shadow-[#18181B] dark:shadow-[#FFFFFF]">
                     Buy / Sell
                   </div>
                </div>
                {/* Mock Chart */}
                <div className="h-40 w-full flex items-end gap-2 mb-6">
                   {[40, 50, 45, 60, 55, 70, 85, 80, 95, 100].map((h, i) => (
                     <motion.div 
                       key={i} 
                       initial={{ height: 0 }}
                       whileInView={{ height: `${h}%` }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.1, duration: 0.5 }}
                       className="flex-1 bg-[#00E599] border-2 border-[#18181B] dark:border-white rounded-t-sm"
                     />
                   ))}
                </div>
                <div className="space-y-3">
                   <div className="flex justify-between items-center p-3 border-2 border-[#18181B] dark:border-white rounded-xl bg-white dark:bg-[#27272A] dark:bg-zinc-800 text-[#18181B] dark:text-[#F4F4F5] dark:text-white">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold">APPL</div>
                        <div className="font-bold">Apple Inc.</div>
                     </div>
                     <div className="text-right">
                        <div className="font-black">$150.25</div>
                        <div className="text-[#00E599] text-xs font-bold">↑ 1.2%</div>
                     </div>
                   </div>
                </div>
             </motion.div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Practice Before You Invest</h2>
            <p className="text-xl font-medium text-[#3F3F46] dark:text-[#A1A1AA] mb-8">
              Apply everything you have learned in a risk-free virtual market. Trade stocks, build portfolios, and test strategies.
            </p>
            <ul className="space-y-4 text-lg font-bold">
               <li className="flex items-center gap-3"><span className="text-[#00E599] text-2xl">✓</span> Real-time market data.</li>
               <li className="flex items-center gap-3"><span className="text-[#00E599] text-2xl">✓</span> Track performance over time.</li>
               <li className="flex items-center gap-3"><span className="text-[#00E599] text-2xl">✓</span> Learn from outcomes with no risk.</li>
            </ul>
          </div>
        </div>

        {/* 10. REWARDS & PROGRESSION */}
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6"><span className="bg-[#00E599] text-[#18181B] px-3 py-1 inline-block">Progress That Feels Rewarding</span></h2>
          <p className="text-xl font-medium text-[#3F3F46] dark:text-[#A1A1AA] max-w-2xl mx-auto mb-16">
            Every lesson, challenge and game moves you closer to new rewards and milestones.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8">
             {[
               { label: 'Coins', icon: <Coins size={48} className="text-[#18181B] dark:text-[#F4F4F5] dark:text-white" />, color: '#FFCD75' },
               { label: 'Badges', icon: <Trophy size={48} className="text-[#18181B] dark:text-[#F4F4F5] dark:text-white" />, color: '#8B5CF6' },
               { label: 'Streaks', icon: <Flame size={48} className="text-[#18181B] dark:text-[#F4F4F5] dark:text-white" />, color: '#FF4444' },
               { label: 'Chests', icon: <Gift size={48} className="text-[#18181B] dark:text-[#F4F4F5] dark:text-white" />, color: '#00E599' },
             ].map((r, i) => (
               <motion.div 
                 key={i}
                 whileHover={{ scale: 1.1, rotate: 5 }}
                 className="flex flex-col items-center gap-4"
               >
                 <div className="w-24 h-24 rounded-full border-[4px] border-[#18181B] dark:border-white flex items-center justify-center text-5xl shadow-[4px_4px_0_#18181B] dark:shadow-[#FFFFFF] bg-white dark:bg-[#27272A]">
                   {r.icon}
                 </div>
                 <div className="font-black text-xl px-4 py-1 rounded-lg border-2 border-[#18181B] dark:border-white shadow-[#000] dark:shadow-[#FFFFFF]" style={{ backgroundColor: r.color, color: '#18181B' }}>
                   {r.label}
                 </div>
               </motion.div>
             ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default JourneyPreviewSection;
