const { test, expect } = require('@playwright/test');
const { restaurantsMock } = require('./test-data');

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/restauracje', async route => {
      await route.fulfill({ json: restaurantsMock });
    });
  });

  test('loads homepage and displays restaurant cards', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/SmaczneGo/i);
    await expect(page.getByRole('heading', { name: /wybierz restaurację/i })).toBeVisible();
    await expect(page.locator('.restaurant-card')).toHaveCount(4);
    await expect(page.getByRole('link', { name: /koszyk/i })).toBeVisible();
  });

  test('filters restaurants by cuisine', async ({ page }) => {
    await page.goto('/');

    await page.locator('#cuisine').selectOption('polska');

    await expect(page.locator('.restaurant-card')).toHaveCount(1);
    await expect(page.getByRole('heading', { name: 'Restauracja Polska' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Restauracja Włoska' })).toBeHidden();
  });

  test('sorts restaurants by delivery time', async ({ page }) => {
    await page.goto('/');

    await page.locator('#sort').selectOption('time');

    const firstCardTitle = page.locator('.restaurant-card h2').first();
    await expect(firstCardTitle).toHaveText('Restauracja Fast Food');
  });

  test('switches dark mode on homepage', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /tryb ciemny/i }).click();

    await expect(page.getByRole('button', { name: /tryb jasny/i })).toBeVisible();
  });
});
