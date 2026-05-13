const { test, expect, devices } = require('@playwright/test');

test.use({
  ...devices['iPhone 13'],
});

test('mobile homepage works correctly', async ({ page }) => {
  await page.goto('https://restaurants-portal.vercel.app');

  await expect(page.locator('body')).toBeVisible();
});
