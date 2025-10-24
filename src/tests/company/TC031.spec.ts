import { mergeTests } from "@playwright/test";
import { test as companyTest, expect } from "../../fixtures/CompanyPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, companyTest);

dotenv.config();

test("TC031: Verify refresh button refreshes the table data in the company page", async ({
  companyPage,
}) => {
  await companyPage.goTo();
  await companyPage.page.waitForLoadState("load");
  await companyPage.clickRefreshButton();
  await companyPage.page.waitForLoadState("networkidle");
  await expect(await companyPage.getTableCell()).toBeVisible();
});
