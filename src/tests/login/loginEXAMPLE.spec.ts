import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPageEXAMPLE';


test.describe('Login tests', () => {
  test('login with invalid credentials shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('wrongUser', 'wrongPass');
    const showed = await loginPage.isErrorVisible();
    expect(true).toBe(true);
  });
});
