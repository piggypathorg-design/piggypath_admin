import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Map, Trophy, TrendingUp, Brain, Flame } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section id="features" className="w-full relative overflow-hidden bg-white dark:bg-[#27272A] border-t-[3px] border-[#18181B] py-24">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E599] rounded-full filter blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8B5CF6] rounded-full filter blur-[100px] opacity-20 translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HOW IT WORKS */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">Learn → Play → Apply</h2>
            <p className="text-xl font-medium text-[#3F3F46] dark:text-[#A1A1AA] max-w-2xl mx-auto">
              A proven loop to build real financial confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-[#18181B] text-white border-[3px] border-[#18181B] dark:border-white rounded-3xl p-8 shadow-[8px_8px_0_#00E599] relative hover:-translate-y-2 transition-transform"
            >
              <div className="absolute -top-6 -left-6 w-14 h-14 bg-white dark:bg-[#27272A] text-[#18181B] dark:text-[#F4F4F5] border-[3px] border-[#18181B] dark:border-white rounded-full flex items-center justify-center font-black text-2xl shadow-[4px_4px_0_#18181B] dark:shadow-[#FFFFFF]">1</div>
              <h3 className="text-3xl font-black mb-4 mt-2 text-[#00E599]">Learn</h3>
              <ul className="space-y-3 font-bold text-[#A1A1AA]">
                <li className="flex items-start gap-2"><span className="text-[#00E599]">✦</span> Follow guided financial journeys.</li>
                <li className="flex items-start gap-2"><span className="text-[#00E599]">✦</span> Interactive stories.</li>
                <li className="flex items-start gap-2"><span className="text-[#00E599]">✦</span> Short lessons.</li>
                <li className="flex items-start gap-2"><span className="text-[#00E599]">✦</span> Real-life situations.</li>
              </ul>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 }}
              className="bg-[#18181B] text-white border-[3px] border-[#18181B] dark:border-white rounded-3xl p-8 shadow-[8px_8px_0_#00E599] relative hover:-translate-y-2 transition-transform"
            >
              <div className="absolute -top-6 -left-6 w-14 h-14 bg-white dark:bg-[#27272A] text-[#18181B] dark:text-[#F4F4F5] border-[3px] border-[#18181B] dark:border-white rounded-full flex items-center justify-center font-black text-2xl shadow-[4px_4px_0_#18181B] dark:shadow-[#FFFFFF]">2</div>
              <h3 className="text-3xl font-black mb-4 mt-2 text-[#00E599]">Play</h3>
              <ul className="space-y-3 font-bold text-[#A1A1AA]">
                <li className="flex items-start gap-2"><span className="text-[#00E599]">✦</span> Practice through games.</li>
                <li className="flex items-start gap-2"><span className="text-[#00E599]">✦</span> Solve challenges.</li>
                <li className="flex items-start gap-2"><span className="text-[#00E599]">✦</span> Make financial decisions.</li>
                <li className="flex items-start gap-2"><span className="text-[#00E599]">✦</span> Earn rewards.</li>
              </ul>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.2 }}
              className="bg-[#18181B] text-white border-[3px] border-[#18181B] dark:border-white rounded-3xl p-8 shadow-[8px_8px_0_#00E599] relative hover:-translate-y-2 transition-transform"
            >
              <div className="absolute -top-6 -left-6 w-14 h-14 bg-white dark:bg-[#27272A] text-[#18181B] dark:text-[#F4F4F5] border-[3px] border-[#18181B] dark:border-white rounded-full flex items-center justify-center font-black text-2xl shadow-[4px_4px_0_#18181B] dark:shadow-[#FFFFFF]">3</div>
              <h3 className="text-3xl font-black mb-4 mt-2 text-[#00E599]">Apply</h3>
              <ul className="space-y-3 font-bold text-[#A1A1AA]">
                <li className="flex items-start gap-2"><span className="text-[#00E599]">✦</span> Use your knowledge inside a realistic virtual market simulator.</li>
                <li className="flex items-start gap-2"><span className="text-[#00E599]">✦</span> Build a portfolio.</li>
                <li className="flex items-start gap-2"><span className="text-[#00E599]">✦</span> Test strategies.</li>
                <li className="flex items-start gap-2"><span className="text-[#00E599]">✦</span> Learn by doing.</li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* CORE FEATURES */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Everything You Need To Build<br/> Financial Confidence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: <Gamepad2 size={36} />, title: 'Gamified Learning', desc: 'Short interactive lessons designed to keep you hooked.', 
                bgHover: 'hover:bg-[#8B5CF6] dark:hover:bg-[#8B5CF6]', textHover: 'group-hover:text-white', descHover: 'group-hover:text-white/90' 
              },
              { 
                icon: <Map size={36} />, title: 'Financial Journeys', desc: 'Progress through milestones tailored to your goals.', 
                bgHover: 'hover:bg-[#00E599] dark:hover:bg-[#00E599]', textHover: 'group-hover:text-[#18181B]', descHover: 'group-hover:text-[#18181B]/80' 
              },
              { 
                icon: <Trophy size={36} />, title: 'Rewards & Achievements', desc: 'Earn coins, badges, and real bragging rights.', 
                bgHover: 'hover:bg-[#8B5CF6] dark:hover:bg-[#8B5CF6]', textHover: 'group-hover:text-white', descHover: 'group-hover:text-white/90' 
              },
              { 
                icon: <TrendingUp size={36} />, title: 'Virtual Investing', desc: 'Practice trading and building wealth without risking real money.', 
                bgHover: 'hover:bg-[#00E599] dark:hover:bg-[#00E599]', textHover: 'group-hover:text-[#18181B]', descHover: 'group-hover:text-[#18181B]/80' 
              },
              { 
                icon: <Brain size={36} />, title: 'Real-World Simulations', desc: 'Learn through tough decision-making scenarios.', 
                bgHover: 'hover:bg-[#8B5CF6] dark:hover:bg-[#8B5CF6]', textHover: 'group-hover:text-white', descHover: 'group-hover:text-white/90' 
              },
              { 
                icon: <Flame size={36} />, title: 'Daily Challenges', desc: 'Build consistent learning habits that stick.', 
                bgHover: 'hover:bg-[#00E599] dark:hover:bg-[#00E599]', textHover: 'group-hover:text-[#18181B]', descHover: 'group-hover:text-[#18181B]/80' 
              },
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-[#F4F4F5] dark:bg-[#18181B] border-[3px] border-[#18181B] dark:border-white rounded-2xl p-6 shadow-[6px_6px_0_#18181B] dark:shadow-[#FFFFFF] hover:shadow-[2px_2px_0_#18181B] dark:hover:shadow-[2px_2px_0_#000000] hover:-translate-y-1 transition-colors duration-300 group ${f.bgHover}`}
              >
                <div className={`text-4xl mb-4 text-[#18181B] dark:text-[#F4F4F5] transition-colors duration-300 ${f.textHover}`}>{f.icon}</div>
                <h4 className={`text-xl font-black mb-2 text-[#18181B] dark:text-[#F4F4F5] transition-colors duration-300 ${f.textHover}`}>{f.title}</h4>
                <p className={`font-medium text-[#3F3F46] dark:text-[#A1A1AA] transition-colors duration-300 ${f.descHover}`}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
