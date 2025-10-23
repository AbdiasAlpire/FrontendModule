import { mergeTests } from "@playwright/test";
import { test as expensesCategoryTest, expect } from "../../fixtures/ExpensesCategoryPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as SideMenuTest } from "../../fixtures/SideMenuComponentFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, SideMenuTest, expensesCategoryTest);

dotenv.config();

test("TC012: Verify that a user can create an Expense Category successfully", async ({sideMenuComponent, expensesCategoryPage}) => {
  await sideMenuComponent.clickExpensesCategoryOption();
  await expensesCategoryPage.clickAddExpensesCategoryButton();
  await expensesCategoryPage.waitForExpensesCategoryContainer();
  await expensesCategoryPage.fillNameInput('Category 1');
  await expensesCategoryPage.fillDescriptionInput('Description Category 1');
  await expensesCategoryPage.fillColorInput('blue');
  await expensesCategoryPage.clickSubmitButton(); 
  await expensesCategoryPage.clickCloseContainer();
});
