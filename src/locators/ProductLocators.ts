export const ProductLocators = {
  // Side menu navigation
  productsMenuItem: 'a[href="/product"]',
  
  // Product page elements
  addNewProductButton: 'button:has-text("Add New Product")',
  searchBox: 'input[placeholder="search"]',
  refreshButton: 'button[class="ant-btn css-1lk2pln ant-btn-default ant-btn-color-default ant-btn-variant-outlined"]',
  productTable: '.ant-table-wrapper table',
  productTableRows: '.ant-table-tbody tr',
  noDataMessage: '.ant-empty-description',
  
  // Add New Product modal elements
  addProductModal: '.ant-drawer-content',
  addProductModalTitle: '.ant-drawer-header .ant-drawer-title',
  addProductModalCloseButton: '.ant-drawer-close',
  
  // Add Product form fields
  nameInput: 'input#name',
  nameErrorMessage: '#name_help .ant-form-item-explain-error',
  productCategoryDropdown: '#rc_select_4',
  productCategoryOption: (category: string) => `.ant-select-item-option-content:has-text("${category}")`,
  currencyDropdown: '#currency',
  currencyOption: (currency: string) => `.ant-select-item-option-content:has-text("${currency}")`,
  priceInput: 'input#price',
  priceErrorMessage: '#price_help .ant-form-item-explain-error',
  descriptionTextarea: 'textarea#description',
  imageUploadInput: 'input[type="file"]',
  submitProductButton: 'button[type="submit"]',
  
  // Success notification
  successNotification: '.ant-notification-notice-success',
  successNotificationDescription: '.ant-notification-notice-description',
  
  // Product actions menu
  threeDotMenuButton: '.ant-table-tbody span[aria-label="ellipsis"]',
  actionMenu: '.ant-dropdown-menu',
  actionMenuVisible: '.ant-dropdown-menu:not(.ant-dropdown-menu-hidden)',
  showOption: '.ant-dropdown-menu-item:has-text("Show")',
  
  // Product details side panel
  productDetailsPanel: '.ant-drawer-content',
  productDetailsPanelTitle: '.ant-drawer-header .ant-drawer-title',
  productNameInPanel: '.ant-drawer-body',
  productCategoryInPanel: '.ant-drawer-body',
  productPriceInPanel: '.ant-drawer-body',
  closePanelButton: '.ant-drawer-close',
};