// import { test, expect } from '@playwright/test';

// test('Click all eye icons in College Transfers', async ({ page }) => {
//   await page.waitForSelector('.con-vs-loading', { state: 'detached', timeout: 30000 });
//   await page.goto("https://qa-sia-dashboard.oneorigin.us/");
  
//   // Login
//   await page.locator('#account-key').fill('oneorigin');
//   await page.locator('#email_id').fill('ayush+bpu@oneorigin.us');
//   await page.locator('#login-btn').click();
//   await page.locator('#password').fill('Tester@1');
//   await page.locator('#login-btn').click();

//   // Navigate to College Transfers
//   await page.locator('//a[contains(@href, "/collegeTransfers")]').click();

//   // Wait for the table with eye icons to load
//   await page.waitForSelector('//div[@class="eyeBackground"]', { timeout: 30000 });

//   // Select all eye icons
//   const eyeIcons = page.locator('//div[@class="eyeBackground"]');
//   const count = await eyeIcons.count();
//   console.log(`Found ${count} eye icons.`);

//   for (let i = 0; i < count; i++) {
//   console.log(`Clicking file ${i + 1}`);
  
//   await eyeIcons.nth(i).click();

//   try {
//     await page.waitForSelector(
//       '//button[@class="close-preview v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default"]',
//       { timeout: 8000 }
//     );
//     await page.locator(
//       '//button[@class="close-preview v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default"]'
//     ).click();
//   } catch (err) {
//     console.log(`❗ Close button not found for file ${i + 1}, skipping...`);
//   }

//   // Optional: small wait between clicks to avoid race conditions
//   await page.waitForTimeout(500);
// }

//   console.log("All files opened one by one.");
// });
import { test, expect } from '@playwright/test';

test.describe('College Transfers Tests', () => {
  let page;

  // Runs once before all tests in this describe block
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();

    await page.goto('https://qa-sia-dashboard.oneorigin.us/');

    // Login steps
    await page.locator('#account-key').fill('oneorigin');
    await page.locator('#email_id').fill('ayush+bpu@oneorigin.us');
    await page.locator('#login-btn').click();
    await page.locator('#password').fill('Tester@1');
    await page.locator('#login-btn').click();
  });

  // Runs once after all tests in this describe block
  test.afterAll(async () => {
    await page.close();
  });

  test('Click all eye icons in College Transfers', async () => {
    // Navigate to College Transfers page
    await page.locator('//a[contains(@href, "/collegeTransfers")]').click();

    // Wait for eye icons to be visible
    await page.waitForSelector('//div[@class="eyeBackground"]', { timeout: 30000 });

    const eyeIcons = page.locator('//div[@class="eyeBackground"]');
    const count = await eyeIcons.count();
    console.log(`Found ${count} eye icons.`);

    for (let i = 0; i < count; i++) {
      console.log(`Clicking file ${i + 1}`);

      // Set timeout of 6000ms for each iteration (click + close)
      await test.step(`Processing eye icon #${i + 1}`, async () => {
        await Promise.race([
          (async () => {
            await eyeIcons.nth(i).click();

            try {
              await page.waitForSelector(
                '//button[@class="close-preview v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default"]',
                { timeout: 4000 }
              );
              await page.locator(
                '//button[@class="close-preview v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default"]'
              ).click();
            } catch {
              console.log(`❗ Close button not found for file ${i + 1}, skipping...`);
            }
          })(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout for this file')), 6000))
        ]);
      });

      // Small pause between clicks to reduce flakiness
      await page.waitForTimeout(500);
    }

    console.log('✅ All files processed.');
  });
});
