import { test as base } from "@playwright/test";
import { LogInPage } from "../pages/LogInPage";

export const test = base.extend<{ loginPage: LogInPage }>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LogInPage(page);
    await use(loginPage);
  },
});

export { expect } from "@playwright/test";
