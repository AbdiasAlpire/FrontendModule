import { mergeTests } from "@playwright/test";
import { test as productTest, expect } from "../../fixtures/ProductPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, productTest);

dotenv.config();

test("TC033: Verify Searching for an Existing Product is Case-Insensitive", async ({ productPage }) => {
  
  await productPage.navigateToProductsViaSideMenu();
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
  
  const isTableVisible = await productPage.isProductTableVisible();
  expect(isTableVisible).toBe(true);
  
  const initialRowCount = await productPage.getProductTableRowCount();
  expect(initialRowCount).toBeGreaterThan(0);
  
  await productPage.searchProduct("PRODUCT");
  
  const searchValue = await productPage.getSearchBoxValue();
  expect(searchValue).toBe("PRODUCT");
  
  const uppercaseRowCount = await productPage.getProductTableRowCount();
  expect(uppercaseRowCount).toBeGreaterThan(0);
  expect(uppercaseRowCount).toBeLessThanOrEqual(initialRowCount);
  
  await productPage.clearSearchBox();
  await productPage.page.waitForTimeout(1000);
  
  await productPage.searchProduct("product");
  
  const lowercaseRowCount = await productPage.getProductTableRowCount();
  expect(lowercaseRowCount).toBeGreaterThan(0);
  
  expect(lowercaseRowCount).toBe(uppercaseRowCount);
  
  await productPage.clearSearchBox();
  await productPage.page.waitForTimeout(1000);
  
  await productPage.searchProduct("PrOdUcT");
  
  const mixedCaseRowCount = await productPage.getProductTableRowCount();
  expect(mixedCaseRowCount).toBeGreaterThan(0);
  
  expect(mixedCaseRowCount).toBe(uppercaseRowCount);
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
});

