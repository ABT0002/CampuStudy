// @ts-check
import { test, expect } from '@playwright/test';

//sample test for frontend display:
test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expect a title "to contain" a substring.
  await expect(page.getByRole('heading', { level: 1, name: "Welcome to CampuStudy"})).toBeVisible();
});

