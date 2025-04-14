import { test, expect } from '@playwright/test';

test('Register a new account on SimplyBook', async ({ page }) => {
  // Step 1: Navigate to signup page
  await page.goto('https://simplybook.me/en/');

  // Click on 'Start Free Trial'
  await page.click('text=Start Free Trial');

  // Step 2: Fill in the registration form
  const random = Math.floor(Math.random() * 10000);
  const company = `MyTestCompany${random}`;
  const email = `mytest${random}@example.com`;
  const login = `testlogin${random}`;
  const password = 'MyTestPassword123!';

  await page.fill('#company', company);
  await page.fill('#email', email);
  await page.fill('#login', login);
  await page.fill('#password', password);

  // Accept terms and conditions
  await page.check('input[type="checkbox"]');

  // Submit the form
  await page.click('button[type="submit"]');

  // Step 3: Validate successful registration
  await page.waitForURL(/\/welcome/, { timeout: 10000 });
  const successMessage = await page.locator('text=Welcome').isVisible();
  expect(successMessage).toBeTruthy();

  console.log(`✔️ Account created for: ${email}`);
});
