import { expect, test } from "../../fixtures/PeoplePageFixture";
import * as dotenv from 'dotenv';

test.beforeEach(async ({ loginPage, dashboardPage }) => {
  await loginPage.goto();
  await loginPage.fillUsername(process.env.USER_EMAIL || '');
  await loginPage.fillPassword(process.env.USER_PASSWORD || '');
  await loginPage.clickLoginButton();
  await dashboardPage.waitForDashboardToLoad();
  await expect(dashboardPage.page).toHaveURL("/");
});

test('TC003: Verify logout functionality', async ({ dashboardPage, loginPage }) => {
  await dashboardPage.clickAvatarProfile();
  await dashboardPage.waitForUserMenuDropdownToLoad();//Only waits for dropdown to be visible
  await dashboardPage.clickLogoutButton();
  await expect(loginPage.page).toHaveURL("/login");
});