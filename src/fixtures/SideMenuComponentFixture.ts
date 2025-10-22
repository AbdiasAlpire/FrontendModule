import { test as base } from "@playwright/test";
import { SideMenuComponent } from "../components/SideMenuComponent";

export const test = base.extend<{
  sideMenuComponent: SideMenuComponent;
}>({
  sideMenuComponent: async ({ page }, use) => {
    const sideMenuComponent = new SideMenuComponent(page);
    await use(sideMenuComponent);
  },
});

export { expect } from "@playwright/test";
