import { test, expect } from '@playwright/test';

test.describe('College Transfers Tests', () => {
  let page ;

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

  test.afterAll(async () => {
    await page.close();
  });

  test('Click all eye icons in College Transfers', async () => {
    // Navigate to College Transfers page
    await page.locator('//a[contains(@href, "/collegeTransfers")]').click();

    // Wait for eye icons to be visible
    await page.waitForSelector('//div[@class="eyeBackground"]', { timeout: 90000 });

  const eyeIcons = page.locator('//div[@class="eyeBackground"]');
const count = await eyeIcons.count();
console.log(`🔍 Found ${count} eye icons.`);

for (let i = 0; i < count; i++) {
  console.log(`▶️ Clicking eye icon ${i + 1}`);

  // 1. Click the eye icon
  await eyeIcons.nth(i).click();

  // Optional: wait for preview to fully load
  await page.waitForTimeout(3000);

  // 2. Click edit icon in the specific row
  try {
    await page.locator("(//i[@aria-hidden='true'])[10]").click();
    console.log(`✏️ Clicked edit icon for Natasha in file ${i + 1}`);
  } catch (e) {
    console.log(`❗ Edit icon not found for Natasha in file ${i + 1}`);
    continue; // move to next icon if not found
  }

  // 3. Click Save button
  try {
    await page.locator("//span[text()='Save']").click();
    console.log(`💾 Clicked Save button for file ${i + 1}`);
  } catch (e) {
    console.log(`❗ Save button not found in file ${i + 1}`);
  }

  // Optional: wait to visually inspect
  await page.waitForTimeout(1000);


  // Optional wait to see the preview clearly
  await page.waitForTimeout(15000);

  // Optional: Close the preview
  try {
    await page.locator('//button[contains(@class, "close-preview")]').click();
  } catch (e) {
    console.log(`❗ No preview found for icon ${i + 1}`);
  }
}
  console.log(` Clicking file ${i + 1}`);{timeout:9000}
  });
});

















      
      // <--- THIS IS WHERE YOUR CODE WAS LOCATED --->
       //await await page.getByRole('row', { name: 'Natasha T Graham Official' }).locator('i').first().click();
