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
    await peoplesPage.fillFirstName("testPlaywright");
    await peoplesPage.fillLastName("testPlaywright");
    await peoplesPage.clickSumitButton();
    await peoplesPage.clickCloseSuccessMessage();
    await peoplesPage.clickEditButton();
    await peoplesPage.fillFirstName("edited");
    await peoplesPage.fillLastName("edited");
    await peoplesPage.clickSumitButton();
    const editedMessage = await peoplesPage.getEditMessage();
   expect(editedMessage).toContain('we update this document');
})
*/
