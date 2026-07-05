import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const splitMascots = async () => {
  try {
    const imagePath = 'src/assets/new_mascot_grid.jpg';
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
        
        // Use 0 margin! The new image has no grid lines, and 10% margin was cutting off the ears.
        const marginX = 0;
        const marginY = 0;
        
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
        
        const { data: bgraData, info: bgraInfo } = await sharp(data, {
          raw: { width: info.width, height: info.height, channels: info.channels }
        }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
        
        for (let i = 0; i < bgraData.length; i += 4) {
          const r = bgraData[i];
          const g = bgraData[i+1];
          const b = bgraData[i+2];
          
          // Make white backgrounds transparent (with higher tolerance for JPEG artifacts)
          if (r > 240 && g > 240 && b > 240) {
            bgraData[i+3] = 0;
          }
        }
        
        // Create an image, trim all transparent edges perfectly to the pig!
        await sharp(bgraData, {
          raw: { width: bgraInfo.width, height: bgraInfo.height, channels: bgraInfo.channels }
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
