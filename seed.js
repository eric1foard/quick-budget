// Fairly certain this is OK... Might have to change file structure to match
const db = require('./server/models/index');

// Not sure I'm requiring from the right file...
const Users = require('./server/models/index').user;
const Income_Items = require('./server/models/index').income_item;
const Income_Types = require('./server/models/index').income_type;
const Income_Categories = require('./server/models/index').income_category;
const Expense_Items = require('./server/models/index').expense_item;
const Expense_Types = require('./server/models/index').expense_type;
const Expense_Categories = require('./server/models/index').expense_category;

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


// Items
const incomeItemSeeds = [
  {value: 100, user_id: 1, income_type_id: 1}, // income_type_id may be an issue
  {value: 200, user_id: 1, income_type_id: 2}, // income_type_id may be an issue
  {value: 300, user_id: 1, income_type_id: 3}, // income_type_id may be an issue
];

const incomeTypeSeeds = [
  {name: 'Your Net Monthly Pay', description: 'Here is a description!', income_item_id: 1, income_category_id: 1}, // income_item_id may be an issue
  {name: 'Spouse Net Monthly Pay', description: 'Here is a second description!', income_item_id: 2, income_category_id: 1}, // income_item_id may be an issue
  {name: 'Misc Pay', description: 'Here is a third description!', income_item_id: 3, income_category_id: 2}, // income_item_id may be an issue
];

const expenseItemSeeds = [
  {value: 111, user_id: 1, expense_type_id: 1}, // expense_type_id may be an issue
  {value: 222, user_id: 1, expense_type_id: 2}, // expense_type_id may be an issue
  {value:333, user_id: 1, expense_type_id: 3}, // expense_type_id may be an issue

];

const expenseTypeSeeds = [
  {name: 'Rent or Mortgage', description: 'Monthly amount due. Add in Home or Renters Insurance if not already included', expense_item_id: 1, expense_category_id: 1}, // expense_item_id may be an issue
  {name: 'Property Tax', description: 'If not already included in mortgage payment', expense_item_id: 2, expense_category_id: 1}, // expense_item_id may be an issue
  {name: 'Car Payment', description: 'Include any additional car payments, if you have more than one', expense_item_id: 3, expense_category_id: 2}, // expense_item_id may be an issu
];

const seed = () => {
  return Users.bulkCreate(userSeeds)
    .then(() => Income_Categories.bulkCreate(incomeCategorySeeds))
      .then(() => Expense_Categories.bulkCreate(expenseCategorySeeds))
        .then(() => Income_Items.bulkCreate(incomeItemSeeds))
          .then(() => Income_Types.bulkCreate(incomeTypeSeeds))
            .then(() => Expense_Items.bulkCreate(expenseItemSeeds))
              .then(() => Expense_Types.bulkCreate(expenseTypeSeeds))
}

seed()
  .then(() => {
    process.exit();
  });


// ## Items and Types
// ### Income
// INSERT INTO income_items (value, user_id, income_type_id) VALUES (100, 1, null);
// INSERT INTO income_types (name, description, income_item_id, income_category_id) VALUES ('Your Net Monthly Pay', 'Here is a description!', 1, 1);
// UPDATE `budget_app`.`income_items` SET `income_type_id` = '1' WHERE (`id` = '1');

// INSERT INTO income_items (value, user_id, income_type_id) VALUES (200, 1, null);
// INSERT INTO income_types (name, description, income_item_id, income_category_id) VALUES ('Spouse Net Monthly Pay', 'Here is a second description!', 2, 1);
// UPDATE `budget_app`.`income_items` SET `income_type_id` = '2' WHERE (`id` = '2');

// INSERT INTO income_items (value, user_id, income_type_id) VALUES (300, 1, null);
// INSERT INTO income_types (name, description, income_item_id, income_category_id) VALUES ('Misc Pay', 'Here is a third description!', 3, 2);
// UPDATE `budget_app`.`income_items` SET `income_type_id` = '3' WHERE (`id` = '3');

// ### Expenses
// INSERT INTO expense_items (value, user_id, expense_type_id) VALUES (100, 1, null);
// INSERT INTO expense_types (name, description, expense_item_id, expense_category_id) VALUES ('Rent or Mortgage', 'Monthly amount due. Add in Home or Renters Insurance if not already included', 1, 1);
// UPDATE `budget_app`.`expense_items` SET `expense_type_id` = '1' WHERE (`id` = '1');

// INSERT INTO expense_items (value, user_id, expense_type_id) VALUES (200, 1, null);
// INSERT INTO expense_types (name, description, expense_item_id, expense_category_id) VALUES ('Property Tax', 'If not already included in mortgage payment', 2, 1);
// UPDATE `budget_app`.`expense_items` SET `expense_type_id` = '2' WHERE (`id` = '2');

// INSERT INTO expense_items (value, user_id, expense_type_id) VALUES (300, 1, null);
// INSERT INTO expense_types (name, description, expense_item_id, expense_category_id) VALUES ('Car Payment', 'Include any additional car payments, if you have more than one',3, 2);
// UPDATE `budget_app`.`expense_items` SET `expense_type_id` = '3' WHERE (`id` = '3');

// INSERT INTO expense_items (value, user_id, expense_type_id) VALUES (400, 1, null);
// INSERT INTO expense_types (name, description, expense_item_id, expense_category_id) VALUES ('Car Insurance', 'Check your billing, and be sure to divide this into a monthly amount', 4, 2);
// UPDATE `budget_app`.`expense_items` SET `expense_type_id` = '4' WHERE (`id` = '4');
