import { Page } from '@playwright/test';
import { ExpenseCategoryLocators } from '../locators/ExpenseCategoryLocators';

export class ExpenseCategoryPage {
  constructor(public page: Page) {}
  
  async goto() {
    await this.page.goto('/category/expenses');
  }

  async clickAddNewExpenseCategoryButton() {
    await this.page.getByRole('button', { name: ExpenseCategoryLocators.addExpenseCategoryButton }).click();
  }

  async waitForAddExpenseCategoryForm() {
    await this.page.locator(`xpath=${ExpenseCategoryLocators.addExpenseCategoryForm}`).waitFor({ state: 'visible', timeout: 3000 });
  }

  async fillName(name: string) {
    await this.page.locator(ExpenseCategoryLocators.nameInput).fill(name);
}

  async fillDescription(description: string) {
    await this.page.locator(ExpenseCategoryLocators.descriptionInput).fill(description);
}

  async fillColor(color: string) {
    const colorInput = this.page.locator(ExpenseCategoryLocators.colorInput);
    await colorInput.fill(color);
    await colorInput.press('Enter');
    }

  async clickSubmitButton() {
    await this.page.locator(`xpath=${ExpenseCategoryLocators.submitButton}`).click();
  }

async waitForCategoryCreatedData() {
    await this.page.locator(`xpath=${ExpenseCategoryLocators.categoryCreatedData}`).waitFor({ state: 'visible', timeout: 3000 });
  }

async getCreatedCategoryName() {
    return this.page.locator(`xpath=${ExpenseCategoryLocators.nameCategoryData}`).textContent();
  }

  async getCreatedCategoryDescription() {
    return this.page.locator(`xpath=${ExpenseCategoryLocators.descriptionCategoryData}`).textContent();
  }

    async getCreatedCategoryColor() {
    return this.page.locator(`xpath=${ExpenseCategoryLocators.colorCategoryData}`).textContent();
  }
}
