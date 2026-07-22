const { Jimp } = require("jimp");
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "src", "assets", "components");

async function processImages() {
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".png"));
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    try {
      const image = await Jimp.read(filePath);
      
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        // Read RGBA values
        const red = this.bitmap.data[idx + 0];
        const green = this.bitmap.data[idx + 1];
        const blue = this.bitmap.data[idx + 2];
        const alpha = this.bitmap.data[idx + 3];

        // If the pixel is very light (near white/light gray), make it fully transparent
        if (red > 230 && green > 230 && blue > 230) {
          this.bitmap.data[idx + 3] = 0; // Set alpha to 0
        }
      });
      
      await image.write(filePath);
      console.log(`Processed ${file}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

processImages();
