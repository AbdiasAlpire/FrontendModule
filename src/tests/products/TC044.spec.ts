import { mergeTests } from "@playwright/test";
import { test as productTest, expect } from "../../fixtures/ProductPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, productTest);

dotenv.config();

test("TC044: Verify Product ID Copied to Clipboard from Context Menu", async ({ productPage, context }) => {
  
  await productPage.navigateToProductsViaSideMenu();
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
  
  const isTableVisible = await productPage.isProductTableVisible();
  expect(isTableVisible).toBe(true);
  
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  
  await productPage.clickThreeDotMenuForFirstProduct();
  
  await productPage.page.waitForTimeout(500);
  
  const isMenuVisible = await productPage.isActionMenuVisible();
  expect(isMenuVisible).toBe(true);
  
  await productPage.clickCopyIdOption();
  
  await productPage.page.waitForTimeout(1000);
  
  const clipboardContent = await productPage.page.evaluate(() => navigator.clipboard.readText());
  
  expect(clipboardContent).toBeTruthy();
  expect(clipboardContent.length).toBeGreaterThan(0);
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
});

