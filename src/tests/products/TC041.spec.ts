import { mergeTests } from "@playwright/test";
import { test as productTest, expect } from "../../fixtures/ProductPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, productTest);

dotenv.config();

test("TC041: Verify Product Details Side Panel Opens from Context Menu", async ({ productPage }) => {
  
  await productPage.navigateToProductsViaSideMenu();
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
  
  const isTableVisible = await productPage.isProductTableVisible();
  expect(isTableVisible).toBe(true);
  
  await productPage.clickThreeDotMenuForFirstProduct();
  
  await productPage.page.waitForTimeout(500);
  
  const isMenuVisible = await productPage.isActionMenuVisible();
  expect(isMenuVisible).toBe(true);
  
  await productPage.clickShowOption();
  
  await productPage.page.waitForTimeout(1000);
  
  const isPanelVisible = await productPage.isProductDetailsPanelVisible();
  expect(isPanelVisible).toBe(true);
  
  const panelTitle = await productPage.getProductDetailsPanelTitle();
  expect(panelTitle).toBe("Product");
  
  await productPage.closeProductDetailsPanel();
  
  await productPage.page.waitForTimeout(500);
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
});

