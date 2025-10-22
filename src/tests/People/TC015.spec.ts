import { mergeTests } from "@playwright/test";
import { test as loggedInTest, expect } from "../../fixtures/LoggedInFixture";
import { test as peoplesTest } from "../../fixtures/PeoplesPageFixture";

const test = mergeTests(loggedInTest, peoplesTest);

test("TC015: Verify that a new person can be created and edited", async ({
  peoplesPage,
}) => {
  await peoplesPage.goto();
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
