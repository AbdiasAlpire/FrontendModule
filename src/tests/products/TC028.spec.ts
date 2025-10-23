import { mergeTests } from "@playwright/test";
import { test as productTest, expect } from "../../fixtures/ProductPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, productTest);

dotenv.config();

test("TC027: Verify 'Add New Product' Modal Opens", async ({ productPage }) => {
  // Step 1-3: User is already logged in via LoggedInFixture
  // Step 4: Verify user is on Dashboard (handled by LoggedInFixture)
  
  // Step 5: Navigate to Products page via side menu
  await productPage.navigateToProductsViaSideMenu();
  
  // Verify we're on the products page by checking the URL
  await expect(productPage.page).toHaveURL(/.*\/product/);
  
  // Step 6: Click the "Add New Product" button
  await productPage.clickAddNewProductButton();
  
  // Step 7: Verify the "Add New Product" side modal opens from the right
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
