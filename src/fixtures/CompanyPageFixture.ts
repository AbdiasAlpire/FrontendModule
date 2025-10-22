import { test as base } from "@playwright/test";
import { CompanyPage } from "../pages/CompanyPage";

export const test = base.extend<{
  companyPage: CompanyPage;
}>({
  companyPage: async ({ page }, use) => {
    const companyPage = new CompanyPage(page);
    await use(companyPage);
  },
});

export { expect } from "@playwright/test";
