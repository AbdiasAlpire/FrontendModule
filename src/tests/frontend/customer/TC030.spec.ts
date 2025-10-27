import { mergeTests, expect } from "@playwright/test";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as customerTest } from "../../fixtures/CustomerPageFixture";
import * as dotenv from "dotenv";
import { CustomerPage } from "../../pages/CustomerPage";
dotenv.config();

const test = mergeTests(loggedInTest, customerTest);

test("TC030: Verify first customer on customer list can be deleted", async ({
  customerPage,
  loginPage,
}) => {
  await customerPage.goto();
  await customerPage.clickThreeDotsMenuButton();
  await customerPage.clickDeleteDropDownButton();
  await customerPage.clickRemoveConfirmationButton();
  //   const badRequest = await customerPage.getBadRequestMessage();
  //   expect(badRequest).toContain(
  //     "Cannot delete client if client have any quote or invoice"
  //   );
  const removeMessage = await customerPage.getRemoveMessage();
  expect(removeMessage).toContain("Customer deleted");
});
