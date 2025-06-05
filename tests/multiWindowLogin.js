const { chromium } = require('playwright');
const { readExcel } = require('../utils/excelReader');

(async () => {
  const data = readExcel('./data/datac.xlsx');

  // Group by environment
  const groupedByEnv = data.reduce((acc, entry) => {
    const env = entry.Environment.trim().toLowerCase();
    if (!acc[env]) acc[env] = [];
    acc[env].push(entry);
    return acc;
  }, {});

  const envUrls = {
    qa: 'https://qa-sia-dashboard.oneorigin.us/',
    uat: 'https://uat-sia-dashboard.oneorigin.us/',
    stage: 'https://stage-sia-dashboard.oneorigin.us/',
  };

  // 1. Launch single browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  // 2. For each environment, open a new tab
  for (const [env, clients] of Object.entries(groupedByEnv)) {
    if (!envUrls[env]) {
      console.warn(`⚠️ Unknown environment: ${env}`);
      continue;
    }

    const page = await context.newPage(); // new tab for env
    await page.goto(envUrls[env]);

    // Optional: log env info in the tab title
    await page.evaluate((envName) => {
      document.title = `Env: ${envName}`;
    }, env.toUpperCase());

    // 3. Login each client in sequence (or use Promise.all for parallel)
    for (const entry of clients) {
      const {
        'Client name ': client,
        'Acount key ': accountKey,
        Email,
        password
      } = entry;

      try {
        await page.goto(envUrls[env]);
        await page.locator('#account-key').fill(accountKey);
        await page.keyboard.press('Enter');
        await page.getByPlaceholder('Enter Email ID').fill(Email);
        await page.keyboard.press('Enter');
        await page.waitForSelector('input[type="password"]', { timeout: 5000 });
        await page.fill('input[type="password"]', password);
        await page.getByRole('button', { name: 'Login' }).click();

        console.log(`✅ Logged in: ${client} (${env})`);
      } catch (error) {
        console.error(`❌ Failed: ${client} (${env}) - ${error.message}`);
      }
    }
  }

  // await browser.close(); // optional
})();


