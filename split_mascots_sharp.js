import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const splitMascots = async () => {
  try {
    const imagePath = 'src/assets/mascot_grid.png';
    const srcOutDir = 'public/assets/mascots';
    
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
        
        // Remove 10% from edges just to clear thick grid lines safely without cutting ears
        const marginX = Math.floor(colW * 0.10);
        const marginY = Math.floor(rowH * 0.10);
        
        const name = names[idx];
        const outPath = path.join(srcOutDir, `${name}.png`);
        
        const cellImage = sharp(imagePath)
          .extract({
            left: left + marginX,
            top: top + marginY,
            width: colW - (marginX * 2),
            height: rowH - (marginY * 2)
          });
          
        const { data, info } = await cellImage.raw().toBuffer({ resolveWithObject: true });
        
        // 4 channels: R, G, B, A
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i+1];
          const b = data[i+2];
          
          // Make white backgrounds transparent
          if (r > 230 && g > 230 && b > 230) {
            data[i+3] = 0;
          }
          // Aggressively remove ANY bluish pixels (grid lines)
          // Grid lines often have higher blue than red/green
          if (b > 150 && r < 200 && g < 200) {
             data[i+3] = 0;
          }
        }
        
        // Create an image, trim all transparent edges perfectly to the pig!
        await sharp(data, {
          raw: { width: info.width, height: info.height, channels: info.channels }
        })
        .png()
        .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .toFile(outPath);
        
        console.log(`Saved ${name}.png`);
        idx++;
      }
    }
    console.log('Successfully extracted and perfectly trimmed all mascots!');
  } catch (error) {
    console.error('Error processing image:', error);
  }
};

splitMascots();
