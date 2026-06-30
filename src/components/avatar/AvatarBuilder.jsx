import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AvatarDisplay from './AvatarDisplay';
import { Check } from 'lucide-react';

const CATEGORIES = [
  { id: 'top', label: 'Hair Style' },
  { id: 'hairColor', label: 'Hair Color' },
  { id: 'skinColor', label: 'Skin Tone' },
  { id: 'clothing', label: 'Outfit' },
  { id: 'clothingColor', label: 'Outfit Color' },
  { id: 'accessories', label: 'Accessories' },
];

const OPTIONS = {
  skinColor: ['f8d25c', 'fd9841', 'fcea2b', 'ffdbb4', 'edb98a', 'd08b5b', 'ae5d29', '614335'],
  hairColor: ['2c1b18', '4a3123', 'a55728', 'd6b370', 'e8e1e1', 'f59797', '73412f'],
  top: ['shortHairShortFlat', 'longHairStraight', 'shortHairTheCaesar', 'shortHairDreads01', 'hat', 'hijab', 'turban'],
  clothing: ['blazerAndShirt', 'blazerAndSweater', 'hoodie', 'overall', 'shirtCrewNeck', 'shirtVNeck'],
  clothingColor: ['3c4f5c', '65c9ff', '262e33', 'ff5c5c', 'a4ff5c', 'ffff5c', 'e6e6e6'],
  accessories: ['Blank', 'kurt', 'prescription01', 'prescription02', 'round', 'sunglasses', 'wayfarers']
};

const AvatarBuilder = ({ initialConfig, onSave }) => {
  const [config, setConfig] = useState(initialConfig || {
    seed: 'PiggyUser',
    skinColor: 'f8d25c',
    hairColor: '2c1b18',
    top: 'shortHairShortFlat',
    clothing: 'blazerAndShirt',
    clothingColor: '3c4f5c',
    accessories: 'Blank',
    eyes: 'default',
  });
  
  const [activeCategory, setActiveCategory] = useState('top');

  const handleUpdate = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto p-4 md:p-8 bg-piggy-bg text-white rounded-3xl border border-white/10 shadow-2xl glass-panel-elevated">
      {/* Preview Panel */}
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-6 bg-piggy-card rounded-2xl border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-piggy-purple/20 to-piggy-teal/10 pointer-events-none" />
        <h2 className="text-xl font-bold mb-6 text-center z-10 text-white">Your Avatar</h2>
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="w-48 h-48 bg-white/5 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(0,212,170,0.2)] z-10 border-4 border-piggy-teal/30 p-2"
        >
          <AvatarDisplay config={config} className="w-full h-full rounded-full" />
        </motion.div>
        
        <button 
          onClick={() => onSave && onSave(config)}
          className="mt-8 w-full py-3 px-6 bg-gradient-to-r from-piggy-teal to-piggy-blue rounded-xl font-bold text-piggy-bg hover:shadow-[0_0_20px_rgba(0,212,170,0.4)] transition-all z-10"
        >
          Save Avatar
        </button>
      </div>

      {/* Controls Panel */}
      <div className="w-full md:w-2/3 flex flex-col h-[500px]">
        {/* Categories Tab Bar */}
        <div className="flex overflow-x-auto pb-4 mb-4 gap-2" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat.id ? 'bg-piggy-teal text-piggy-bg' : 'bg-piggy-card text-gray-400 hover:bg-white/10 border border-white/5'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Options Grid */}
        <div className="flex-1 bg-piggy-card rounded-2xl border border-white/5 p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4"
            >
              {OPTIONS[activeCategory]?.map(option => (
                <button
                  key={option}
                  onClick={() => handleUpdate(activeCategory, option)}
                  className={`aspect-square rounded-xl flex items-center justify-center overflow-hidden relative border-2 transition-all ${config[activeCategory] === option ? 'border-piggy-teal bg-piggy-teal/10 shadow-[0_0_15px_rgba(0,212,170,0.2)]' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                >
                  {(activeCategory === 'skinColor' || activeCategory === 'hairColor' || activeCategory === 'clothingColor') ? (
                    <div className="w-8 h-8 rounded-full shadow-inner border border-white/20" style={{ backgroundColor: `#${option}` }} />
                  ) : (
                    <div className="text-xs text-center p-1 text-gray-300 break-words w-full">{option.replace(/([A-Z])/g, ' $1').trim()}</div>
                  )}
                  {config[activeCategory] === option && (
                    <div className="absolute top-1 right-1 bg-piggy-teal text-piggy-bg rounded-full p-0.5">
                      <Check size={10} strokeWidth={4} />
                    </div>
                  )}
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AvatarBuilder;
