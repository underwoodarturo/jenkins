import { test, expect } from '@playwright/test';

test('habi-co has title', async ({ page }) => {
  await page.goto('/');

  // Expect h1 to contain a substring.
  expect(await page.locator('h1').innerText()).toContain(`Compramos
tu vivienda en 10 días*`);
});
