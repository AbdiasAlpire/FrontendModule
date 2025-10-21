import { Page } from '@playwright/test';
import { CustomerLocators } from '../locators/CustomerLocators';

export class CustomerPage {
  constructor(public page: Page) {}

  async goto() {
    await this.page.goto('/customer', { waitUntil: 'networkidle' });
  }

  get addNewCustomer() {
    return this.page.locator(CustomerLocators.addNewCustomer);
  }
  async clickAddNewCustomer(){
    await this.addNewCustomer.click();
  }

  async typeCustomer() {
    await this.page.locator(CustomerLocators.typeCustomer).click();
  }

  async clickCloseButton(){
    await this.page.locator(CustomerLocators.peopleCreated).click();
  }

}
