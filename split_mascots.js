import Jimp from 'jimp';
import fs from 'fs';
import path from 'path';

const splitMascots = async () => {
  try {
    const imagePath = 'src/assets/mascot_grid.png';
    const outDir = 'public/assets/mascots';
    
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    
    // Also save to src/assets for imports if needed
    const srcOutDir = 'src/assets/mascots';
    if (!fs.existsSync(srcOutDir)) {
      fs.mkdirSync(srcOutDir, { recursive: true });
    }

    const image = await Jimp.read(imagePath);
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
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
        
        // Clone original image to crop
        let cell = image.clone().crop(left, top, colW, rowH);
        
        // Crop out the borders (15% margin)
        const marginX = Math.floor(colW * 0.15);
        const marginY = Math.floor(rowH * 0.15);
        cell = cell.crop(marginX, marginY, colW - (marginX * 2), rowH - (marginY * 2));
        
        // Make white background transparent
        cell.scan(0, 0, cell.bitmap.width, cell.bitmap.height, function(x, y, idx) {
          const red = this.bitmap.data[idx + 0];
          const green = this.bitmap.data[idx + 1];
          const blue = this.bitmap.data[idx + 2];
          const alpha = this.bitmap.data[idx + 3];

          // If very close to white, make transparent
          if (red > 240 && green > 240 && blue > 240) {
            this.bitmap.data[idx + 3] = 0; // Set alpha to 0
          }
        });
        
        // We can autocrop to remove excess transparency
        cell.autocrop();
        
        const name = names[idx];
        const outPath = path.join(srcOutDir, `${name}.png`);
        await cell.writeAsync(outPath);
        
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
