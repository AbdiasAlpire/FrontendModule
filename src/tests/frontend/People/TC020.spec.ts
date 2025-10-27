import { mergeTests } from "@playwright/test";
import { test as loggedInTest, expect } from "../../../fixtures/LoggedInFixture";
import { test as peoplesTest } from "../../../fixtures/PeoplesPageFixture";
import { test as headerTest } from "../../../fixtures/HeaderComponentFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, peoplesTest, headerTest);
dotenv.config();

test("TC020: Verify the first person at person list after searching can be deleted.", async ({
  peoplesPage,
  headerComponent,
  loginPage,
}) => {
  await headerComponent.clickPeoples();
  await peoplesPage.clickSearchPersonBox();
  await peoplesPage.typePersonFirstName("searchTest");
  await peoplesPage.clickThreeDotsMenuButton();
  await peoplesPage.getFirstRow();
  await peoplesPage.clickDeleteDropDownButton();
  await peoplesPage.clickRemoveConfirmationButton();
  const removeMessage = await peoplesPage.getRemoveMessage();
  expect(removeMessage).toContain("Successfully Deleted the people by id");
});
