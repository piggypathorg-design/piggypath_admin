const jimp = require('jimp');

const names = [
  ['Happy', 'Winking', 'Laughing', 'Surprised'],
  ['Confused', 'Thinking', 'Angry', 'Sad'],
  ['Smart', 'Love', 'Cool', 'Sleeping']
];

async function run() {
  const image = await jimp.read('src/assets/new_mascot_grid.jpg');
  const w = Math.floor(1024 / 4);
  const h = Math.floor(819 / 3);

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      const name = names[r][c];
      const slice = image.clone().crop(c * w, r * h, w, h);
      
      // Make near-white pixels transparent
      slice.scan(0, 0, slice.bitmap.width, slice.bitmap.height, function(x, y, idx) {
        const red = this.bitmap.data[idx + 0];
        const green = this.bitmap.data[idx + 1];
        const blue = this.bitmap.data[idx + 2];
        // The background is usually solid white or very close to it
        if (red > 245 && green > 245 && blue > 245) {
          this.bitmap.data[idx + 3] = 0; // alpha to 0
        }
      });

      await slice.writeAsync(`src/assets/mascots/${name}.png`);
      console.log(`Saved ${name}.png`);
    }
  }
}
run();
