/*import { expect, test } from "../../fixtures/PeoplePageFixture";
import * as dotenv from 'dotenv';

test.beforeEach(async ({ loginPage, dashboardPage }) => {
  await loginPage.goTo();
  await loginPage.fillUsername(process.env.USER_EMAIL || '');
  await loginPage.fillPassword(process.env.USER_PASSWORD || '');
  await loginPage.clickLoginButton();
  await dashboardPage.waitForDashboardToLoad();
  await expect(dashboardPage.page).toHaveURL("/");
});
test('TC018: Verify the successful creation of a Expense Category', async ({ expenseCategory }) => {
  const nameCategory = 'Category1';
  const descriptionCategory = 'Description for a Category1';
  const colorCategory = 'blue'
  await expenseCategory.goto();
  await expenseCategory.clickAddNewExpenseCategoryButton();
  await expenseCategory.waitForAddExpenseCategoryForm();
  await expenseCategory.fillName(nameCategory);
  await expenseCategory.fillDescription(descriptionCategory);
  await expenseCategory.fillColor(colorCategory);
  await expenseCategory.clickSubmitButton();
  const actualNameCategory = await expenseCategory.getCreatedCategoryName();
  const actualDescriptionCategory = await expenseCategory.getCreatedCategoryDescription();
  const actualColorCategory = await expenseCategory.getCreatedCategoryColor();
  expect(actualNameCategory).toEqual(nameCategory);
  expect(actualDescriptionCategory).toEqual(descriptionCategory);
  expect(actualColorCategory).toEqual(colorCategory);
});*/
