export const PeoplesLocators = {
  addNewPersonButton: '//div[@id="root"]//div[3]//button[1]',
  firstNameField: '//input[@id="firstname"]',
  lastNameField: '//input[@id="lastname"]',
  summitButton: '//button[@type="submit"]',
  closeSidePanel: '(//*[name()="svg"][@fill-rule="evenodd"])[2]',
  closeSuccessMessage: '//a[@aria-label="Close"]',
  removePersonButton: 'div[class="TopCollapseBox"] button:nth-child(1)',
  removeConfirmationButton: '"OK"',
  removeConfirmationContainer:
    ".ant-notification-notice.ant-notification-notice-success.ant-notification-notice-closable",
  removeConfirmationDescription: ".ant-notification-notice-description",
  successCreationContainer:
    ".ant-notification-notice.ant-notification-notice-success.ant-notification-notice-closable",
  successCreationDescription: ".ant-notification-notice-description",
  editPersonButton: "body div button:nth-child(2)",
  editConfirmationContainer:
    ".ant-notification-notice.ant-notification-notice-success.ant-notification-notice-closable",
  editConfirmationDescription: ".ant-notification-notice-description",
  searchTextBox: 'input[placeholder="search"]',
  firstNameRowValue: "tbody tr:nth-child(2) td:nth-child(1)",
  firstNameMandatoryMessage:
    'div[id="firstname_help"] div[class="ant-form-item-explain-error"]',
  lastNameMandatoryMessage:
    'div[id="lastname_help"] div[class="ant-form-item-explain-error"]',
  personThreeDotMenu:
    '.anticon.anticon-ellipsis.ant-dropdown-trigger[aria-label="ellipsis"]',
  deletePersonDotMenu: ".anticon.anticon-delete.ant-dropdown-menu-item-icon",
  emailFormatMessage: ".ant-form-item-explain-error",
  emailInput: '//input[@id="email"]',
  addNewPersonForm: '//div[@class="collapseBox "]',
};
