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

  async waitForPupUpSpinner(timeout:number){
    await this.page.locator(ExpensesCategoryLocators.popupSpinner).waitFor({ state: 'detached', timeout }).catch(() => null);
  }

  async waitForSuccessToaster(timeout:number){
    await this.page.locator(ExpensesCategoryLocators.successToaster).waitFor({ state: 'visible', timeout });
  }

  async clickCloseSuccessToaster(){
    await this.page.locator(ExpensesCategoryLocators.closeToasterButton).click();
  }

  async clickCloseContainer(timeout = 5000) {
    const closeContainerButton = this.page.locator(ExpensesCategoryLocators.closeContainerButton);
    await this.waitForPupUpSpinner(timeout);
    await closeContainerButton.waitFor({ state: "visible", timeout });
    await this.waitForSuccessToaster(timeout);
    await this.clickCloseSuccessToaster();
    await closeContainerButton.click();
  }

  async clickRefreshButton(){
    await this.page.locator(ExpensesCategoryLocators.refreshButton).click();
  }

  async getContentTable(timeout:number, name:string, description:string, color:string): Promise<any> {
    await this.page.locator(ExpensesCategoryLocators.refreshSpinner).waitFor({ state: 'detached', timeout }).catch(() => null);
    const tableRows = this.page.locator(ExpensesCategoryLocators.expensesCategoryTable);
    const targetRow = tableRows.filter({
      hasText: name,
    }).filter({
      hasText: description,
    }).filter({
      hasText: color,
    });
    return targetRow
  }

  async getToasterTitle(): Promise<string>{
    return await this.page.locator(ExpensesCategoryLocators.titleToaster).innerText();
  }

  async getToasterDescription(): Promise<string>{
    return await this.page.locator(ExpensesCategoryLocators.descriptionToaster).innerText();
  }
}
