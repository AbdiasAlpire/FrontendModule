import { Page } from "@playwright/test";
import { PeoplesLocators } from "../locators/PeoplesLocators";

export class PeoplesPage {
  constructor(public page: Page) {}

  async getaddNewPersonButton() {
    return this.page.locator(PeoplesLocators.addNewPersonButton);
  }

  async clickAddNewPersonButton() {
    const button = this.page.locator(PeoplesLocators.addNewPersonButton);
    await button.waitFor({ state: "visible" });
    await button.click();
  }

  async fillFirstName(firstname: string) {
    await this.page.locator(PeoplesLocators.firstNameField).fill(firstname);
  }

  async fillLastName(lastname: string) {
    await this.page.locator(PeoplesLocators.lastNameField).fill(lastname);
  }

  async clickSumitButton() {
    await this.page.locator(PeoplesLocators.summitButton).click();
  }

  async clickCloseSidePannelButton() {
    await this.page.locator(PeoplesLocators.closeSidePanel).click();
  }

  async getCreationMessage(timeout = 5000) {
    const toast = this.page.locator(PeoplesLocators.successCreationContainer);
    await toast.waitFor({ state: "visible", timeout });
    return this.page
      .locator(PeoplesLocators.successCreationDescription)
      .innerText();
  }

  async clickCloseSuccessMessage() {
    await this.page.locator(PeoplesLocators.closeSuccessMessage).click();
  }

  async waitForRemoveButton(timeout = 10000) {
    await this.page
      .locator('button:has-text("remove")')
      .waitFor({ state: "visible", timeout });
  }

  async clickRemovePersonButton() {
    await this.waitForRemoveButton();
    await this.page.locator(PeoplesLocators.removePersonButton).click();
  }

  async clickRemoveConfirmationButton() {
    await this.page.locator(PeoplesLocators.removeConfirmationButton).click();
  }

  async getRemoveMessage(timeout = 5000) {
    const confirmation = this.page.locator(
      PeoplesLocators.removeConfirmationContainer
    );
    await confirmation.waitFor({ state: "visible", timeout });
    return this.page
      .locator(PeoplesLocators.removeConfirmationDescription)
      .innerText();
  }

  async waitForEditButton(timeout = 10000) {
    await this.page
      .locator('button:has-text("edit")')
      .waitFor({ state: "visible", timeout });
  }

  async clickEditButton() {
    await this.waitForEditButton();
    await this.page.locator(PeoplesLocators.editPersonButton).click();
  }

  async getEditMessage(timeout = 5000) {
    const confirmation = this.page.locator(
      PeoplesLocators.editConfirmationContainer
    );
    await confirmation.waitFor({ state: "visible", timeout });
    return this.page
      .locator(PeoplesLocators.editConfirmationDescription)
      .innerText();
  }

  async waitForSearchbox(timeout = 3000) {
    const clickSearch = this.page.locator(PeoplesLocators.searchTextBox);
    await clickSearch.waitFor({ state: "visible", timeout });
  }

  async clickSearchPersonBox(timeout = 3000) {
    await this.waitForSearchbox();
    await this.page.locator(PeoplesLocators.searchTextBox).click();
  }

  async typePersonFirstName(personName: string) {
    await this.page.locator(PeoplesLocators.searchTextBox).fill(personName);
  }

  async waitForFirstRow(timeout = 2000) {
    const firstRow = this.page.locator(PeoplesLocators.firstNameRowValue);
    await firstRow.waitFor({ state: "visible", timeout });
  }

  async getFirstRow() {
    await this.waitForFirstRow();
    return await this.page
      .locator(PeoplesLocators.firstNameRowValue)
      .innerText();
  }

  async FirstNameMandatoryMessages(timeout = 3000) {
    const mandatory = this.page.locator(
      PeoplesLocators.firstNameMandatoryMessage
    );
    await mandatory.waitFor({ state: "visible", timeout });
    return this.page
      .locator(PeoplesLocators.firstNameMandatoryMessage)
      .isVisible();
  }

  async LastNameMandatoryMessages(timeout = 3000) {
    const mandatory = this.page.locator(
      PeoplesLocators.lastNameMandatoryMessage
    );
    await mandatory.waitFor({ state: "visible", timeout });
    return this.page
      .locator(PeoplesLocators.lastNameMandatoryMessage)
      .isVisible();
  }

  async clickThreeDotsMenuButton() {
    await this.page.waitForTimeout(5000);
    await this.page.locator(PeoplesLocators.personThreeDotMenu).first().click();
  }
  async clickDeleteDropDownButton() {
    await this.page.waitForTimeout(5000);
    await this.page.locator(PeoplesLocators.deletePersonDotMenu).click();
  }
}
