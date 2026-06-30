const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to a typical desktop size
  await page.setViewport({ width: 1280, height: 800 });
  
  const url = 'https://progress-tracker-706.preview.emergentagent.com/?utm_source=share';
  console.log('Navigating to ' + url);
  await page.goto(url, { waitUntil: 'networkidle0' });
  
  // Wait an extra 2 seconds to make sure any animations or data loads
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const screenshotPath = 'dashboard_screenshot.png';
  console.log('Taking screenshot...');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  
  console.log('Saved to ' + screenshotPath);
  await browser.close();
})();
