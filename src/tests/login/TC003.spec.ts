import { mergeTests, expect } from "@playwright/test";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as headerTest } from "../../fixtures/HeaderComponentFixture";
import { test as loginTest } from "../../fixtures/LoginPageFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, headerTest, loginTest);

dotenv.config();

test("TC003: Verify that a user can logout successfully via avatar dropdown option", async ({
  headerComponent,
  loginPage
}) => {
  await headerComponent.clickAvatarElement();
  await headerComponent.clickLogoutButton();
  const signInPageVisible = await loginPage.getLogInTitle();
  expect(loginPage.page).toHaveURL("/login");
  expect(signInPageVisible).toBe('Sign In');
});
