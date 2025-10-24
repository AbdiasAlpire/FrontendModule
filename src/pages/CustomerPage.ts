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
    await newCustomerButton.waitFor({ state: "visible", timeout });
  }

  async clickAddNewCustomer() {
    await this.waitForAddNewCustomer();
    await this.page.locator(CustomerLocators.addNewCustomer).click();
  }

  async waitForFormContainer(timeout = 1000) {
    const container = await this.page.locator(CustomerLocators.formContainer);
    await container.waitFor({ state: "visible", timeout });
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

  async clickSearchResult(person: string) {
    const xpath = `//div[contains(text(),"${person}")]`;
    const result = this.page.locator(xpath);
    await result.waitFor({ state: "visible", timeout: 5000 });
    await result.click();
  }

  async clickSummitButton() {
    const button = await this.page.locator(CustomerLocators.summitCustumer);
    await button.waitFor({ state: "visible", timeout: 2000 });
    await button.click();
  }

  async getCreationMessage(timeout = 5000) {
    const toast = this.page.locator(CustomerLocators.successCreationContainer);
    await toast.waitFor({ state: "visible", timeout });
    return this.page
      .locator(CustomerLocators.successCreationDescription)
      .innerText();
  }
}
