import { Page } from '@playwright/test';
import { DashboardLocators } from '../locators/DashboardLocators';

export class DashboardPage {
  constructor(public page: Page) {}

  async waitForDashboardToLoad() {
    await this.page.locator(`xpath=${DashboardLocators.dashboardBody}`).waitFor({ state: 'visible', timeout: 10000 });
  }

  async clickAvatarProfile() {
    await this.page.locator(`xpath=${DashboardLocators.avatarProfile}`).click();
  }

  async waitForUserMenuDropdownToLoad() {
    await this.page.locator(`xpath=${DashboardLocators.userMenuDropdown}`).waitFor({ state: 'visible', timeout: 3000 });
  }

  async clickLogoutButton() {
    await this.page.click(DashboardLocators.logoutButton);
  }
}
