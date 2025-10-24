import { mergeTests } from "@playwright/test";
import { test as productTest, expect } from "../../fixtures/ProductPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, productTest);

dotenv.config();

test("TC038: Verify an Error Occurs When Adding a Product with a Missing Name", async ({ productPage }) => {
  
  await productPage.navigateToProductsViaSideMenu();
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
  
  await productPage.clickAddNewProductButton();
  
  const isModalVisible = await productPage.isAddProductModalVisible();
  expect(isModalVisible).toBe(true);
  
  await productPage.selectProductCategory("Vegan");
  
  await productPage.selectCurrency("$ (US Dollar)");
  
  await productPage.fillPrice("29.99");
  
  await productPage.clickSubmitProductButton();
  
  await productPage.page.waitForTimeout(1000);
  
  const nameErrorVisible = await productPage.isNameErrorVisible();
  expect(nameErrorVisible).toBe(true);
  
  const nameErrorMessage = await productPage.getNameErrorMessage();
  expect(nameErrorMessage.toLowerCase()).toContain("name");
  
  const isModalStillOpen = await productPage.isAddProductModalVisible();
  expect(isModalStillOpen).toBe(true);
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
});

