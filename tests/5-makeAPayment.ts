import { test, expect } from '@playwright/test';

test('Make a payment and validate transaction', async ({ page }) => {
  // Step 1: Navigate to booking page
  await page.goto('https://[your-booking-page].simplybook.me/v2/'); // Replace with your actual booking page

  // Step 2: Select a service
  await page.waitForSelector('.service-item');
  await page.click('.service-item:first-child');

  // Step 3: Pick a time slot
  await page.waitForSelector('.timeslot');
  await page.click('.timeslot');

  // Step 4: Proceed to checkout
  await page.click('button:has-text("Confirm Booking")');

  // Step 5: Choose payment method
  await page.waitForSelector('select[name="paymentMethod"]', { timeout: 10000 });
  await page.selectOption('select[name="paymentMethod"]', 'card'); // Or 'stripe', 'paypal', etc.

  // Step 6: Fill test card details (Stripe test data shown here)
  await page.fill('input[name="cardnumber"]', '4242 4242 4242 4242');
  await page.fill('input[name="exp-date"]', '12/30');
  await page.fill('input[name="cvc"]', '123');
  await page.fill('input[name="postal"]', '12345');

  // Step 7: Submit the payment
  await page.click('button:has-text("Pay")');

  // Step 8: Wait for and validate confirmation
  await page.waitForSelector('text=Payment Successful', { timeout: 15000 });
  const confirmation = await page.isVisible('text=Payment Successful');
  expect(confirmation).toBeTruthy();

  // Step 9: Go to Booking/Transaction History
  await page.goto('https://[your-account-subdomain].simplybook.me/client-dashboard'); // Update URL accordingly

  // Step 10: Validate transaction exists
  const paymentRecord = await page.locator('text=Paid').first().isVisible();
  expect(paymentRecord).toBeTruthy();

  console.log('✅ Payment completed and verified in booking history.');
});
