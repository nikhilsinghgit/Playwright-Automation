import { test, expect } from '@playwright/test';

// Replace these with actual test credentials from registration step
const testLogin = 'testlogin1234';
const testPassword = 'MyTestPassword123!';

test('Login to SimplyBook using test credentials', async ({ page }) => {
  // Step 1: Navigate to Login Page
  await page.goto('https://simplybook.me/en/');

  // Click on 'Login'
  await page.click('text=Login');

  // Step 2: Fill login form
  await page.fill('#login', testLogin);
  await page.fill('#password', testPassword);

  // Submit login
  await page.click('button[type="submit"]');

  // Step 3: Validate dashboard access (success condition)
  await page.waitForURL(/dashboard|welcome/, { timeout: 10000 });

  const dashboardText = await page.locator('text=Dashboard').isVisible();
  expect(dashboardText).toBeTruthy();

  console.log(`✅ Logged in successfully as ${testLogin}`);
});
