import { mergeTests } from "@playwright/test";
import { test as productTest, expect } from "../../fixtures/ProductPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, productTest);

dotenv.config();

test("TC040: Verify Three-Dot Menu Opens for Product Actions", async ({ productPage }) => {
  
  await productPage.navigateToProductsViaSideMenu();
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
  
  const isTableVisible = await productPage.isProductTableVisible();
  expect(isTableVisible).toBe(true);
  
  const productCount = await productPage.getProductTableRowCount();
  expect(productCount).toBeGreaterThan(0);
  
  await productPage.clickThreeDotMenuForFirstProduct();
  
  await productPage.page.waitForTimeout(500);
  
  const isMenuVisible = await productPage.isActionMenuVisible();
  expect(isMenuVisible).toBe(true);
  
  const menuOptions = await productPage.getActionMenuOptions();
  expect(menuOptions.length).toBeGreaterThan(0);
  
  await productPage.page.mouse.move(0, 0);
  await productPage.page.waitForTimeout(200);
  await productPage.page.keyboard.press('Escape');
  await productPage.page.waitForTimeout(500);
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
});

