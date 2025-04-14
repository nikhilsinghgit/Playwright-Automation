import { test, expect } from '@playwright/test';

test('Logout from the system and verify session ends', async ({ page }) => {
  // Step 1: Log in
  await page.goto('https://[your-booking-page].simplybook.me/en/');
  await page.click('text=Login');
  await page.fill('#login', 'testlogin1234'); // Replace with valid creds
  await page.fill('#password', 'MyTestPassword123!');
  await page.click('button[type="submit"]');

  // Step 2: Navigate to dashboard and confirm login
  await page.goto('https://[your-booking-page].simplybook.me/client-dashboard');
  await expect(page.locator('text=Upcoming Appointments')).toBeVisible();

  // Step 3: Perform logout
  await page.click('text=Logout'); // Adjust if logout is a menu item or icon

  // Step 4: Verify user is redirected to login or home page
  await expect(page).toHaveURL(/.*simplybook\.me\/en\/?/);

  // Step 5: Try accessing dashboard again — should redirect or deny access
  await page.goto('https://[your-booking-page].simplybook.me/client-dashboard');
  await expect(page.locator('text=Login')).toBeVisible();

  console.log('✅ Logout successful and session ended.');
});
