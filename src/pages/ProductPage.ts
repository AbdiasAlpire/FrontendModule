import { Page } from "@playwright/test";
import { ProductLocators } from "../locators/ProductLocators";

export class ProductPage {
  constructor(public page: Page) {}

  async goTo() {
    await this.page.goto("/product", { waitUntil: "networkidle" });
  }

  async clickProductsMenuItem() {
    await this.page.locator(ProductLocators.productsMenuItem).click();
  }

  async navigateToProductsViaSideMenu() {
    // Click on the Products menu item in the side navigation
    await this.page.locator(ProductLocators.productsMenuItem).waitFor({ 
      state: "visible", 
      timeout: 10000 
    });
    await this.page.locator(ProductLocators.productsMenuItem).click();
    // Wait for navigation to complete
    await this.page.waitForLoadState("networkidle");
  }

  async clickAddNewProductButton() {
    await this.page.locator(ProductLocators.addNewProductButton).waitFor({ 
      state: "visible", 
      timeout: 10000 
    });
    await this.page.locator(ProductLocators.addNewProductButton).click();
  }

  async isAddProductModalVisible(): Promise<boolean> {
    try {
      await this.page.locator(ProductLocators.addProductModal).waitFor({ 
        state: "visible", 
        timeout: 5000 
      });
      return true;
    } catch {
      return false;
    }
  }

  async getAddProductModalTitle(): Promise<string> {
    await this.page.locator(ProductLocators.addProductModalTitle).waitFor({ 
      state: "visible", 
      timeout: 5000 
    });
    return await this.page.locator(ProductLocators.addProductModalTitle).innerText();
  }

  async closeAddProductModal() {
    await this.page.locator(ProductLocators.addProductModalCloseButton).click();
  }

  async isAddProductModalClosed(): Promise<boolean> {
    try {
      await this.page.locator(ProductLocators.addProductModal).waitFor({ 
        state: "hidden", 
        timeout: 3000 
      });
      return true;
    } catch {
      return false;
    }
  }
}