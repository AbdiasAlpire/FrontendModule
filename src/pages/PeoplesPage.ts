import { Page } from '@playwright/test';
import { PeoplesLocators } from '../locators/PeoplesLocators';

export class PeoplesPage {
  constructor(public page: Page) {}

  async goto() {
    await this.page.goto('/people', { waitUntil: 'networkidle' });
  }

  get addNewPersonButton() {
    return this.page.locator(PeoplesLocators.addNewPersonButton);
  }
  async clickAddNewPersonButton(){
    await this.addNewPersonButton.click();
  }

  async fillFirstName(firstname: string) {
    await this.page.locator(PeoplesLocators.firstNameField).fill(firstname);
  }

  async fillLastName(lastname: string) {
    await this.page.locator(PeoplesLocators.lastNameField).fill(lastname);
  }

  async clickSumitButton() {
    await this.page.locator(PeoplesLocators.summitButton).click();
  }

  async clickCloseButton(){
    await this.page.locator(PeoplesLocators.closeSidePanel).click();
  }

  async getCreationMessage(timeout = 5000) {
  const toast = this.page.locator(PeoplesLocators.successCreationContainer);
  await toast.waitFor({ state: 'visible', timeout });
  return this.page.locator(PeoplesLocators.successCreationDescription).innerText();
  }

  async clickCloseSuccessMessage(){
    await this.page.locator(PeoplesLocators.closeSuccessMessage).click();
  }

    async waitForRemoveButton(timeout = 10000) {
    await this.page.locator('button:has-text("remove")').waitFor({ state: 'visible', timeout });
  }

  async clickRemovePersonButton(){
    await this.waitForRemoveButton();
    await this.page.locator(PeoplesLocators.removePersonButton).click();
  }
  
  async clickRemoveConfirmationButton(){
    await this.page.locator(PeoplesLocators.removeConfirmationButton).click();
  }
  
  async getRemoveMessage(timeout = 5000){
    const confirmation = this.page.locator(PeoplesLocators.removeConfirmationContainer);
    await confirmation.waitFor({state: 'visible', timeout});
    return this.page.locator(PeoplesLocators.removeConfirmationDescription).innerText();
  }

}
