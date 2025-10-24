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
  productCategoryDropdown: '#rc_select_4',
  productCategoryOption: (category: string) => `.ant-select-item-option-content:has-text("${category}")`,
  currencyDropdown: '#currency',
  currencyOption: (currency: string) => `.ant-select-item-option-content:has-text("${currency}")`,
  priceInput: 'input#price',
  descriptionTextarea: 'textarea#description',
  imageUploadInput: 'input[type="file"]',
  submitProductButton: 'button[type="submit"]',
  
  // Success notification
  successNotification: '.ant-notification-notice-success',
  successNotificationDescription: '.ant-notification-notice-description',
};