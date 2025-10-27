import { expect, mergeTests } from "@playwright/test";
import { test as leadTest } from "../../../fixtures/LeadPageFixture";
import { test as loggedInTest } from "../../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, leadTest);

dotenv.config();

test("TC013: Verify error messages display when mandatory fields are empty at the moment to try to create a lead", async ({
  leadPage,
}) => {
  await leadPage.goTo();
  await leadPage.clickAddNewLeadButton();
  await leadPage.clickSubmitButton();
  await leadPage.page.waitForTimeout(2000);
  expect(await leadPage.getErrorMessagesCount()).toEqual(5);
});