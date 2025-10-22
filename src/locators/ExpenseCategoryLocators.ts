export const ExpenseCategoryLocators = {
  addExpenseCategoryButton: 'Add New Expense Category',
  addExpenseCategoryForm: `(//div[@class='ant-drawer-content-wrapper'])[1]`,
  nameInput: `#name`,
  descriptionInput: '#description', 
  colorInput: '#color',
  enabledButton: '#enabled',
  submitButton: `//button[@type='submit']`,
  categoryCreatedData: `(//div[@class='ant-row css-1lk2pln'])[2]`,
  nameCategoryData: `/html[1]/body[1]/div[2]/div[1]/div[3]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[3]/p[1]`,
  descriptionCategoryData: `/html[1]/body[1]/div[2]/div[1]/div[3]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[2]/div[3]/p[1]`,
  colorCategoryData: `(//p[normalize-space()='blue'])[1]`,
};
