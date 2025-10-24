import { mergeTests } from "@playwright/test";
import { test as loggedInTest, expect } from "../../fixtures/LoggedInFixture";
import { test as peoplesTest } from "../../fixtures/PeoplesPageFixture";
import { test as headerTest } from "../../fixtures/HeaderComponentFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, peoplesTest, headerTest);
dotenv.config();

test("TC045: Verify person cannot be created with invalid email format", async ({
  peoplesPage,
  headerComponent,
}) => {
  await headerComponent.clickPeoples();
  await peoplesPage.clickAddNewPersonButton();
  await peoplesPage.fillFirstName("email");
  await peoplesPage.fillLastName("email");
  await peoplesPage.fillEmailInput("@.gamil.com");
  await peoplesPage.clickSumitButton();
  const emailError = await peoplesPage.getEmailErrorMessage();
  expect(emailError).toContain("Email is not a valid email");
});
