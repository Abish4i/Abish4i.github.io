const { chromium } = require('playwright-chromium');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const pages = ['index.html', 'blog.html', 'contact.html', 'portfolio.html', 'resume.html'];

  for (const p of pages) {
    await page.goto(`http://localhost:8000/${p}`);
    await page.screenshot({ path: `${p}.png` });
  }

  await browser.close();
})();
