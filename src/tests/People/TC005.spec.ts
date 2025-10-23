import { mergeTests } from "@playwright/test";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as peoplesTest } from "../../fixtures/PeoplesPageFixture";
import { test as headerTest } from "../../fixtures/HeaderComponentFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, peoplesTest, headerTest);
dotenv.config();

test("TC005: Verify the creation of a person and successfully add that person as a customer", async ({
  peoplesPage,
  headerComponent,
}) => {
  await headerComponent.clickPeoples();
  await peoplesPage.clickAddNewPersonButton();
  await peoplesPage.fillFirstName("testPlaywright");
  await peoplesPage.fillLastName("testPlaywright");
  await peoplesPage.clickSumitButton();
  await peoplesPage.page.waitForTimeout(2000);
  await peoplesPage.clickCloseSidePannelButton();
});
