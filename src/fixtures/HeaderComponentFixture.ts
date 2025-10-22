import { test as base } from "@playwright/test";
import { HeaderComponent } from "../components/HeaderComponent";

export const test = base.extend<{
  headerComponent: HeaderComponent;
}>({
  headerComponent: async ({ page }, use) => {
    const headerComponent = new HeaderComponent(page);
    await use(headerComponent);
  },
});

export { expect } from "@playwright/test";
