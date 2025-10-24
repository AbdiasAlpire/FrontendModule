import { mergeTests } from "@playwright/test";
import { test as productTest, expect } from "../../fixtures/ProductPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, productTest);

dotenv.config();

test("TC039: Verify an Error Occurs When Adding a Product with a Non-Numeric Price", async ({ productPage }) => {
  
  await productPage.navigateToProductsViaSideMenu();
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
  
  await productPage.clickAddNewProductButton();
  
  const isModalVisible = await productPage.isAddProductModalVisible();
  expect(isModalVisible).toBe(true);
  
  const timestamp = Date.now();
  const uniqueProductName = `InvalidPrice_${timestamp}`;
  
  await productPage.fillProductName(uniqueProductName);
  
  await productPage.selectProductCategory("Vegan");
  
  await productPage.selectCurrency("$ (US Dollar)");
  
  await productPage.fillPrice("abc");
  
  await productPage.clickSubmitProductButton();
  
  await productPage.page.waitForTimeout(1000);
  
  const priceErrorVisible = await productPage.isPriceErrorVisible();
  expect(priceErrorVisible).toBe(true);
  
  const priceErrorMessage = await productPage.getPriceErrorMessage();
  expect(priceErrorMessage.toLowerCase()).toContain("price");
  
  const isModalStillOpen = await productPage.isAddProductModalVisible();
  expect(isModalStillOpen).toBe(true);
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
});

