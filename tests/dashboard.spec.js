const { chromium } = require('playwright');
const { readExcel } = require('../utils/excelReader');

(async () => {
  const data = readExcel('./data/datac.xlsx');

  const browser = await chromium.launch({ headless: false }); // Show browser

  // ✅ Create an array of promises (ek promise = ek window)
  const allTests = data.map(async (entry) => {
    const {
      Environment,
      'Client name ': client,
      'Acount key ': accountKey,
      Email,
      password
    } = entry;

    let baseUrl = '';
    switch (Environment.trim().toLowerCase()) {
      case 'qa':
        baseUrl = 'https://qa-sia-dashboard.oneorigin.us/';
        break;
      case 'uat':
        baseUrl = 'https://uat-sia-dashboard.oneorigin.us/';
        break;
      case 'stage':
        baseUrl = 'https://stage-sia-dashboard.oneorigin.us/';
        break;
      default:
        throw new Error(`Unknown environment: ${Environment}`);
    }

    const context = await browser.newContext(); // New window
    const page = await context.newPage();
    await page.goto(baseUrl);

    await page.locator('#account-key').fill(accountKey);
    await page.keyboard.press('Enter');

    await page.getByPlaceholder('Enter Email ID').fill(Email);
    await page.keyboard.press('Enter');

    await page.waitForSelector('input[type="password"]', { timeout: 5000 });
    await page.fill('input[type="password"]', password);

    await page.getByRole('button', { name: 'Login' }).click();

    console.log(`✅ Login done for ${client} on ${Environment}`);
    // Don’t close context if you want the window to stay open
  });

  // ✅ Run all login tests in parallel
  await Promise.all(allTests);

  console.log('🎉 All windows launched in parallel');
})();
