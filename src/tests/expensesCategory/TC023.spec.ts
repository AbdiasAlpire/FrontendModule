import { mergeTests } from "@playwright/test";
import { test as expensesCategoryTest, expect } from "../../fixtures/ExpensesCategoryPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as SideMenuTest } from "../../fixtures/SideMenuComponentFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, SideMenuTest, expensesCategoryTest);

dotenv.config();

test("TC023: Verify that the Expense Category information is retrieved successfully via popup ", async ({sideMenuComponent, expensesCategoryPage}) => {
  const name:string = 'Category 3';
  const description:string = 'Description Category 3';
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
  await expensesCategoryPage.clickThreePointsButton();
  await expensesCategoryPage.clickShowOption();
  await expensesCategoryPage.waitForPopUpDisplayed();
  const namePopUp = await expensesCategoryPage.getNamePopUp();
  const descriptionPopUp = await expensesCategoryPage.getDescriptionPopUp();
  const colorPopUp = await expensesCategoryPage.getColorPopUp();
  await expect(namePopUp).toHaveText(name);
  await expect(descriptionPopUp).toHaveText(description);
  await expect(colorPopUp).toHaveText(color);
});
