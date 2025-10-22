import { expect, test } from "../../fixtures/LoginPageFixture";
import * as dotenv from "dotenv";
import { Header } from "../../pages/Header";

dotenv.config();

test('TC002: Verify login with valid account', async ({ page, loginPage }) => {
  const userEmail = process.env.USER_EMAIL as string;
  const userPassword = process.env.USER_PASSWORD as string;
  await loginPage.goto();
  await loginPage.fillUsernameInput(userEmail);
  await loginPage.fillPasswordInput(userPassword);
  await loginPage.clickLoginButton();
  const header = new Header(page);
  await expect(page).toHaveURL('/');
  await expect(header.avatarElement).toHaveText(userEmail.charAt(0).toUpperCase());
});
