import { expect, test } from "@playwright/test";

test("index page doesn't have default h1", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Welcome to SvelteKit" }),
  ).not.toBeVisible();
});

test("index page has 'Hi Stu' h3", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Hi Stu" }),
  ).toBeVisible();
});
