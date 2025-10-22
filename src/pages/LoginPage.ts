import { Page } from "@playwright/test";
import { LoginLocators } from "../locators/LoginLocators";

export class LoginPage {
  constructor(public page: Page) {}

  async goTo() {
    await this.page.goto("/login");
  }

  async fillUsernameInput(username: string) {
    await this.page.locator(LoginLocators.emailInput).fill(username);
  }

  async fillPasswordInput(password: string) {
    await this.page.locator(LoginLocators.passwordInput).fill(password);
  }

  async clickLoginButton() {
    await this.page.locator(LoginLocators.loginButton).click();
  }

  async getToastErrorMessage(timeout = 5000): Promise<string> {
    const toast = this.page.locator(LoginLocators.toastErrorContainer);
    await toast.waitFor({ state: "visible", timeout });
    return await this.page.locator(LoginLocators.toastErrorDescription).innerText();
  }

  async getLogInTitle(timeout = 5000): Promise<string> {
    const signInTitle = this.page.locator(LoginLocators.signInTitle);
    await signInTitle.waitFor({ state: "visible", timeout });
    return await signInTitle.innerText();
  }
}
