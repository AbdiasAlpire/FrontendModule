import { test, expect } from "../../fixtures/LoginPageFixture";

test("TC001: Verify login with invalid account", async ({ loginPage }) => {
  await loginPage.goTo();
  await loginPage.fillUsernameInput("noaccount@example.com");
  await loginPage.fillPasswordInput("wrongpass");
  await loginPage.clickLoginButton();
  const toastMessage = await loginPage.getToastErrorMessage();
  expect(toastMessage).toContain("No account with this email has been registered");
});
