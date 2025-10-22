import { mergeTests } from "@playwright/test";
import { test as loggedInTest, expect } from "../../fixtures/LoggedInFixture";
import { test as peoplesTest } from "../../fixtures/PeoplesPageFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, peoplesTest);

test("TC016: Verify that a new person can be created and deleted", async ({
  peoplesPage,
}) => {
  await peoplesPage.goto();
  await peoplesPage.addNewPersonButton;
  await peoplesPage.clickAddNewPersonButton();
  await peoplesPage.fillFirstName("testPlaywright");
  await peoplesPage.fillLastName("testPlaywright");
  await peoplesPage.clickSumitButton();
  await peoplesPage.clickCloseSuccessMessage();
  await peoplesPage.clickRemovePersonButton();
  await peoplesPage.clickRemoveConfirmationButton();
  await peoplesPage.page.waitForTimeout(2000);
  const removeMessage = await peoplesPage.getRemoveMessage();
  expect(removeMessage).toContain("Successfully Deleted the people by id");
});
