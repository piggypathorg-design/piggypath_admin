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
        
        const name = names[idx];
        const outPath = path.join(srcOutDir, `${name}.png`);
        
        // Extract exact cell
        const cellImage = sharp(imagePath)
          .extract({
            left: left,
            top: top,
            width: colW,
            height: rowH
          });
          
        const { data, info } = await cellImage.raw().toBuffer({ resolveWithObject: true });
        
        // Remove white and blue pixels
        // Blue lines are typically high blue, low red.
        // White is high everything.
        for (let i = 0; i < data.length; i += 4) {
          const red = data[i];
          const green = data[i+1];
          const blue = data[i+2];
          
          const isWhite = red > 230 && green > 230 && blue > 230;
          const isBlue = blue > 150 && red < 100; // Blue grid lines
          const isLightBlue = blue > 200 && red < 150 && green < 200;
          
          if (isWhite || isBlue || isLightBlue) {
            data[i+3] = 0; // Transparent
          }
        }
        
        // We will output this and then use sharp's trim (autocrop) to remove empty space!
        // Trim uses the alpha channel to crop to the bounding box of the non-transparent pixels.
        await sharp(data, {
          raw: {
            width: info.width,
            height: info.height,
            channels: info.channels
          }
        })
        .trim({ threshold: 0 }) // Removes transparent borders perfectly!
        .png()
        .toFile(outPath);
        
        console.log(`Saved perfectly cropped ${name}.png`);
        idx++;
      }
    }
    console.log('Successfully extracted and smart-cropped all mascots!');
  } catch (error) {
    console.error('Error processing image:', error);
  }
};

splitMascots();
