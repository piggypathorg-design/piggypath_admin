import sharp from 'sharp';

async function check() {
  const { data, info } = await sharp('public/assets/mascots/Happy.png').raw().toBuffer({ resolveWithObject: true });
  let hasBlue = false;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
    if (a > 0 && b > 200 && r < 150) {
      console.log(`Found blue pixel at index ${i / 4}: R=${r}, G=${g}, B=${b}`);
      hasBlue = true;
      break;
    }
  }
  if (!hasBlue) console.log("No blue found!");
}
check();
