import { mergeTests } from "@playwright/test";
import { test as productTest, expect } from "../../fixtures/ProductPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, productTest);

dotenv.config();

test("TC043: Verify Product Deletion from Context Menu", async ({ productPage }) => {
  
  await productPage.navigateToProductsViaSideMenu();
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
  
  const isTableVisible = await productPage.isProductTableVisible();
  expect(isTableVisible).toBe(true);
  
  const initialRowCount = await productPage.getProductTableRowCount();
  expect(initialRowCount).toBeGreaterThan(0);
  
  const firstProductName = await productPage.page.locator('.ant-table-tbody tr:first-child td:nth-child(1)').innerText();
  
  await productPage.clickThreeDotMenuForFirstProduct();
  
  await productPage.page.waitForTimeout(500);
  
  const isMenuVisible = await productPage.isActionMenuVisible();
  expect(isMenuVisible).toBe(true);
  
  await productPage.clickDeleteOption();
  
  await productPage.page.waitForTimeout(500);
  
  const isModalVisible = await productPage.isConfirmationModalVisible();
  expect(isModalVisible).toBe(true);
  
  await productPage.clickConfirmButton();
  
  await productPage.page.waitForTimeout(2000);
  
  const successMessage = await productPage.getSuccessNotificationMessage();
  expect(successMessage).toContain("Deleted");
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
});

