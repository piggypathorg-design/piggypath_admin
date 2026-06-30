import { useState, useEffect } from 'react';

const DEFAULT_AVATAR = {
  skinColor: '#FDDBB4',
  hairColor: '#1A1A1A',
  hairStyle: 'short_straight',
  outfitColor: '#1E3A5F',
  outfit: 'tshirt',
  bgColor: '#1A0D3D',
  eyeColor: '#5C3A1E',
  facialHair: 'none',
  accessory: 'none'
};

export const useAvatar = () => {
  const [config, setConfig] = useState(DEFAULT_AVATAR);

  useEffect(() => {
    const saved = localStorage.getItem('piggypath_avatar_v2');
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch(e) {}
    }
  }, []);

  const saveConfig = (newConfig) => {
    setConfig(newConfig);
    localStorage.setItem('piggypath_avatar_v2', JSON.stringify(newConfig));
    // Dispatch event so other components update instantly
    window.dispatchEvent(new Event('avatarUpdated'));
  };

  useEffect(() => {
    const handleUpdate = () => {
      const saved = localStorage.getItem('piggypath_avatar_v2');
      if (saved) {
        try {
          setConfig(JSON.parse(saved));
        } catch(e) {}
      }
    };
    
    window.addEventListener('avatarUpdated', handleUpdate);
    return () => window.removeEventListener('avatarUpdated', handleUpdate);
  }, []);

  return [config, saveConfig];
};
