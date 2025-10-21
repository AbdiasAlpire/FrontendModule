import { Page } from '@playwright/test';
import { LoginLocators } from '../locators/LoginLocators';

export class LoginPage {
  constructor(public page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async fillUsername(username: string) {
    await this.page.locator(LoginLocators.emailInput).fill(username);
  }

  async fillPassword(password: string) {
    await this.page.locator(LoginLocators.passwordInput).fill(password);
  }

  async clickLoginButton() {
    await this.page.locator(LoginLocators.loginButton).click();
  }

async getToastErrorMessage(timeout = 5000) {
  const toast = this.page.locator(LoginLocators.toastErrorContainer);
  await toast.waitFor({ state: 'visible', timeout });
  return this.page.locator(LoginLocators.toastErrorDescription).innerText();
}
}
