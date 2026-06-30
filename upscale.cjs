const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  content = content.replace(/fontSize:\s*(\d+)/g, (match, p1) => {
    let val = parseInt(p1);
    let newVal = val <= 7 ? val * 2 : val <= 13 ? Math.floor(val * 1.5) : Math.floor(val * 1.3);
    return `fontSize: ${newVal}`;
  });

  content = content.replace(/text-\[6px\]/g, 'text-xs');
  content = content.replace(/text-\[7px\]/g, 'text-sm');
  content = content.replace(/text-\[8px\]/g, 'text-base');
  content = content.replace(/w-2 h-2/g, 'w-3 h-3');

  content = content.replace(/width: 14,\s*height: 14/g, 'width: 24,\n            height: 24');
  content = content.replace(/width: 18,\s*height: 18/g, 'width: 32,\n              height: 32');
  content = content.replace(/width: 12, height: 2/g, 'width: 20, height: 4');
  content = content.replace(/width: 6, height: 6/g, 'width: 10, height: 10');
  content = content.replace(/width: 40,\s*height: 40/g, 'width: 64,\n              height: 64');
  content = content.replace(/size=\{36\}/g, 'size={56}');
  content = content.replace(/width: 60, height: 52/g, 'width: 80, height: 72');
  content = content.replace(/width: 4, height: 4/g, 'width: 6, height: 6');
  content = content.replace(/width: 36,\s*height: 44/g, 'width: 54,\n      height: 66');
  content = content.replace(/width: 32,\s*height: 28/g, 'width: 48,\n          height: 42');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      processFile(fullPath);
    }
  }
}

walkDir(path.join(__dirname, 'src/components'));
