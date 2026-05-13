const { test, expect } = require('@playwright/test');
const { restaurantsMock } = require('./test-data');

test.describe('Responsive view', () => {
  test('homepage is usable on mobile viewport', async ({ page }) => {
    await page.route('**/restauracje', async route => {
      await route.fulfill({ json: restaurantsMock });
    });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /wybierz restaurację/i })).toBeVisible();
    await expect(page.locator('.restaurant-card').first()).toBeVisible();
    await expect(page.getByRole('link', { name: /koszyk/i })).toBeVisible();
  });
});
