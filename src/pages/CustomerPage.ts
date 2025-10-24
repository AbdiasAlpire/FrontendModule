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

  async getErrorMessage(timeout = 5000) {
    const toast = this.page.locator(CustomerLocators.erroMessageContainer);
    await toast.waitFor({ state: "visible", timeout });
    return this.page
      .locator(CustomerLocators.errorMessageDescription)
      .innerText();
  }

  async getMandatory() {
    const mandatory = await this.page.locator(
      CustomerLocators.typeMandatoryMessage
    );
    await mandatory.waitFor({ state: "visible", timeout: 2000 });
    return mandatory.innerText();
  }

  async waitForSearchbox(timeout = 3000) {
    const clickSearch = this.page.locator(CustomerLocators.searchTextBox);
    await clickSearch.waitFor({ state: "visible", timeout });
  }

  async clickSearchCustomernBox(timeout = 3000) {
    await this.waitForSearchbox();
    await this.page.locator(CustomerLocators.searchTextBox).click();
  }

  async typeCustomer() {
    await this.page.locator(CustomerLocators.typeCustomerBox).click();
  }
  async typeCustomerFirstName(personName: string) {
    await this.page.locator(CustomerLocators.searchTextBox).fill(personName);
  }

  async clickThreeDotsMenuButton() {
    await this.page.waitForTimeout(5000);
    await this.page
      .locator(CustomerLocators.customerThreeDotMenu)
      .first()
      .click();
  }

  async clickDeleteDropDownButton() {
    await this.page.waitForTimeout(2000);
    await this.page.locator(CustomerLocators.deleteCustomerDotMenu).click();
  }

  async getFirstRow() {
    return await this.page
      .locator(CustomerLocators.firstNameRowValue)
      .innerText();
  }

  async clickRemoveConfirmationButton() {
    await this.page.waitForTimeout(2000);
    await this.page.locator(CustomerLocators.removeConfirmationButton).click();
  }

  async getRemoveMessage(timeout = 5000) {
    const confirmation = this.page.locator(
      CustomerLocators.removeConfirmationContainer
    );
    await confirmation.waitFor({ state: "visible", timeout });
    return this.page
      .locator(CustomerLocators.removeConfirmationDescription)
      .innerText();
  }

  async getBadRequestMessage(timeout = 5000) {
    const badrequest = this.page.locator(CustomerLocators.badRequestContainer);
    await badrequest.waitFor({ state: "visible", timeout });
    return this.page
      .locator(CustomerLocators.badRequestDescription)
      .innerText();
  }
}
