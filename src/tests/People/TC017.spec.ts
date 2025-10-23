import { mergeTests } from "@playwright/test";
import { test as loggedInTest, expect } from "../../fixtures/LoggedInFixture";
import { test as peoplesTest } from "../../fixtures/PeoplesPageFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, peoplesTest);

// example
test("TC017: Verify that a new person can be created and edited", async ({
  peoplesPage,
}) => {
  await peoplesPage.goto();
  await peoplesPage.addNewPersonButton;
  await peoplesPage.clickAddNewPersonButton();
  await peoplesPage.fillFirstName("testPlaywright");
  await peoplesPage.fillLastName("testPlaywright");
  await peoplesPage.clickSumitButton();
  await peoplesPage.clickCloseSuccessMessage();
  await peoplesPage.clickEditButton();
  await peoplesPage.fillFirstName("edited");
  await peoplesPage.fillLastName("edited");
  await peoplesPage.clickSumitButton();
  await peoplesPage.page.waitForTimeout(2000);
  const editedMessage = await peoplesPage.getEditMessage();
  expect(editedMessage).toContain("we update this document");
});
