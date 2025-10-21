import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { PeoplesPage } from '../pages/PeoplesPage';

export const test = base.extend<{
  loginPage: LoginPage;
  peoplesPage: PeoplesPage;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  peoplesPage: async ({ page }, use) => {
    const peoplesPage = new PeoplesPage(page);
    await use(peoplesPage);
  },
});

export { expect } from '@playwright/test';
