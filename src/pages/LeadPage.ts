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
    const errors = this.page.locator(LeadLocators.allErrorMessages);
    await errors.first().waitFor({ state: "visible", timeout: 5000 }).catch(() => {});
    const count = await errors.count();
    return count;
  }

  async getComboboxByName(title: string) {
    return this.page.locator('.ant-form-item-row').filter({ hasText: title }).getByRole('combobox').first();  
  }  

  async getComboboxOption(){
    return this.page.locator(LeadLocators.comboboxOption);
  }

  async getComboboxOptionByText(name: string){
    return this.page.locator(LeadLocators.comboboxOptionByText).filter({ hasText: name });   
  }

  async fillName(name: string) {
    await this.page.locator(LeadLocators.nameField).fill(name);
  }

  async fillEmail(email: string) {
    await this.page.locator(LeadLocators.emailField).fill(email);
  }

  async fillPhoneNumber(phoneNumber: string) {
    await this.page.locator(LeadLocators.phoneNumberField).fill(phoneNumber);
  }

  async getSuccessPopUpMessage() {
    return this.page.locator(LeadLocators.successPopUpMessage);
  }

  async getTableCell() {
    return this.page.locator(LeadLocators.tableCell).first();
  }

  async getTableNameColumn() {
    return this.page.locator(LeadLocators.tableCell).nth(2);
  }

  async getCountryCombobox() {
    return this.page.locator(LeadLocators.countryCombobox);
  }
}
