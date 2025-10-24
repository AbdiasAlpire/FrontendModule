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

  async waitForSpinner(timeout:number){
    await this.page.locator(ExpensesCategoryLocators.refreshSpinner).waitFor({ state: 'detached', timeout }).catch(() => null);
  }

  async getContentTable(name:string, description:string, color:string): Promise<any> {
    await this.waitForSpinner(6000);
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

  async fillSearchField(searchText: string){
    const searchInput = this.page.getByPlaceholder(ExpensesCategoryLocators.searchInput);
    await searchInput.fill(searchText);
    await searchInput.press('Enter');
  }

  async clickThreePointsButton(timeout = 5000){
    const threePointsButton = this.page.getByRole('img', { name: ExpensesCategoryLocators.threePointsButton }).nth(0);
    await threePointsButton.waitFor({ state: "visible", timeout })
    await threePointsButton.click();
  }

  async clickShowOption(timeout=5000){
    const showButton = this.page.getByRole('menuitem', { name: ExpensesCategoryLocators.showOption });
    await showButton.waitFor({ state: "visible", timeout })
    await showButton.click();
  }

  async getNamePopUp(timeout=5000):Promise<any>{
    const namePopUp = this.page.locator(ExpensesCategoryLocators.textValuePopUp).nth(0);
    await namePopUp.waitFor({ state: "visible", timeout })
    return namePopUp;
  }

  async getDescriptionPopUp(timeout=5000):Promise<any>{
    const descriptionPopUp = this.page.locator(ExpensesCategoryLocators.textValuePopUp).nth(1);
    await descriptionPopUp.waitFor({ state: "visible", timeout })
    return descriptionPopUp;
  }

  async getColorPopUp(timeout=5000):Promise<any>{
    const colorPopUp = this.page.locator(ExpensesCategoryLocators.textValuePopUp).nth(2);
    await colorPopUp.waitFor({ state: "visible", timeout })
    return colorPopUp;
  }

  async waitForPopUpDisplayed(timeout=5000){
    await this.page.locator(`xpath=${ExpensesCategoryLocators.infoPopUp}`).waitFor({ state: 'visible', timeout });
  }

  async clickRemoveButtonFromPopup(timeout=5000){
    const removeButton = this.page.locator('button', { hasText: ExpensesCategoryLocators.removeButton });
    await removeButton.waitFor({ state: "visible", timeout })
    await removeButton.click();
  }

  async clickEditButtonFromPopup(timeout=5000){
    const removeButton = this.page.locator('button', { hasText: ExpensesCategoryLocators.editButton });
    await removeButton.waitFor({ state: "visible", timeout })
    await removeButton.click();
  }

  async waitForDeleteConfirmationPopUp(timeout = 5000){
    await this.page.locator(`xpath=${ExpensesCategoryLocators.deleteConfirmationPopup}`).waitFor({ state: 'visible', timeout });
  }

  async clickAcceptButton(){
    await this.page.locator(`xpath=${ExpensesCategoryLocators.acceptRemoveButton}`).click();
  }

  async waitForDataToEdit(timeout = 5000){
    await this.page.locator(`xpath=${ExpensesCategoryLocators.deleteConfirmationPopup}`).waitFor({ state: 'visible', timeout });
  }

  async clickCloseCreation(timeout = 5000) {
    const closeContainerButton = this.page.locator(ExpensesCategoryLocators.closeContainerButton);
    await closeContainerButton.waitFor({ state: "visible", timeout });
    await closeContainerButton.click();
  }

    async clickRemoveOption(timeout=5000){
    const removeButton = this.page.getByRole('menuitem', { name: ExpensesCategoryLocators.removeOption });
    await removeButton.waitFor({ state: "visible", timeout })
    await removeButton.click();
  }
}
