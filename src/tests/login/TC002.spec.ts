import { mergeTests } from "@playwright/test";
import { test as loginTest, expect } from "../../fixtures/LoginPageFixture";
import { test as headerTest } from "../../fixtures/HeaderComponentFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loginTest, headerTest);

dotenv.config();

test("TC002: Verify login with valid account", async ({
  loginPage,
  headerComponent,
}) => {
  const userEmail = process.env.USER_EMAIL as string;
  const userPassword = process.env.USER_PASSWORD as string;
  await loginPage.goTo();
  await loginPage.fillUsernameInput(userEmail);
  await loginPage.fillPasswordInput(userPassword);
  await loginPage.clickLoginButton();
  await expect(headerComponent.page).toHaveURL("/");
  const avatarelement = await headerComponent.getAvatarElement();
  await expect(avatarelement).toHaveText(userEmail.charAt(0).toUpperCase());
});
