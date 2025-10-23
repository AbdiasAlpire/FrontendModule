import { mergeTests } from "@playwright/test";
import { test as loggedInTest, expect } from "../../fixtures/LoggedInFixture";
import { test as peoplesTest } from "../../fixtures/PeoplesPageFixture";
import { test as headerTest } from "../../fixtures/HeaderComponentFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, peoplesTest, headerTest);
dotenv.config();

test("TC019: Verify person cannot be created without filling madatory fields", async ({
  peoplesPage,
  headerComponent,
}) => {
  await peoplesPage.goto();
  await peoplesPage.clickAddNewPersonButton();
  await peoplesPage.clickSumitButton();
  await peoplesPage.page.waitForTimeout(2000);
  const mandatoryFirstName = await peoplesPage.FirstNameMandatoryMessages();
  const mandatoryLastName = await peoplesPage.LastNameMandatoryMessages();
  expect(mandatoryFirstName).toBeTruthy();
  expect(mandatoryLastName).toBeTruthy();
});
