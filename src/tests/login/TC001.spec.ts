import { expect, test } from "../../fixtures/LoginPageFixture";

test('TC001: Verify login with invalid account', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.fillUsername('noaccount@example.com');
  await loginPage.fillPassword('wrongpass');
  await loginPage.clickLoginButton();

  const toastMessage = await loginPage.getToastErrorMessage();
  expect(toastMessage).toContain('No account with this email has been registered');
});
