import { Page } from "@playwright/test";
import { HeaderLocators } from "./HeaderLocators";

export class SideMenuComponent {
  constructor(public page: Page) {}

  async clickExpenseOption() {
    await this.page.getByRole("menuitem", { name: "Expenses" });
  }
}
