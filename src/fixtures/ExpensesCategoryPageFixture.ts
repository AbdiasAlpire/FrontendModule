import { test as base } from "@playwright/test";
import { ExpensesCategoryPage } from "../pages/ExpensesCategoryPage";

export const test = base.extend<{ expensesCategoryPage: ExpensesCategoryPage }>({
  expensesCategoryPage: async ({ page }, use) => {
    const expensesCategoryPage = new ExpensesCategoryPage(page);
    await use(expensesCategoryPage);
  },
});

export { expect } from "@playwright/test";
