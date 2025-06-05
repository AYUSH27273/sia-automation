// import { test, expect } from '@playwright/test';
// import path from 'path';

// test('open all files one by one', async ({ page }) => {
//     await page.goto("https://qa-sia-dashboard.oneorigin.us/")
//     await page.locator('//input[@id="account-key"]').fill('oneorigin');
//     await page.locator('//input[@id="email_id"]').fill('ayush+bpu@oneorigin.us');
//     await page.locator('//button[@id="login-btn"]').click();
//     await page.locator('//input[@id="password"]').fill('Tester@1');
//     await page.locator('//button[@id="login-btn"]').click();

//     await page.locator('//a[contains(@href, "/collegeTransfers")]').click();

//     // Wait for any loading overlay to disappear after navigation
//     await page.locator('//div[contains(@class, "con-vs-loading")]').waitFor({ state: 'hidden', timeout: 15000 })
//         .catch(error => {
//             console.warn('Loading overlay might not have appeared or disappeared within timeout:', error.message);
//         });

//     // --- Key change starts here: Select ALL eye icons ---
//     // Use a generic locator that matches all eye icons.
//     // Based on your previous screenshot, the eye icons are likely represented by <img> tags
//     // with IDs like "eye-0", "eye-1", etc., or they all share the 'eyeAlignment' class within 'eyeBackground'.
//     // Let's use the most general and robust one if they are all images with a common pattern or inside a common container.

//     // Option 1: If they all have IDs like "eye-0", "eye-1", "eye-2", etc.
//     // This XPath selects all <img> elements whose 'id' attribute starts with 'eye-'.
//     const allEyeIcons = page.locator('//img[starts-with(@id, "eye-")]');

//     // Option 2: If they are all inside a div with class "eyeBackground"
//     // const allEyeIcons = page.locator('//div[@class="eyeBackground"]//img');

//     // Option 3: If the image itself has the class 'eyeAlignment' (from your screenshot)
//     // const allEyeIcons = page.locator('//img[@class="eyeAlignment"]');

//     // Let's go with Option 1 for now as it seems most specific and robust based on 'id="eye-0"'.
//     // If that doesn't work, try Option 3.
//     // const allEyeIcons = page.locator('//img[starts-with(@id, "eye-")]');
//     // If you're sure they all have 'id="eye-0"' (which is unlikely if there are 10 unique ones), then:
//     // const allEyeIcons = page.locator('//img[@id="eye-0"]'); // This would only select the first one if IDs are truly unique

//     // Let's assume Option 1 is the most likely good fit for "10 files"
//     // If they are all just `//div[@class="eyeBackground"]` without unique IDs for each, use:
//     // const eyeIcons = page.locator('//div[@class="eyeBackground"]'); // This will select all of them.

//     // const count = await eyeIcons.count();
//     // console.log(`Found ${count} eye icons to click.`);

//     // // Loop through each eye icon and click it
//     // for (let i = 0; i < count; i++) {
//     //     console.log(`Clicking eye icon #${i + 1}`);
//     const eyeIcons = iframeElement.locator('//div[@class="eyeBackground"]');
// const count = await eyeIcons.count();
// console.log(`Found ${count} eye icons inside the iframe.`);

// for (let i = 0; i < count; i++) {
//     await eyeIcons.nth(i).click();
//     await page.waitForTimeout(3000); // wait or close modal if needed
// }

//         // Use .nth(i) to target the specific element in the collection
//         // Adding a small wait or force: true if it's still flaky
//         await eyeIcons.nth(i).click({ timeout: 10000 }); // Increase click timeout if needed

//         // If clicking opens a new tab/window, you'll need to handle it.
//         // For example, to close it immediately after viewing:
//         // const [newPage] = await Promise.all([
//         //     page.waitForEvent('popup'),
//         //     eyeIcons.nth(i).click(), // This click will trigger the popup
//         // ]);
//         // await newPage.close();

//         // If clicking opens a modal or new section on the same page,
//         // you might need to close it before clicking the next eye icon.
//         // For example, if there's a "Close" button:
//         // await page.locator('//button[text()="Close"]').click();
//         // await page.waitForTimeout(500); // Small pause if needed after closing
//     }

//     console.log("All eye icons clicked.");
// });
import { test, expect } from '@playwright/test';

test('Click all eye icons in College Transfers', async ({ page }) => {
  await page.goto("https://qa-sia-dashboard.oneorigin.us/");
  
  // Login
  await page.locator('#account-key').fill('oneorigin');
  await page.locator('#email_id').fill('ayush+bpu@oneorigin.us');
  await page.locator('#login-btn').click();
  await page.locator('#password').fill('Tester@1');
  await page.locator('#login-btn').click();

  // Navigate to College Transfers
  await page.locator('//a[contains(@href, "/collegeTransfers")]').click();

  // Wait for the table with eye icons to load
  await page.waitForSelector('//div[@class="eyeBackground"]', { timeout: 30000 });

  // Select all eye icons
  const eyeIcons = page.locator('//div[@class="eyeBackground"]');
  const count = await eyeIcons.count();
  console.log(`Found ${count} eye icons.`);

  for (let i = 0; i < count; i++) {
    console.log(`Clicking file ${i + 1}`);
   // await page.waitForSelector('//button[@class="close-preview v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default"]',{timeout:15000});
    //await page.locator('//button[@class="close-preview v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default"]').click();
   
    await eyeIcons.nth(i).click();
     await page.waitForSelector('//button[@class="close-preview v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default"]',{timeout:15000});
    await page.locator('//button[@class="close-preview v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default"]').click();
// Find all dropdown elements (assuming they have a common selector)
// const dropdowns = await page.$$('select.dropdownClass'); // or any selector matching all dropdowns

// for (let i = 0; i < dropdowns.length; i++) {
//   // For example, select the first option (excluding default empty option if any)
//   const options = await dropdowns[i].$$('option');

//   // Optionally, you can pick a specific option or dynamically decide
//   if (options.length > 1) {
//     const valueToSelect = await options[1].getAttribute('value');  // pick second option
//     await dropdowns[i].selectOption(valueToSelect);
//   }
// }

    // Optional: wait for modal/file view to open or simulate delay
    //await page.waitForTimeout(2000); // adjust as needed

    // Optional: close modal or file view if needed before next
    // await page.locator('button:has-text("Close")').click();
  }

  console.log("All files opened one by one.");
});
