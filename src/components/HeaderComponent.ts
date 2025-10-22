import { Page } from "@playwright/test";
import { HeaderLocators } from "./HeaderLocators";

export class HeaderComponent {
  constructor(public page: Page) {}

  async getAvatarElement() {
    return this.page.locator(HeaderLocators.avatarButton);
  }
}
