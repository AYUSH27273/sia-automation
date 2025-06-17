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

// import { test, expect } from '@playwright/test';

// test.describe('College Transfers Tests', () => {
//   let page;

//   // Runs once before all tests in this describe block
//   test.beforeAll(async ({ browser }) => {
//     const context = await browser.newContext();
//     page = await context.newPage();

//     await page.goto('https://qa-sia-dashboard.oneorigin.us/');

//     // Login steps
//     await page.locator('#account-key').fill('oneorigin');
//     await page.locator('#email_id').fill('ayush+bpu@oneorigin.us');
//     await page.locator('#login-btn').click();
//     await page.locator('#password').fill('Tester@1');
//     await page.locator('#login-btn').click();
//   });

//   // Runs once after all tests in this describe block
//   test.afterAll(async () => {
//     await page.close();
//   });

//   test('Click all eye icons in College Transfers', async () => {
//     // Navigate to College Transfers page
//     await page.locator('//a[contains(@href, "/collegeTransfers")]').click();

//     // Wait for eye icons to be visible
//     await page.waitForSelector('//div[@class="eyeBackground"]', { timeout: 90000 });

//     const eyeIcons = page.locator('//div[@class="eyeBackground"]');
//     const count = await eyeIcons.count();
//     console.log(`🔍 Found ${count} eye icons.`);

//     for (let i = 0; i < count; i++) {
//       console.log(`▶️ Clicking file ${i + 1}`);

//       await test.step(`Processing eye icon #${i + 1}`, async () => {
//         await Promise.race([
//           (async () => {
//             await eyeIcons.nth(i).click();
//             console.log(`✅ Clicked on eye icon ${i + 1}`);

//             // Locate edit icon inside modal/view
// // Wait for the iframe and get its frame context
// const frameHandle = await page.waitForSelector('iframe'); // Use a more specific selector if known
// const frame = await frameHandle.contentFrame();

// // Define the XPath for the first edit icon
// const firstEditIcon = frame.locator('(//div[contains(@class, "v-icon--link") and contains(@class, "school_edit0")]/i[contains(@class, "mdi-border-color")])[1]');

// // Wait for the icon to be visible and click it
// await firstEditIcon.waitFor({ state: 'visible', timeout: 5000 });
// await firstEditIcon.click();

        

//             // Optional: Uncomment to click the first edit icon
//             // if (editCount > 0) await editIcons.nth(0).click();

//             // Wait and click the Close button
//             try {
//               await page.waitForSelector(
//                 '//button[contains(@class, "close-preview")]',
//                 { timeout: 6000 }
//               );
//               await page.locator(
//                 '//button[contains(@class, "close-preview")]'
//               ).click();
//             } catch {
//               console.log(`❗ Close button not found for file ${i + 1}, skipping...`);
//             }
//           })(),
//           new Promise((_, reject) => setTimeout(() => reject(new Error('⏰ Timeout for this file')), 12000))
//         ]);
//       });

//       // Small pause between each icon click
//       await page.waitForTimeout(500);
//     }

//     console.log('✅ All files processed.');
//   });
// });




import { test, expect } from '@playwright/test';

test.describe('College Transfers Tests', () => {
  let page;

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
      console.log(`▶️ Clicking file ${i + 1}`);

      await test.step(`Processing eye icon #${i + 1}`, async () => {
        await Promise.race([
          (async () => {
            await eyeIcons.nth(i).click();
            console.log(`✅ Clicked on eye icon ${i + 1}`);

            try {
              // Wait for the iframe
              await page.waitForTimeout(1000); 
              const frameHandle = await page.waitForSelector('iframe', { timeout: 10000 });
              console.log(`🖼️ Iframe appeared for file ${i + 1}`);

              const frame = await frameHandle.contentFrame();
              if (!frame) {
                console.log(`❗ Could not access iframe content for file ${i + 1}`);
                return;
              }

              // Locate the first edit icon inside the iframe
              const firstEditIcon = frame.locator('(//div[contains(@class, "v-icon--link") and contains(@class, "school_edit0")]/i[contains(@class, "mdi-border-color")])').first();
              await firstEditIcon.waitFor({ state: 'visible', timeout: 5000 });
              console.log(`🖊️ Edit icon visible in file ${i + 1}`);
              await firstEditIcon.click();
              console.log(`✅ Clicked edit icon in file ${i + 1}`);
            } catch (err) {
              console.log(`❗ Error with iframe or edit icon for file ${i + 1}: ${err.message}`);
            }

            // Close preview (if available)
            try {
              await page.waitForSelector('//button[contains(@class, "close-preview")]', { timeout: 6000 });
              await page.locator('//button[contains(@class, "close-preview")]').click();
              console.log(`❎ Closed preview for file ${i + 1}`);
            } catch {
              console.log(`❗ Close button not found for file ${i + 1}, skipping...`);
            }
          })(),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('⏰ Timeout for this file')), 12000)
          )
        ]);
      });

      // Small pause between clicks to avoid flakiness
      await page.waitForTimeout(500);
    }

    console.log('✅ All files processed.');
  });
});
