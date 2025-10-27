import { expect, mergeTests } from "@playwright/test";
import { test as leadTest } from "../../../fixtures/LeadPageFixture";
import { test as loggedInTest } from "../../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, leadTest);

dotenv.config();

test("TC007: Verify lead can be created", async ({
  leadPage,
}) => {
  test.setTimeout(60000);
  await leadPage.goTo();
  await leadPage.clickAddNewLeadButton();
  await leadPage.clickSubmitButton();
  await leadPage.page.waitForTimeout(2000);
  await (await leadPage.getComboboxByName('Branch')).click();
  await ((await leadPage.getComboboxOption()).first()).click();
  await (await leadPage.getComboboxByName('Type')).click({ delay: 3000 });
  await leadPage.page.waitForTimeout(2000);
  await ((await leadPage.getComboboxOptionByText('People')).first()).click();
  await leadPage.fillName("example");
  await (await leadPage.getCountryCombobox()).click();
  await ((await leadPage.getComboboxOptionByText('Andorra'))).click();
  await (await leadPage.getComboboxByName('Phone')).click();
  await ((await leadPage.getComboboxOptionByText('+376'))).click();
  await leadPage.fillPhoneNumber("1234567890");
  await leadPage.fillEmail("example@email.com");
  await leadPage.clickSubmitButton();
  await expect(await leadPage.getSuccessPopUpMessage()).toBeVisible();
  await leadPage.goTo();
  await expect(await leadPage.getTableCell()).toBeVisible();
  await expect(await leadPage.getTableNameColumn()).toHaveText("example");
  
});