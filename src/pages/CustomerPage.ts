import { Page } from "@playwright/test";
import { CustomerLocators } from "../locators/CustomerLocators";

export class CustomerPage {
  constructor(public page: Page) {}

  async goto() {
    await this.page.goto("/customer", { waitUntil: "networkidle" });
  }

  async waitForAddNewCustomer(timeout = 5000) {
    const newCustomerButton = await this.page.locator(
      CustomerLocators.addNewCustomer
    );
    newCustomerButton.waitFor({ state: "visible", timeout });
  }

  async clickAddNewCustomer() {
    await this.waitForAddNewCustomer();
    await this.page.locator(CustomerLocators.addNewCustomer).click();
  }

  async waitForFormContainer(timeout = 1000) {
    const container = await this.page.locator(CustomerLocators.formContainer);
    container.waitFor({ state: "visible", timeout });
  }

  async clickTypeDropDown() {
    await this.waitForFormContainer();
    await this.page.locator(CustomerLocators.typeOfCustomerBox).click();
  }

  async selectPeopleAsType(timeout = 3000) {
    const container = await this.page.locator(
      CustomerLocators.selectTypePeople
    );
    container.waitFor({ state: "visible", timeout });
    await container.click();
  }

  async clickSearchBox() {
    await this.page.locator(CustomerLocators.searchPeople).click();
  }

  async fillSearchBox(person: string) {
    await this.page.locator(CustomerLocators.searchPeople).fill(person);
  }

  async waitSelectListRow(timeout: 2000) {
    const waitlist = await this.page.locator(CustomerLocators.selectFirstRow);
    waitlist.waitFor({ state: "visible", timeout });
  }

  async clickFirstRow() {
    await this.waitSelectListRow();
    await this.page.locator(CustomerLocators.selectFirstRow).click();
  }

  async clickSummitButton() {
    await this.page.locator(CustomerLocators.summitCustumer).click();
  }
}
