import { mergeTests } from "@playwright/test";
import { test as productTest, expect } from "../../fixtures/ProductPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, productTest);

dotenv.config();

test("TC042: Verify Product Edit Panel Opens from Context Menu", async ({ productPage }) => {
  
  await productPage.navigateToProductsViaSideMenu();
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
  
  const isTableVisible = await productPage.isProductTableVisible();
  expect(isTableVisible).toBe(true);
  
  await productPage.clickThreeDotMenuForFirstProduct();
  
  await productPage.page.waitForTimeout(500);
  
  const isMenuVisible = await productPage.isActionMenuVisible();
  expect(isMenuVisible).toBe(true);
  
  await productPage.clickEditOption();
  
  await productPage.page.waitForTimeout(1000);
  
  const isPanelVisible = await productPage.isProductDetailsPanelVisible();
  expect(isPanelVisible).toBe(true);
  
  const nameFieldVisible = await productPage.page.locator('input#name').isVisible();
  expect(nameFieldVisible).toBe(true);
  
  const priceFieldVisible = await productPage.page.locator('input#price').isVisible();
  expect(priceFieldVisible).toBe(true);
  
  const submitButtonVisible = await productPage.page.locator('button[type="submit"]').isVisible();
  expect(submitButtonVisible).toBe(true);
  
  await productPage.page.mouse.move(0, 0);
  await productPage.page.waitForTimeout(200);
  await productPage.page.keyboard.press('Escape');
  await productPage.page.waitForTimeout(500);
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
});

