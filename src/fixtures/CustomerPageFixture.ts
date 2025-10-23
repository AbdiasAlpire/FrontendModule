import { test as base } from "@playwright/test";
import { CustomerPage } from "../pages/CustomerPage";

export const test = base.extend<{
  customerPage: CustomerPage;
}>({
  customerPage: async ({ page }, use) => {
    const customerPage = new CustomerPage(page);
    await use(customerPage);
  },
});

export { expect } from "@playwright/test";
