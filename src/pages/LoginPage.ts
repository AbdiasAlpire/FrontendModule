import { Page } from "@playwright/test";
import { LoginLocators } from "../locators/LoginLocators";
import {LeadLocators} from "../locators/LeadLocators";

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

  async getToastErrorMessage() {
    const toast = this.page.locator(LoginLocators.toastErrorDescription);
    await toast.waitFor({ state: 'visible', timeout: 5000 });
    return toast.innerText();
  }
}
