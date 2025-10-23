import { mergeTests } from "@playwright/test";
import { test as loggedInTest, expect } from "../../fixtures/LoggedInFixture";
import { test as peoplesTest } from "../../fixtures/PeoplesPageFixture";
import { test as headerTest } from "../../fixtures/HeaderComponentFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, peoplesTest, headerTest);
dotenv.config();

test("TC015: Verify that a new person can be created and then found in the People List by searching their name.", async ({
  peoplesPage,
  headerComponent,
}) => {
  await headerComponent.clickPeoples();
  await peoplesPage.clickAddNewPersonButton();
  await peoplesPage.fillFirstName("searchTest");
  await peoplesPage.fillLastName("searchTest");
  await peoplesPage.clickSumitButton();
  await peoplesPage.clickCloseSuccessMessage();
  await peoplesPage.clickCloseSidePannelButton();
  await peoplesPage.clickSearchPersonBox();
  await peoplesPage.typePersonFirstName("searchTest");
  await peoplesPage.page.waitForTimeout(2000);
  const firstRow = await peoplesPage.getFirstRow();
  expect(firstRow).toEqual("searchTest");
});
