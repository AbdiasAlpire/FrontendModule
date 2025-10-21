import { mergeTests } from '@playwright/test';
import { test as loginTest, expect } from "../../fixtures/LoginPageFixture";
import { test as dashboardTest } from "../../fixtures/DashboardPageFixture";

const test = mergeTests(loginTest, dashboardTest);

test('TC003: Verify logout functionality', async ({ loginPage, dashboardPage }) => {
  await loginPage.goto();
  await loginPage.fillUsername('ddcrene@gmail.com');
  await loginPage.fillPassword('abc123456789');
  await loginPage.clickLoginButton();
  await (loginPage as any).page.waitForTimeout(5000);
  
  // Verificar que estás en el dashboard
  await expect((dashboardPage as any).page).toHaveURL("/");
  
  // Hacer logout
  await dashboardPage.clickAvatarProfile();
    await (loginPage as any).page.waitForTimeout(2000);
  await dashboardPage.clickLogoutButton();
  
  // Verificar que regresaste al login
  await expect((loginPage as any).page).toHaveURL("/login");
});