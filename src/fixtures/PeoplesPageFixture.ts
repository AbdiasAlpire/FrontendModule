import { test as base } from "@playwright/test";
import { PeoplesPage } from "../pages/PeoplesPage";

export const test = base.extend<{ peoplesPage: PeoplesPage }>({
  peoplesPage: async ({ page }, use) => {
    const peoplesPage = new PeoplesPage(page);
    await use(peoplesPage);
  },
});

export { expect } from "@playwright/test";
