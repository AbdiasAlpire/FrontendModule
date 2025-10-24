import { expect, mergeTests } from "@playwright/test";
import { test as leadTest } from "../../fixtures/LeadPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, leadTest);

dotenv.config();

test("TC046: Verify no data message when searching for a non-existing lead", async ({
  leadPage,
}) => {
  await leadPage.goTo();
  await leadPage.goTo();
  await leadPage.fillSearchBar("NonExistingLeadName");
  await leadPage.page.waitForLoadState('load');
  await expect(await leadPage.getNoDataMessage()).toBeVisible();
});