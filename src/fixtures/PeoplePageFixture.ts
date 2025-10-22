import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { PeoplesPage } from '../pages/PeoplesPage';
import { DashboardPage } from '../pages/DashboardPage';

export const test = base.extend<{
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  peoplesPage: PeoplesPage;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
    dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
  peoplesPage: async ({ page }, use) => {
    const peoplesPage = new PeoplesPage(page);
    await use(peoplesPage);
  }
});

export { expect } from '@playwright/test';
