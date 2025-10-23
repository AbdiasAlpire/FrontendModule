import { test as base } from "@playwright/test";
import { ProductPage } from "../pages/ProductPage";

export const test = base.extend<{ productPage: ProductPage }>({
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },
});

export { expect } from "@playwright/test";
