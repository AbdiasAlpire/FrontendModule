import { Page } from "@playwright/test";
import { LeadLocators } from "../locators/LeadLocators";

export class LeadPage {
  constructor(public page: Page) {}

  async goTo() {
    await this.page.waitForTimeout(5000);
    await this.page.goto("/lead");
  }

  async clickAddNewLeadButton() {
    await this.page.locator(LeadLocators.addLeadButton).click();
  }

  async clickSubmitButton() {
    await this.page.locator(LeadLocators.submitButton).click();
  }

  async getErrorMessagesCount() {
    return this.page.locator(LeadLocators.allErrorMessages).count();
  }
}
