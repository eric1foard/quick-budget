const db = require('./server/models/index');

const Users = db.User;
const Income_Items = db.Income_Item;
const Income_Types = db.Income_Type;
const Income_Categories = db.Income_Category;
const Expense_Items = db.Expense_Item;
const Expense_Types = db.Expense_Type;
const Expense_Categories = db.Expense_Category;

// Users
const userSeeds = [
  {
    username: 'codyishere',
    email: 'codyishere@gmail.com',
    password: 'blah'
  }, {
    username: 'beancat',
    email: 'beancat@gmail.com',
    password: 'bean'
  }
];


// Categories
const incomeCategorySeeds = [
  {name: 'Net Monthly Pay'},
  {name: 'Other Monthly Income'},
  {name: 'Miscellaneous'},
];

const expenseCategorySeeds = [
  {name: 'Housing and Utilities'},
  {name: 'Transportation'},
  {name: 'Grocieries and Food'},
  {name: 'Health and Beauty'},
  {name: 'Children'},
  {name: 'Debts and Loans'},
  {name: 'Miscellaneous'},
];


// Types
const incomeTypeSeeds = [
  {name: 'Your Net Monthly Pay', description: 'Here is a description!', income_category_id: 1}, // income_item_id may be an issue
  {name: 'Spouse Net Monthly Pay', description: 'Here is a second description!', income_category_id: 1}, // income_item_id may be an issue
  {name: 'Misc Pay', description: 'Here is a third description!', income_category_id: 2}, // income_item_id may be an issue
];

const expenseTypeSeeds = [
  {name: 'Rent or Mortgage', description: 'Monthly amount due. Add in Home or Renters Insurance if not already included', expense_category_id: 1}, // expense_item_id may be an issue
  {name: 'Property Tax', description: 'If not already included in mortgage payment', expense_category_id: 1}, // expense_item_id may be an issue
  {name: 'Car Payment', description: 'Include any additional car payments, if you have more than one', expense_category_id: 2}, // expense_item_id may be an issu
];


// Items
const incomeItemSeeds = [
  {value: 100, user_id: 1, income_type_id: 1}, // income_type_id may be an issue
  {value: 200, user_id: 1, income_type_id: 2}, // income_type_id may be an issue
  {value: 300, user_id: 1, income_type_id: 3}, // income_type_id may be an issue
];

const expenseItemSeeds = [
  {value: 111, user_id: 1, expense_type_id: 1}, // expense_type_id may be an issue
  {value: 222, user_id: 1, expense_type_id: 2}, // expense_type_id may be an issue
  {value:333, user_id: 1, expense_type_id: 3}, // expense_type_id may be an issue
];


// 1) Turn seed function into async
// 2) Have the password get hashed in the seed file, so it can be accessed later.

const seed = () => {
  return Users.bulkCreate(userSeeds)
    .then(() => Income_Categories.bulkCreate(incomeCategorySeeds))
      .then(() => Expense_Categories.bulkCreate(expenseCategorySeeds))
        .then(() => Income_Types.bulkCreate(incomeTypeSeeds))
          .then(() => Income_Items.bulkCreate(incomeItemSeeds))
            .then(() => Expense_Types.bulkCreate(expenseTypeSeeds))
              .then(() => Expense_Items.bulkCreate(expenseItemSeeds))
}

seed()
  .then(() => {
    process.exit();
  }
);
