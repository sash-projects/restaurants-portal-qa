const { test, expect } = require('@playwright/test');

test.describe('Cart and order form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem(
        'koszyk',
        JSON.stringify([
          { nazwa: 'Pizza Margherita', cena: 28 },
          { nazwa: 'Tiramisu', cena: 18 },
        ])
      );
    });
  });

  test('displays products and total price in cart', async ({ page }) => {
    await page.goto('/zamowienia.html');

    await expect(page.getByText(/pizza margherita/i)).toBeVisible();
    await expect(page.getByText(/tiramisu/i)).toBeVisible();
    await expect(page.locator('#suma')).toHaveText('46');
  });

  test('removes product from cart', async ({ page }) => {
    await page.goto('/zamowienia.html');

    await page.locator('.usun-z-koszyka').first().click();

    await expect(page.getByText(/pizza margherita/i)).toBeHidden();
    await expect(page.locator('#suma')).toHaveText('18');
  });

  test('does not submit order when required fields are empty', async ({ page }) => {
    await page.goto('/zamowienia.html');

    await page.getByRole('button', { name: /złóż zamówienie/i }).click();

    await expect(page).toHaveURL(/zamowienia\.html/);
  });

  test('submits valid order and opens confirmation page', async ({ page }) => {
    await page.goto('/zamowienia.html');

    await page.locator('#name').fill('Jan Kowalski');
    await page.locator('#address').fill('ul. Testowa 1, Warszawa');
    await page.locator('#phone').fill('123456789');
    await page.locator('input[name="payment"][value="gotowka"]').check();
    await page.locator('#terms').check();
    await page.getByRole('button', { name: /złóż zamówienie/i }).click();

    await expect(page).toHaveURL(/potwierdzenie\.html/);
    await expect(page.getByRole('heading', { name: /dziękujemy za zamówienie/i })).toBeVisible();
  });
});
