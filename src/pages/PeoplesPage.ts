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

async getToastErrorMessage(timeout = 5000) {
  const toast = this.page.locator(PeoplesLocators.toastErrorContainer);
  await toast.waitFor({ state: 'visible', timeout });
  return this.page.locator(PeoplesLocators.toastErrorDescription).innerText();
}

}
