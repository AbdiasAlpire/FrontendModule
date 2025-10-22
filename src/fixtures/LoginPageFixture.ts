import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

export const test = base.extend<{
  loginPage: LoginPage;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goTo();
  await loginPage.fillUsernameInput(process.env.USER_EMAIL || "");
  await loginPage.fillPasswordInput(process.env.USER_PASSWORD || "");
  await loginPage.clickLoginButton();
});

export { expect } from "@playwright/test";
