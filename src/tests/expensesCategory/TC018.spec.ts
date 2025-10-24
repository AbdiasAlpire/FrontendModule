import { mergeTests } from "@playwright/test";
import { test as expensesCategoryTest, expect } from "../../fixtures/ExpensesCategoryPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as SideMenuTest } from "../../fixtures/SideMenuComponentFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, SideMenuTest, expensesCategoryTest);

dotenv.config();

test("TC018: Verify that a success message is displayed as expected after creating an Expense Category", async ({sideMenuComponent, expensesCategoryPage}) => {
  const name:string = 'Category 2';
  const description:string = 'Description Category 2';
  const color:string = 'green';
  await sideMenuComponent.clickExpensesCategoryOption();
  await expensesCategoryPage.clickAddExpensesCategoryButton();
  await expensesCategoryPage.waitForExpensesCategoryContainer();
  await expensesCategoryPage.fillNameInput(name);
  await expensesCategoryPage.fillDescriptionInput(description);
  await expensesCategoryPage.fillColorInput(color);
  await expensesCategoryPage.clickSubmitButton();
  await expensesCategoryPage.waitForPupUpSpinner(5000);
  await expensesCategoryPage.waitForSuccessToaster(5000);
  const toasterTitle = await expensesCategoryPage.getToasterTitle();
  const toasterDescription = await expensesCategoryPage.getToasterDescription();
  expect(toasterTitle).toContain("Request success");
  expect(toasterDescription).toContain("Successfully Created the document in Model");
});
