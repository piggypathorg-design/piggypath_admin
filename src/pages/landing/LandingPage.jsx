import React from 'react';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import JourneyPreviewSection from './JourneyPreviewSection';
import ConversionSection from './ConversionSection';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import Logo from '../../components/common/Logo';

const NavBar = () => {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#F4F4F5] dark:bg-[#18181B] border-b-[3px] border-[#18181B] dark:border-white transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo className="text-[28px]" />
        </div>

        <div className="hidden md:flex items-center gap-8 font-bold text-[#18181B] dark:text-gray-300">
          <button onClick={() => scrollTo('home')} className="hover:underline">Home</button>
          <button onClick={() => scrollTo('features')} className="hover:underline">Features</button>
          <button onClick={() => scrollTo('journey')} className="hover:underline">Journey</button>
          <button onClick={() => scrollTo('faq')} className="hover:underline">FAQ</button>
        </div>

        <div className="flex items-center gap-4">

          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => scrollTo('waitlist')} className="flex items-center justify-center font-black px-6 py-2.5 rounded-xl transition-transform hover:-translate-y-1 bg-[#00E599] text-[#18181B] border-[3px] border-[#18181B] shadow-[4px_4px_0_#18181B] dark:shadow-[#FFFFFF]">
              Join Waitlist
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const LandingPage = () => {
  return (
    <div className="relative z-10 min-h-screen font-sans selection:bg-[#00E599] selection:text-[#18181B] bg-[#F4F4F5] dark:bg-[#18181B] text-[#18181B] dark:text-[#F4F4F5] transition-colors">
      <NavBar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <JourneyPreviewSection />
        <ConversionSection />
      </main>
    </div>
  );
};

export default LandingPage;
