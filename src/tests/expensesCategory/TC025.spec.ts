import { mergeTests } from "@playwright/test";
import { test as expensesCategoryTest, expect } from "../../fixtures/ExpensesCategoryPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as SideMenuTest } from "../../fixtures/SideMenuComponentFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, SideMenuTest, expensesCategoryTest);

dotenv.config();

test("TC025: Verify that an Expense Category can be edited successfully", async ({sideMenuComponent, expensesCategoryPage}) => {
  const nameOriginal:string = 'Category 5';
  const descriptionOriginal:string = 'Description Category 5';
  const colorOriginal:string = 'orangered';
  const nameUpdated:string = 'Category 7';
  const descriptionUpdated:string = 'Description Category 7';
  await sideMenuComponent.clickExpensesCategoryOption();
  await expensesCategoryPage.clickAddExpensesCategoryButton();
  await expensesCategoryPage.waitForExpensesCategoryContainer();
  await expensesCategoryPage.fillNameInput(nameOriginal);
  await expensesCategoryPage.fillDescriptionInput(descriptionOriginal);
  await expensesCategoryPage.fillColorInput(colorOriginal);
  await expensesCategoryPage.clickSubmitButton(); 
  await expensesCategoryPage.clickCloseContainer();
  await expensesCategoryPage.clickRefreshButton();
  await expensesCategoryPage.clickThreePointsButton();
  await expensesCategoryPage.clickShowOption();
  await expensesCategoryPage.waitForPopUpDisplayed();
  await expensesCategoryPage.clickEditButtonFromPopup();
  await expensesCategoryPage.fillNameInput(nameUpdated);
  await expensesCategoryPage.fillDescriptionInput(descriptionUpdated);
  await expensesCategoryPage.clickSubmitButton(); 
  await expensesCategoryPage.clickCloseContainer();
  await expensesCategoryPage.clickRefreshButton();
  const contentTable = await expensesCategoryPage.getContentTable(nameUpdated, descriptionUpdated, colorOriginal);
  await expect(contentTable).not.toHaveCount(0);
});
