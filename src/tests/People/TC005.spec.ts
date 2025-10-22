import { mergeTests } from "@playwright/test";
import { test as loginTest, expect } from "../../fixtures/LoginPageFixture";
import { test as peoplesTest } from "../../fixtures/PeoplesPageFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loginTest, peoplesTest);

dotenv.config();

test("TC005: Verify the creation of a person and successfully add that person as a customer", async ({
  loginPage,
  peoplesPage,
}) => {
  await peoplesPage.goto();
  await peoplesPage.addNewPersonButton;
  await peoplesPage.clickAddNewPersonButton();
  await peoplesPage.fillFirstName("testPlaywright");
  await peoplesPage.fillLastName("testPlaywright");
  await peoplesPage.clickSumitButton();
  await peoplesPage.clickCloseSidePannelButton();
});
