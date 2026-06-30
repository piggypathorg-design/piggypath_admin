import { useState, useEffect, useMemo, useCallback, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   PIXEL AVATAR ENGINE
   32×40 grid, PIXEL=4 → 128×160 SVG canvas
═══════════════════════════════════════════════════════════════ */
const PX = 4, W = 32, H = 40;

const px = (c, r, color, o = 1) =>
  `<rect x="${c*PX}" y="${r*PX}" width="${PX}" height="${PX}" fill="${color}"${o < 1 ? ` opacity="${o}"` : ""}/>`;

function adj(hex, amt) {
  try {
    const n = parseInt(hex.replace("#", ""), 16);
    const r = Math.min(255, Math.max(0, (n >> 16) + amt));
    const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + amt));
    const b = Math.min(255, Math.max(0, (n & 0xff) + amt));
    return `#${r.toString(16).padStart(2,"0")}${g.toString(16).padStart(2,"0")}${b.toString(16).padStart(2,"0")}`;
  } catch { return hex; }
}

// Body silhouette — GENDER-AWARE shapes
function renderBody(pixels, gender, skin, outfit, oColor) {
  const dk = adj(skin, -40);
  const odk = adj(oColor, -40);
  const olg = adj(oColor, 30);

  if (gender === "fem") {
    // Narrower shoulders, wider hips
    // Neck
    for (let c = 14; c <= 17; c++) for (let r = 22; r <= 24; r++) pixels.push(px(c, r, skin));
    // Shoulders (narrower)
    for (let c = 10; c <= 21; c++) pixels.push(px(c, 25, oColor));
    // Torso (hourglass)
    for (let r = 26; r <= 30; r++) {
      const w = r <= 28 ? [11,20] : [10,21];
      for (let c = w[0]; c <= w[1]; c++) pixels.push(px(c, r, oColor));
    }
    // Hip flare
    for (let c = 9; c <= 22; c++) for (let r = 31; r <= 34; r++) pixels.push(px(c, r, oColor));
    // Outfit details
    if (outfit === "dress") {
      for (let c = 8; c <= 23; c++) for (let r = 32; r <= 36; r++) pixels.push(px(c, r, oColor));
      // Dress flare
      for (let c = 7; c <= 24; c++) for (let r = 34; r <= 38; r++) pixels.push(px(c, r, olg, 0.7));
    }
    // Arms
    for (let r = 25; r <= 33; r++) {
      pixels.push(px(8, r, outfit === "tshirt" && r > 27 ? skin : oColor));
      pixels.push(px(9, r, outfit === "tshirt" && r > 27 ? skin : oColor));
      pixels.push(px(22, r, outfit === "tshirt" && r > 27 ? skin : oColor));
      pixels.push(px(23, r, outfit === "tshirt" && r > 27 ? skin : oColor));
    }
    // Hands
    for (let c = 7; c <= 9; c++) for (let r = 33; r <= 35; r++) pixels.push(px(c, r, skin));
    for (let c = 22; c <= 24; c++) for (let r = 33; r <= 35; r++) pixels.push(px(c, r, skin));
  } else if (gender === "masc") {
    // Broader shoulders, narrower waist
    for (let c = 14; c <= 17; c++) for (let r = 22; r <= 24; r++) pixels.push(px(c, r, skin));
    // Shoulders (wider)
    for (let c = 8; c <= 23; c++) pixels.push(px(c, 25, oColor));
    // Torso
    for (let r = 26; r <= 34; r++) {
      const w = r <= 29 ? [9,22] : [10,21];
      for (let c = w[0]; c <= w[1]; c++) pixels.push(px(c, r, oColor));
    }
    // Arms (thicker)
    for (let r = 25; r <= 34; r++) {
      pixels.push(px(6, r, outfit === "tshirt" && r > 28 ? skin : oColor));
      pixels.push(px(7, r, outfit === "tshirt" && r > 28 ? skin : oColor));
      pixels.push(px(8, r, outfit === "tshirt" && r > 28 ? skin : oColor));
      pixels.push(px(23, r, outfit === "tshirt" && r > 28 ? skin : oColor));
      pixels.push(px(24, r, outfit === "tshirt" && r > 28 ? skin : oColor));
      pixels.push(px(25, r, outfit === "tshirt" && r > 28 ? skin : oColor));
    }
    for (let c = 5; c <= 8; c++) for (let r = 34; r <= 36; r++) pixels.push(px(c, r, skin));
    for (let c = 23; c <= 26; c++) for (let r = 34; r <= 36; r++) pixels.push(px(c, r, skin));
  } else {
    // Neutral / kids — petite, chubby
    for (let c = 14; c <= 17; c++) for (let r = 22; r <= 23; r++) pixels.push(px(c, r, skin));
    for (let c = 11; c <= 20; c++) pixels.push(px(c, 24, oColor));
    for (let r = 25; r <= 32; r++) {
      for (let c = 11; c <= 20; c++) pixels.push(px(c, r, oColor));
    }
    // Short arms
    for (let r = 24; r <= 31; r++) {
      pixels.push(px(9, r, oColor)); pixels.push(px(10, r, oColor));
      pixels.push(px(21, r, oColor)); pixels.push(px(22, r, oColor));
    }
    for (let c = 8; c <= 10; c++) for (let r = 31; r <= 33; r++) pixels.push(px(c, r, skin));
    for (let c = 21; c <= 23; c++) for (let r = 31; r <= 33; r++) pixels.push(px(c, r, skin));
  }

  // Outfit highlights
  pixels.push(px(13, 26, olg, 0.3));
  pixels.push(px(14, 26, olg, 0.3));

  // Hoodie pocket
  if (outfit === "hoodie") {
    for (let c = 13; c <= 18; c++) pixels.push(px(c, 30, odk));
    for (let c = 13; c <= 18; c++) pixels.push(px(c, 31, odk));
  }

  // Blazer lapels
  if (outfit === "blazer") {
    pixels.push(px(14, 25, adj(oColor, 20)));
    pixels.push(px(15, 25, adj(oColor, 20)));
    pixels.push(px(16, 25, adj(oColor, 20)));
    pixels.push(px(17, 25, adj(oColor, 20)));
    pixels.push(px(14, 26, "#F4F4F4", 0.5));
    pixels.push(px(17, 26, "#F4F4F4", 0.5));
  }

  // Overalls straps
  if (outfit === "overalls") {
    pixels.push(px(13, 25, odk)); pixels.push(px(14, 25, odk));
    pixels.push(px(17, 25, odk)); pixels.push(px(18, 25, odk));
    pixels.push(px(15, 27, "#FFCD75")); // buckle
  }
}

function renderHair(pixels, style, hair, darkHair, skin) {
  const lh = adj(hair, 40);
  switch (style) {
    case "bald":
      pixels.push(px(14, 5, skin, 0.4));
      break;
    case "buzz":
      for (let c = 9; c <= 22; c++) pixels.push(px(c, 5, hair, 0.6));
      for (let c = 7; c <= 24; c++) pixels.push(px(c, 6, hair, 0.5));
      break;
    case "short_straight":
      for (let c = 9; c <= 22; c++) pixels.push(px(c, 4, hair));
      for (let c = 7; c <= 24; c++) { pixels.push(px(c, 5, hair)); pixels.push(px(c, 6, hair, 0.5)); }
      for (let c = 7; c <= 9; c++) pixels.push(px(c, 7, hair, 0.7));
      for (let c = 22; c <= 24; c++) pixels.push(px(c, 7, hair, 0.7));
      break;
    case "short_curly":
      for (let c = 9; c <= 22; c++) pixels.push(px(c, 4, hair));
      for (let c = 7; c <= 24; c++) pixels.push(px(c, 5, hair));
      for (let c = 7; c <= 9; c++) pixels.push(px(c, 6, hair));
      for (let c = 22; c <= 24; c++) pixels.push(px(c, 6, hair));
      // Curl texture
      [8,10,12,14,16,18,20,22].forEach(c => pixels.push(px(c, 3, hair, 0.7)));
      break;
    case "pixie":
      for (let c = 10; c <= 21; c++) pixels.push(px(c, 4, hair));
      for (let c = 8; c <= 23; c++) pixels.push(px(c, 5, hair));
      for (let c = 7; c <= 9; c++) for (let r = 6; r <= 7; r++) pixels.push(px(c, r, hair));
      for (let c = 22; c <= 24; c++) for (let r = 6; r <= 7; r++) pixels.push(px(c, r, hair));
      pixels.push(px(10, 3, hair)); pixels.push(px(11, 3, hair)); pixels.push(px(12, 3, hair));
      break;
    case "medium_wavy":
      for (let c = 9; c <= 22; c++) pixels.push(px(c, 4, hair));
      for (let c = 7; c <= 24; c++) pixels.push(px(c, 5, hair));
      for (let c = 7; c <= 9; c++) for (let r = 6; r <= 14; r++) pixels.push(px(c, r, hair));
      for (let c = 22; c <= 24; c++) for (let r = 6; r <= 14; r++) pixels.push(px(c, r, hair));
      [7,9,11,13].forEach(r => { pixels.push(px(6, r, hair, 0.6)); pixels.push(px(25, r, hair, 0.6)); });
      break;
    case "long_straight":
      for (let c = 9; c <= 22; c++) pixels.push(px(c, 4, hair));
      for (let c = 7; c <= 24; c++) pixels.push(px(c, 5, hair));
      for (let c = 7; c <= 9; c++) for (let r = 6; r <= 20; r++) pixels.push(px(c, r, hair));
      for (let c = 22; c <= 24; c++) for (let r = 6; r <= 20; r++) pixels.push(px(c, r, hair));
      // Shine streak
      pixels.push(px(14, 5, lh, 0.5)); pixels.push(px(15, 5, lh, 0.5));
      break;
    case "long_curly":
      for (let c = 8; c <= 23; c++) pixels.push(px(c, 4, hair));
      for (let c = 6; c <= 25; c++) pixels.push(px(c, 5, hair));
      for (let c = 5; c <= 9; c++) for (let r = 6; r <= 19; r++) pixels.push(px(c, r, r%2===0?hair:darkHair));
      for (let c = 22; c <= 26; c++) for (let r = 6; r <= 19; r++) pixels.push(px(c, r, r%2===0?hair:darkHair));
      break;
    case "afro":
      for (let c = 8; c <= 23; c++) for (let r = 1; r <= 6; r++) pixels.push(px(c, r, hair));
      for (let c = 6; c <= 25; c++) pixels.push(px(c, 7, hair));
      for (let c = 5; c <= 6; c++) for (let r = 7; r <= 13; r++) pixels.push(px(c, r, hair));
      for (let c = 25; c <= 26; c++) for (let r = 7; r <= 13; r++) pixels.push(px(c, r, hair));
      // Texture
      [9,11,13,15,17,19,21].forEach(c => [2,4,6].forEach(r => pixels.push(px(c, r, lh, 0.3))));
      break;
    case "locs":
      for (let c = 9; c <= 22; c++) pixels.push(px(c, 4, hair));
      for (let c = 7; c <= 24; c++) pixels.push(px(c, 5, hair));
      // Loc strands
      [8,10,12,14,16,18,20,22,24].forEach((c, i) => {
        for (let r = 6; r <= 10+i%3*2; r++) pixels.push(px(c, r, i%2===0?hair:darkHair));
      });
      break;
    case "braids":
      for (let c = 9; c <= 22; c++) pixels.push(px(c, 4, hair));
      for (let c = 7; c <= 24; c++) pixels.push(px(c, 5, hair));
      // Braid texture left side
      for (let r = 6; r <= 18; r++) {
        pixels.push(px(7, r, r%2===0?hair:darkHair));
        pixels.push(px(8, r, r%2===0?darkHair:hair));
        pixels.push(px(23, r, r%2===0?hair:darkHair));
        pixels.push(px(24, r, r%2===0?darkHair:hair));
      }
      break;
    case "bun":
      // Bun on top
      for (let c = 12; c <= 19; c++) for (let r = 1; r <= 4; r++) pixels.push(px(c, r, hair));
      for (let c = 11; c <= 20; c++) pixels.push(px(c, 5, hair));
      for (let c = 7; c <= 9; c++) for (let r = 5; r <= 9; r++) pixels.push(px(c, r, hair));
      for (let c = 22; c <= 24; c++) for (let r = 5; r <= 9; r++) pixels.push(px(c, r, hair));
      break;
    case "ponytail":
      for (let c = 9; c <= 22; c++) pixels.push(px(c, 4, hair));
      for (let c = 7; c <= 24; c++) pixels.push(px(c, 5, hair));
      // Ponytail band
      for (let c = 14; c <= 17; c++) pixels.push(px(c, 3, "#FF8A8A"));
      // Tail falls right
      for (let r = 3; r <= 14; r++) {
        pixels.push(px(21+Math.floor(r/4), r, hair));
        pixels.push(px(22+Math.floor(r/4), r, hair));
      }
      break;
    case "space_buns":
      // Left bun
      for (let c = 7; c <= 13; c++) for (let r = 1; r <= 5; r++) pixels.push(px(c, r, hair));
      // Right bun
      for (let c = 18; c <= 24; c++) for (let r = 1; r <= 5; r++) pixels.push(px(c, r, hair));
      // Base
      for (let c = 9; c <= 22; c++) pixels.push(px(c, 5, hair));
      for (let c = 7; c <= 8; c++) for (let r = 5; r <= 9; r++) pixels.push(px(c, r, hair));
      for (let c = 23; c <= 24; c++) for (let r = 5; r <= 9; r++) pixels.push(px(c, r, hair));
      break;
    case "curtain_bangs":
      for (let c = 9; c <= 22; c++) pixels.push(px(c, 4, hair));
      for (let c = 7; c <= 24; c++) pixels.push(px(c, 5, hair));
      // Curtain fringe
      for (let c = 7; c <= 10; c++) for (let r = 5; r <= 8; r++) pixels.push(px(c, r, hair));
      for (let c = 21; c <= 24; c++) for (let r = 5; r <= 8; r++) pixels.push(px(c, r, hair));
      pixels.push(px(11, 8, hair)); pixels.push(px(12, 8, hair));
      pixels.push(px(19, 8, hair)); pixels.push(px(20, 8, hair));
      break;
    case "coily":
      // Dense coily crown
      for (let c = 7; c <= 24; c++) for (let r = 2; r <= 6; r++) pixels.push(px(c, r, r%2===0?hair:lh));
      for (let c = 5; c <= 8; c++) for (let r = 6; r <= 13; r++) pixels.push(px(c, r, hair));
      for (let c = 23; c <= 26; c++) for (let r = 6; r <= 13; r++) pixels.push(px(c, r, hair));
      break;
    case "finger_waves":
      for (let c = 9; c <= 22; c++) pixels.push(px(c, 4, hair));
      for (let c = 7; c <= 24; c++) pixels.push(px(c, 5, hair));
      // Wave texture
      for (let r = 5; r <= 15; r++) {
        const wc = Math.sin(r * 0.8) > 0 ? lh : darkHair;
        pixels.push(px(7, r, wc)); pixels.push(px(8, r, wc));
        pixels.push(px(23, r, wc)); pixels.push(px(24, r, wc));
      }
      break;
    case "hijab":
      // Hijab covering
      for (let c = 7; c <= 24; c++) for (let r = 4; r <= 8; r++) pixels.push(px(c, r, hair));
      for (let c = 5; c <= 26; c++) pixels.push(px(c, 9, hair));
      for (let c = 5; c <= 7; c++) for (let r = 9; r <= 20; r++) pixels.push(px(c, r, hair));
      for (let c = 24; c <= 26; c++) for (let r = 9; r <= 20; r++) pixels.push(px(c, r, hair));
      for (let c = 7; c <= 24; c++) pixels.push(px(c, 20, hair, 0.7));
      pixels.push(px(13, 5, lh, 0.3)); pixels.push(px(14, 5, lh, 0.3));
      break;
    case "turban":
      for (let c = 7; c <= 24; c++) for (let r = 3; r <= 7; r++) pixels.push(px(c, r, hair));
      for (let c = 9; c <= 22; c++) pixels.push(px(c, 2, hair));
      // Turban fold lines
      for (let c = 7; c <= 24; c++) pixels.push(px(c, 5, lh, 0.3));
      pixels.push(px(14, 3, lh, 0.5)); pixels.push(px(15, 3, lh, 0.5));
      for (let c = 5; c <= 7; c++) for (let r = 7; r <= 11; r++) pixels.push(px(c, r, hair));
      for (let c = 24; c <= 26; c++) for (let r = 7; r <= 11; r++) pixels.push(px(c, r, hair));
      break;
    case "hat_baseball":
      for (let c = 7; c <= 24; c++) for (let r = 3; r <= 7; r++) pixels.push(px(c, r, hair));
      // Brim
      for (let c = 7; c <= 26; c++) pixels.push(px(c, 8, darkHair));
      for (let c = 9; c <= 24; c++) pixels.push(px(c, 9, darkHair, 0.6));
      pixels.push(px(14, 3, lh, 0.4)); pixels.push(px(15, 3, lh, 0.4));
      break;
    case "hat_beanie":
      for (let c = 8; c <= 23; c++) for (let r = 2; r <= 6; r++) pixels.push(px(c, r, hair));
      for (let c = 7; c <= 24; c++) pixels.push(px(c, 7, darkHair));
      for (let c = 7; c <= 24; c++) pixels.push(px(c, 8, darkHair));
      for (let c = 5; c <= 7; c++) for (let r = 7; r <= 10; r++) pixels.push(px(c, r, hair));
      for (let c = 24; c <= 26; c++) for (let r = 7; r <= 10; r++) pixels.push(px(c, r, hair));
      // Pompom
      pixels.push(px(14, 1, lh)); pixels.push(px(15, 1, lh)); pixels.push(px(16, 1, lh));
      pixels.push(px(15, 0, lh));
      break;
    default:
      for (let c = 9; c <= 22; c++) pixels.push(px(c, 4, hair));
      for (let c = 7; c <= 24; c++) pixels.push(px(c, 5, hair));
  }
}

function renderFacialHair(pixels, style, dk, hair) {
  switch (style) {
    case "stubble":
      [11,12,13,14,15,16,17,18].forEach(c => pixels.push(px(c, 17, hair, 0.35)));
      [12,13,14,15,16,17].forEach(c => pixels.push(px(c, 18, hair, 0.35)));
      break;
    case "mustache":
      for (let c = 12; c <= 18; c++) pixels.push(px(c, 16, hair, 0.85));
      break;
    case "beard_short":
      for (let c = 11; c <= 20; c++) pixels.push(px(c, 17, hair));
      for (let c = 11; c <= 20; c++) pixels.push(px(c, 18, hair));
      for (let c = 12; c <= 19; c++) pixels.push(px(c, 19, hair, 0.7));
      break;
    case "beard_full":
      for (let c = 10; c <= 21; c++) for (let r = 16; r <= 20; r++) pixels.push(px(c, r, hair, 0.9));
      for (let c = 11; c <= 20; c++) pixels.push(px(c, 21, hair, 0.5));
      break;
  }
}

function renderAccessory(pixels, style, eye, hair) {
  switch (style) {
    case "glasses_round":
      // Left lens
      [10,11,12,13].forEach(c => { pixels.push(px(c, 10, "#8BAACC")); pixels.push(px(c, 13, "#8BAACC")); });
      [9].forEach(r2 => { pixels.push(px(9, 11, "#8BAACC")); pixels.push(px(9, 12, "#8BAACC")); pixels.push(px(14, 11, "#8BAACC")); pixels.push(px(14, 12, "#8BAACC")); });
      // Right lens
      [17,18,19,20].forEach(c => { pixels.push(px(c, 10, "#8BAACC")); pixels.push(px(c, 13, "#8BAACC")); });
      pixels.push(px(16, 11, "#8BAACC")); pixels.push(px(16, 12, "#8BAACC"));
      pixels.push(px(21, 11, "#8BAACC")); pixels.push(px(21, 12, "#8BAACC"));
      // Bridge
      pixels.push(px(15, 11, "#8BAACC")); pixels.push(px(16, 11, "#8BAACC"));
      break;
    case "glasses_square":
      for (let r = 10; r <= 13; r++) {
        pixels.push(px(9, r, "#C4B0A0")); pixels.push(px(14, r, "#C4B0A0"));
        pixels.push(px(16, r, "#C4B0A0")); pixels.push(px(21, r, "#C4B0A0"));
      }
      [9,10,11,12,13,14].forEach(c => pixels.push(px(c, 10, "#C4B0A0")));
      [9,10,11,12,13,14].forEach(c => pixels.push(px(c, 13, "#C4B0A0")));
      [16,17,18,19,20,21].forEach(c => pixels.push(px(c, 10, "#C4B0A0")));
      [16,17,18,19,20,21].forEach(c => pixels.push(px(c, 13, "#C4B0A0")));
      pixels.push(px(15, 11, "#C4B0A0")); pixels.push(px(15, 12, "#C4B0A0"));
      break;
    case "sunglasses":
      [9,10,11,12,13,14,15,16,17,18,19,20,21].forEach(c => pixels.push(px(c, 11, "#1A1A2E", 0.9)));
      [9,10,11,12,13,14,16,17,18,19,20,21].forEach(c => pixels.push(px(c, 12, "#1A1A2E", 0.75)));
      pixels.push(px(10, 10, "#1A1A2E", 0.5)); pixels.push(px(20, 10, "#1A1A2E", 0.5));
      break;
    case "earrings":
      pixels.push(px(8, 14, "#FFCD75")); pixels.push(px(8, 15, "#FFCD75"));
      pixels.push(px(23, 14, "#FFCD75")); pixels.push(px(23, 15, "#FFCD75"));
      break;
    case "headband":
      for (let c = 9; c <= 22; c++) pixels.push(px(c, 7, hair));
      pixels.push(px(8, 7, hair)); pixels.push(px(23, 7, hair));
      break;
    case "flowers":
      // Flower crown
      [9,12,15,18,21].forEach((c, i) => {
        const cols = ["#E75480","#FF8A8A","#B8F400","#FFCD75","#C4B5FD"][i];
        pixels.push(px(c, 5, cols)); pixels.push(px(c+1, 4, cols));
      });
      break;
    case "necklace":
      for (let c = 13; c <= 18; c++) pixels.push(px(c, 23, "#FFCD75", 0.9));
      pixels.push(px(15, 24, "#FFCD75")); pixels.push(px(16, 24, "#FFCD75"));
      break;
    case "crown":
      pixels.push(px(10, 4, "#FFCD75")); pixels.push(px(12, 3, "#FFCD75")); pixels.push(px(14, 4, "#FFCD75"));
      pixels.push(px(15, 4, "#FFCD75")); pixels.push(px(17, 3, "#FFCD75")); pixels.push(px(19, 4, "#FFCD75"));
      pixels.push(px(21, 4, "#FFCD75"));
      for (let c = 10; c <= 21; c++) pixels.push(px(c, 5, "#FFCD75"));
      // Gems
      pixels.push(px(12, 4, "#00D4C8")); pixels.push(px(15, 3, "#F97316")); pixels.push(px(19, 4, "#8B5CF6"));
      break;
  }
}

function renderFace(pixels, gender, skin, eyeColor, blushColor = "#FF8A8A") {
  const dk = adj(skin, -50);
  const lk = adj(skin, 60);
  const isFem = gender === "fem";
  const isNeut = gender === "neut";

  // Head
  for (let c = 9; c <= 22; c++) for (let r = 6; r <= 21; r++) pixels.push(px(c, r, skin));
  for (let c = 10; c <= 21; c++) pixels.push(px(c, 5, skin));
  for (let c = 11; c <= 20; c++) pixels.push(px(c, 4, skin));

  // Jaw shape
  for (let c = 10; c <= 21; c++) pixels.push(px(c, 20, skin));
  for (let c = 11; c <= 20; c++) pixels.push(px(c, 21, skin));
  for (let c = 13; c <= 18; c++) pixels.push(px(c, 22, skin));

  // Highlights
  pixels.push(px(11, 7, lk, 0.3)); pixels.push(px(20, 7, lk, 0.3));

  // Ears
  pixels.push(px(8, 12, skin)); pixels.push(px(8, 13, skin)); pixels.push(px(8, 14, skin));
  pixels.push(px(23, 12, skin)); pixels.push(px(23, 13, skin)); pixels.push(px(23, 14, skin));
  pixels.push(px(7, 13, dk, 0.3)); pixels.push(px(24, 13, dk, 0.3));

  // Eyes — gender-aware
  if (isFem) {
    // Almond eyes with lashes, row 11-13
    for (let c = 10; c <= 14; c++) pixels.push(px(c, 10, "#FFFFFF"));
    for (let c = 10; c <= 14; c++) pixels.push(px(c, 11, "#FFFFFF"));
    for (let c = 17; c <= 21; c++) pixels.push(px(c, 10, "#FFFFFF"));
    for (let c = 17; c <= 21; c++) pixels.push(px(c, 11, "#FFFFFF"));
    // Iris
    pixels.push(px(11, 10, eyeColor)); pixels.push(px(12, 10, eyeColor));
    pixels.push(px(11, 11, eyeColor)); pixels.push(px(12, 11, eyeColor));
    pixels.push(px(18, 10, eyeColor)); pixels.push(px(19, 10, eyeColor));
    pixels.push(px(18, 11, eyeColor)); pixels.push(px(19, 11, eyeColor));
    // Pupil
    pixels.push(px(12, 11, "#0A0A1A")); pixels.push(px(19, 11, "#0A0A1A"));
    // Catchlight
    pixels.push(px(10, 10, "#FFFFFF")); pixels.push(px(17, 10, "#FFFFFF"));
    // Lashes
    [9,10,11,12,13,14].forEach(c => pixels.push(px(c, 9, "#1A1A1A", 0.9)));
    [16,17,18,19,20,21].forEach(c => pixels.push(px(c, 9, "#1A1A1A", 0.9)));
    pixels.push(px(9, 10, "#1A1A1A")); pixels.push(px(22, 10, "#1A1A1A"));
    // Arched brows
    [10,11,12,13].forEach(c => pixels.push(px(c, 8, "#1A1A1A", 0.75)));
    [18,19,20,21].forEach(c => pixels.push(px(c, 8, "#1A1A1A", 0.75)));
  } else if (isNeut) {
    // Big chibi eyes
    for (let c = 10; c <= 13; c++) for (let r = 10; r <= 12; r++) pixels.push(px(c, r, "#FFFFFF"));
    for (let c = 17; c <= 20; c++) for (let r = 10; r <= 12; r++) pixels.push(px(c, r, "#FFFFFF"));
    pixels.push(px(11, 11, eyeColor)); pixels.push(px(12, 11, eyeColor));
    pixels.push(px(18, 11, eyeColor)); pixels.push(px(19, 11, eyeColor));
    pixels.push(px(11, 12, "#0A0A1A")); pixels.push(px(18, 12, "#0A0A1A"));
    pixels.push(px(10, 10, "#FFFFFF")); pixels.push(px(17, 10, "#FFFFFF"));
    // High soft brows
    [10,11,12].forEach(c => pixels.push(px(c, 8, "#1A1A1A", 0.45)));
    [18,19,20].forEach(c => pixels.push(px(c, 8, "#1A1A1A", 0.45)));
  } else {
    // Masculine — narrower, 3×2
    for (let c = 10; c <= 13; c++) pixels.push(px(c, 11, "#FFFFFF"));
    for (let c = 10; c <= 13; c++) pixels.push(px(c, 12, "#FFFFFF"));
    for (let c = 17; c <= 20; c++) pixels.push(px(c, 11, "#FFFFFF"));
    for (let c = 17; c <= 20; c++) pixels.push(px(c, 12, "#FFFFFF"));
    pixels.push(px(11, 11, eyeColor)); pixels.push(px(12, 11, eyeColor));
    pixels.push(px(11, 12, eyeColor)); pixels.push(px(12, 12, eyeColor));
    pixels.push(px(18, 11, eyeColor)); pixels.push(px(19, 11, eyeColor));
    pixels.push(px(18, 12, eyeColor)); pixels.push(px(19, 12, eyeColor));
    pixels.push(px(12, 12, "#0A0A1A")); pixels.push(px(19, 12, "#0A0A1A"));
    pixels.push(px(10, 11, "#FFFFFF")); pixels.push(px(17, 11, "#FFFFFF"));
    // Flat brows
    [10,11,12,13].forEach(c => pixels.push(px(c, 9, "#1A1A1A", 0.8)));
    [17,18,19,20].forEach(c => pixels.push(px(c, 9, "#1A1A1A", 0.8)));
  }

  // Nose
  pixels.push(px(14, 14, dk, 0.55)); pixels.push(px(15, 14, dk, 0.55));
  pixels.push(px(14, 15, dk, 0.35)); pixels.push(px(16, 15, dk, 0.35));

  // Lips
  const lip = isFem ? "#C84458" : isNeut ? "#D85560" : "#B05858";
  const lipO = isFem ? 0.95 : isNeut ? 0.8 : 0.75;
  if (isFem) {
    [11,12,13,14,15,16,17,18,19,20].forEach(c => pixels.push(px(c, 17, lip, lipO)));
    [12,13,14,15,16,17,18,19].forEach(c => pixels.push(px(c, 18, lip, lipO * 0.75)));
    [13,14,15,16].forEach(c => pixels.push(px(c, 17, "#FFFFFF", 0.55)));
    pixels.push(px(12, 16, dk, 0.35)); pixels.push(px(19, 16, dk, 0.35));
  } else if (isNeut) {
    [13,14,15,16,17,18].forEach(c => pixels.push(px(c, 17, lip, lipO)));
    pixels.push(px(12, 16, dk, 0.3)); pixels.push(px(19, 16, dk, 0.3));
  } else {
    [12,13,14,15,16,17,18,19].forEach(c => pixels.push(px(c, 17, lip, lipO)));
    [13,14,15,16].forEach(c => pixels.push(px(c, 17, "#FFFFFF", 0.35)));
  }

  // Blush
  if (isFem || isNeut) {
    const bO = isFem ? 0.5 : 0.4;
    [8,9].forEach(c => pixels.push(px(c, 14, blushColor, bO)));
    [22,23].forEach(c => pixels.push(px(c, 14, blushColor, bO)));
    pixels.push(px(9, 13, lk, 0.3)); pixels.push(px(22, 13, lk, 0.3));
  }
}

function renderAvatar(cfg) {
  const pixels = [];
  const skin = cfg.skinColor || "#E8A87C";
  const hair = cfg.hairColor || "#1A1A1A";
  const eye  = cfg.eyeColor  || "#5C3A1E";
  const dark = adj(hair, -40);
  const oColor = cfg.outfitColor || "#1E3A5F";
  const gender = cfg.gender || "masc";

  renderBody(pixels, gender, skin, cfg.outfit || "tshirt", oColor);
  renderFace(pixels, gender, skin, eye, cfg.blushColor || "#FF8A8A");
  renderHair(pixels, cfg.hairStyle || "short_straight", hair, dark, skin);
  if (cfg.facialHair && cfg.facialHair !== "none") renderFacialHair(pixels, cfg.facialHair, adj(skin,-40), hair);
  if (cfg.accessory && cfg.accessory !== "none") renderAccessory(pixels, cfg.accessory, eye, hair);

  return pixels.join("");
}

const PixelAvatar = ({ config, size = 100 }) => {
  const safe = config || { skinColor:"#E8A87C", hairColor:"#1A1A1A", hairStyle:"short_straight", outfitColor:"#1E3A5F", outfit:"tshirt", bgColor:"#1A0D3D", eyeColor:"#5C3A1E", facialHair:"none", accessory:"none", gender:"masc" };
  const html = useMemo(() => renderAvatar(safe), [JSON.stringify(safe)]);
  return (
    <div style={{ width:size, height:size, background:safe.bgColor, flexShrink:0, overflow:"hidden" }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${W*PX} ${H*PX}`} style={{ imageRendering:"pixelated", display:"block" }} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════════ */
const T = {
  bg0: "#07061A",
  bg1: "#0D0B22",
  bg2: "#12103A",
  bg3: "#1A1840",
  border: "rgba(139,92,246,0.15)",
  teal: "#00D4C8",
  lime: "#B8F400",
  violet: "#8B5CF6",
  flame: "#F97316",
  gold: "#FFCD75",
  red: "#B13E53",
  muted: "#566C86",
  text: "#F4F4F4",
  textSoft: "#94B0C2",
};

const fontPixel = { fontFamily: "'Press Start 2P', monospace", imageRendering: "pixelated" };

/* ═══════════════════════════════════════════════════════════════
   DATA CONSTANTS
═══════════════════════════════════════════════════════════════ */
const SKIN_TONES = [
  { id:"s1",  hex:"#FDDBB4", label:"Porcelain"   },
  { id:"s2",  hex:"#F5C5A3", label:"Ivory"       },
  { id:"s3",  hex:"#F0B89A", label:"Peach"       },
  { id:"s4",  hex:"#E8A87C", label:"Sand"        },
  { id:"s5",  hex:"#D4875A", label:"Honey"       },
  { id:"s6",  hex:"#C4733A", label:"Tan"         },
  { id:"s7",  hex:"#B5813F", label:"Golden"      },
  { id:"s8",  hex:"#A0522D", label:"Caramel"     },
  { id:"s9",  hex:"#C8A882", label:"Olive"       },
  { id:"s10", hex:"#8B5E3C", label:"Mocha"       },
  { id:"s11", hex:"#7B3F1E", label:"Cacao"       },
  { id:"s12", hex:"#4A2810", label:"Espresso"    },
  { id:"s13", hex:"#2C1A0E", label:"Ebony"       },
  { id:"s14", hex:"#1A0D06", label:"Midnight"    },
];

const HAIR_COLORS = [
  { id:"hc1",  hex:"#1A1A1A", label:"Black"      },
  { id:"hc2",  hex:"#3B2314", label:"Dark Brown" },
  { id:"hc3",  hex:"#6B3A2A", label:"Brown"      },
  { id:"hc4",  hex:"#8B3A0F", label:"Auburn"     },
  { id:"hc5",  hex:"#C8A415", label:"Blonde"     },
  { id:"hc6",  hex:"#E8DFC8", label:"Platinum"   },
  { id:"hc7",  hex:"#B22222", label:"Red"        },
  { id:"hc8",  hex:"#E75480", label:"Pink"       },
  { id:"hc9",  hex:"#1E4D8C", label:"Blue"       },
  { id:"hc10", hex:"#6B3FA0", label:"Purple"     },
  { id:"hc11", hex:"#2D6A2D", label:"Green"      },
  { id:"hc12", hex:"#00D4C8", label:"Teal"       },
  { id:"hc13", hex:"#9B9B9B", label:"Gray"       },
  { id:"hc14", hex:"#F0EDE8", label:"White"      },
];

const EYE_COLORS = [
  { id:"ec1", hex:"#5C3A1E", label:"Brown"  },
  { id:"ec2", hex:"#7B5C2A", label:"Hazel"  },
  { id:"ec3", hex:"#2D6B4F", label:"Green"  },
  { id:"ec4", hex:"#2B5EA7", label:"Blue"   },
  { id:"ec5", hex:"#5B6B7A", label:"Gray"   },
  { id:"ec6", hex:"#B8860B", label:"Amber"  },
  { id:"ec7", hex:"#5B3A8C", label:"Violet" },
  { id:"ec8", hex:"#1A0F00", label:"Black"  },
];

const BLUSH_COLORS = [
  { id:"b1", hex:"#FF8A8A", label:"Rose"   },
  { id:"b2", hex:"#FFB5C8", label:"Pink"   },
  { id:"b3", hex:"#F97316", label:"Peach"  },
  { id:"b4", hex:"#C4B5FD", label:"Lilac"  },
  { id:"b5", hex:"#00D4C8", label:"Teal"   },
  { id:"b6", hex:"#B8F400", label:"Lime"   },
];

const HAIR_STYLES = [
  { id:"bald",          label:"Bald"           },
  { id:"buzz",          label:"Buzz"           },
  { id:"short_straight",label:"Short Straight" },
  { id:"short_curly",   label:"Short Curly"    },
  { id:"pixie",         label:"Pixie"          },
  { id:"curtain_bangs", label:"Curtain Bangs"  },
  { id:"medium_wavy",   label:"Medium Wavy"    },
  { id:"long_straight", label:"Long Straight"  },
  { id:"long_curly",    label:"Long Curly"     },
  { id:"afro",          label:"Afro"           },
  { id:"coily",         label:"Coily Natural"  },
  { id:"locs",          label:"Locs"           },
  { id:"braids",        label:"Braids"         },
  { id:"finger_waves",  label:"Finger Waves"   },
  { id:"bun",           label:"Bun"            },
  { id:"ponytail",      label:"Ponytail"       },
  { id:"space_buns",    label:"Space Buns"     },
  { id:"hijab",         label:"Hijab"          },
  { id:"turban",        label:"Turban"         },
  { id:"hat_baseball",  label:"Cap"            },
  { id:"hat_beanie",    label:"Beanie"         },
];

const FACIAL_HAIR = [
  { id:"none",        label:"None"       },
  { id:"stubble",     label:"Stubble"    },
  { id:"mustache",    label:"Mustache"   },
  { id:"beard_short", label:"Short Beard"},
  { id:"beard_full",  label:"Full Beard" },
];

const OUTFITS = [
  { id:"tshirt",   label:"T-Shirt"   },
  { id:"hoodie",   label:"Hoodie"    },
  { id:"blazer",   label:"Blazer"    },
  { id:"dress",    label:"Dress"     },
  { id:"overalls", label:"Overalls"  },
  { id:"uniform",  label:"Uniform"   },
];

const OUTFIT_COLORS = [
  { id:"navy",   hex:"#1E3A5F", label:"Navy"   },
  { id:"red",    hex:"#C0392B", label:"Red"    },
  { id:"forest", hex:"#1E5F3A", label:"Forest" },
  { id:"purple", hex:"#5B2C8C", label:"Purple" },
  { id:"orange", hex:"#C86A1E", label:"Orange" },
  { id:"teal",   hex:"#1A7A6E", label:"Teal"   },
  { id:"black",  hex:"#1A1A2E", label:"Black"  },
  { id:"gray",   hex:"#5A6472", label:"Gray"   },
  { id:"white",  hex:"#CDD5DE", label:"Light"  },
  { id:"pink",   hex:"#C43C6E", label:"Pink"   },
  { id:"gold",   hex:"#8B6914", label:"Gold"   },
  { id:"rust",   hex:"#8B3A1E", label:"Rust"   },
];

const ACCESSORIES = [
  { id:"none",           label:"None"         },
  { id:"glasses_round",  label:"Round Glasses"},
  { id:"glasses_square", label:"Square Glasses"},
  { id:"sunglasses",     label:"Sunglasses"   },
  { id:"earrings",       label:"Earrings"     },
  { id:"headband",       label:"Headband"     },
  { id:"flowers",        label:"Flower Crown" },
  { id:"necklace",       label:"Necklace"     },
  { id:"crown",          label:"Crown"        },
];

const BG_COLORS = [
  { id:"cosmic",   hex:"#1A0D3D", label:"Cosmic"   },
  { id:"midnight", hex:"#0A0A1A", label:"Midnight" },
  { id:"sky",      hex:"#B4D9F5", label:"Sky"      },
  { id:"lavender", hex:"#C4B5F5", label:"Lavender" },
  { id:"mint",     hex:"#A8E6CF", label:"Mint"     },
  { id:"peach",    hex:"#FFD5B8", label:"Peach"    },
  { id:"rose",     hex:"#FFB5C8", label:"Rose"     },
  { id:"lemon",    hex:"#FFF3A3", label:"Lemon"    },
  { id:"forest",   hex:"#1A3D2E", label:"Forest"   },
  { id:"ocean",    hex:"#0D2B45", label:"Ocean"    },
];

const PRESETS = [
  { gender:"fem",  hairStyle:"afro",           hairColor:"#1A1A1A", skinColor:"#4A2810", eyeColor:"#5C3A1E", facialHair:"none",       outfit:"dress",    outfitColor:"#C86A1E", accessory:"earrings",       bgColor:"#FFD5B8", blushColor:"#FF8A8A" },
  { gender:"fem",  hairStyle:"hijab",           hairColor:"#1E3A5F", skinColor:"#E8A87C", eyeColor:"#5C3A1E", facialHair:"none",       outfit:"blazer",   outfitColor:"#5B2C8C", accessory:"none",           bgColor:"#B4D9F5", blushColor:"#FFB5C8" },
  { gender:"fem",  hairStyle:"space_buns",      hairColor:"#E75480", skinColor:"#FDDBB4", eyeColor:"#2D6B4F", facialHair:"none",       outfit:"dress",    outfitColor:"#C43C6E", accessory:"flowers",        bgColor:"#FFB5C8", blushColor:"#FFB5C8" },
  { gender:"fem",  hairStyle:"braids",          hairColor:"#3B2314", skinColor:"#B5813F", eyeColor:"#B8860B", facialHair:"none",       outfit:"hoodie",   outfitColor:"#1A7A6E", accessory:"none",           bgColor:"#C4B5F5", blushColor:"#FF8A8A" },
  { gender:"fem",  hairStyle:"pixie",           hairColor:"#8B3A0F", skinColor:"#F5C5A3", eyeColor:"#7B5C2A", facialHair:"none",       outfit:"tshirt",   outfitColor:"#1E5F3A", accessory:"glasses_round",  bgColor:"#A8E6CF", blushColor:"#FF8A8A" },
  { gender:"fem",  hairStyle:"locs",            hairColor:"#3B2314", skinColor:"#2C1A0E", eyeColor:"#B8860B", facialHair:"none",       outfit:"blazer",   outfitColor:"#1A1A2E", accessory:"earrings",       bgColor:"#FFF3A3", blushColor:"#F97316" },
  { gender:"masc", hairStyle:"turban",          hairColor:"#C86A1E", skinColor:"#C8A882", eyeColor:"#5C3A1E", facialHair:"beard_short",outfit:"uniform",  outfitColor:"#1E3A5F", accessory:"none",           bgColor:"#E8D5B0", blushColor:"#FF8A8A" },
  { gender:"masc", hairStyle:"short_curly",     hairColor:"#6B3A2A", skinColor:"#D4875A", eyeColor:"#2B5EA7", facialHair:"stubble",    outfit:"tshirt",   outfitColor:"#5A6472", accessory:"none",           bgColor:"#0A0A1A", blushColor:"#FF8A8A" },
  { gender:"masc", hairStyle:"afro",            hairColor:"#1A1A1A", skinColor:"#7B3F1E", eyeColor:"#5C3A1E", facialHair:"none",       outfit:"tshirt",   outfitColor:"#C86A1E", accessory:"none",           bgColor:"#FFF3A3", blushColor:"#FF8A8A" },
  { gender:"masc", hairStyle:"buzz",            hairColor:"#1A1A1A", skinColor:"#FDDBB4", eyeColor:"#2B5EA7", facialHair:"beard_full", outfit:"blazer",   outfitColor:"#1A1A2E", accessory:"glasses_square", bgColor:"#1A0D3D", blushColor:"#FF8A8A" },
  { gender:"neut", hairStyle:"hat_beanie",      hairColor:"#6B3FA0", skinColor:"#FDDBB4", eyeColor:"#5B3A8C", facialHair:"none",       outfit:"hoodie",   outfitColor:"#C0392B", accessory:"none",           bgColor:"#1A0D3D", blushColor:"#FFB5C8" },
  { gender:"neut", hairStyle:"coily",           hairColor:"#3B2314", skinColor:"#8B5E3C", eyeColor:"#5C3A1E", facialHair:"none",       outfit:"overalls", outfitColor:"#1E3A5F", accessory:"none",           bgColor:"#FFF3A3", blushColor:"#FF8A8A" },
  { gender:"fem",  hairStyle:"curtain_bangs",   hairColor:"#C8A415", skinColor:"#F0B89A", eyeColor:"#5B6B7A", facialHair:"none",       outfit:"tshirt",   outfitColor:"#C43C6E", accessory:"necklace",       bgColor:"#C4B5F5", blushColor:"#FF8A8A" },
  { gender:"masc", hairStyle:"hat_baseball",    hairColor:"#1E4D8C", skinColor:"#E8A87C", eyeColor:"#2B5EA7", facialHair:"mustache",   outfit:"tshirt",   outfitColor:"#1E5F3A", accessory:"none",           bgColor:"#0D2B45", blushColor:"#FF8A8A" },
  { gender:"fem",  hairStyle:"crown",           hairColor:"#6B3FA0", skinColor:"#FDDBB4", eyeColor:"#5B3A8C", facialHair:"none",       outfit:"dress",    outfitColor:"#5B2C8C", accessory:"crown",          bgColor:"#1A0D3D", blushColor:"#C4B5FD" },
  { gender:"masc", hairStyle:"finger_waves",    hairColor:"#1A1A1A", skinColor:"#1A0D06", eyeColor:"#5C3A1E", facialHair:"beard_short",outfit:"blazer",   outfitColor:"#1A1A2E", accessory:"none",           bgColor:"#0A0A1A", blushColor:"#FF8A8A" },
];

/* ═══════════════════════════════════════════════════════════════
   AVATAR CUSTOMIZER
═══════════════════════════════════════════════════════════════ */
const TABS = [
  { id:"body",   label:"Body"      },
  { id:"hair",   label:"Hair"      },
  { id:"face",   label:"Face"      },
  { id:"outfit", label:"Outfit"    },
  { id:"extras", label:"Extras"    },
  { id:"bg",     label:"Background"},
];

const Swatch = ({ hex, selected, onClick, size=40 }) => (
  <button onClick={onClick} title={hex} style={{
    width:size, height:size, background:hex, border:selected?`3px solid #fff`:`2px solid rgba(255,255,255,0.1)`,
    borderRadius:8, boxShadow:selected?`0 0 12px ${hex}88`:"none", cursor:"pointer", flexShrink:0, transition:"transform 0.1s",
  }} onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.12)"}} onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)"}} />
);

const MiniPickerGrid = ({ items, value, onChange, baseConfig, cols=4, size=60 }) => (
  <div style={{ display:"grid", gridTemplateColumns:`repeat(${cols}, 1fr)`, gap:8 }}>
    {items.map(item => {
      const sel = value === item.id;
      const miniCfg = { ...baseConfig, ...item.override };
      return (
        <button key={item.id} onClick={() => onChange(item.id)} title={item.label} style={{
          background: sel ? "rgba(0,212,200,0.15)" : "rgba(255,255,255,0.04)",
          border: `2px solid ${sel ? T.teal : "rgba(255,255,255,0.07)"}`,
          borderRadius:10, padding:4, cursor:"pointer", overflow:"hidden",
          boxShadow: sel ? `0 0 10px rgba(0,212,200,0.3)` : "none",
        }}>
          <PixelAvatar config={miniCfg} size={size} />
        </button>
      );
    })}
  </div>
);

const AvatarCustomizer = ({ config, onChange, onDone }) => {
  const [tab, setTab] = useState("body");
  const [cfg, setCfg] = useState(config);
  const set = (k, v) => setCfg(c => ({ ...c, [k]: v }));

  useEffect(() => { onChange(cfg); }, [JSON.stringify(cfg)]);

  const hairItems = HAIR_STYLES.map(s => ({ id:s.id, label:s.label, override:{ hairStyle:s.id } }));
  const outfitItems = OUTFITS.map(o => ({ id:o.id, label:o.label, override:{ outfit:o.id } }));
  const fhItems = FACIAL_HAIR.map(f => ({ id:f.id, label:f.label, override:{ facialHair:f.id } }));
  const accItems = ACCESSORIES.map(a => ({ id:a.id, label:a.label, override:{ accessory:a.id } }));

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", background: T.bg1 }}>
      {/* Live preview strip */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", borderBottom:`1px solid ${T.border}` }}>
        <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:4 }}>
          {PRESETS.map((p, i) => (
            <button key={i} onClick={() => setCfg(p)} style={{ border:`2px solid rgba(255,255,255,0.08)`, borderRadius:8, overflow:"hidden", flexShrink:0, cursor:"pointer", padding:0 }}>
              <PixelAvatar config={p} size={44} />
            </button>
          ))}
        </div>
        <div style={{ marginLeft:12, border:`3px solid ${T.teal}`, borderRadius:12, overflow:"hidden", boxShadow:`0 0 20px rgba(0,212,200,0.3)`, flexShrink:0 }}>
          <PixelAvatar config={cfg} size={80} />
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display:"flex", overflowX:"auto", borderBottom:`1px solid ${T.border}`, background:T.bg2 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            ...fontPixel, fontSize:7, padding:"10px 12px", background:"none", border:"none", cursor:"pointer",
            color: tab===t.id ? T.teal : T.muted,
            borderBottom: tab===t.id ? `2px solid ${T.lime}` : "2px solid transparent",
            whiteSpace:"nowrap", flexShrink:0,
          }}>{t.label.toUpperCase()}</button>
        ))}
      </div>

      {/* Controls area */}
      <div style={{ flex:1, overflowY:"auto", padding:16, display:"flex", flexDirection:"column", gap:16 }}>

        {tab === "body" && (<>
          {/* Gender select */}
          <div style={{ display:"flex", gap:8 }}>
            {[{id:"fem",label:"FEMME"},{id:"masc",label:"MASC"},{id:"neut",label:"KIDS"}].map(g => (
              <button key={g.id} onClick={() => set("gender", g.id)} style={{
                ...fontPixel, fontSize:7, flex:1, padding:"8px 0",
                background: cfg.gender===g.id ? T.violet : T.bg3,
                border: `2px solid ${cfg.gender===g.id ? T.violet : "rgba(255,255,255,0.08)"}`,
                color: cfg.gender===g.id ? "#fff" : T.muted, borderRadius:8, cursor:"pointer",
              }}>{g.label}</button>
            ))}
          </div>
          {/* Skin tones */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {SKIN_TONES.map(s => <Swatch key={s.id} hex={s.hex} selected={cfg.skinColor===s.hex} onClick={() => set("skinColor", s.hex)} size={36} />)}
          </div>
        </>)}

        {tab === "hair" && (<>
          <MiniPickerGrid items={hairItems} value={cfg.hairStyle} onChange={v => set("hairStyle", v)} baseConfig={cfg} cols={4} size={52} />
          <div style={{ height:1, background: T.border }} />
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {HAIR_COLORS.map(c => <Swatch key={c.id} hex={c.hex} selected={cfg.hairColor===c.hex} onClick={() => set("hairColor", c.hex)} size={36} />)}
          </div>
        </>)}

        {tab === "face" && (<>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {EYE_COLORS.map(c => <Swatch key={c.id} hex={c.hex} selected={cfg.eyeColor===c.hex} onClick={() => set("eyeColor", c.hex)} size={40} />)}
          </div>
          {cfg.gender !== "neut" && (<>
            <div style={{ height:1, background:T.border }} />
            <MiniPickerGrid items={fhItems} value={cfg.facialHair} onChange={v => set("facialHair", v)} baseConfig={cfg} cols={4} size={52} />
          </>)}
          {(cfg.gender === "fem" || cfg.gender === "neut") && (<>
            <div style={{ height:1, background:T.border }} />
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {BLUSH_COLORS.map(c => <Swatch key={c.id} hex={c.hex} selected={cfg.blushColor===c.hex} onClick={() => set("blushColor", c.hex)} size={36} />)}
            </div>
          </>)}
        </>)}

        {tab === "outfit" && (<>
          <MiniPickerGrid items={outfitItems} value={cfg.outfit} onChange={v => set("outfit", v)} baseConfig={cfg} cols={3} size={60} />
          <div style={{ height:1, background:T.border }} />
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {OUTFIT_COLORS.map(c => <Swatch key={c.id} hex={c.hex} selected={cfg.outfitColor===c.hex} onClick={() => set("outfitColor", c.hex)} size={36} />)}
          </div>
        </>)}

        {tab === "extras" && (
          <MiniPickerGrid items={accItems} value={cfg.accessory} onChange={v => set("accessory", v)} baseConfig={cfg} cols={4} size={52} />
        )}

        {tab === "bg" && (
          <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
            {BG_COLORS.map(c => <Swatch key={c.id} hex={c.hex} selected={cfg.bgColor===c.hex} onClick={() => set("bgColor", c.hex)} size={48} />)}
          </div>
        )}
      </div>

      {/* Save */}
      <div style={{ padding:16, borderTop:`1px solid ${T.border}` }}>
        <button onClick={onDone} style={{
          ...fontPixel, fontSize:8, width:"100%", padding:"12px 0",
          background:`linear-gradient(135deg, ${T.teal}, ${T.lime})`, color:T.bg0,
          border:"none", borderRadius:10, cursor:"pointer", fontWeight:"bold",
        }}>SAVE AVATAR</button>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SMALL REUSABLE UI COMPONENTS
═══════════════════════════════════════════════════════════════ */
const PixelPanel = ({ accent=T.border, children, style={} }) => (
  <div style={{ background:T.bg2, border:`2px solid ${accent}`, borderRadius:12, ...style }}>{children}</div>
);

const XPBar = ({ current, max, color=T.lime, height=8 }) => {
  const pct = Math.min(100, (current/max)*100);
  return (
    <div style={{ width:"100%", background:"rgba(255,255,255,0.06)", borderRadius:4, overflow:"hidden", height }}>
      <div style={{ width:`${pct}%`, height:"100%", background:color, borderRadius:4, transition:"width 1s ease" }} />
    </div>
  );
};

// Pixel XP segmented bar
const PixelXPBar = ({ current, max, segments=16 }) => {
  const filled = Math.round((current/max)*segments);
  const ratio = filled/segments;
  const color = ratio<0.3?"#B13E53":ratio<0.7?T.gold:T.lime;
  return (
    <div style={{ display:"flex", gap:2, flexWrap:"wrap" }}>
      {Array.from({length:segments}).map((_,i) => (
        <div key={i} style={{ width:12, height:12, background:i<filled?color:"#1a1a3a", border:`1px solid ${i<filled?color:"#2a2a5a"}` }} />
      ))}
    </div>
  );
};

const StatPill = ({ icon, value, color }) => (
  <div style={{ display:"flex", alignItems:"center", gap:6, background:`${color}15`, border:`1px solid ${color}40`, borderRadius:20, padding:"4px 10px" }}>
    <span style={{ color, fontSize:12 }}>{icon}</span>
    <span style={{ ...fontPixel, fontSize:8, color }}>{value}</span>
  </div>
);

const SVGIcon = {
  bolt: () => <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg>,
  fire: () => <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
  coin: () => <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="8"/><path d="M9.5 9.5h5a2 2 0 0 1 0 4h-5a2 2 0 0 0 0 4h5.5"/></svg>,
  trophy: () => <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M12 17v-5M6 5h12v6a6 6 0 0 1-12 0V5z"/></svg>,
  star: () => <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/></svg>,
  map: () => <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2}><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>,
  user: () => <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="8" r="5"/><path d="M3 21c0-4 4-7 9-7s9 3 9 7"/></svg>,
  home: () => <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  chart: () => <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  pen: () => <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  shield: () => <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  bell: () => <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  logout: () => <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>,
  check: () => <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={3}><polyline points="20 6 9 17 4 12"/></svg>,
  lock: () => <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  friends: () => <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  game: () => <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4M8 10v4M15 12h2M18 12h-2"/></svg>,
};

/* ═══════════════════════════════════════════════════════════════
   RANKS SYSTEM
═══════════════════════════════════════════════════════════════ */
const RANKS = [
  { min:0,    label:"Seedling",    color:"#86efac" },
  { min:100,  label:"Coin Rookie", color:T.gold    },
  { min:300,  label:"Money Spark", color:T.teal    },
  { min:600,  label:"Budget Hero", color:T.flame   },
  { min:1000, label:"Cash Wizard", color:"#c4b5fd" },
  { min:2000, label:"Legend",      color:T.violet  },
];
const getRank = xp => [...RANKS].reverse().find(r => xp >= r.min) || RANKS[0];

/* ═══════════════════════════════════════════════════════════════
   ACTIVITY HEATMAP
═══════════════════════════════════════════════════════════════ */
const Heatmap = ({ weeks=12 }) => {
  const data = Array.from({length:weeks*7}, (_,i) => {
    const s = Math.sin(i*13.7+3)*0.5+0.5;
    return s>0.35 ? Math.floor(s*4) : 0;
  });
  const colors = ["rgba(255,255,255,0.05)","rgba(0,212,200,0.2)","rgba(0,212,200,0.5)",T.teal];
  return (
    <div style={{ display:"flex", gap:3 }}>
      {Array.from({length:weeks}).map((_,w) => (
        <div key={w} style={{ display:"flex", flexDirection:"column", gap:3 }}>
          {Array.from({length:7}).map((_,d) => (
            <div key={d} style={{ width:9, height:9, borderRadius:2, background:colors[data[w*7+d]] }} />
          ))}
        </div>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   BADGES
═══════════════════════════════════════════════════════════════ */
const BADGES = [
  { id:"first_lesson", label:"First Step",    color:T.teal,   unlocked:true  },
  { id:"streak3",      label:"3-Day Streak",  color:T.flame,  unlocked:true  },
  { id:"perfect",      label:"Perfect Score", color:T.gold,   unlocked:false },
  { id:"social",       label:"Social Learner",color:T.violet, unlocked:false },
  { id:"streak7",      label:"7-Day Streak",  color:T.lime,   unlocked:false },
  { id:"scholar",      label:"Scholar",       color:"#c4b5fd",unlocked:false },
];

const Badge = ({ label, color, unlocked }) => (
  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, opacity:unlocked?1:0.4 }}>
    <div style={{ width:44, height:44, borderRadius:10, background:unlocked?`${color}20`:`rgba(255,255,255,0.04)`, border:`2px solid ${unlocked?color:"rgba(255,255,255,0.1)"}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <SVGIcon.trophy />
    </div>
    <span style={{ ...fontPixel, fontSize:5, color:unlocked?color:T.muted, textAlign:"center", maxWidth:52 }}>{label.toUpperCase()}</span>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   LEAGUE LEADERBOARD
═══════════════════════════════════════════════════════════════ */
const LEADERBOARD = [
  { rank:1,  name:"Priya K",   xp:2840, avatar: PRESETS[0] },
  { rank:2,  name:"Tunde A",   xp:2100, avatar: PRESETS[8] },
  { rank:3,  name:"Sana R",    xp:1890, avatar: PRESETS[1] },
  { rank:14, name:"You",       xp:620,  avatar: null, isYou:true },
  { rank:15, name:"Jake M",    xp:580,  avatar: PRESETS[7] },
];

/* ═══════════════════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { id:"home",    Icon: SVGIcon.home    },
  { id:"path",    Icon: SVGIcon.map     },
  { id:"market",  Icon: SVGIcon.chart   },
  { id:"friends", Icon: SVGIcon.friends },
  { id:"profile", Icon: SVGIcon.user    },
];

/* ═══════════════════════════════════════════════════════════════
   CHAPTER PATH DATA
═══════════════════════════════════════════════════════════════ */
const CHAPTERS = [
  { id:1,  title:"Budgeting Basics",   done:true,  active:false, xp:50  },
  { id:2,  title:"Saving Habits",      done:true,  active:false, xp:50  },
  { id:3,  title:"Debt & Credit",      done:false, active:true,  xp:75  },
  { id:4,  title:"Investing 101",      done:false, active:false, xp:100 },
  { id:5,  title:"Stock Market",       done:false, active:false, xp:125 },
  { id:6,  title:"Crypto Basics",      done:false, active:false, xp:100 },
  { id:7,  title:"Real Estate",        done:false, active:false, xp:150 },
  { id:8,  title:"Tax Smarts",         done:false, active:false, xp:100 },
  { id:9,  title:"Retirement",         done:false, active:false, xp:150 },
  { id:10, title:"Wealth Building",    done:false, active:false, xp:200 },
];

/* ═══════════════════════════════════════════════════════════════
   SKILL NODES
═══════════════════════════════════════════════════════════════ */
const SKILLS_DATA = [
  { label:"Budget", level:2, max:5, color:T.teal   },
  { label:"Save",   level:2, max:5, color:T.lime   },
  { label:"Invest", level:1, max:5, color:T.violet },
  { label:"Credit", level:0, max:5, color:T.gold   },
  { label:"Tax",    level:0, max:5, color:T.flame  },
];

/* ═══════════════════════════════════════════════════════════════
   DASHBOARD PAGE
═══════════════════════════════════════════════════════════════ */
const DashboardPage = ({ avatar, xp=620, streak=3, coins=340, username="Learner" }) => {
  const rank = getRank(xp);
  const nextRank = RANKS.find(r => r.min > xp) || RANKS[RANKS.length-1];
  const xpToNext = nextRank.min - xp;

  return (
    <div style={{ padding:"20px 16px", display:"flex", flexDirection:"column", gap:20 }}>

      {/* Hero — Avatar + Rank + XP */}
      <PixelPanel accent={T.teal} style={{ overflow:"hidden" }}>
        <div style={{ display:"flex", alignItems:"stretch" }}>
          {/* Avatar column */}
          <div style={{ background:`linear-gradient(135deg, ${T.bg3}, rgba(0,212,200,0.08))`, padding:16, display:"flex", flexDirection:"column", alignItems:"center", gap:8, minWidth:120 }}>
            <div style={{ border:`3px solid ${T.teal}`, borderRadius:14, overflow:"hidden", boxShadow:`0 0 24px rgba(0,212,200,0.4)` }}>
              <PixelAvatar config={avatar} size={96} />
            </div>
            <span style={{ ...fontPixel, fontSize:8, color:rank.color }}>{rank.label.toUpperCase()}</span>
          </div>
          {/* Stats column */}
          <div style={{ flex:1, padding:16, display:"flex", flexDirection:"column", gap:10 }}>
            <div>
              <p style={{ ...fontPixel, fontSize:9, color:T.text, marginBottom:4 }}>{username.toUpperCase()}</p>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                <StatPill icon={<SVGIcon.bolt />} value={`${xp} XP`} color={T.teal} />
                <StatPill icon={<SVGIcon.fire />} value={`${streak}`}  color={T.flame} />
                <StatPill icon={<SVGIcon.coin />} value={`${coins}`} color={T.gold} />
              </div>
            </div>
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span style={{ ...fontPixel, fontSize:6, color:T.muted }}>NEXT: {nextRank.label.toUpperCase()}</span>
                <span style={{ ...fontPixel, fontSize:6, color:nextRank.color }}>{xpToNext} XP LEFT</span>
              </div>
              <XPBar current={xp - getRank(xp).min} max={nextRank.min - getRank(xp).min} color={rank.color} />
            </div>
            <PixelXPBar current={xp} max={nextRank.min} segments={14} />
          </div>
        </div>
      </PixelPanel>

      {/* Quick stats row */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
        {[
          { label:"LESSONS", value:"12", color:T.teal   },
          { label:"STREAK",  value:`${streak}d`, color:T.flame  },
          { label:"COINS",   value:coins, color:T.gold   },
        ].map(s => (
          <PixelPanel key={s.label} accent={`${s.color}40`} style={{ padding:"12px 8px", textAlign:"center" }}>
            <div style={{ ...fontPixel, fontSize:14, color:s.color, marginBottom:4 }}>{s.value}</div>
            <div style={{ ...fontPixel, fontSize:5, color:T.muted }}>{s.label}</div>
          </PixelPanel>
        ))}
      </div>

      {/* Continue learning CTA */}
      <PixelPanel accent={T.violet} style={{ padding:16 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
          <div>
            <p style={{ ...fontPixel, fontSize:7, color:T.violet, marginBottom:6 }}>CONTINUE</p>
            <p style={{ ...fontPixel, fontSize:9, color:T.text }}>Debt &amp; Credit</p>
          </div>
          <div style={{ border:`2px solid ${T.violet}`, borderRadius:8, padding:"4px 8px", background:`${T.violet}20` }}>
            <span style={{ ...fontPixel, fontSize:7, color:T.violet }}>CH.3</span>
          </div>
        </div>
        <XPBar current={0.4} max={1} color={T.violet} />
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
          <span style={{ ...fontPixel, fontSize:6, color:T.muted }}>4 LESSONS DONE</span>
          <span style={{ ...fontPixel, fontSize:6, color:T.violet }}>+75 XP</span>
        </div>
        <button style={{ ...fontPixel, fontSize:8, width:"100%", marginTop:12, padding:"10px 0", background:T.violet, border:"none", borderRadius:8, color:"#fff", cursor:"pointer", boxShadow:`0 4px 0 #2D1A60` }}>
          START QUEST
        </button>
      </PixelPanel>

      {/* Skill progress */}
      <PixelPanel accent={T.border} style={{ padding:16 }}>
        <p style={{ ...fontPixel, fontSize:7, color:T.teal, marginBottom:12 }}>SKILLS</p>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {SKILLS_DATA.map(s => (
            <div key={s.label} style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ ...fontPixel, fontSize:6, color:T.muted, width:42 }}>{s.label}</span>
              <div style={{ flex:1 }}>
                <XPBar current={s.level} max={s.max} color={s.color} height={6} />
              </div>
              <div style={{ display:"flex", gap:2 }}>
                {Array.from({length:s.max}).map((_,i) => (
                  <div key={i} style={{ width:6, height:6, background:i<s.level?s.color:"rgba(255,255,255,0.08)", borderRadius:1 }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </PixelPanel>

      {/* Activity heatmap */}
      <PixelPanel accent={T.border} style={{ padding:16 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <span style={{ ...fontPixel, fontSize:7, color:T.teal }}>ACTIVITY</span>
          <div style={{ display:"flex", gap:4, alignItems:"center" }}>
            {["rgba(255,255,255,0.05)","rgba(0,212,200,0.2)","rgba(0,212,200,0.5)",T.teal].map((c,i) => (
              <div key={i} style={{ width:9, height:9, borderRadius:2, background:c }} />
            ))}
          </div>
        </div>
        <Heatmap weeks={10} />
      </PixelPanel>

      {/* League mini */}
      <PixelPanel accent={T.violet} style={{ padding:16 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
          <span style={{ ...fontPixel, fontSize:7, color:T.violet }}>DIAMOND LEAGUE</span>
          <span style={{ ...fontPixel, fontSize:7, color:T.muted }}>RANK 14/30</span>
        </div>
        {LEADERBOARD.map(p => (
          <div key={p.rank} style={{ display:"flex", alignItems:"center", gap:10, padding:"6px 0", borderBottom:`1px solid ${T.border}`, background:p.isYou?`rgba(0,212,200,0.06)`:"transparent", borderRadius:p.isYou?6:0, paddingLeft:p.isYou?8:0 }}>
            <span style={{ ...fontPixel, fontSize:8, color:p.rank<=3?T.gold:T.muted, width:18 }}>#{p.rank}</span>
            <div style={{ width:28, height:28, overflow:"hidden", border:`1px solid ${T.border}`, borderRadius:6, flexShrink:0 }}>
              {p.avatar ? <PixelAvatar config={p.avatar} size={28} /> : <PixelAvatar config={avatar} size={28} />}
            </div>
            <span style={{ ...fontPixel, fontSize:7, color:p.isYou?T.teal:T.text, flex:1 }}>{p.name.toUpperCase()}</span>
            <div style={{ display:"flex", alignItems:"center", gap:4, color:T.gold }}>
              <SVGIcon.bolt />
              <span style={{ ...fontPixel, fontSize:7, color:T.gold }}>{p.xp}</span>
            </div>
          </div>
        ))}
      </PixelPanel>

    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   PATH PAGE
═══════════════════════════════════════════════════════════════ */
const PathPage = () => (
  <div style={{ padding:"20px 16px", display:"flex", flexDirection:"column", gap:16 }}>
    <p style={{ ...fontPixel, fontSize:8, color:T.teal }}>LEARNING PATH</p>
    {CHAPTERS.map((ch, i) => (
      <div key={ch.id} style={{ display:"flex", gap:0, alignItems:"stretch" }}>
        {/* Connector line */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", width:32, flexShrink:0 }}>
          <div style={{ width:20, height:20, borderRadius:4, background:ch.done?T.teal:ch.active?T.lime:`rgba(255,255,255,0.06)`, border:`2px solid ${ch.done?T.teal:ch.active?T.lime:T.muted}`, display:"flex", alignItems:"center", justifyContent:"center", zIndex:1, boxShadow:ch.active?`0 0 12px ${T.lime}60`:ch.done?`0 0 8px ${T.teal}40`:"none", flexShrink:0 }}>
            {ch.done ? <SVGIcon.check /> : <span style={{ ...fontPixel, fontSize:6, color:ch.active?"#0A0A1A":T.muted }}>{ch.id}</span>}
          </div>
          {i < CHAPTERS.length-1 && <div style={{ flex:1, width:2, background:ch.done?T.teal:`rgba(255,255,255,0.08)`, minHeight:24 }} />}
        </div>
        {/* Content card */}
        <div style={{ flex:1, marginLeft:10, marginBottom:8 }}>
          <PixelPanel accent={ch.done?`${T.teal}40`:ch.active?T.lime:`rgba(255,255,255,0.08)`} style={{ padding:"12px 14px", opacity:!ch.done&&!ch.active?0.6:1 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <p style={{ ...fontPixel, fontSize:7, color:ch.done?T.teal:ch.active?"#0A0A1A":T.textSoft, background:ch.active?T.lime:undefined, padding:ch.active?"2px 4px":0, borderRadius:ch.active?4:0, display:"inline-block", marginBottom:4 }}>{ch.title.toUpperCase()}</p>
                <div style={{ display:"flex", gap:6 }}>
                  <span style={{ ...fontPixel, fontSize:6, color:T.gold }}>+{ch.xp} XP</span>
                  {ch.done && <span style={{ ...fontPixel, fontSize:6, color:T.teal }}>DONE</span>}
                  {ch.active && <span style={{ ...fontPixel, fontSize:6, color:T.lime }}>ACTIVE</span>}
                  {!ch.done && !ch.active && <span style={{ color:T.muted, display:"inline-flex" }}><SVGIcon.lock /></span>}
                </div>
              </div>
              {ch.active && (
                <button style={{ ...fontPixel, fontSize:7, background:T.lime, border:"none", borderRadius:6, padding:"8px 12px", color:"#0A0A1A", cursor:"pointer", boxShadow:`0 3px 0 #3D5200` }}>GO</button>
              )}
            </div>
          </PixelPanel>
        </div>
      </div>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   PROFILE PAGE
═══════════════════════════════════════════════════════════════ */
const PROFILE_TABS = [
  { id:"stats",    label:"STATS"    },
  { id:"badges",   label:"BADGES"   },
  { id:"skills",   label:"SKILLS"   },
  { id:"league",   label:"LEAGUE"   },
  { id:"friends",  label:"FRIENDS"  },
  { id:"settings", label:"SETTINGS" },
];

const FRIENDS_DATA = [
  { name:"Priya K",  avatar:PRESETS[0],  streak:12, xp:2840, online:true  },
  { name:"Tunde A",  avatar:PRESETS[8],  streak:7,  xp:2100, online:true  },
  { name:"Sana R",   avatar:PRESETS[1],  streak:3,  xp:1890, online:false },
  { name:"Alex T",   avatar:PRESETS[9],  streak:5,  xp:920,  online:false },
];

const ProfilePage = ({ avatar, onEditAvatar, xp=620, streak=3, coins=340, username="Learner" }) => {
  const [tab, setTab] = useState("stats");
  const rank = getRank(xp);
  const nextRank = RANKS.find(r => r.min > xp) || RANKS[RANKS.length-1];

  return (
    <div style={{ display:"flex", flexDirection:"column" }}>
      {/* Profile hero */}
      <div style={{ background:`linear-gradient(180deg, rgba(139,92,246,0.18) 0%, transparent 100%)`, padding:"24px 16px 0", display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
        {/* Avatar with edit */}
        <div style={{ position:"relative" }}>
          <div style={{ border:`4px solid ${T.violet}`, borderRadius:20, overflow:"hidden", boxShadow:`0 0 32px rgba(139,92,246,0.5)` }}>
            <PixelAvatar config={avatar} size={120} />
          </div>
          <button onClick={onEditAvatar} style={{ position:"absolute", bottom:0, right:0, width:32, height:32, background:T.teal, border:`2px solid ${T.bg0}`, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
            <SVGIcon.pen />
          </button>
          {/* Level badge */}
          <div style={{ position:"absolute", top:0, left:0, background:T.lime, border:`2px solid ${T.bg0}`, borderRadius:6, padding:"2px 6px" }}>
            <span style={{ ...fontPixel, fontSize:7, color:"#0A0A1A" }}>LVL 7</span>
          </div>
        </div>

        <div style={{ textAlign:"center" }}>
          <p style={{ ...fontPixel, fontSize:11, color:T.text, marginBottom:6 }}>{username.toUpperCase()}</p>
          <div style={{ display:"inline-flex", alignItems:"center", gap:4, background:`${rank.color}20`, border:`1px solid ${rank.color}40`, borderRadius:20, padding:"4px 12px" }}>
            <span style={{ ...fontPixel, fontSize:7, color:rank.color }}>{rank.label.toUpperCase()}</span>
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ display:"flex", gap:0, background:T.bg2, border:`2px solid ${T.border}`, borderRadius:12, overflow:"hidden", width:"100%" }}>
          {[
            { icon:<SVGIcon.bolt />,   val:xp,     color:T.teal   },
            { icon:<SVGIcon.fire />,   val:streak,  color:T.flame  },
            { icon:<SVGIcon.coin />,   val:coins,   color:T.gold   },
            { icon:<SVGIcon.trophy />, val:"#14",   color:T.violet },
          ].map((s, i) => (
            <div key={i} style={{ flex:1, padding:"12px 0", display:"flex", flexDirection:"column", alignItems:"center", gap:4, borderRight:i<3?`1px solid ${T.border}`:"none" }}>
              <span style={{ color:s.color, display:"flex" }}>{s.icon}</span>
              <span style={{ ...fontPixel, fontSize:8, color:s.color }}>{s.val}</span>
            </div>
          ))}
        </div>

        {/* XP to next rank */}
        <div style={{ width:"100%", marginBottom:8 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
            <span style={{ ...fontPixel, fontSize:6, color:T.muted }}>XP TO {nextRank.label.toUpperCase()}</span>
            <span style={{ ...fontPixel, fontSize:6, color:rank.color }}>{nextRank.min - xp} XP</span>
          </div>
          <XPBar current={xp - rank.min} max={nextRank.min - rank.min} color={rank.color} />
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display:"flex", overflowX:"auto", background:T.bg2, borderBottom:`2px solid ${T.border}`, position:"sticky", top:60, zIndex:10 }}>
        {PROFILE_TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            ...fontPixel, fontSize:6, padding:"10px 12px", background:"none", border:"none", cursor:"pointer",
            color:tab===t.id?T.teal:T.muted,
            borderBottom:tab===t.id?`2px solid ${T.lime}`:"2px solid transparent",
            whiteSpace:"nowrap", flexShrink:0,
          }}>{t.label}</button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ padding:16, display:"flex", flexDirection:"column", gap:16 }}>

        {tab === "stats" && (<>
          {/* Stats grid */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {[
              { label:"LESSONS DONE",   val:"12", color:T.teal   },
              { label:"TOTAL XP",       val:xp,   color:T.violet },
              { label:"CURRENT STREAK", val:`${streak}d`, color:T.flame  },
              { label:"BEST STREAK",    val:"7d", color:T.gold   },
            ].map(s => (
              <PixelPanel key={s.label} accent={`${s.color}30`} style={{ padding:14, textAlign:"center" }}>
                <div style={{ ...fontPixel, fontSize:18, color:s.color, marginBottom:6 }}>{s.val}</div>
                <div style={{ ...fontPixel, fontSize:5, color:T.muted }}>{s.label}</div>
              </PixelPanel>
            ))}
          </div>

          {/* Activity heatmap */}
          <PixelPanel accent={T.border} style={{ padding:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
              <span style={{ ...fontPixel, fontSize:7, color:T.teal }}>ACTIVITY</span>
              <div style={{ display:"flex", gap:4 }}>
                {["rgba(255,255,255,0.05)","rgba(0,212,200,0.2)","rgba(0,212,200,0.5)",T.teal].map((c,i) => (
                  <div key={i} style={{ width:9, height:9, borderRadius:2, background:c }} />
                ))}
              </div>
            </div>
            <Heatmap weeks={10} />
          </PixelPanel>

          {/* Goal completion */}
          <PixelPanel accent={T.lime} style={{ padding:16 }}>
            <p style={{ ...fontPixel, fontSize:7, color:T.lime, marginBottom:12 }}>WEEKLY GOAL</p>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <span style={{ ...fontPixel, fontSize:6, color:T.muted }}>5 LESSONS / WEEK</span>
              <span style={{ ...fontPixel, fontSize:6, color:T.lime }}>3/5</span>
            </div>
            <XPBar current={3} max={5} color={T.lime} />
          </PixelPanel>
        </>)}

        {tab === "badges" && (
          <PixelPanel accent={T.gold} style={{ padding:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <span style={{ ...fontPixel, fontSize:7, color:T.gold }}>EARNED</span>
              <span style={{ ...fontPixel, fontSize:7, color:T.muted }}>2/6</span>
            </div>
            <XPBar current={2} max={6} color={T.gold} />
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:16, marginTop:16 }}>
              {BADGES.map((b,i) => <Badge key={i} {...b} />)}
            </div>
          </PixelPanel>
        )}

        {tab === "skills" && (<>
          <PixelPanel accent={T.border} style={{ padding:16 }}>
            <p style={{ ...fontPixel, fontSize:7, color:T.teal, marginBottom:12 }}>SKILL TREE</p>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {SKILLS_DATA.map(s => (
                <div key={s.label}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ ...fontPixel, fontSize:7, color:s.color }}>{s.label.toUpperCase()}</span>
                    <span style={{ ...fontPixel, fontSize:7, color:T.muted }}>LVL {s.level}/{s.max}</span>
                  </div>
                  <XPBar current={s.level} max={s.max} color={s.color} height={10} />
                  <div style={{ display:"flex", gap:3, marginTop:4 }}>
                    {Array.from({length:s.max}).map((_,i) => (
                      <div key={i} style={{ width:14, height:14, background:i<s.level?s.color:"rgba(255,255,255,0.07)", border:`1px solid ${i<s.level?s.color:"rgba(255,255,255,0.1)"}`, borderRadius:2, display:"flex", alignItems:"center", justifyContent:"center" }}>
                        {i < s.level && <SVGIcon.check />}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </PixelPanel>
        </>)}

        {tab === "league" && (<>
          {/* League banner */}
          <PixelPanel accent={T.violet} style={{ padding:16, textAlign:"center" }}>
            <p style={{ ...fontPixel, fontSize:10, color:T.violet, marginBottom:4 }}>DIAMOND LEAGUE</p>
            <p style={{ ...fontPixel, fontSize:7, color:T.muted, marginBottom:10 }}>RANK 14 OF 30</p>
            <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:8 }}>
              <div style={{ flex:1, background:"rgba(255,255,255,0.06)", borderRadius:4, height:10, overflow:"hidden" }}>
                <div style={{ width:"90%", height:"100%", background:`linear-gradient(90deg,${T.lime},${T.teal})` }} />
              </div>
              <span style={{ ...fontPixel, fontSize:6, color:T.lime }}>TOP 10</span>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <div style={{ flex:1, background:`${T.teal}15`, border:`1px solid ${T.teal}40`, borderRadius:8, padding:"6px 0" }}>
                <p style={{ ...fontPixel, fontSize:6, color:T.teal }}>PROMOTION ZONE</p>
              </div>
              <div style={{ flex:1, background:`${T.red}15`, border:`1px solid ${T.red}40`, borderRadius:8, padding:"6px 0" }}>
                <p style={{ ...fontPixel, fontSize:6, color:T.red }}>DEMOTION ZONE</p>
              </div>
            </div>
          </PixelPanel>
          {/* Leaderboard */}
          <PixelPanel accent={T.border} style={{ overflow:"hidden" }}>
            {LEADERBOARD.map((p,i) => (
              <div key={p.rank} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", background:p.isYou?`rgba(0,212,200,0.06)`:"transparent", borderBottom:i<LEADERBOARD.length-1?`1px solid ${T.border}`:"none" }}>
                <span style={{ ...fontPixel, fontSize:8, color:p.rank<=3?T.gold:T.muted, width:22 }}>#{p.rank}</span>
                <div style={{ width:34, height:34, overflow:"hidden", border:`1px solid ${p.isYou?T.teal:T.border}`, borderRadius:8, flexShrink:0 }}>
                  <PixelAvatar config={p.avatar || PRESETS[0]} size={34} />
                </div>
                <span style={{ ...fontPixel, fontSize:7, flex:1, color:p.isYou?T.teal:T.text }}>{p.name.toUpperCase()}</span>
                <div style={{ display:"flex", alignItems:"center", gap:4, color:T.gold }}>
                  <SVGIcon.bolt />
                  <span style={{ ...fontPixel, fontSize:7, color:T.gold }}>{p.xp}</span>
                </div>
              </div>
            ))}
          </PixelPanel>
        </>)}

        {tab === "friends" && (<>
          <PixelPanel accent={T.border} style={{ overflow:"hidden" }}>
            {FRIENDS_DATA.map((f,i) => (
              <div key={f.name} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", borderBottom:i<FRIENDS_DATA.length-1?`1px solid ${T.border}`:"none" }}>
                <div style={{ position:"relative" }}>
                  <div style={{ width:40, height:40, overflow:"hidden", border:`2px solid ${T.border}`, borderRadius:8, flexShrink:0 }}>
                    <PixelAvatar config={f.avatar} size={40} />
                  </div>
                  <div style={{ position:"absolute", bottom:0, right:0, width:10, height:10, borderRadius:"50%", background:f.online?"#22c55e":"#566C86", border:`1px solid ${T.bg1}` }} />
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ ...fontPixel, fontSize:7, color:T.text, marginBottom:3 }}>{f.name.toUpperCase()}</p>
                  <div style={{ display:"flex", gap:8 }}>
                    <span style={{ ...fontPixel, fontSize:6, color:T.flame }}>🔥{f.streak}</span>
                    <span style={{ ...fontPixel, fontSize:6, color:T.teal }}>{f.xp} XP</span>
                  </div>
                </div>
                <button style={{ background:`${T.violet}20`, border:`1px solid ${T.violet}40`, borderRadius:6, padding:"4px 10px", cursor:"pointer" }}>
                  <span style={{ ...fontPixel, fontSize:6, color:T.violet }}>POKE</span>
                </button>
              </div>
            ))}
          </PixelPanel>
          <button style={{ ...fontPixel, fontSize:7, width:"100%", padding:"12px 0", background:`${T.violet}20`, border:`2px solid ${T.violet}40`, borderRadius:10, color:T.violet, cursor:"pointer" }}>
            + ADD FRIEND
          </button>
        </>)}

        {tab === "settings" && (<>
          <PixelPanel accent={T.border} style={{ padding:16 }}>
            <p style={{ ...fontPixel, fontSize:7, color:T.teal, marginBottom:12 }}>ACCOUNT</p>
            {[
              { icon:<SVGIcon.bell />,   label:"Notifications" },
              { icon:<SVGIcon.shield />, label:"Privacy"       },
            ].map(r => (
              <button key={r.label} style={{ display:"flex", alignItems:"center", gap:10, width:"100%", padding:"10px 0", background:"none", border:"none", borderBottom:`1px solid ${T.border}`, cursor:"pointer" }}>
                <div style={{ width:32, height:32, background:T.bg3, border:`1px solid ${T.border}`, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", color:T.teal }}>{r.icon}</div>
                <span style={{ ...fontPixel, fontSize:7, color:T.text }}>{r.label.toUpperCase()}</span>
              </button>
            ))}
          </PixelPanel>
          <button style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, width:"100%", padding:"12px 0", background:"none", border:`1px solid rgba(177,62,83,0.3)`, borderRadius:10, cursor:"pointer", color:T.red }}>
            <SVGIcon.logout />
            <span style={{ ...fontPixel, fontSize:7, color:T.red }}>SIGN OUT</span>
          </button>
        </>)}

      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════════ */
const DEFAULT_AVATAR = {
  gender:"fem", hairStyle:"afro", hairColor:"#1A1A1A", skinColor:"#4A2810",
  eyeColor:"#5C3A1E", facialHair:"none", outfit:"dress", outfitColor:"#C86A1E",
  accessory:"earrings", bgColor:"#FFD5B8", blushColor:"#FF8A8A",
};

export default function App() {
  const [page, setPage] = useState("home");
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const [editingAvatar, setEditingAvatar] = useState(false);
  const [tempAvatar, setTempAvatar] = useState(DEFAULT_AVATAR);
  const xp = 620, streak = 3, coins = 340, username = "Learner";

  // On first load — show a "new install" feel
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 120); return () => clearTimeout(t); }, []);
  if (!ready) return null;

  if (editingAvatar) {
    return (
      <div style={{ minHeight:"100dvh", background:T.bg0, display:"flex", flexDirection:"column", fontFamily:"sans-serif" }}>
        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 16px", height:52, background:T.bg1, borderBottom:`1px solid ${T.border}`, position:"sticky", top:0, zIndex:50 }}>
          <button onClick={() => setEditingAvatar(false)} style={{ background:"none", border:"none", cursor:"pointer", color:T.muted, padding:4 }}>
            <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <span style={{ ...fontPixel, fontSize:8, color:T.teal }}>CUSTOMIZE</span>
          <div style={{ width:28 }} />
        </div>
        <div style={{ flex:1, overflow:"hidden" }}>
          <AvatarCustomizer config={tempAvatar} onChange={setTempAvatar} onDone={() => { setAvatar(tempAvatar); setEditingAvatar(false); }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:"100dvh", background:T.bg0, display:"flex", flexDirection:"column", fontFamily:"sans-serif", color:T.text }}>
      {/* Google Font */}
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />

      {/* Top bar */}
      <header style={{ position:"sticky", top:0, zIndex:50, height:56, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 16px", background:"rgba(7,6,26,0.9)", backdropFilter:"blur(12px)", borderBottom:`1px solid ${T.border}` }}>
        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:3 }}>
            {[T.teal,"#B8F400",T.violet,T.flame].map((c,i) => <div key={i} style={{ width:8, height:8, background:c }} />)}
          </div>
          <span style={{ ...fontPixel, fontSize:9, color:T.text, letterSpacing:"0.05em" }}>PIGGYPATH</span>
        </div>
        {/* Right: stats + avatar */}
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ display:"flex", gap:8 }}>
            <StatPill icon={<SVGIcon.bolt />} value={`${xp} XP`} color={T.teal} />
            <StatPill icon={<SVGIcon.fire />} value={`${streak}`}  color={T.flame} />
          </div>
          <button onClick={() => setPage("profile")} style={{ border:`2px solid ${T.teal}`, borderRadius:8, overflow:"hidden", background:T.bg2, cursor:"pointer", padding:0, boxShadow:`0 0 10px rgba(0,212,200,0.3)` }}>
            <PixelAvatar config={avatar} size={36} />
          </button>
        </div>
      </header>

      {/* Page content */}
      <main style={{ flex:1, maxWidth:480, width:"100%", margin:"0 auto", paddingBottom:80 }}>
        {page === "home"    && <DashboardPage avatar={avatar} xp={xp} streak={streak} coins={coins} username={username} />}
        {page === "path"    && <PathPage />}
        {page === "market"  && (
          <div style={{ padding:40, textAlign:"center" }}>
            <p style={{ ...fontPixel, fontSize:8, color:T.muted }}>MARKET COMING SOON</p>
          </div>
        )}
        {page === "friends" && (
          <div style={{ padding:"20px 16px" }}>
            <p style={{ ...fontPixel, fontSize:8, color:T.teal, marginBottom:16 }}>FRIENDS</p>
            <PixelPanel accent={T.border} style={{ overflow:"hidden" }}>
              {FRIENDS_DATA.map((f,i) => (
                <div key={f.name} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", borderBottom:i<FRIENDS_DATA.length-1?`1px solid ${T.border}`:"none" }}>
                  <div style={{ position:"relative" }}>
                    <div style={{ width:44, height:44, overflow:"hidden", border:`2px solid ${T.border}`, borderRadius:8 }}>
                      <PixelAvatar config={f.avatar} size={44} />
                    </div>
                    <div style={{ position:"absolute", bottom:0, right:0, width:12, height:12, borderRadius:"50%", background:f.online?"#22c55e":"#566C86", border:`1px solid ${T.bg1}` }} />
                  </div>
                  <div style={{ flex:1 }}>
                    <p style={{ ...fontPixel, fontSize:7, color:T.text, marginBottom:4 }}>{f.name.toUpperCase()}</p>
                    <div style={{ display:"flex", gap:10 }}>
                      <span style={{ ...fontPixel, fontSize:6, color:T.flame }}>{f.streak}d streak</span>
                      <span style={{ ...fontPixel, fontSize:6, color:T.teal }}>{f.xp} XP</span>
                    </div>
                  </div>
                </div>
              ))}
            </PixelPanel>
          </div>
        )}
        {page === "profile" && <ProfilePage avatar={avatar} onEditAvatar={() => { setTempAvatar(avatar); setEditingAvatar(true); }} xp={xp} streak={streak} coins={coins} username={username} />}
      </main>

      {/* Bottom nav */}
      <nav style={{ position:"fixed", bottom:0, left:0, right:0, height:64, background:"#0f0f23", borderTop:`1px solid ${T.border}`, display:"flex", justifyContent:"space-around", alignItems:"center", zIndex:50 }}>
        {NAV_ITEMS.map(({ id, Icon }) => {
          const active = page === id;
          return (
            <button key={id} onClick={() => setPage(id)} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, background:"none", border:"none", cursor:"pointer", flex:1, height:"100%", justifyContent:"center", color:active?T.teal:T.muted, position:"relative" }}>
              <Icon />
              <span style={{ ...fontPixel, fontSize:5, color:active?T.teal:T.muted }}>{id.toUpperCase()}</span>
              {active && <div style={{ position:"absolute", bottom:0, width:24, height:2, background:T.lime }} />}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
