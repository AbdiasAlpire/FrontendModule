import { mergeTests } from "@playwright/test";
import { test as companyTest, expect } from "../../../fixtures/CompanyPageFixture";
import { test as loggedInTest } from "../../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, companyTest);

dotenv.config();

test("TC014: Verify a company can be created", async ({
  companyPage,
}) => {
  await companyPage.goTo();
  await companyPage.clickAddNewCompanyButton();
  await companyPage.fillName("example");
  await companyPage.fillEmail("example@email.com");
  await companyPage.clickSubmitButton();
  await expect(await companyPage.getSuccessPopUpMessage()).toBeVisible();
  await companyPage.goTo();
  await expect(await companyPage.getTableCell()).toHaveText("example");
});
