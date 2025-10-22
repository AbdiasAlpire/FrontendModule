import { Page } from "@playwright/test";
import { HeaderLocators } from "../locators/HeaderLocators";

export class Header {
  constructor(private page: Page) {}

  get avatarElement() {
    return this.page.locator(HeaderLocators.avatarButton);
  }
}
