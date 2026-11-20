// @ts-check
import { test, expect } from '@playwright/test';

//sample test for frontend display:
test('projectName is displayed', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expect a title "to contain" a substring.
  await expect(page.getByText("CampuStudy")).toBeVisible();
});

