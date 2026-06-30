
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, X, Check, Coins, Award } from 'lucide-react';
import { TrophyIcon } from '../../components/profile/ProfileHeader';

const FallingText = ({ text, className }) => {
  const words = text.split(" ");
  return (
    <div className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <div className="flex">
            {word.split("").map((letter, j) => (
              <motion.span
                key={j}
                initial={{ y: -50, opacity: 0, rotate: -20 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: (i * 0.1) + (j * 0.03), type: "spring", bounce: 0.6 }}
                style={{ display: "inline-block" }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          <span className="w-3 md:w-6" />{/* space */}
        </React.Fragment>
      ))}
    </div>
  );
};

const HeroSection = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="w-full relative overflow-hidden" style={{ minHeight: '90vh' }}>
      {/* Background dot pattern */}
      <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#18181B 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
      
      <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-12 md:pb-20 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 lg:items-center items-center">
        
        {/* Decorative Abstract Star Illustration */}
        <motion.svg 
           initial={{ rotate: -45, scale: 0 }}
           animate={{ rotate: 15, scale: 1 }}
           transition={{ duration: 0.8, type: 'spring' }}
           className="absolute top-10 left-10 md:top-20 md:-left-10 w-24 h-24 -z-10 drop-shadow-[4px_4px_0_#18181B] dark:drop-shadow-[4px_4px_0_#00E599] fill-[#8B5CF6] stroke-[#18181B] dark:stroke-white stroke-[4px]" 
           viewBox="0 0 100 100"
        >
           <path d="M50 0L61 39L100 50L61 61L50 100L39 61L0 50L39 39Z" />
        </motion.svg>



        {/* Left Content */}
        <div className="flex flex-col gap-8 lg:col-span-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-[3px] border-[#18181B] dark:border-white bg-white dark:bg-[#27272A] w-max font-bold text-sm tracking-wide shadow-[#18181B] dark:shadow-[#FFFFFF]">
            <span className="text-[#8B5CF6]">✦</span> PRE-LAUNCH <span className="mx-1">•</span> NOW BOARDING
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-[60px] xl:text-[64px] font-black leading-[1.1] tracking-tight">
            Gamify <span className="text-[#00E599]">your way to </span> <br className="hidden md:block" /> financial freedom.
          </h1>

          <p className="text-lg md:text-2xl font-medium text-[#3F3F46] dark:text-[#A1A1AA] leading-relaxed max-w-xl">
            PiggyPath turns financial education into an interactive journey where you learn budgeting, investing, wealth building and personal finance through gamified experiences, not boring videos or textbooks.
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 pt-4 w-full">
            <button onClick={() => scrollTo('waitlist')} className="bg-[#00E599] text-[#18181B] border-[3px] border-[#18181B] dark:border-white shadow-[4px_4px_0_#18181B] dark:shadow-[#FFFFFF] text-lg lg:text-xl font-black px-6 md:px-8 py-4 rounded-xl transition-transform hover:-translate-y-1 w-full sm:w-auto flex justify-center items-center whitespace-nowrap">
              Join Waitlist →
            </button>
            <button onClick={() => scrollTo('features')} className="bg-white dark:bg-[#27272A] text-[#18181B] dark:text-[#F4F4F5] border-[3px] border-[#18181B] dark:border-white shadow-[4px_4px_0_#18181B] dark:shadow-[#FFFFFF] flex items-center justify-center gap-2 text-lg lg:text-xl font-black px-6 md:px-8 py-4 rounded-xl transition-transform hover:-translate-y-1 w-full sm:w-auto whitespace-nowrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} width={24} height={24} className="shrink-0">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10 8 16 12 10 16 10 8" fill="#18181B"/>
              </svg>
              See How It Works
            </button>
          </div>


        </div>

        {/* Right Visual: Dashboard Mockup */}
        <div className="w-full lg:col-span-7 z-10">
          <motion.div 
            initial={{ opacity: 0, x: 100, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="relative w-full h-auto md:aspect-[4/3] rounded-3xl bg-white dark:bg-[#27272A] border-[4px] border-[#18181B] dark:border-white shadow-[12px_12px_0_#18181B] dark:shadow-[#FFFFFF] p-6 md:p-8 lg:p-10"
          >
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-stretch gap-4">
              <div className="w-[72px] shrink-0 rounded-2xl bg-[#8B5CF6] border-[3px] border-[#18181B] dark:border-white flex items-center justify-center font-black text-3xl text-white shadow-[#18181B] dark:shadow-[#FFFFFF]">
                PP
              </div>
              <div>
                <div className="text-xs font-bold text-[#71717A] tracking-wider uppercase">Today's Quest</div>
                <div className="text-xl font-black text-[#18181B] dark:text-[#F4F4F5] leading-tight">Master<br/>Accounting</div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-3">
               <div className="w-12 h-12 rounded-full bg-[#00E599] border-[3px] border-[#18181B] dark:border-white flex items-center justify-center shadow-[#18181B] dark:shadow-[#FFFFFF] relative top-2 right-2 font-black text-xl hover:scale-110 transition-transform cursor-pointer mb-4">
                 $
               </div>
               <div className="px-4 py-2 rounded-xl bg-white dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-white shadow-[#18181B] dark:shadow-[#FFFFFF] font-bold text-xs flex items-center gap-2">
                 <Flame size={14} className="text-orange-500" /> 12 DAY STREAK
               </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between font-bold text-sm mb-2">
               <span>XP • 1,240 / 1,600</span>
               <span className="text-[#8B5CF6]">77%</span>
            </div>
            <div className="h-6 w-full bg-white dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-white rounded-full overflow-hidden p-1">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: '77%' }}
                 transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                 className="h-full bg-[#00E599] rounded-full"
               />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8">
            <div className="bg-[#00E599] border-[3px] border-[#18181B] dark:border-white rounded-2xl p-2 md:p-4 shadow-[#18181B] dark:shadow-[#FFFFFF] hover:-translate-y-1 transition-transform">
               <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                 <Coins size={16} className="md:w-5 md:h-5" strokeWidth={2.5} color="#18181B" />
                 <span className="text-[8px] md:text-[10px] font-black tracking-widest text-[#18181B] dark:text-[#F4F4F5]/70 mt-1 sm:mt-0">COINS</span>
               </div>
               <div className="text-lg md:text-2xl font-black">2,480</div>
            </div>
            <div className="bg-[#8B5CF6] text-white border-[3px] border-[#18181B] dark:border-white rounded-2xl p-2 md:p-4 shadow-[#18181B] dark:shadow-[#FFFFFF] hover:-translate-y-1 transition-transform">
               <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                 <Award size={16} className="md:w-5 md:h-5" strokeWidth={2.5} color="#FFF" />
                 <span className="text-[8px] md:text-[10px] font-black tracking-widest text-white/70 mt-1 sm:mt-0">BADGES</span>
               </div>
               <div className="text-lg md:text-2xl font-black">14</div>
            </div>
            <div className="bg-white dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-white rounded-2xl p-2 md:p-4 shadow-[#18181B] dark:shadow-[#FFFFFF] hover:-translate-y-1 transition-transform">
               <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                 <svg viewBox="0 0 24 24" fill="#EF4444" stroke="#18181B" strokeWidth={2.5} className="w-4 h-4 md:w-5 md:h-5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                 </svg>
                 <span className="text-[8px] md:text-[10px] font-black tracking-widest text-[#18181B] dark:text-[#F4F4F5]/50 mt-1 sm:mt-0">HEARTS</span>
               </div>
               <div className="text-lg md:text-2xl font-black">5</div>
            </div>
          </div>

          {/* Journey Path */}
          <div>
            <div className="text-[10px] font-black tracking-widest text-[#71717A] mb-4 uppercase">Your Learning Path</div>
            <div className="flex items-center justify-between relative">
               <div className="absolute top-1/2 left-0 w-full h-[3px] bg-[#E4E4E7] -z-10 -translate-y-1/2"></div>
               <div className="absolute top-1/2 left-0 w-2/3 h-[3px] bg-[#00E599] -z-10 -translate-y-1/2"></div>
               {[1,2,3,4,5].map(step => (
                 <div key={step} className={`shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full border-[3px] border-[#18181B] dark:border-white flex items-center justify-center font-black text-xs md:text-sm shadow-[#18181B] dark:shadow-[#FFFFFF] ${step <= 3 ? 'bg-[#00E599]' : step === 4 ? 'bg-[#8B5CF6] text-white scale-110 md:scale-125' : 'bg-white dark:bg-[#27272A] text-[#A1A1AA] border-[#A1A1AA] shadow-none'}`}>
                   {step <= 3 ? <svg viewBox="0 0 24 24" fill="none" stroke="#18181B" strokeWidth={3} className="w-3 h-3 md:w-4 md:h-4"><polyline points="20 6 9 17 4 12"/></svg> : step}
                 </div>
               ))}
            </div>
          </div>

          {/* Floating 'Continue' button */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute -bottom-6 md:-bottom-10 left-4 right-4 md:left-8 md:right-8 bg-[#F4F4F5] dark:bg-[#18181B] border-[3px] border-[#18181B] dark:border-white p-3 md:p-4 rounded-xl shadow-[#18181B] dark:shadow-[#FFFFFF] flex items-center justify-between z-10"
          >
            <div>
              <div className="font-black text-xs md:text-sm">Continue Lesson</div>
              <div className="font-bold text-[10px] md:text-xs text-[#71717A]">Accounting • 3 min left</div>
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#00E599] border-2 border-[#18181B] dark:border-white rounded-lg shadow-[#18181B] dark:shadow-[#FFFFFF] flex items-center justify-center cursor-pointer hover:bg-white dark:bg-[#27272A] transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="#18181B" strokeWidth={3} className="w-4 h-4 md:w-5 md:h-5">
                 <line x1="5" y1="12" x2="19" y2="12" />
                 <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </motion.div>

          {/* Achievement popup */}
          <motion.div 
             initial={{ y: 50, opacity: 0, rotate: 10 }}
             animate={{ y: 0, opacity: 1, rotate: -5 }}
             transition={{ delay: 2, type: 'spring', bounce: 0.5 }}
             className="absolute -bottom-20 right-0 md:-right-8 bg-white dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-white px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-[#18181B] dark:shadow-[#FFFFFF] flex items-center gap-2 md:gap-3 z-20 scale-90 md:scale-100 origin-bottom-right"
          >
             <TrophyIcon className="w-5 h-5 md:w-6 md:h-6" color="#8B5CF6" />
             <span className="font-black text-xs md:text-sm whitespace-nowrap">Achievement Unlocked</span>
          </motion.div>
        </motion.div>
        </div>
      </div>

      {/* ────────────────────── PROBLEM & SOLUTION SECTION ────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 border-t-[3px] border-[#18181B] mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          
          {/* PROBLEM */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-6 h-full"
          >
            <div className="inline-block px-4 py-1 border-[3px] border-[#18181B] dark:border-white rounded-lg bg-[#FF4444] text-white font-black uppercase text-sm w-max shadow-[#18181B] dark:shadow-[#FFFFFF]">The Problem</div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight lg:min-h-[110px]">
              Why Financial Education Is <span className="underline decoration-[#FF4444] decoration-4 underline-offset-4">Broken</span>
            </h2>
            <p className="text-lg font-medium text-[#3F3F46] dark:text-[#A1A1AA] leading-relaxed">
              Most people learn finance too late. Schools rarely teach practical money skills and most financial content is delivered through long videos, complicated jargon or overwhelming textbooks.
            </p>
            <div className="bg-white dark:bg-[#27272A] border-[3px] border-[#18181B] dark:border-white rounded-2xl p-6 shadow-[8px_8px_0_#18181B] dark:shadow-[#FFFFFF] flex flex-col gap-4 mt-auto">
               <div className="flex items-center gap-4 font-bold text-[#18181B] dark:text-[#F4F4F5]">
                 <div className="bg-[#FF4444] p-1.5 border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B] rounded-md"><X size={16} color="#FFF" strokeWidth={3.5} /></div>
                 Boring PDF Guides
               </div>
               <div className="flex items-center gap-4 font-bold text-[#18181B] dark:text-[#F4F4F5]">
                 <div className="bg-[#FF4444] p-1.5 border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B] rounded-md"><X size={16} color="#FFF" strokeWidth={3.5} /></div>
                 2-Hour Video Lectures
               </div>
               <div className="flex items-center gap-4 font-bold text-[#18181B] dark:text-[#F4F4F5]">
                 <div className="bg-[#FF4444] p-1.5 border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B] rounded-md"><X size={16} color="#FFF" strokeWidth={3.5} /></div>
                 Overwhelming Jargon
               </div>
            </div>
          </motion.div>

          {/* SOLUTION */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6 h-full"
          >
            <div className="inline-block px-4 py-1 border-[3px] border-[#18181B] dark:border-white rounded-lg bg-[#00E599] text-[#18181B] dark:text-[#F4F4F5] font-black uppercase text-sm w-max shadow-[#18181B] dark:shadow-[#FFFFFF]">The Solution</div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight lg:min-h-[110px]">
              Meet <span className="bg-[#00E599] px-2 py-1 rounded-lg">PiggyPath</span>
            </h2>
            <p className="text-lg font-medium text-[#3F3F46] dark:text-[#A1A1AA] leading-relaxed">
              PiggyPath transforms financial education into an engaging experience where users learn through action. Instead of watching hours of content, learners:
            </p>
            <div className="bg-[#8B5CF6] text-white border-[3px] border-[#18181B] dark:border-white rounded-2xl p-6 shadow-[8px_8px_0_#18181B] dark:shadow-[#FFFFFF] flex flex-col gap-4 mt-auto">
               <div className="flex items-center gap-4 font-bold">
                 <div className="bg-[#00E599] p-1.5 border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B] rounded-md"><Check size={16} color="#18181B" strokeWidth={3.5} /></div>
                 Interactive levels
               </div>
               <div className="flex items-center gap-4 font-bold">
                 <div className="bg-[#00E599] p-1.5 border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B] rounded-md"><Check size={16} color="#18181B" strokeWidth={3.5} /></div>
                 Financial games
               </div>
               <div className="flex items-center gap-4 font-bold">
                 <div className="bg-[#00E599] p-1.5 border-[2px] border-[#18181B] shadow-[2px_2px_0_#18181B] rounded-md"><Check size={16} color="#18181B" strokeWidth={3.5} /></div>
                 Earn rewards & build wealth
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
