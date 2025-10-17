import { Page } from '@playwright/test';
import { LoginLocators } from '../locators/LoginLocatorsEXAMPLE';

export class LoginPage {
  private page: Page;
  private locators: LoginLocators;

  constructor(page: Page) {
    this.page = page;
    this.locators = new LoginLocators(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.locators.usernameInput.fill(username);
    await this.locators.passwordInput.fill(password);
    await this.locators.submitButton.click();
  }

  async isErrorVisible(): Promise<boolean> {
    return await this.locators.errorMessage.isVisible();
  }
}
