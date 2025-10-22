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
  const actualNameErrorMes = await companyPage.getNameErrorMesage();
  const actualEmailErrorMes = await companyPage.getEmailErrorMesage();
  expect(actualNameErrorMes).toBeVisible();
  expect(actualEmailErrorMes).toBeVisible();
});
