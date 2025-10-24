import { mergeTests } from "@playwright/test";
import { test as companyTest, expect } from "../../fixtures/CompanyPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, companyTest);

dotenv.config();

test("TC010: Verify a company can be searched by name", async ({
  companyPage,
}) => {
  await companyPage.goTo();
  await companyPage.fillSearchBar("example");
  await companyPage.page.waitForLoadState('load');
  await expect(await companyPage.getTableCell()).toHaveText("example");
});
