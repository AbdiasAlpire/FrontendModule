import { mergeTests } from "@playwright/test";
import { test as productTest, expect } from "../../fixtures/ProductPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, productTest);

dotenv.config();

test("TC028: Verify 'Add New Product' Modal Opens", async ({ productPage }) => {

  await productPage.navigateToProductsViaSideMenu();
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
  
  await productPage.clickAddNewProductButton();
  
  const isModalVisible = await productPage.isAddProductModalVisible();
  expect(isModalVisible).toBe(true);
  
  // Additional verification: Check that the modal title is present
  const modalTitle = await productPage.getAddProductModalTitle();
  expect(modalTitle).toBeTruthy();
  
  // Verify the modal is positioned correctly (right side)
  const modalElement = productPage.page.locator('.ant-drawer-content');
  await expect(modalElement).toBeVisible();
  
  // Clean up: Close the modal to leave the test in a clean state
  await productPage.closeAddProductModal();
  
  // Verify modal is closed
  const isModalClosed = await productPage.isAddProductModalClosed();
  expect(isModalClosed).toBe(true);
});
