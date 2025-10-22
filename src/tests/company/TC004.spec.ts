import { mergeTests } from "@playwright/test";
import { test as base } from "@playwright/test";
import { test as loginTest, expect } from "../../fixtures/LoginPageFixture";
import { test as companyTest } from "../../fixtures/CompanyPageFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loginTest, companyTest);

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
