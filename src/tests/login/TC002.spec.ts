import { mergeTests, expect } from "@playwright/test";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as headerTest } from "../../fixtures/HeaderComponentFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, headerTest);

dotenv.config();

test("TC002: Verify login with valid account", async ({
  headerComponent,
}) => {
  const userEmail = process.env.USER_EMAIL as string;
  await expect(headerComponent.page).toHaveURL("/");
  const avatarElement = await headerComponent.getAvatarElement();
  await expect(avatarElement).toHaveText(userEmail.charAt(0).toUpperCase());
});
