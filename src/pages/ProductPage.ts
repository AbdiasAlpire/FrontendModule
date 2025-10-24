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

  async searchProduct(productName: string) {
    await this.page.locator(ProductLocators.searchBox).waitFor({ 
      state: "visible", 
      timeout: 10000 
    });
    await this.page.locator(ProductLocators.searchBox).fill(productName);
    // Wait for search to be applied (debounce delay)
    await this.page.waitForTimeout(1000);
  }

  async clearSearchBox() {
    await this.page.locator(ProductLocators.searchBox).waitFor({ 
      state: "visible", 
      timeout: 10000 
    });
    await this.page.locator(ProductLocators.searchBox).clear();
  }

  async clickRefreshButton() {
    await this.page.locator(ProductLocators.refreshButton).waitFor({ 
      state: "visible", 
      timeout: 10000 
    });
    await this.page.locator(ProductLocators.refreshButton).click();
    // Wait for the page to refresh
    await this.page.waitForLoadState("networkidle");
  }

  async getSearchBoxValue(): Promise<string> {
    await this.page.locator(ProductLocators.searchBox).waitFor({ 
      state: "visible", 
      timeout: 10000 
    });
    return await this.page.locator(ProductLocators.searchBox).inputValue();
  }

  async getProductTableRowCount(): Promise<number> {
    await this.page.locator(ProductLocators.productTable).waitFor({ 
      state: "visible", 
      timeout: 10000 
    });
    const rows = await this.page.locator(ProductLocators.productTableRows).all();
    return rows.length;
  }

  async isProductTableVisible(): Promise<boolean> {
    try {
      await this.page.locator(ProductLocators.productTable).waitFor({ 
        state: "visible", 
        timeout: 5000 
      });
      return true;
    } catch {
      return false;
    }
  }
}