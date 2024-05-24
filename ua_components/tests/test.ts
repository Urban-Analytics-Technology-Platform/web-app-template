import { expect, test } from "@playwright/test";

// I assume this isn't visible because this is meant to be a library
test("index page doesn't exist", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Welcome to SvelteKit" }),
  ).not.toBeVisible();
});
