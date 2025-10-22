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

test('TC016: Verify that a new person can be created and deleted', async({peoplesPage}) =>{
    await peoplesPage.goto();
    await peoplesPage.addNewPersonButton;
    await peoplesPage.clickAddNewPersonButton();
    await peoplesPage.fillFirstName("testPlaywright");
    await peoplesPage.fillLastName("testPlaywright");
    await peoplesPage.clickSumitButton();
    await peoplesPage.clickCloseSuccessMessage();
    await peoplesPage.clickRemovePersonButton();
    await peoplesPage.clickRemoveConfirmationButton();
    const removeMessage = await peoplesPage.getRemoveMessage();
    expect(removeMessage).toContain('Successfully Deleted the people by id');
})
*/
