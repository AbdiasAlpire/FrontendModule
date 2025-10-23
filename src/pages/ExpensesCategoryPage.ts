import { Page } from "@playwright/test";
import { ExpensesCategoryLocators } from "../locators/ExpensesCategoryLocators";

export class ExpensesCategoryPage {
  constructor(public page: Page) {}

  async clickAddExpensesCategoryButton(timeout = 5000){
    const addExpensesCategoryButton = this.page.locator(`xpath=${ExpensesCategoryLocators.addNewExpenseCategoryButton}`);
    await addExpensesCategoryButton.waitFor({ state: "visible", timeout })
    await addExpensesCategoryButton.click();
  }

  async waitForExpensesCategoryContainer(timeout = 5000){
    await this.page.locator(`xpath=${ExpensesCategoryLocators.createExpenseCategoryContainer}`).waitFor({ state: "visible", timeout })
  }

  async fillNameInput(name: string){
    await this.page.locator(ExpensesCategoryLocators.nameInput).fill(name);
  }

  async fillDescriptionInput(description: string){
    await this.page.locator(ExpensesCategoryLocators.descriptionInput).fill(description);
  }

  async fillColorInput(color: string){
    const colorInput = this.page.locator(ExpensesCategoryLocators.colorInput);
    await colorInput.fill(color);
    await colorInput.press('Enter');
  }

  async clickSubmitButton(){
    await this.page.locator(ExpensesCategoryLocators.submitButton).click();
  }

  async clickCloseContainer(timeout = 5000) {
    const closeContainerButton = this.page.locator(ExpensesCategoryLocators.closeContainerButton);
    await this.page.locator(ExpensesCategoryLocators.spinner).waitFor({ state: 'detached', timeout }).catch(() => null);
    await closeContainerButton.waitFor({ state: "visible", timeout });
    await this.page.locator(ExpensesCategoryLocators.successToaster).waitFor({ state: 'visible', timeout });
    await this.page.locator(ExpensesCategoryLocators.closeToasterButton).click();
    await closeContainerButton.click();
  }
}
