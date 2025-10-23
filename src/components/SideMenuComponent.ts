import { Page } from "@playwright/test";
import { SideMenuLocators } from "./SideMenuLocators";

export class SideMenuComponent {
  constructor(public page: Page) {}

  async clickExpenseOption() {
    await this.page.getByRole("menuitem", { name: SideMenuLocators.ExpenseOption }).click();
  }

  async clickExpensesCategoryOption() {
    await this.page.getByRole("menuitem", { name: SideMenuLocators.ExpensesCategoryOption }).click();
  }
}
