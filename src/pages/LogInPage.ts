import { Page } from "@playwright/test";
import {LeadLocators} from "../locators/LeadLocators";
import { LogInLocators } from "../locators/LoginLocators";

export class LogInPage {
  constructor(public page: Page) {}

  async goTo() {
    await this.page.goto("/login");
  }

  async fillUsernameInput(username: string) {
    await this.page.locator(LogInLocators.emailInput).fill(username);
  }

  async fillPasswordInput(password: string) {
    await this.page.locator(LogInLocators.passwordInput).fill(password);
  }

  async clickLoginButton() {
    await this.page.locator(LogInLocators.loginButton).click();
  }

  async getToastErrorMessage(timeout = 5000): Promise<string> {
    const toast = this.page.locator(LogInLocators.toastErrorContainer);
    await toast.waitFor({ state: "visible", timeout });
    return await this.page
      .locator(LogInLocators.toastErrorDescription)
      .innerText();
  }

  async getLogInTitle(timeout = 5000): Promise<string> {
    const signInTitle = this.page.locator(LogInLocators.signInTitle);
    await signInTitle.waitFor({ state: "visible", timeout });
    return await signInTitle.innerText();
  }
}
