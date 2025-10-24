import { expect, mergeTests } from "@playwright/test";
import { test as leadTest } from "../../fixtures/LeadPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, leadTest);

dotenv.config();

test("TC029: Verify a company can be searched by name", async ({
  leadPage,
}) => {
  await leadPage.goTo();
  await leadPage.fillSearchBar("example");
  await leadPage.page.waitForLoadState('load');
  await expect(await leadPage.getTableNameColumn()).toHaveText("example");
});