import { Page } from "@playwright/test";
import { CompanyLocators } from "../locators/CompanyLocators";

export class CompanyPage {
  constructor(public page: Page) {}

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

  async clickRefreshButton() {
    const submitButton = this.page.locator(CompanyLocators.refreshButton);
    await submitButton.waitFor({state: "visible", timeout: 5000});
    await submitButton.click();
  }

  async getTableCell() {
    return this.page.locator(CompanyLocators.tableCell).first();
  }
}
