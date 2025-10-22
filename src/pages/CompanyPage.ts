import { Page } from "@playwright/test";
import { CompanyLocators } from "../locators/CompanyLocators";

export class CompanyPage {
  constructor(private page: Page) {}

  async goTo() {
    await this.page.waitForTimeout(5000);
    await this.page.goto("/company");
  }

  async clickAddNewCompanyButton() {
    await this.page.locator(CompanyLocators.addCompanyButton).click();
  }

  async clickSubmitButton() {
    await this.page.locator(CompanyLocators.submitButton).click();
  }

  async getNameErrorMesage() {
    return this.page.locator(`xpath=${CompanyLocators.nameEmptyMessage}`);
  }

  async getEmailErrorMesage() {
    return this.page.locator(CompanyLocators.emailEmptyMessage);
  }
}
