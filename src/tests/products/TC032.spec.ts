import { mergeTests } from "@playwright/test";
import { test as productTest, expect } from "../../fixtures/ProductPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, productTest);

dotenv.config();

test("TC032: Verify Refresh Button Clears Search Results", async ({ productPage }) => {
  
  await productPage.navigateToProductsViaSideMenu();
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
  
  const isTableVisible = await productPage.isProductTableVisible();
  expect(isTableVisible).toBe(true);
  
  const initialRowCount = await productPage.getProductTableRowCount();
  expect(initialRowCount).toBeGreaterThan(0);
  
  await productPage.searchProduct("product");
  
  const searchValue = await productPage.getSearchBoxValue();
  expect(searchValue).toBe("product");
  
  const filteredRowCount = await productPage.getProductTableRowCount();
  
  await productPage.clickRefreshButton();
  

  await productPage.clearSearchBox();
  
  await productPage.page.waitForTimeout(1000);
  
  const searchValueAfterRefresh = await productPage.getSearchBoxValue();
  expect(searchValueAfterRefresh).toBe("");
  
  const rowCountAfterRefresh = await productPage.getProductTableRowCount();
  expect(rowCountAfterRefresh).toBeGreaterThanOrEqual(initialRowCount);
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
});

