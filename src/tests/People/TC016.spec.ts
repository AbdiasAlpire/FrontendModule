import { mergeTests } from "@playwright/test";
import { test as loggedInTest, expect } from "../../fixtures/LoggedInFixture";
import { test as peoplesTest } from "../../fixtures/PeoplesPageFixture";
import { test as headerTest } from "../../fixtures/HeaderComponentFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, peoplesTest, headerTest);
dotenv.config();

test("TC016: Verify that a new person can be created and deleted", async ({
  peoplesPage,
  headerComponent,
  loginPage,
}) => {
  await peoplesPage.page.waitForLoadState("networkidle");
  await headerComponent.clickPeoples();
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
