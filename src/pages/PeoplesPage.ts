import { Page } from '@playwright/test';
import { PeoplesLocators } from '../locators/PeoplesLocators';

export class PeoplesPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/people');
  }

  async addNewPerson(){
    await this.page.locator(PeoplesLocators.addNewPersonButton).click();
  }

  async fillFirstName(firstname: string) {
    await this.page.locator(PeoplesLocators.firstName).fill(firstname);
  }

  async fillLastName(lastname: string) {
    await this.page.locator(PeoplesLocators.lastName).fill(lastname);
  }

  async clickSumitButton() {
    await this.page.locator(PeoplesLocators.summitBtn).click();
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
