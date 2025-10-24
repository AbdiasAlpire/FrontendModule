import { mergeTests } from "@playwright/test";
import { test as companyTest, expect } from "../../fixtures/CompanyPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, companyTest);

dotenv.config();

test("TC047: Verify no data message when searching for a non-existing company", async ({
  companyPage,
}) => {
  await companyPage.goTo();
  await companyPage.goTo();
  await companyPage.fillSearchBar("NonExistingCompanyName");
  await companyPage.page.waitForLoadState('load');
  await expect(await companyPage.getNoDataMessage()).toBeVisible();
});
