import { Page } from "@playwright/test";
import { LeadLocators } from "../locators/LeadLocators";

export class LeadPage {
  constructor(public page: Page) {}

  async goTo() {
    await this.page.waitForTimeout(5000);
    await this.page.goto("/lead");
  }

  async clickAddNewLeadButton() {
    const addLeadButton = this.page.locator(LeadLocators.addLeadButton);
    await addLeadButton.waitFor({state: "visible", timeout: 5000});
    await addLeadButton.click();
  }

  async clickSubmitButton() {
    const submitButton = this.page.locator(LeadLocators.submitButton);
    await submitButton.waitFor({state: "visible", timeout: 5000});
    await submitButton.click();
  }

  async getErrorMessagesCount() {
    const errorMessages = this.page.locator(LeadLocators.allErrorMessages);
    await this.page.waitForTimeout(500);
    await errorMessages.first().waitFor({state: "visible", timeout: 5000}).catch(() => {
      return errorMessages.count();
    })
  }
}
