import { mergeTests } from "@playwright/test";
import { test as companyTest, expect } from "../../fixtures/CompanyPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, companyTest);

dotenv.config();

test("TC004: Verify error messages display when mandatory fields are empty", async ({
  companyPage,
}) => {
  await companyPage.goTo();
  await companyPage.clickAddNewCompanyButton();
  await companyPage.clickSubmitButton();
  await companyPage.page.waitForTimeout(2000);
  const actualNameErrorMes = await companyPage.getNameErrorMesage();
  const actualEmailErrorMes = await companyPage.getEmailErrorMesage();
  await expect(actualNameErrorMes).toBeVisible();
  await expect(actualEmailErrorMes).toBeVisible();
});
