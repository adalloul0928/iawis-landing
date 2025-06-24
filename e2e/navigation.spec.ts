import { test, expect } from "@playwright/test";

test("should load the homepage", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/IAWIS/);
});

test("should have get started link", async ({ page }) => {
  await page.goto("/");
  const getStarted = page.getByRole("link", { name: "Get started" });
  await expect(getStarted).toBeVisible();
});