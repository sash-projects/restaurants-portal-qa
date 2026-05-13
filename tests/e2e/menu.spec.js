const { test, expect } = require('@playwright/test');

test.describe('Restaurant menu', () => {
  test('opens Italian restaurant menu from homepage', async ({ page }) => {
    await page.route('**/restauracje', async route => {
      await route.fulfill({
        json: [
          {
            id: 1,
            nazwa: 'Restauracja Włoska',
            kuchnia: 'wloska',
            sredniaCena: 45,
            czasDostawy: 30,
            link: 'restauracja1.html',
          },
        ],
      });
    });

    await page.goto('/');
    await page.getByRole('link', { name: /zobacz menu/i }).click();

    await expect(page).toHaveURL(/restauracja1\.html/);
    await expect(page.locator('.dish').first()).toBeVisible();
  });

  test('filters dishes by category on menu page', async ({ page }) => {
    await page.goto('/restauracja1.html');

    await page.locator('#category-filter').selectOption('pizza');

    await expect(page.locator('#pizza')).toBeVisible();
    await expect(page.locator('#makarony')).not.toBeVisible();
  });

  test('adds dish to cart and shows popup', async ({ page }) => {
    await page.goto('/restauracja1.html');

    await page.locator('.dish button').first().click();

    await expect(page.locator('#koszyk-popup')).toContainText(/dodano do koszyka/i);

    const cart = await page.evaluate(() => JSON.parse(localStorage.getItem('koszyk') || '[]'));
    expect(cart.length).toBe(1);
    expect(cart[0].nazwa).toBeTruthy();
    expect(cart[0].cena).toBeGreaterThan(0);
  });
});
