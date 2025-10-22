// fixtures/LoggedInFixture.ts
import { test as base } from "./LoginPageFixture";
import * as dotenv from "dotenv";

dotenv.config();

export const test = base.extend({});

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goTo();
  await loginPage.fillUsernameInput(process.env.USER_EMAIL || "");
  await loginPage.fillPasswordInput(process.env.USER_PASSWORD || "");
  await loginPage.clickLoginButton();
  await loginPage.page.waitForTimeout(2000);
});

export { expect } from "@playwright/test";
