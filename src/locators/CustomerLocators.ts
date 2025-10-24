export const CustomerLocators = {
  addNewCustomer: '(//button[@type="button"])[5]',
  formContainer: '//div[@class="ant-drawer-body"]',
  typeOfCustomerBox: '//input[@id="type"]',
  selectTypePeople:
    '//div[contains(@class, "ant-select-item-option") and .//div[text()="People"]]',
  searchPeople: '(//input[@class="ant-select-selection-search-input"])[5]',
  selectFirstRow: ".div.ant-select-item-option-content:first-child",
  summitCustumer: '//button[@type="submit"]',
  successCreationContainer:
    '//div[@class="ant-notification-notice ant-notification-notice-success ant-notification-notice-closable"]',
  successCreationDescription: ".ant-notification-notice-description",
  erroMessageContainer:
    ".ant-notification-notice.ant-notification-notice-error.ant-notification-notice-closable",
  errorMessageDescription: ".ant-notification-notice-description",
  typeMandatoryMessage: ".ant-form-item-explain-error",
};
