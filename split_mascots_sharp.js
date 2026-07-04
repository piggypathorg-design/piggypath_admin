import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const splitMascots = async () => {
  try {
    const imagePath = 'src/assets/mascot_grid.png';
    const srcOutDir = 'src/assets/mascots';
    
    if (!fs.existsSync(srcOutDir)) {
      fs.mkdirSync(srcOutDir, { recursive: true });
    }

    const metadata = await sharp(imagePath).metadata();
    const width = metadata.width;
    const height = metadata.height;
    
    const colW = Math.floor(width / 4);
    const rowH = Math.floor(height / 3);
    
    const names = [
      'Happy', 'Winking', 'Laughing', 'Surprised', 
      'Confused', 'Thinking', 'Angry', 'Sad', 
      'Smart', 'Love', 'Cool', 'Sleeping'
    ];
    
    let idx = 0;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        const left = c * colW;
        const top = r * rowH;
        
        const marginX = Math.floor(colW * 0.15);
        const marginY = Math.floor(rowH * 0.15);
        
        const name = names[idx];
        const outPath = path.join(srcOutDir, `${name}.png`);
        
        // Extract cell, removing 15% from all sides
        const cellImage = sharp(imagePath)
          .extract({
            left: left + marginX,
            top: top + marginY,
            width: colW - (marginX * 2),
            height: rowH - (marginY * 2)
          });
          
        // Convert white to transparent
        // We can do this by using a threshold to create an alpha channel
        const { data, info } = await cellImage.raw().toBuffer({ resolveWithObject: true });
        
        // 4 channels: R, G, B, A
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i+1];
          const b = data[i+2];
          if (r > 240 && g > 240 && b > 240) {
            data[i+3] = 0; // Transparent
          }
        }
        
        await sharp(data, {
          raw: {
            width: info.width,
            height: info.height,
            channels: info.channels
          }
        })
        .png()
        .toFile(outPath);
        
        console.log(`Saved ${name}.png`);
        idx++;
      }
    }
    console.log('Successfully extracted all mascots!');
  } catch (error) {
    console.error('Error processing image:', error);
  }
};

splitMascots();
