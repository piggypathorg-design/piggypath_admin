import React, { useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';

const AvatarDisplay = ({ config, className = '' }) => {
  const avatarSvg = useMemo(() => {
    try {
      // Create the avatar using DiceBear Avataaars style
      const avatar = createAvatar(avataaars, {
        seed: config.seed || 'default',
        skinColor: [config.skinColor || 'f8d25c'],
        hairColor: [config.hairColor || '2c1b18'],
        accessories: config.accessories !== 'Blank' ? [config.accessories] : [],
        clothing: [config.clothing || 'blazerAndShirt'],
        clothingColor: [config.clothingColor || '3c4f5c'],
        eyes: [config.eyes || 'default'],
        top: [config.top || 'shortHairShortFlat'],
        backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf'],
        radius: 50,
      });
      return avatar.toDataUriSync();
    } catch (err) {
      console.error('Failed to generate avatar:', err);
      return '';
    }
  }, [config]);

  return (
    <img src={avatarSvg} alt="Avatar" className={`object-contain ${className}`} />
  );
};

export default AvatarDisplay;
