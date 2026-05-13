const { test, expect } = require('@playwright/test');

test('navigation works correctly', async ({ page }) => {
  await page.goto('https://restaurants-portal.vercel.app');

  const links = page.locator('a');

  await expect(links.first()).toBeVisible();
});
