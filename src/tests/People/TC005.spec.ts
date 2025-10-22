import { expect, test } from "../../fixtures/PeoplePageFixture";

import * as dotenv from 'dotenv';

dotenv.config();

test.beforeEach(async ({ loginPage, dashboardPage }) => {
  await loginPage.goto();
  await loginPage.fillUsername(process.env.USER_EMAIL || '');
  await loginPage.fillPassword(process.env.USER_PASSWORD || '');
  await loginPage.clickLoginButton();
  await dashboardPage.waitForDashboardToLoad();
  await expect(dashboardPage.page).toHaveURL("/");
});

test('TC005: Verify the creation of a person and successfully add that person as a customer', async({peoplesPage}) =>{
    await peoplesPage.goto();
    await peoplesPage.addNewPersonButton;
    await peoplesPage.clickAddNewPersonButton();
    await peoplesPage.fillFirstName("testPlaywright");
    await peoplesPage.fillLastName("testPlaywright");
    await peoplesPage.clickSumitButton();
    await peoplesPage.clickCloseButton();
})
