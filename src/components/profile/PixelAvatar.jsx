import React, { useMemo } from 'react';

const PIXEL = 4;
const W = 32;
const H = 36;

export const SKIN_TONES = [
  { id: 'light1',   hex: '#FDDBB4', label: 'Porcelain' },
  { id: 'light2',   hex: '#F5C5A3', label: 'Ivory' },
  { id: 'medium1',  hex: '#E8A87C', label: 'Sand' },
  { id: 'medium2',  hex: '#D4875A', label: 'Honey' },
  { id: 'tan',      hex: '#C4733A', label: 'Tan' },
  { id: 'brown1',   hex: '#A0522D', label: 'Caramel' },
  { id: 'brown2',   hex: '#7B3F1E', label: 'Mocha' },
  { id: 'dark',     hex: '#4A2810', label: 'Espresso' },
  { id: 'olive',    hex: '#C8A882', label: 'Olive'    },
  { id: 'golden',   hex: '#B5813F', label: 'Golden'   },
  { id: 'ebony',    hex: '#2C1A0E', label: 'Ebony'    },
  { id: 'caramel2', hex: '#8B5E3C', label: 'Caramel'  },
];

export const HAIR_COLORS = [
  { id: 'black',    hex: '#1A1A1A', label: 'Black' },
  { id: 'darkbrown',hex: '#3B2314', label: 'Dark Brown' },
  { id: 'brown',    hex: '#6B3A2A', label: 'Brown' },
  { id: 'auburn',   hex: '#8B3A0F', label: 'Auburn' },
  { id: 'blonde',   hex: '#C8A415', label: 'Blonde' },
  { id: 'platinum', hex: '#E8DFC8', label: 'Platinum' },
  { id: 'red',      hex: '#B22222', label: 'Red' },
  { id: 'pink',     hex: '#E75480', label: 'Pink' },
  { id: 'blue',     hex: '#1E4D8C', label: 'Blue' },
  { id: 'purple',   hex: '#6B3FA0', label: 'Purple' },
  { id: 'green',    hex: '#2D6A2D', label: 'Green' },
  { id: 'gray',     hex: '#9B9B9B', label: 'Gray' },
  { id: 'white',    hex: '#F0EDE8', label: 'White' },
];

export const EYE_COLORS = [
  { id: 'brown',    hex: '#5C3A1E', label: 'Brown' },
  { id: 'hazel',    hex: '#7B5C2A', label: 'Hazel' },
  { id: 'green',    hex: '#2D6B4F', label: 'Green' },
  { id: 'blue',     hex: '#2B5EA7', label: 'Blue' },
  { id: 'gray',     hex: '#5B6B7A', label: 'Gray' },
  { id: 'amber',    hex: '#B8860B', label: 'Amber' },
  { id: 'violet',   hex: '#5B3A8C', label: 'Violet' },
  { id: 'black',    hex: '#1A0F00', label: 'Black' },
];

export const HAIR_STYLES = [
  { id: 'bald',           label: 'Bald' },
  { id: 'buzz',           label: 'Buzz Cut' },
  { id: 'short_straight', label: 'Short Straight' },
  { id: 'short_curly',    label: 'Short Curly' },
  { id: 'medium_wavy',    label: 'Medium Wavy' },
  { id: 'long_straight',  label: 'Long Straight' },
  { id: 'long_curly',     label: 'Long Curly' },
  { id: 'afro',           label: 'Afro' },
  { id: 'locs',           label: 'Locs' },
  { id: 'braids',         label: 'Braids' },
  { id: 'bun',            label: 'Bun' },
  { id: 'ponytail',       label: 'Ponytail' },
  { id: 'hijab',          label: 'Hijab' },
  { id: 'turban',         label: 'Turban' },
  { id: 'hat_baseball',   label: 'Baseball Cap' },
  { id: 'hat_beanie',     label: 'Beanie' },
  { id: 'pixie',          label: 'Pixie Cut' },
  { id: 'space_buns',     label: 'Space Buns' },
  { id: 'curtain_bangs',  label: 'Curtain Bangs' },
  { id: 'coily',          label: 'Coily Natural' },
  { id: 'finger_waves',   label: 'Finger Waves' },
];

export const FACIAL_HAIR = [
  { id: 'none',           label: 'None' },
  { id: 'stubble',        label: 'Stubble' },
  { id: 'mustache',       label: 'Mustache' },
  { id: 'beard_short',    label: 'Short Beard' },
  { id: 'beard_full',     label: 'Full Beard' },
];

export const OUTFITS = [
  { id: 'tshirt',         label: 'T-Shirt' },
  { id: 'hoodie',         label: 'Hoodie' },
  { id: 'blazer',         label: 'Blazer' },
  { id: 'dress',          label: 'Dress' },
  { id: 'overalls',       label: 'Overalls' },
  { id: 'uniform',        label: 'Uniform' },
];

export const OUTFIT_COLORS = [
  { id: 'navy',     hex: '#1E3A5F', label: 'Navy' },
  { id: 'red',      hex: '#C0392B', label: 'Red' },
  { id: 'forest',   hex: '#1E5F3A', label: 'Forest' },
  { id: 'purple',   hex: '#5B2C8C', label: 'Purple' },
  { id: 'orange',   hex: '#C86A1E', label: 'Orange' },
  { id: 'teal',     hex: '#1A7A6E', label: 'Teal' },
  { id: 'black',    hex: '#1A1A2E', label: 'Black' },
  { id: 'gray',     hex: '#5A6472', label: 'Gray' },
  { id: 'white',    hex: '#CDD5DE', label: 'Light' },
  { id: 'pink',     hex: '#C43C6E', label: 'Pink' },
];

export const ACCESSORIES = [
  { id: 'none',           label: 'None' },
  { id: 'glasses_round',  label: 'Round Glasses' },
  { id: 'glasses_square', label: 'Square Glasses' },
  { id: 'sunglasses',     label: 'Sunglasses' },
  { id: 'earrings',       label: 'Earrings' },
  { id: 'headband',       label: 'Headband' },
  { id: 'flowers',        label: 'Flower Crown' },
];

export const BG_COLORS = [
  { id: 'sky',      hex: '#B4D9F5', label: 'Sky' },
  { id: 'lavender', hex: '#C4B5F5', label: 'Lavender' },
  { id: 'mint',     hex: '#A8E6CF', label: 'Mint' },
  { id: 'peach',    hex: '#FFD5B8', label: 'Peach' },
  { id: 'rose',     hex: '#FFB5C8', label: 'Rose' },
  { id: 'lemon',    hex: '#FFF3A3', label: 'Lemon' },
  { id: 'sand',     hex: '#E8D5B0', label: 'Sand' },
  { id: 'slate',    hex: '#B0C4D8', label: 'Slate' },
  { id: 'cosmic',   hex: '#1A0D3D', label: 'Cosmic' }
];

// 12 diverse presets covering various genders, hair, and styles
export const PRESETS = [
  // Preset 1: Afro + dark skin + earrings (feminine)
  { gender: 'feminine',  hairStyle: 'afro',          hairColor: '#1A1A1A', skinColor: '#4A2810', eyeColor: '#5C3A1E', facialHair: 'none',        outfit: 'dress',     outfitColor: '#C86A1E', accessory: 'earrings',       bgColor: '#FFD5B8' },
  // Preset 2: Hijab + medium skin (feminine)
  { gender: 'feminine',  hairStyle: 'hijab',         hairColor: '#1E3A5F', skinColor: '#E8A87C', eyeColor: '#5C3A1E', facialHair: 'none',        outfit: 'blazer',    outfitColor: '#5B2C8C', accessory: 'none',            bgColor: '#B4D9F5' },
  // Preset 3: Space buns + light skin + flowers (feminine)
  { gender: 'feminine',  hairStyle: 'space_buns',    hairColor: '#E75480', skinColor: '#FDDBB4', eyeColor: '#2D6B4F', facialHair: 'none',        outfit: 'dress',     outfitColor: '#C43C6E', accessory: 'flowers',         bgColor: '#FFB5C8' },
  // Preset 4: Braids + golden skin (feminine)
  { gender: 'feminine',  hairStyle: 'braids',        hairColor: '#3B2314', skinColor: '#B5813F', eyeColor: '#B8860B', facialHair: 'none',        outfit: 'hoodie',    outfitColor: '#1A7A6E', accessory: 'none',            bgColor: '#C4B5F5' },
  // Preset 5: Pixie + auburn (feminine)
  { gender: 'feminine',  hairStyle: 'pixie',         hairColor: '#8B3A0F', skinColor: '#F5C5A3', eyeColor: '#7B5C2A', facialHair: 'none',        outfit: 'tshirt',    outfitColor: '#1E5F3A', accessory: 'none',            bgColor: '#A8E6CF' },
  // Preset 6: Finger waves + deep skin (feminine)
  { gender: 'feminine',  hairStyle: 'finger_waves',  hairColor: '#1A1A1A', skinColor: '#2C1A0E', eyeColor: '#B8860B', facialHair: 'none',        outfit: 'blazer',    outfitColor: '#1A1A2E', accessory: 'earrings',        bgColor: '#FFF3A3' },
  // Preset 7: Turban + olive skin + beard (masculine)
  { gender: 'masculine', hairStyle: 'turban',        hairColor: '#C86A1E', skinColor: '#C8A882', eyeColor: '#5C3A1E', facialHair: 'beard_short', outfit: 'uniform',   outfitColor: '#1E3A5F', accessory: 'none',            bgColor: '#E8D5B0' },
  // Preset 8: Curtain bangs + medium skin + round glasses (feminine)
  { gender: 'feminine',  hairStyle: 'curtain_bangs', hairColor: '#6B3A2A', skinColor: '#D4875A', eyeColor: '#2B5EA7', facialHair: 'none',        outfit: 'tshirt',    outfitColor: '#5A6472', accessory: 'glasses_round',   bgColor: '#B0C4D8' },
  // Preset 9: Short curly + beanie + kid (neutral)
  { gender: 'neutral',   hairStyle: 'hat_beanie',    hairColor: '#6B3FA0', skinColor: '#FDDBB4', eyeColor: '#5B3A8C', facialHair: 'none',        outfit: 'hoodie',    outfitColor: '#C0392B', accessory: 'none',            bgColor: '#1A0D3D' },
  // Preset 10: Afro + kid + T-shirt (neutral)
  { gender: 'neutral',   hairStyle: 'afro',          hairColor: '#1A1A1A', skinColor: '#7B3F1E', eyeColor: '#5C3A1E', facialHair: 'none',        outfit: 'tshirt',    outfitColor: '#C86A1E', accessory: 'none',            bgColor: '#FFF3A3' },
  // Preset 11: Baseball Cap + kid + overalls (neutral)
  { gender: 'neutral',   hairStyle: 'hat_baseball',  hairColor: '#1E4D8C', skinColor: '#E8A87C', eyeColor: '#2B5EA7', facialHair: 'none',        outfit: 'overalls',  outfitColor: '#1E5F3A', accessory: 'none',            bgColor: '#FFD5B8' },
  // Preset 12: Space buns + kid + lavender bg (neutral)
  { gender: 'neutral',   hairStyle: 'space_buns',    hairColor: '#C8A415', skinColor: '#F5C5A3', eyeColor: '#2D6B4F', facialHair: 'none',        outfit: 'dress',     outfitColor: '#5B2C8C', accessory: 'none',            bgColor: '#C4B5F5' },
];

function px(col, row, color, opacity = 1) {
  return `<rect x="${col * PIXEL}" y="${row * PIXEL}" width="${PIXEL}" height="${PIXEL}" fill="${color}" ${opacity < 1 ? `opacity="${opacity}"` : ''} />`;
}

function adjustColor(hex, amount) {
  try {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
    const b = Math.min(255, Math.max(0, (num & 0xff) + amount));
    return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
  } catch { return hex; }
}

function renderHair(pixels, style, hair, darkHair, bg, skin) {
  switch (style) {
    case 'bald':
      pixels.push(px(14, 7, skin, 0.4));
      pixels.push(px(15, 7, skin, 0.4));
      pixels.push(px(16, 7, skin, 0.4));
      pixels.push(px(15, 6, skin, 0.3));
      break;
    case 'buzz':
      for (let r = 4; r <= 7; r++)
        for (let c = 8; c <= 23; c++)
          pixels.push(px(c, r, hair, 0.7));
      for (let c = 7; c <= 24; c++) pixels.push(px(c, 8, hair, 0.5));
      break;
    case 'short_straight':
      for (let r = 3; r <= 7; r++)
        for (let c = 8; c <= 23; c++)
          pixels.push(px(c, r, hair));
      for (let r = 8; r <= 14; r++) {
        pixels.push(px(7, r, hair));
        pixels.push(px(8, r, hair));
        pixels.push(px(23, r, hair));
        pixels.push(px(24, r, hair));
      }
      break;
    case 'short_curly': {
      const curlyTop = [[9,3],[10,3],[11,3],[14,2],[15,2],[16,2],[19,3],[20,3],[21,3],
        [8,4],[9,4],[10,4],[11,4],[12,4],[13,4],[14,3],[15,3],[16,3],[17,4],[18,4],[19,4],[20,4],[21,4],[22,4],[23,4],
        [7,5],[8,5],[9,5],[22,5],[23,5],[24,5],
        [7,6],[8,6],[23,6],[24,6]
      ];
      curlyTop.forEach(([c,r]) => pixels.push(px(c, r, hair)));
      for (let r = 7; r <= 12; r++) {
        pixels.push(px(7, r, hair));
        pixels.push(px(8, r, hair));
        pixels.push(px(23, r, hair));
        pixels.push(px(24, r, hair));
      }
      break;
    }
    case 'afro':
      for (let r = 1; r <= 8; r++) {
        const hw = Math.min(10, 4 + (7 - Math.abs(r - 4)) * 1.5);
        for (let c = Math.floor(16 - hw); c <= Math.ceil(16 + hw); c++)
          pixels.push(px(c, r, hair));
      }
      for (let r = 5; r <= 14; r++) {
        pixels.push(px(5, r, hair));
        pixels.push(px(6, r, hair));
        pixels.push(px(25, r, hair));
        pixels.push(px(26, r, hair));
      }
      break;
    case 'locs':
      for (let r = 2; r <= 7; r++)
        for (let c = 8; c <= 23; c++)
          pixels.push(px(c, r, hair));
      [[9,8],[9,9],[9,10],[9,11],[9,12],[9,13],[9,14],[9,15],[9,16],[9,17],[9,18],[9,19],
       [12,8],[12,9],[12,10],[12,11],[12,12],[12,13],[12,14],[12,15],[12,16],[12,17],[12,18],
       [15,8],[15,9],[15,10],[15,11],[15,12],[15,13],[15,14],[15,15],[15,16],
       [18,8],[18,9],[18,10],[18,11],[18,12],[18,13],[18,14],[18,15],[18,16],
       [21,8],[21,9],[21,10],[21,11],[21,12],[21,13],[21,14],[21,15],[21,16],[21,17],[21,18],
       [23,8],[23,9],[23,10],[23,11],[23,12],[23,13],[23,14],[23,15],[23,16],[23,17],[23,18],[23,19]
      ].forEach(([c,r]) => pixels.push(px(c, r, hair)));
      break;
    case 'braids':
      for (let r = 2; r <= 7; r++)
        for (let c = 8; c <= 23; c++)
          pixels.push(px(c, r, hair));
      for (let r = 8; r < 36; r++) {
        pixels.push(px(11, r, hair));
        pixels.push(px(12, r, hair));
        pixels.push(px(13, r, r % 3 === 0 ? darkHair : hair));
        pixels.push(px(19, r, hair));
        pixels.push(px(20, r, hair));
        pixels.push(px(21, r, r % 3 === 0 ? darkHair : hair));
      }
      break;
    case 'medium_wavy':
      for (let r = 2; r <= 7; r++)
        for (let c = 8; c <= 23; c++)
          pixels.push(px(c, r, hair));
      for (let r = 8; r <= 20; r++) {
        const wave = Math.sin(r * 0.8) > 0 ? 1 : 0;
        pixels.push(px(6 + wave, r, hair));
        pixels.push(px(7 + wave, r, hair));
        pixels.push(px(24 - wave, r, hair));
        pixels.push(px(25 - wave, r, hair));
      }
      break;
    case 'long_straight':
      for (let r = 2; r <= 7; r++)
        for (let c = 8; c <= 23; c++)
          pixels.push(px(c, r, hair));
      for (let r = 8; r < 36; r++) {
        pixels.push(px(6, r, hair));
        pixels.push(px(7, r, hair));
        pixels.push(px(8, r, hair));
        pixels.push(px(23, r, hair));
        pixels.push(px(24, r, hair));
        pixels.push(px(25, r, hair));
      }
      break;
    case 'long_curly':
      for (let r = 2; r <= 7; r++)
        for (let c = 8; c <= 23; c++)
          pixels.push(px(c, r, hair));
      for (let r = 8; r < 36; r++) {
        const curl = Math.floor(Math.sin(r * 1.2) * 1.5);
        pixels.push(px(6 + curl, r, hair));
        pixels.push(px(7 + curl, r, hair));
        pixels.push(px(8 + curl, r, hair));
        pixels.push(px(23 - curl, r, hair));
        pixels.push(px(24 - curl, r, hair));
        pixels.push(px(25 - curl, r, hair));
      }
      break;
    case 'bun':
      for (let r = 1; r <= 5; r++) {
        const bw = 4 - Math.abs(r - 3);
        for (let c = 14 - bw; c <= 17 + bw; c++)
          pixels.push(px(c, r, hair));
      }
      for (let r = 6; r <= 13; r++)
        for (let c = 8; c <= 23; c++)
          pixels.push(px(c, r, hair));
      for (let r = 14; r <= 22; r++) {
        pixels.push(px(7, r, hair));
        pixels.push(px(8, r, hair));
      }
      break;
    case 'ponytail':
      for (let r = 2; r <= 8; r++)
        for (let c = 8; c <= 23; c++)
          pixels.push(px(c, r, hair));
      for (let r = 9; r <= 32; r++) {
        pixels.push(px(23, r, hair));
        pixels.push(px(24, r, hair));
        pixels.push(px(25, r, r % 4 === 0 ? darkHair : hair));
      }
      for (let r = 9; r <= 14; r++) {
        pixels.push(px(7, r, hair));
        pixels.push(px(8, r, hair));
      }
      break;
    case 'hijab':
      for (let r = 3; r <= 7; r++)
        for (let c = 7; c <= 24; c++)
          pixels.push(px(c, r, hair));
      for (let r = 8; r < 36; r++) {
        const hw = Math.min(12, 6 + (r - 8) * 0.3);
        for (let c = Math.floor(16 - hw); c <= Math.ceil(16 + hw); c++) {
          if (r < 26) pixels.push(px(c, r, hair));
        }
        pixels.push(px(5, r, hair));
        pixels.push(px(6, r, hair));
        pixels.push(px(26, r, hair));
        pixels.push(px(27, r, hair));
      }
      break;
    case 'turban':
      for (let r = 1; r <= 8; r++) {
        const tw = Math.min(11, 6 + (4 - Math.abs(r - 4)) * 1.3);
        for (let c = Math.floor(16 - tw); c <= Math.ceil(16 + tw); c++)
          pixels.push(px(c, r, hair));
      }
      pixels.push(px(15, 1, darkHair));
      pixels.push(px(16, 1, darkHair));
      break;
    case 'hat_baseball':
      for (let c = 5; c <= 22; c++) {
        pixels.push(px(c, 8, darkHair));
        pixels.push(px(c, 9, darkHair));
      }
      for (let r = 2; r <= 8; r++) {
        const hw = Math.min(9, 4 + (6 - Math.abs(r - 4)) * 1.2);
        for (let c = Math.floor(16 - hw); c <= Math.ceil(16 + hw); c++)
          pixels.push(px(c, r, hair));
      }
      pixels.push(px(15, 2, darkHair));
      pixels.push(px(16, 2, darkHair));
      break;
    case 'hat_beanie':
      for (let r = 1; r <= 8; r++) {
        const hw = Math.min(10, 5 + (5 - Math.abs(r - 4)) * 1.2);
        for (let c = Math.floor(16 - hw); c <= Math.ceil(16 + hw); c++)
          pixels.push(px(c, r, hair));
      }
      for (let c = 7; c <= 24; c++) {
        pixels.push(px(c, 8, darkHair, c % 2 === 0 ? 1 : 0.6));
        pixels.push(px(c, 9, darkHair, c % 2 === 0 ? 0.6 : 1));
      }
      for (let r = 0; r <= 1; r++)
        for (let c = 14; c <= 17; c++)
          pixels.push(px(c, r, darkHair));
      break;

    // ── NEW STYLES ──────────────────────────────────────────────────────────
    case 'pixie':
      // Base: short cap covering top/sides rows 6-10, cols 8-24
      for (let r = 6; r <= 10; r++)
        for (let c = 8; c <= 24; c++)
          pixels.push(px(c, r, hair));
      // Slight fringe at front (rows 7-8, cols 10-21)
      for (let r = 7; r <= 8; r++)
        for (let c = 10; c <= 21; c++)
          pixels.push(px(c, r, hair));
      // Highlight streak on fringe
      for (let c = 13; c <= 18; c++)
        pixels.push(px(c, 7, darkHair, 0.4));
      break;

    case 'space_buns': {
      // Left bun: circle centred at col 10, row 2, radius ~3
      const bunCells = [
        [9,1],[10,1],[11,1],
        [8,2],[9,2],[10,2],[11,2],[12,2],
        [9,3],[10,3],[11,3],
        // Right bun: centred at col 22, row 2
        [21,1],[22,1],[23,1],
        [20,2],[21,2],[22,2],[23,2],[24,2],
        [21,3],[22,3],[23,3],
      ];
      bunCells.forEach(([c,r]) => pixels.push(px(c, r, hair)));
      // Dark centre of each bun
      pixels.push(px(10, 2, darkHair));
      pixels.push(px(22, 2, darkHair));
      // Base hair rows 6-8
      for (let r = 6; r <= 8; r++)
        for (let c = 8; c <= 23; c++)
          pixels.push(px(c, r, hair));
      // Thin strands connecting buns to base
      for (let r = 4; r <= 5; r++) {
        pixels.push(px(9, r, hair));
        pixels.push(px(10, r, hair));
        pixels.push(px(21, r, hair));
        pixels.push(px(22, r, hair));
      }
      break;
    }

    case 'curtain_bangs':
      // Base hair rows 3-8
      for (let r = 3; r <= 8; r++)
        for (let c = 8; c <= 23; c++)
          pixels.push(px(c, r, hair));
      // Long side curtains
      for (let r = 9; r <= 28; r++) {
        pixels.push(px(7, r, hair));
        pixels.push(px(8, r, hair));
        pixels.push(px(23, r, hair));
        pixels.push(px(24, r, hair));
      }
      // Left curtain bangs: cols 9-14, rows 8-11 going down
      for (let r = 8; r <= 11; r++) {
        const spanEnd = 9 + (r - 8) * 1.5;
        for (let c = 9; c <= Math.ceil(spanEnd) + 9; c++)
          if (c <= 14) pixels.push(px(c, r, hair));
      }
      // Right curtain bangs: cols 17-22, rows 8-11 mirrored
      for (let r = 8; r <= 11; r++) {
        const spanStart = 22 - (r - 8) * 1.5;
        for (let c = Math.floor(spanStart); c <= 22; c++)
          if (c >= 17) pixels.push(px(c, r, hair));
      }
      // Centre parting highlight
      pixels.push(px(15, 5, darkHair, 0.3));
      pixels.push(px(16, 5, darkHair, 0.3));
      break;

    case 'coily': {
      // Similar to afro but textured with alternating dots
      for (let r = 1; r <= 8; r++) {
        const hw = Math.min(10, 4 + (7 - Math.abs(r - 4)) * 1.5);
        for (let c = Math.floor(16 - hw); c <= Math.ceil(16 + hw); c++) {
          const useAlt = (c + r) % 2 === 0;
          pixels.push(px(c, r, useAlt ? darkHair : hair));
        }
      }
      // Wide side coils
      for (let r = 5; r <= 14; r++) {
        const useAlt = r % 2 === 0;
        pixels.push(px(5, r, useAlt ? darkHair : hair));
        pixels.push(px(6, r, useAlt ? hair : darkHair));
        pixels.push(px(25, r, useAlt ? darkHair : hair));
        pixels.push(px(26, r, useAlt ? hair : darkHair));
      }
      break;
    }

    case 'finger_waves':
      // Long hair on sides rows 2-36
      for (let r = 2; r <= 7; r++)
        for (let c = 8; c <= 23; c++)
          pixels.push(px(c, r, hair));
      for (let r = 8; r < 36; r++) {
        // Wave pattern: alternating stripe using darkHair
        const waveOffset = Math.floor(Math.sin(r * 0.9) * 1);
        pixels.push(px(6 + waveOffset, r, hair));
        pixels.push(px(7, r, r % 3 === 0 ? darkHair : hair));
        pixels.push(px(8, r, hair));
        pixels.push(px(23, r, hair));
        pixels.push(px(24, r, r % 3 === 0 ? darkHair : hair));
        pixels.push(px(25 - waveOffset, r, hair));
      }
      // Wave highlight stripes across front at rows 9, 12, 15, 18
      [9, 12, 15, 18].forEach(r => {
        for (let c = 8; c <= 10; c++) pixels.push(px(c, r, darkHair, 0.5));
        for (let c = 21; c <= 23; c++) pixels.push(px(c, r, darkHair, 0.5));
      });
      break;
  }
}

function renderFacialHair(pixels, style, darkSkin, hair) {
  switch (style) {
    case 'stubble':
      [[11,18],[13,18],[15,18],[17,18],[19,18],[21,18],
       [12,19],[14,19],[16,19],[18,19],[20,19],
       [13,20],[14,20],[15,20],[16,20],[17,20],[18,20],[19,20]
      ].forEach(([c,r]) => pixels.push(px(c, r, hair, 0.5)));
      break;
    case 'mustache':
      for (let c = 13; c <= 18; c++) {
        pixels.push(px(c, 16, hair));
        pixels.push(px(c, 17, hair, 0.8));
      }
      break;
    case 'beard_short':
      for (let r = 17; r <= 21; r++) {
        const bw = 4 + (r - 17) * 0.8;
        for (let c = Math.floor(16 - bw); c <= Math.ceil(16 + bw); c++)
          pixels.push(px(c, r, hair, 0.85));
      }
      break;
    case 'beard_full':
      for (let r = 16; r <= 23; r++) {
        const bw = Math.min(8, 3 + (r - 16) * 0.9);
        for (let c = Math.floor(16 - bw); c <= Math.ceil(16 + bw); c++)
          pixels.push(px(c, r, hair));
      }
      break;
  }
}

function renderAccessory(pixels, acc, eyeColor, hairColor) {
  switch (acc) {
    case 'glasses_round':
      [[10,10],[11,10],[12,10],[13,10],[10,11],[13,11],[10,12],[11,12],[12,12],[13,12]].forEach(([c,r]) => pixels.push(px(c, r, '#1A1A1A')));
      [[18,10],[19,10],[20,10],[21,10],[18,11],[21,11],[18,12],[19,12],[20,12],[21,12]].forEach(([c,r]) => pixels.push(px(c, r, '#1A1A1A')));
      pixels.push(px(14, 11, '#1A1A1A'));
      pixels.push(px(15, 11, '#1A1A1A'));
      pixels.push(px(16, 11, '#1A1A1A'));
      pixels.push(px(17, 11, '#1A1A1A'));
      break;
    case 'glasses_square':
      for (let c = 10; c <= 13; c++) {
        pixels.push(px(c, 10, '#2B2B2B'));
        pixels.push(px(c, 12, '#2B2B2B'));
      }
      pixels.push(px(10, 11, '#2B2B2B'));
      pixels.push(px(13, 11, '#2B2B2B'));
      for (let c = 18; c <= 21; c++) {
        pixels.push(px(c, 10, '#2B2B2B'));
        pixels.push(px(c, 12, '#2B2B2B'));
      }
      pixels.push(px(18, 11, '#2B2B2B'));
      pixels.push(px(21, 11, '#2B2B2B'));
      pixels.push(px(14, 11, '#2B2B2B'));
      pixels.push(px(15, 11, '#2B2B2B'));
      pixels.push(px(16, 11, '#2B2B2B'));
      pixels.push(px(17, 11, '#2B2B2B'));
      break;
    case 'sunglasses':
      for (let c = 10; c <= 13; c++) for (let r = 10; r <= 12; r++) pixels.push(px(c, r, '#1A1A1A'));
      for (let c = 18; c <= 21; c++) for (let r = 10; r <= 12; r++) pixels.push(px(c, r, '#1A1A1A'));
      for (let c = 14; c <= 17; c++) pixels.push(px(c, 11, '#1A1A1A'));
      for (let c = 10; c <= 13; c++) for (let r = 10; r <= 12; r++) pixels.push(px(c, r, '#001A4D', 0.5));
      for (let c = 18; c <= 21; c++) for (let r = 10; r <= 12; r++) pixels.push(px(c, r, '#001A4D', 0.5));
      break;
    case 'earrings':
      pixels.push(px(6, 14, '#FFD700'));
      pixels.push(px(6, 15, '#FFD700'));
      pixels.push(px(25, 14, '#FFD700'));
      pixels.push(px(25, 15, '#FFD700'));
      break;
    case 'headband':
      for (let c = 8; c <= 23; c++) {
        pixels.push(px(c, 7, '#E74C7C'));
        pixels.push(px(c, 8, '#E74C7C'));
      }
      break;
    case 'flowers':
      [[9,5],[13,3],[19,3],[23,5]].forEach(([c,r]) => {
        pixels.push(px(c, r, '#FF6B9D'));
        pixels.push(px(c+1, r, '#FF6B9D'));
        pixels.push(px(c, r+1, '#FF6B9D'));
        pixels.push(px(c+1, r+1, '#FFFF00'));
      });
      break;
  }
}

function renderPixelAvatar(cfg) {
  const gender = cfg.gender || 'masculine';
  const isFem  = gender === 'feminine';
  const isNeut = gender === 'neutral';
  const skin   = cfg.skinColor  || '#FDDBB4';
  const hair   = cfg.hairColor  || '#1A1A1A';
  const eye    = cfg.eyeColor   || '#5C3A1E';
  const cloth  = cfg.outfitColor || '#1E3A5F';
  const darkSkin  = adjustColor(skin,  -40);
  const lightSkin = adjustColor(skin,   30);
  const darkHair  = adjustColor(hair,  -30);
  const darkCloth = adjustColor(cloth, -40);
  const lightCloth= adjustColor(cloth,  30);

  const pixels = [];

  // ── Neck ─────────────────────────────────────────────────────────────────
  // Kids/neutral have shorter neck
  const neckTop = isNeut ? 23 : 22;
  for (let r = neckTop; r <= 25; r++)
    for (let c = 13; c <= 18; c++)
      pixels.push(px(c, r, skin));

  // ── Body / outfit ────────────────────────────────────────────────────────
  // Feminine and neutral/kid hip flare/shoulder width
  const bodyRows = {
    tshirt:   { top: 25, shW: isFem ? 8 : (isNeut ? 7 : 10) },
    hoodie:   { top: 25, shW: isFem ? 8 : (isNeut ? 7 : 10) },
    blazer:   { top: 25, shW: isFem ? 7 : (isNeut ? 6 : 9)  },
    dress:    { top: 25, shW: isFem ? 7 : (isNeut ? 6 : 8)  },
    overalls: { top: 25, shW: isFem ? 8 : (isNeut ? 7 : 10) },
    uniform:  { top: 25, shW: isFem ? 7 : (isNeut ? 6 : 9)  },
  };
  const outfit = bodyRows[cfg.outfit] || bodyRows.tshirt;

  for (let r = outfit.top; r < H; r++) {
    const halfW = Math.min(outfit.shW, (isNeut ? 5 : 6) + (r - outfit.top) * 0.5);
    const left  = Math.floor(W / 2 - halfW);
    const right = Math.ceil(W / 2 + halfW);
    for (let c = left; c <= right; c++)
      pixels.push(px(c, r, cloth));
  }

  if (cfg.outfit === 'blazer') {
    for (let r = 26; r <= 31; r++) {
      pixels.push(px(14, r, darkCloth));
      pixels.push(px(17, r, darkCloth));
    }
    pixels.push(px(15, 30, lightCloth));
    pixels.push(px(16, 30, lightCloth));
  }
  if (cfg.outfit === 'hoodie') {
    for (let r = 30; r <= 33; r++)
      for (let c = 13; c <= 18; c++)
        pixels.push(px(c, r, darkCloth));
  }
  if (cfg.outfit === 'overalls') {
    const strapL = isNeut ? 12 : 13;
    const strapR = isNeut ? 18 : 17;
    for (let r = 26; r <= 29; r++) {
      pixels.push(px(strapL, r, darkCloth));
      pixels.push(px(strapL + 1, r, darkCloth));
      pixels.push(px(strapR - 1, r, darkCloth));
      pixels.push(px(strapR, r, darkCloth));
    }
  }
  // Dress/hoodie hip flare: feminine starts row 28, masculine row 31, kids/neutral row 29
  if (cfg.outfit === 'dress' || cfg.outfit === 'hoodie') {
    const flareStart = isFem ? 28 : (isNeut ? 29 : 31);
    for (let r = flareStart; r < H; r++) {
      const flare = (r - flareStart) * (isFem ? 1.8 : (isNeut ? 1.4 : 1.5));
      const left  = Math.floor(W / 2 - 8 - flare);
      const right = Math.ceil(W / 2 + 8 + flare);
      for (let c = Math.max(0, left); c <= Math.min(W - 1, right); c++)
        pixels.push(px(c, r, cloth));
    }
  }

  // ── Face shape ───────────────────────────────────────────────────────────
  // Feminine: softer/narrower jaw (rows 9-11 narrower); Masculine: wider chin at 10-11
  // Neutral: cute round chibi face shape (wider cheeks, round chin)
  const faceMapFem = [
    [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],          // row 7
    [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],   // row 8
    [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],   // row 9
    [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],   // row 10
    [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],   // row 11
    [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],          // row 12
    [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],                 // row 13
    [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],                        // row 14
    [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],                                // row 15  ← narrower jaw
    [12, 13, 14, 15, 16, 17, 18, 19],                                         // row 16  ← narrower
    [13, 14, 15, 16, 17, 18],                                                  // row 17  ← narrower
    [14, 15, 16, 17],                                                           // row 18
  ];
  const faceMapMasc = [
    [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
    [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],                        // wider
    [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],                            // wider chin
    [12, 13, 14, 15, 16, 17, 18, 19, 20],                                     // wider chin
    [13, 14, 15, 16, 17, 18],
  ];
  const faceMapNeut = [
    [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],          // row 7
    [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],   // row 8
    [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],   // row 9
    [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],   // row 10
    [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],   // row 11
    [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],          // row 12
    [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],          // row 13 (rounder cheeks)
    [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],                 // row 14
    [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],                        // row 15
    [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],                                // row 16
    [12, 13, 14, 15, 16, 17, 18, 19],                                         // row 17
    [13, 14, 15, 16, 17, 18],                                                 // row 18
  ];

  const faceMap = isFem ? faceMapFem : (isNeut ? faceMapNeut : faceMapMasc);
  const faceStartRow = 7;
  faceMap.forEach((cols, i) => {
    cols.forEach(c => pixels.push(px(c, faceStartRow + i, skin)));
  });

  // ── Ear / temple shadow ───────────────────────────────────────────────────
  for (let c = 7; c <= 9; c++) {
    pixels.push(px(c, 8, darkSkin, 0.3));
    pixels.push(px(c, 9, darkSkin, 0.3));
  }
  for (let c = 22; c <= 24; c++) {
    pixels.push(px(c, 8, darkSkin, 0.3));
    pixels.push(px(c, 9, darkSkin, 0.3));
  }

  // ── Ears ─────────────────────────────────────────────────────────────────
  pixels.push(px(7, 12, skin));
  pixels.push(px(7, 13, skin));
  pixels.push(px(7, 14, skin));
  pixels.push(px(24, 12, skin));
  pixels.push(px(24, 13, skin));
  pixels.push(px(24, 14, skin));
  pixels.push(px(6, 12, darkSkin));
  pixels.push(px(6, 13, darkSkin));
  pixels.push(px(25, 12, darkSkin));
  pixels.push(px(25, 13, darkSkin));

  // ── Eyes ─────────────────────────────────────────────────────────────────
  if (isFem) {
    // Feminine: larger 4×3 white area
    for (let c = 10; c <= 13; c++) {
      pixels.push(px(c, 10, '#FFFFFF'));
      pixels.push(px(c, 11, '#FFFFFF'));
      pixels.push(px(c, 12, '#FFFFFF'));
    }
    for (let c = 18; c <= 21; c++) {
      pixels.push(px(c, 10, '#FFFFFF'));
      pixels.push(px(c, 11, '#FFFFFF'));
      pixels.push(px(c, 12, '#FFFFFF'));
    }
    // Bigger 2×2 iris/pupil
    for (let c = 11; c <= 12; c++) {
      pixels.push(px(c, 11, eye));
      pixels.push(px(c, 12, eye));
    }
    for (let c = 19; c <= 20; c++) {
      pixels.push(px(c, 11, eye));
      pixels.push(px(c, 12, eye));
    }
    // Pupil darkening (centre of iris)
    pixels.push(px(11, 12, '#000000'));
    pixels.push(px(12, 12, '#000000'));
    pixels.push(px(19, 12, '#000000'));
    pixels.push(px(20, 12, '#000000'));
    // Catch-light
    pixels.push(px(10, 10, '#FFFFFF'));
    pixels.push(px(18, 10, '#FFFFFF'));

    // Lashes: 5-wide strip above each eye (row 9) + inner lash on row 10
    for (let c = 9; c <= 13; c++)  pixels.push(px(c, 9,  '#1A1A1A'));
    for (let c = 17; c <= 21; c++) pixels.push(px(c, 9,  '#1A1A1A'));
    // Outer lash pixel on sides row 10
    pixels.push(px(9,  10, '#1A1A1A'));
    pixels.push(px(22, 10, '#1A1A1A'));

    // Arched brows: row 9 for left (cols 10-13), right (cols 18-21)
    for (let c = 10; c <= 13; c++) pixels.push(px(c, 9, '#1A1A1A', 0.8));
    for (let c = 18; c <= 21; c++) pixels.push(px(c, 9, '#1A1A1A', 0.8));
  } else if (isNeut) {
    // Neutral (Kids chibi): Large round friendly eyes, catch-light, soft high brows
    for (let c = 11; c <= 13; c++) {
      pixels.push(px(c, 10, '#FFFFFF'));
      pixels.push(px(c, 11, '#FFFFFF'));
      pixels.push(px(c, 12, '#FFFFFF'));
    }
    for (let c = 18; c <= 20; c++) {
      pixels.push(px(c, 10, '#FFFFFF'));
      pixels.push(px(c, 11, '#FFFFFF'));
      pixels.push(px(c, 12, '#FFFFFF'));
    }
    // Pupil/Iris
    pixels.push(px(12, 11, eye));
    pixels.push(px(12, 12, eye));
    pixels.push(px(19, 11, eye));
    pixels.push(px(19, 12, eye));
    pixels.push(px(12, 12, '#000000'));
    pixels.push(px(19, 12, '#000000'));
    // Catch-light
    pixels.push(px(11, 10, '#FFFFFF'));
    pixels.push(px(18, 10, '#FFFFFF'));
    
    // Soft high brows (row 8)
    pixels.push(px(11, 8, '#1A1A1A', 0.5));
    pixels.push(px(12, 8, '#1A1A1A', 0.5));
    pixels.push(px(18, 8, '#1A1A1A', 0.5));
    pixels.push(px(19, 8, '#1A1A1A', 0.5));
  } else {
    // Masculine: 3×2 white area
    for (let c = 11; c <= 13; c++) pixels.push(px(c, 11, '#FFFFFF'));
    for (let c = 11; c <= 13; c++) pixels.push(px(c, 12, '#FFFFFF'));
    for (let c = 18; c <= 20; c++) pixels.push(px(c, 11, '#FFFFFF'));
    for (let c = 18; c <= 20; c++) pixels.push(px(c, 12, '#FFFFFF'));
    // 1×1 pupil
    pixels.push(px(12, 11, eye));
    pixels.push(px(12, 12, eye));
    pixels.push(px(19, 11, eye));
    pixels.push(px(19, 12, eye));
    pixels.push(px(12, 12, '#000000'));
    pixels.push(px(19, 12, '#000000'));
    pixels.push(px(11, 11, '#FFFFFF'));
    pixels.push(px(18, 11, '#FFFFFF'));
    // Flat brows: row 9, straight cols 11-13 left, 18-20 right
    for (let c = 11; c <= 13; c++) pixels.push(px(c, 9, '#1A1A1A'));
    for (let c = 18; c <= 20; c++) pixels.push(px(c, 9, '#1A1A1A'));
  }

  // ── Nose ─────────────────────────────────────────────────────────────────
  pixels.push(px(15, 14, darkSkin));
  pixels.push(px(16, 14, darkSkin));
  pixels.push(px(15, 15, darkSkin, 0.5));
  pixels.push(px(16, 15, darkSkin, 0.5));

  // ── Lips ─────────────────────────────────────────────────────────────────
  const lipColor   = isFem ? '#D94C53' : (isNeut ? '#E25C65' : '#C06060');
  const lipOpacity = isFem ? 0.9 : (isNeut ? 0.75 : 0.7);

  if (isFem) {
    // Fuller lips: cols 12-19, double lip rows 17 & 18
    for (let c = 12; c <= 19; c++) pixels.push(px(c, 17, lipColor, lipOpacity));
    for (let c = 12; c <= 19; c++) pixels.push(px(c, 18, lipColor, lipOpacity * 0.8));
    // Lip shine
    pixels.push(px(14, 17, '#FFFFFF', 0.6));
    pixels.push(px(15, 17, '#FFFFFF', 0.6));
    pixels.push(px(16, 17, '#FFFFFF', 0.6));
    pixels.push(px(17, 17, '#FFFFFF', 0.6));
    pixels.push(px(13, 16, darkSkin, 0.5));
    pixels.push(px(18, 16, darkSkin, 0.5));
  } else if (isNeut) {
    // Cute small chibi smile mouth
    pixels.push(px(14, 17, lipColor, lipOpacity));
    pixels.push(px(15, 17, lipColor, lipOpacity));
    pixels.push(px(16, 17, lipColor, lipOpacity));
    pixels.push(px(17, 17, lipColor, lipOpacity));
    // Smile corners
    pixels.push(px(13, 16, darkSkin, 0.4));
    pixels.push(px(18, 16, darkSkin, 0.4));
  } else {
    // Masculine: standard lips cols 13-18 single row
    for (let c = 13; c <= 18; c++) pixels.push(px(c, 17, lipColor, lipOpacity));
    pixels.push(px(14, 17, '#FFFFFF', 0.4));
    pixels.push(px(15, 17, '#FFFFFF', 0.4));
    pixels.push(px(16, 17, '#FFFFFF', 0.4));
    pixels.push(px(17, 17, '#FFFFFF', 0.4));
    pixels.push(px(13, 16, darkSkin, 0.5));
    pixels.push(px(18, 16, darkSkin, 0.5));
    // Stronger jaw shadow rows 17-18
    for (let c = 11; c <= 20; c++) {
      pixels.push(px(c, 17, darkSkin, 0.2));
      pixels.push(px(c, 18, darkSkin, 0.3));
    }
  }

  // ── Gender-specific face details ─────────────────────────────────────────
  if (isFem || isNeut) {
    // Blush (stronger opacity 0.55 for fem, 0.45 for kids)
    const blushOpacity = isFem ? 0.55 : 0.45;
    pixels.push(px(9,  14, '#FF8A8A', blushOpacity));
    pixels.push(px(10, 14, '#FF8A8A', blushOpacity));
    pixels.push(px(21, 14, '#FF8A8A', blushOpacity));
    pixels.push(px(22, 14, '#FF8A8A', blushOpacity));
    
    // Higher cheekbone highlights at rows 11-12, cols 9-10 and 21-22
    const cheekGlow = isFem ? 0.35 : 0.25;
    pixels.push(px(9,  11, lightSkin, cheekGlow));
    pixels.push(px(10, 11, lightSkin, cheekGlow));
    pixels.push(px(21, 11, lightSkin, cheekGlow));
    pixels.push(px(22, 11, lightSkin, cheekGlow));
    pixels.push(px(9,  12, lightSkin, cheekGlow - 0.1));
    pixels.push(px(10, 12, lightSkin, cheekGlow - 0.1));
    pixels.push(px(21, 12, lightSkin, cheekGlow - 0.1));
    pixels.push(px(22, 12, lightSkin, cheekGlow - 0.1));
  }

  // ── Hair, facial hair, accessories ───────────────────────────────────────
  renderHair(pixels, cfg.hairStyle, hair, darkHair, null, skin);

  if (cfg.facialHair && cfg.facialHair !== 'none') {
    renderFacialHair(pixels, cfg.facialHair, darkSkin, hair);
  }

  if (cfg.accessory && cfg.accessory !== 'none') {
    renderAccessory(pixels, cfg.accessory, eye, hair);
  }

  return pixels.join('');
}

const PixelAvatar = ({ config, size = 100, className = '' }) => {
  const safeConfig = config || {
    skinColor: '#FDDBB4',
    hairColor: '#1A1A1A',
    hairStyle: 'short_straight',
    outfitColor: '#1E3A5F',
    outfit: 'tshirt',
    bgColor: '#1A0D3D',
    eyeColor: '#5C3A1E',
    facialHair: 'none',
    accessory: 'none',
    gender: 'masculine'
  };

  const svgContent = useMemo(() => renderPixelAvatar(safeConfig), [safeConfig]);
  const viewW = W * PIXEL;
  const viewH = H * PIXEL;

  return (
    <div className={`shrink-0 overflow-hidden ${className}`} style={{ width: size, height: size, backgroundColor: safeConfig.bgColor }}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${viewW} ${viewH}`}
        style={{ imageRendering: 'pixelated', display: 'block' }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
};

export default PixelAvatar;
