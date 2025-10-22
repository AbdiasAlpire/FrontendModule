import { mergeTests } from "@playwright/test";
import { test as loggedInTest, expect } from "../../fixtures/LoggedInFixture";
import { test as peoplesTest } from "../../fixtures/PeoplesPageFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, peoplesTest);

test("TC015: Verify that a new person can be created and edited", async ({
  peoplesPage,
}) => {
  await peoplesPage.goto();
  await peoplesPage.addNewPersonButton;
  await peoplesPage.clickAddNewPersonButton();
  await peoplesPage.fillFirstName("searchTest");
  await peoplesPage.fillLastName("searchTest");
  await peoplesPage.clickSumitButton();
  await peoplesPage.clickCloseSuccessMessage();
  await peoplesPage.clickCloseSidePannelButton();
  await peoplesPage.clickSearchPersonBox();
  await peoplesPage.typePersonFirstName("searchTest");
  const firstRow = await peoplesPage.getFirstRow();
  expect(firstRow).toEqual("searchTest");
});
