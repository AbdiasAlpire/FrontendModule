export const CustomerLocators = {
  addNewCustomer: '(//button[@type="button"])[5]',
  formContainer: '//div[@class="ant-drawer-body"]',
  typeOfCustomerBox: '//input[@id="type"]',
  selectTypePeople:
    '//div[contains(@class, "ant-select-item-option") and .//div[text()="People"]]',
  searchPeople: '(//input[@class="ant-select-selection-search-input"])[5]',
  selectFirstRow: '(//div[@class= "ant-select-item-option-content"])[1]',
  summitCustumer: '//button[@type="submit"]',
  successCreationContainer:
    '//div[@class="ant-notification-notice ant-notification-notice-success ant-notification-notice-closable"]',
  successCreationDescription: ".ant-notification-notice-description",
};
