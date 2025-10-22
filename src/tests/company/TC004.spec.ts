import { expect, test } from "../../fixtures/LoginPageFixture";
import * as dotenv from "dotenv";
import { CompanyPage } from "../../pages/CompanyPage";

dotenv.config();

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.fillUsername(process.env.USER_EMAIL || '');
  await loginPage.fillPassword(process.env.USER_PASSWORD || '');
  await loginPage.clickLoginButton();
  await loginPage.page.locator('text=Dashboard').waitFor({ state: 'visible', timeout: 10000 });
});

test('TC004: Verify error messages display when mandatory fields are empty', async ({ page }) => {
  const companyPage = new CompanyPage(page);
  await companyPage.goTo();
  await companyPage.addCompanyButton.click();
  await companyPage.submitButton.click();
  await expect(companyPage.emptyNameMessage).toBeVisible();
  await expect(companyPage.emptyEmailMessage).toBeVisible();
});
