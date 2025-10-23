import { mergeTests, expect } from "@playwright/test";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as customerTest } from "../../fixtures/CustomerPageFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, customerTest);

dotenv.config();

test("TC021: Verify a new customer can be created by type people", async ({
  customerPage,
  loginPage,
}) => {
  await customerPage.goto();
  await customerPage.clickAddNewCustomer();
  await customerPage.clickTypeDropDown();
  await customerPage.selectPeopleAsType();
  await customerPage.clickSearchBox();
  await customerPage.fillSearchBox("Search");
});
