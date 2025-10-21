import { expect, test } from "../../fixtures/LoginPageFixture";
import * as dotenv from "dotenv";
import { Header } from "../../pages/Header";
import { CompanyPage } from "../../pages/CompanyPage";

dotenv.config();

test.beforeEach(async ({ page,loginPage }) => {
  const userEmail = process.env.USER_EMAIL as string;
  const userPassword = process.env.USER_PASSWORD as string;

  await loginPage.goto();

  await loginPage.fillUsername(userEmail);
  await loginPage.fillPassword(userPassword);
  await loginPage.clickLoginButton();
  const header = new Header(page);

  await expect(page).toHaveURL('/');
  await expect(header.avatarElement).toHaveText(userEmail.charAt(0).toUpperCase());
});

test('TC004: Verify company can not be created without filling the mandatory fields', async ({ page }) => {
  const companyPage = new CompanyPage(page);
  await companyPage.goto();
  await companyPage.addCompanyButton.click();
  await companyPage.sybmitButton.click();
  await expect(companyPage.emptyNameMessage).toBeVisible();
  await expect(companyPage.emptyEmailMessage).toBeVisible();

});
