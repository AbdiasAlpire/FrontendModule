import { mergeTests } from "@playwright/test";
import { test as expensesCategoryTest, expect } from "../../fixtures/ExpensesCategoryPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as SideMenuTest } from "../../fixtures/SideMenuComponentFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, SideMenuTest, expensesCategoryTest);

dotenv.config();

test("TC036: Verify that an Expense Category can be deleted successfully via 3 points button", async ({sideMenuComponent, expensesCategoryPage}) => {
  const name:string = 'Category 10';
  const description:string = 'Description Category 10';
  const color:string = 'orangered';
  await sideMenuComponent.clickExpensesCategoryOption();
  await expensesCategoryPage.clickAddExpensesCategoryButton();
  await expensesCategoryPage.waitForExpensesCategoryContainer();
  await expensesCategoryPage.fillNameInput(name);
  await expensesCategoryPage.fillDescriptionInput(description);
  await expensesCategoryPage.fillColorInput(color);
  await expensesCategoryPage.clickSubmitButton(); 
  await expensesCategoryPage.clickCloseContainer();
  await expensesCategoryPage.clickRefreshButton();
  await expensesCategoryPage.clickThreePointsButton();
  await expensesCategoryPage.clickRemoveOption();
  await expensesCategoryPage.waitForDeleteConfirmationPopUp();
  await expensesCategoryPage.clickAcceptButton();
  await expensesCategoryPage.clickRefreshButton();
  const contentTable = await expensesCategoryPage.getContentTable(name, description, color);
  await expect(contentTable).toHaveCount(0);
});
