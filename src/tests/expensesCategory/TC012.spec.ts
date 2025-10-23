import { mergeTests } from "@playwright/test";
import { test as expensesCategoryTest, expect } from "../../fixtures/ExpensesCategoryPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as SideMenuTest } from "../../fixtures/SideMenuComponentFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, SideMenuTest, expensesCategoryTest);

dotenv.config();

test("TC012: Verify that a user can create an Expense Category successfully", async ({sideMenuComponent, expensesCategoryPage}) => {
  const name:string = 'Category 1';
  const description:string = 'Description Category 1';
  const color:string = 'blue';
  await sideMenuComponent.clickExpensesCategoryOption();
  await expensesCategoryPage.clickAddExpensesCategoryButton();
  await expensesCategoryPage.waitForExpensesCategoryContainer();
  await expensesCategoryPage.fillNameInput(name);
  await expensesCategoryPage.fillDescriptionInput(description);
  await expensesCategoryPage.fillColorInput(color);
  await expensesCategoryPage.clickSubmitButton(); 
  await expensesCategoryPage.clickCloseContainer();
  await expensesCategoryPage.clickRefreshButton();
  const contentTable = await expensesCategoryPage.getContentTable(name, description, color);
  await expect(contentTable).not.toHaveCount(0);
});
