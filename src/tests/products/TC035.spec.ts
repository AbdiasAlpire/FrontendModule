import { mergeTests } from "@playwright/test";
import { test as productTest, expect } from "../../fixtures/ProductPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

const test = mergeTests(loggedInTest, productTest);

dotenv.config();

test("TC035: Verify a New Product Can Be Added with All Valid Data", async ({ productPage }) => {
  
  await productPage.navigateToProductsViaSideMenu();
  
  await expect(productPage.page).toHaveURL(/.*\/product/);
  
  await productPage.clickAddNewProductButton();
  
  const isModalVisible = await productPage.isAddProductModalVisible();
  expect(isModalVisible).toBe(true);
  
  const timestamp = Date.now();
  const uniqueProductName = `TestProduct_${timestamp}`;
  
  await productPage.fillProductName(uniqueProductName);
  
  await productPage.selectProductCategory("Vegan");
  
  await productPage.selectCurrency("$ (US Dollar)");
  
  await productPage.fillPrice("99.99");
  
  await productPage.fillDescription("This is a test product created by automation");
  
  // Create a temporary test image (1x1 PNG)
  const testImageDir = path.resolve(__dirname, "../../test-data");
  const testImagePath = path.join(testImageDir, "test-product.png");
  
  // Ensure the directory exists
  if (!fs.existsSync(testImageDir)) {
    fs.mkdirSync(testImageDir, { recursive: true });
  }
  
  // Create a minimal valid PNG (1x1 pixel transparent image)
  const pngBuffer = Buffer.from([
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
    0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
    0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4, 0x89, 0x00, 0x00, 0x00,
    0x0A, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00,
    0x05, 0x00, 0x01, 0x0D, 0x0A, 0x2D, 0xB4, 0x00, 0x00, 0x00, 0x00, 0x49,
    0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
  ]);
  
  fs.writeFileSync(testImagePath, pngBuffer);
  
  await productPage.uploadImage(testImagePath);
  
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

