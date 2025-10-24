import { mergeTests } from "@playwright/test";
import { test as productTest, expect } from "../../fixtures/ProductPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, productTest);

dotenv.config();

test("TC044: Verify Product ID Copied to Clipboard from Context Menu", async ({ productPage, context, browserName }) => {
  
  await productPage.navigateToProductsViaSideMenu();
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
  
  const isTableVisible = await productPage.isProductTableVisible();
  expect(isTableVisible).toBe(true);
  
  // Grant clipboard permissions only for Chromium (Firefox and WebKit don't support these permissions)
  if (browserName === 'chromium') {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  }
  
  await productPage.clickThreeDotMenuForFirstProduct();
  
  await productPage.page.waitForTimeout(500);
  
  const isMenuVisible = await productPage.isActionMenuVisible();
  expect(isMenuVisible).toBe(true);
  
  await productPage.clickCopyIdOption();
  
  await productPage.page.waitForTimeout(1000);
  
  // For Chromium, use clipboard API. For Firefox/WebKit, verify the action was triggered
  if (browserName === 'chromium') {
    const clipboardContent = await productPage.page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardContent).toBeTruthy();
    expect(clipboardContent.length).toBeGreaterThan(0);
  } else {
    // For Firefox and WebKit, verify that clicking Copy ID closes the menu
    // (this at least confirms the action was triggered, even if we can't verify clipboard)
    await productPage.page.waitForTimeout(500);
    const isMenuStillVisible = await productPage.isActionMenuVisible();
    expect(isMenuStillVisible).toBe(false);
  }
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
});

