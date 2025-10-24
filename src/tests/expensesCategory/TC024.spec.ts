import { mergeTests } from "@playwright/test";
import { test as expensesCategoryTest, expect } from "../../fixtures/ExpensesCategoryPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as SideMenuTest } from "../../fixtures/SideMenuComponentFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, SideMenuTest, expensesCategoryTest);

dotenv.config();

test("TC024: Verify that an Expense Category can be deleted successfully", async ({sideMenuComponent, expensesCategoryPage}) => {
  const name:string = 'Category 3';
  const description:string = 'Description Category 3';
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
  await expensesCategoryPage.clickShowOption();
  await expensesCategoryPage.waitForPopUpDisplayed();
  await expensesCategoryPage.clickRemoveButtonFromPopup();
  await expensesCategoryPage.waitForDeleteConfirmationPopUp();
  await expensesCategoryPage.clickAcceptButton();
  await expensesCategoryPage.clickRefreshButton();
  const contentTable = await expensesCategoryPage.getContentTable(name, description, color);
  await expect(contentTable).toHaveCount(0);
});
