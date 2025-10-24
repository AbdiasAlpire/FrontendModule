import { mergeTests } from "@playwright/test";
import { test as productTest, expect } from "../../fixtures/ProductPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, productTest);

dotenv.config();

test("TC037: Verify a New Product Can Be Added with Only Required Fields", async ({ productPage }) => {
  
  await productPage.navigateToProductsViaSideMenu();
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
  
  await productPage.clickAddNewProductButton();
  
  const isModalVisible = await productPage.isAddProductModalVisible();
  expect(isModalVisible).toBe(true);
  
  const timestamp = Date.now();
  const uniqueProductName = `MinProduct_${timestamp}`;
  
  await productPage.fillProductName(uniqueProductName);
  
  await productPage.selectProductCategory("Vegan");
  
  await productPage.selectCurrency("$ (US Dollar)");
  
  await productPage.fillPrice("49.99");
  
  await productPage.clickSubmitProductButton();
  
  const successMessage = await productPage.getSuccessNotificationMessage();
  expect(successMessage).toBeTruthy();
  
  await productPage.page.waitForTimeout(1000);
  
  await productPage.closeAddProductModal();
  
  await productPage.page.waitForTimeout(2000);
  
  const isProductVisible = await productPage.isProductInList(uniqueProductName);
  expect(isProductVisible).toBe(true);
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
});

