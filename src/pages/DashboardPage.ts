import { Page } from '@playwright/test';
import { DashboardLocators } from '../locators/DashboardLocators';

export class DashboardPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async clickAvatarProfile() {
    await this.page.locator(`xpath=${DashboardLocators.avatarProfile}`).click();
  }

  //Can be refactored separating wait and click actions if needed
  async clickLogoutButton(timeout = 1000) {
    await this.page.locator(`xpath=${DashboardLocators.logoutButton}`).click();
  }
}
