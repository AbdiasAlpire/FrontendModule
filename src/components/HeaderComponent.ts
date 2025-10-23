import { Page } from "@playwright/test";
import { HeaderLocators } from "./HeaderLocators";

export class HeaderComponent {
  constructor(public page: Page) {}

  async getAvatarElement() {
    return this.page.locator(HeaderLocators.avatarButton);
  }

  async clickAvatarElement(){
    (await this.getAvatarElement()).click();
  }

  async waitForAvatarDropdown(timeout = 5000){
    await this.page.locator(HeaderLocators.accountOwnerTag).waitFor({ state: "visible", timeout });
  }

  async clickLogoutButton(){
    await this.waitForAvatarDropdown();
    await this.page.locator(HeaderLocators.logoutButton).click();
  }
}
