import { mergeTests } from "@playwright/test";
import { test as productTest, expect } from "../../fixtures/ProductPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, productTest);

dotenv.config();

test("TC034: Verify a 'No data' Message Appears for a Non-Existent Product Search", async ({ productPage }) => {
  
  await productPage.navigateToProductsViaSideMenu();
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
  
  const isTableVisible = await productPage.isProductTableVisible();
  expect(isTableVisible).toBe(true);
  
  await productPage.searchProduct("XYZ123FakeItem");
  
  const searchValue = await productPage.getSearchBoxValue();
  expect(searchValue).toBe("XYZ123FakeItem");
  
  const isNoDataVisible = await productPage.isNoDataMessageVisible();
  expect(isNoDataVisible).toBe(true);
  
  const noDataText = await productPage.getNoDataMessageText();
  expect(noDataText).toContain("No data");
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
});

