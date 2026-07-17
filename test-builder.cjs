const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

  // Set up local storage
  await page.goto('http://localhost:5173/piggypath_admin/', { waitUntil: 'networkidle2' });
  
  await page.evaluate(() => {
    localStorage.setItem('plb_user_v2', JSON.stringify({ email: 'test@test.com' }));
    localStorage.setItem('plb_lessons_v2', JSON.stringify([{
      id: 'test_lesson',
      title: 'Test Lesson',
      pages: [{ id: 'page_1', title: 'Page 1', blocks: [] }]
    }]));
  });

  // Navigate to builder
  await page.goto('http://localhost:5173/piggypath_admin/#/builder/test_lesson', { waitUntil: 'networkidle2' });
  
  await new Promise(r => setTimeout(r, 2000));
  
  await browser.close();
})();
