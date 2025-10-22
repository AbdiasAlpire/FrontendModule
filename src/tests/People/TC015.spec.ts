/*import { expect, test } from "../../fixtures/PeoplePageFixture";
import * as dotenv from 'dotenv';

dotenv.config();

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.fillUsernameInput(process.env.USER_EMAIL || '');
  await loginPage.fillPasswordInput(process.env.USER_PASSWORD || '');
  await loginPage.clickLoginButton();
  await loginPage.page.locator('text=Dashboard').waitFor({ state: 'visible', timeout: 10000 });
})

test('TC017: Verify that a new person can be created and edited', async({peoplesPage}) =>{
    await peoplesPage.goto();
    await peoplesPage.addNewPersonButton;
    await peoplesPage.clickAddNewPersonButton();
    await peoplesPage.fillFirstName("searchTest");
    await peoplesPage.fillLastName("searchTest");
    await peoplesPage.clickSumitButton();
    await peoplesPage.clickCloseSuccessMessage();
    await peoplesPage.clickCloseSidePannelButton();
    await peoplesPage.clickSearchPersonBox();
    await peoplesPage.typePersonFirstName("searchTest");
    const firstRow = await peoplesPage.getFirstRow();
    expect(firstRow).toEqual("searchTest");
})
*/
