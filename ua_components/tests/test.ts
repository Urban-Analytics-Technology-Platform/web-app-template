import { expect, test } from "@playwright/test";

// This isn't visible because this is a library
test("index page doesn't exist", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Welcome to SvelteKit" }),
  ).not.toBeVisible();
});
