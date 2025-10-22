import { Page } from "@playwright/test";
import { CompanyLocators } from "../locators/CompanyLocators";

export class CompanyPage {
  constructor(private page: Page) {}

  async goTo() {
    await this.page.goto('/company');
  }

  get addCompanyButton() {
    return this.page.locator(CompanyLocators.addCompanyButton);
  }

  get submitButton() {
    return this.page.locator(CompanyLocators.submitButton);
  }

  get emptyNameMessage() {
    return this.page.locator(CompanyLocators.nameEmptyMessage);
  }

  get emptyEmailMessage() {
    return this.page.locator(CompanyLocators.emailEmptyMessage);
  }
}
