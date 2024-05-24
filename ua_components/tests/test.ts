import { expect, test } from "@playwright/test";

// Below fails while `ua_components` is still in library mode
// test("index page has expected h1", async ({ page }) => {
//   await page.goto("/");
//   await expect(
//     page.getByRole("heading", { name: "Welcome to SvelteKit" }),
//   ).toBeVisible();
// });
