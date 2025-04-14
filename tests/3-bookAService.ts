import { test, expect } from '@playwright/test';

test('Book a service on SimplyBook', async ({ page }) => {
  // Step 1: Go to SimplyBook booking page
  await page.goto('https://simplybook.me/en/');

  // Step 2: Click on 'Login'
  await page.click('text=Login');

  // Use your login credentials
  const login = 'testlogin1234'; // Replace with actual login
  const password = 'MyTestPassword123!'; // Replace with actual password

  await page.fill('#login', login);
  await page.fill('#password', password);
  await page.click('button[type="submit"]');

  // Step 3: Navigate to Booking page (assuming it's under user dashboard or a direct link)
  await page.waitForURL(/dashboard|welcome/, { timeout: 10000 });

  // Step 4: Navigate to booking page
  // Note: This URL/flow might be different based on your config
  await page.goto('https://[your-booking-page].simplybook.me/v2/'); // Replace accordingly

  // Step 5: Select a service
  await page.waitForSelector('.service-list');
  await page.click('.service-list .service-item:first-child'); // Select the first service

  // Step 6: Select a time slot
  await page.waitForSelector('.timeslot');
  await page.click('.timeslot'); // Select first available slot

  // Step 7: Fill in booking info (if required)
  // Add form data if needed here...

  // Step 8: Submit the booking
  await page.click('button:has-text("Confirm Booking")'); // Adjust if button label differs

  // Step 9: Verify confirmation message
  const confirmationMessage = await page.locator('text=Booking confirmed').isVisible();
  expect(confirmationMessage).toBeTruthy();

  // Step 10: Check Booking History (if accessible)
  await page.goto('https://[your-account-url].simplybook.me/client-dashboard'); // Adjust accordingly
  const historyEntry = await page.locator('text=Upcoming Appointments').isVisible();
  expect(historyEntry).toBeTruthy();

  console.log('✅ Booking completed and verified in history.');
});
