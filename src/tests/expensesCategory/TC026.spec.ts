import { mergeTests } from "@playwright/test";
import { test as expensesCategoryTest, expect } from "../../fixtures/ExpensesCategoryPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as SideMenuTest } from "../../fixtures/SideMenuComponentFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, SideMenuTest, expensesCategoryTest);

dotenv.config();

test("TC026: Verify that Expense Category creation fails when required fields are left empty", async ({sideMenuComponent, expensesCategoryPage}) => {
  const name:string = 'Category 9';
  const description:string = 'Description Category 9';
  const color:string = 'orangered';
  await sideMenuComponent.clickExpensesCategoryOption();
  await expensesCategoryPage.clickAddExpensesCategoryButton();
  await expensesCategoryPage.waitForExpensesCategoryContainer();
  await expensesCategoryPage.clickSubmitButton(); 
  await expensesCategoryPage.clickCloseCreation();
  await expensesCategoryPage.clickRefreshButton();
  const contentTable = await expensesCategoryPage.getContentTable(name, description, color);
  await expect(contentTable).toHaveCount(0);
});
