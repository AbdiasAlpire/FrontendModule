import { test as base } from "@playwright/test";
import { LeadPage } from "../pages/LeadPage";

export const test = base.extend<{
  leadPage: LeadPage;
}>({
  leadPage: async ({ page }, use) => {
    const leadPage = new LeadPage(page);
    await use(leadPage);
  },
});

export { expect } from "@playwright/test";
