import { expect, mergeTests } from "@playwright/test";
import { test as leadTest } from "../../fixtures/LeadPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, leadTest);

dotenv.config();

test("TC008: Verify refresh button refreshes the table data in the lead page", async ({
  leadPage,
}) => {
  await leadPage.goTo();
  await leadPage.page.waitForLoadState("load");
  await leadPage.clickRefreshButton();
  await leadPage.page.waitForLoadState("networkidle");
  await expect(await leadPage.getTableCell()).toBeVisible();
});