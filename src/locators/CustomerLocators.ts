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
  searchTextBox: ".ant-input-affix-wrapper.css-1lk2pln.ant-input-outlined",
  typeCustomerBox: 'input[placeholder="search"]',
  customerThreeDotMenu:
    '.anticon.anticon-ellipsis.ant-dropdown-trigger[aria-label="ellipsis"]',
  deleteCustomerDotMenu: ".anticon.anticon-delete.ant-dropdown-menu-item-icon",
  firstNameRowValue: "tbody tr:nth-child(2) td:nth-child(1)",
  removeConfirmationButton: "body div button:nth-child(2)",
  removeConfirmationContainer:
    ".ant-notification-notice.ant-notification-notice-success.ant-notification-notice-closable",
  removeConfirmationDescription: ".ant-notification-notice-description",
  badRequestContainer:
    ".ant-notification-notice.ant-notification-notice-error.ant-notification-notice-closable",
  badRequestDescription: ".ant-notification-notice-description",
};
