import { mergeTests, expect } from "@playwright/test";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as customerTest } from "../../fixtures/CustomerPageFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, customerTest);

dotenv.config();

test("TC028: Verify customer cannot be created withoud mandatory fields", async ({
  customerPage,
  loginPage,
}) => {
  await customerPage.goto();
  await customerPage.clickAddNewCustomer();
  await customerPage.clickSummitButton();
  const mandatoryMessage = await customerPage.getMandatory();
  expect(mandatoryMessage).toContain("Please enter Type");
});
