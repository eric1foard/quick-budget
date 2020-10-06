const db = require('./server/models/index');
const { v4: uuidv4 } = require('uuid');

const Users = db.User;
const Income_Items = db.Income_Item;
const Income_Types = db.Income_Type;
const Income_Categories = db.Income_Category;
const Expense_Items = db.Expense_Item;
const Expense_Types = db.Expense_Type;
const Expense_Categories = db.Expense_Category;

var bcrypt = require("bcryptjs");

// Users
// TODO - is having the pre-hash password here a security risk? It's useful for testing, but not necessary... (CB 9/28)
const userSeeds = [
  {
    username: 'test',
    email: 'test@test.com',
    password: bcrypt.hashSync('test', 8),
  }, {
    username: 'LouieTheCat',
    email: 'louie@gmail.com',
    password: bcrypt.hashSync('salmon feast', 8),
  }
];


// Categories
const incomeCategorySeeds = [
  {name: 'Net Monthly Pay', categoryKey: uuidv4()},
  {name: 'Other Monthly Income', categoryKey: uuidv4()},
];

const expenseCategorySeeds = [
  {name: 'Housing and Utilities', categoryKey: uuidv4()},
  {name: 'Transportation', categoryKey: uuidv4()},
  {name: 'Grocieries and Food', categoryKey: uuidv4()},
  {name: 'Health and Beauty', categoryKey: uuidv4()},
  {name: 'Children', categoryKey: uuidv4()},
  {name: 'Debts and Loans', categoryKey: uuidv4()},
  {name: 'Miscellaneous', categoryKey: uuidv4()},
];


// Types
const incomeTypeSeeds = [
  {
    name: 'Your Net Monthly Pay', 
    description: 'Also known as "take-home pay," this is the final amount on your paycheck - your wages, minus federal taxes, state taxes, Social Security, health insurance, etc.', 
    income_category_id: 1,
    typeKey: uuidv4()
  },
  {
    name: 'Spouse\'s Net Monthly Pay', 
    description: 'Same as above, but for your partner (if applicable)', 
    income_category_id: 1,
    typeKey: uuidv4()
  },
  {
    name: 'Other Monthly Income', 
    description: 'Enter additional sources of income here, such as Social Security, child support, alimony, investments, pensions, etc.', 
    income_category_id: 2,
    typeKey: uuidv4()
  },
];

const expenseTypeSeeds = [
  {
    name: 'Rent or Mortgage', 
    description: 'Monthly amount due. Add in Home or Renters Insurance if not already included', 
    expense_category_id: 1,
    typeKey: uuidv4()
  },
  {
    name: 'Property Tax', 
    description: 'If not already included in mortgage payment', 
    expense_category_id: 1,
    typeKey: uuidv4()
  },
  {
    name: 'Homeowner Association (HOA) Fees', 
    description: 'Only enter if applicable', 
    expense_category_id: 1,
    typeKey: uuidv4()
  },
  {
    name: 'Home Repair and Maintenance', 
    description: 'Even if it\'s not a monthly expense, add what you estimate this costs per month', 
    expense_category_id: 1,
    typeKey: uuidv4()
  },
  {
    name: 'Utilities', 
    description: 'Include electricity, gas, water, sewer, trash, etc.', 
    expense_category_id: 1,
    typeKey: uuidv4()
  }, 
  {
    name: 'Electronics', 
    description: 'Include cable, internet, cell phone, etc.', 
    expense_category_id: 1,
    typeKey: uuidv4()
  },

  {
    name: 'Car Payment', 
    description: 'Include any additional car payments, if you have more than one', 
    expense_category_id: 2,
    typeKey: uuidv4()
  },
  {
    name: 'Car Insurance', 
    description: 'Check your billing, and be sure to divide this into a monthly amount', 
    expense_category_id: 2,
    typeKey: uuidv4()
  },
  {
    name: 'Gas', 
    description: 'Average monthly cost of gas', 
    expense_category_id: 2,
    typeKey: uuidv4()
  },
  {
    name: 'Car Maintenance', 
    description: 'Average monthly cost of car repairs - you can assume oil changes, with a little extra just in case of additional repairs', 
    expense_category_id: 2,
    typeKey: uuidv4()
  },
  {
    name: 'Parking and Tolls', 
    description: 'If applicable', 
    expense_category_id: 2,
    typeKey: uuidv4()
  },

  {
    name: 'Groceries', 
    description: 'Average the monthly cost of your groceries.  It may be helpful to tally up a few months\' worth to get a better average', 
    expense_category_id: 3,
    typeKey: uuidv4()
  }, 
  {
    name: 'Meals at Restaurants', 
    description: 'Again, it may be helpful to take the average of a few months', 
    expense_category_id: 3,
    typeKey: uuidv4()
  },

  {
    name: 'Insurance', 
    description: 'If not already deducted from your paycheck, include your Health Insurance and Life Insurance', 
    expense_category_id: 4,
    typeKey: uuidv4()
  }, 
  {
    name: 'Prescriptions and Doctor Visits', 
    description: 'Include your monthly prescription costs and any regular co-pays for doctor visits', 
    expense_category_id: 4,
    typeKey: uuidv4()
  }, 
  {
    name: 'Gym Membership', 
    description: 'Include monthly dues, if applicable', 
    expense_category_id: 4,
    typeKey: uuidv4()
  }, 
  {
    name: 'Clothes', 
    description: 'Average monthly amount.  Also include dry cleaning and laundry, if applicable', 
    expense_category_id: 4,
    typeKey: uuidv4()
  }, 
  {
    name: 'General Beauty Haircut and Color', 
    description: 'Include, haircut, color, and beauty supplies', 
    expense_category_id: 4,
    typeKey: uuidv4()
  }, 

  {
    name: 'Child Care', 
    description: 'If not already deducted from your paycheck', 
    expense_category_id: 5,
    typeKey: uuidv4()
  }, 
  {
    name: 'Child Support', 
    description: 'Include monthly child support amounts, if applicable', 
    expense_category_id: 5,
    typeKey: uuidv4()
  }, 
  {
    name: 'Tuition and Supplies', 
    description: 'Include any additional tuition or other school suppies', 
    expense_category_id: 5,
    typeKey: uuidv4()
  }, 

  {
    name: 'Credit Cards', 
    description: 'Total minimum monthly payment due or if you are paying extra, enter the amount you pay monthly', 
    expense_category_id: 6,
    typeKey: uuidv4()
  }, 
  {
    name: 'Student Loans', 
    description: 'Total minimum monthly payment due or if you are paying extra, enter the amount you pay monthly', 
    expense_category_id: 6,
    typeKey: uuidv4()
  }, 
  {
    name: 'Medical Debt', 
    description: 'Total minimum monthly payment due or if you are paying extra, enter the amount you pay monthly', 
    expense_category_id: 6,
    typeKey: uuidv4()
  }, 

  {
    name: 'Hobbies', 
    description: 'Include the average amount you spend on your hobbies - sporting equipment, music lessons, gardening supplies, etc.', 
    expense_category_id: 7,
    typeKey: uuidv4()
  }, 
  {
    name: 'Tobacco & Alcohol', 
    description: 'Average monthly amounts', 
    expense_category_id: 7,
    typeKey: uuidv4()
  }, 
  {
    name: 'Media Subscriptions', 
    description: 'Include newspapers, magazines, and any other media subscriptions (Netflix, etc.)', 
    expense_category_id: 7,
    typeKey: uuidv4()
  }, 
  {
    name: 'Travel and Vacation', 
    description: 'Average amount you save toward vacations each month', 
    expense_category_id: 7,
    typeKey: uuidv4()
  }, 
  {
    name: 'Donations', 
    description: 'Add your regular donations, if applicable', 
    expense_category_id: 7,
    typeKey: uuidv4()
  }, 
  {
    name: 'Pet Care', 
    description: 'If you have pets, average your pet food, insurance, toys, etc.', 
    expense_category_id: 7,
    typeKey: uuidv4()
  }, 
];


// Items
const incomeItemSeeds = [
  {value: 1000, user_id: 1, income_type_id: 1},
  {value: 2000, user_id: 1, income_type_id: 2},
  {value: 3000, user_id: 1, income_type_id: 3},

  {value: 1, user_id: 2, income_type_id: 1},
  {value: 2, user_id: 2, income_type_id: 2},
  {value: 3, user_id: 2, income_type_id: 3},
];

const expenseItemSeeds = [
  {value: 111, user_id: 1, expense_type_id: 1},
  {value: 222, user_id: 1, expense_type_id: 2},
  {value: 333, user_id: 1, expense_type_id: 3},
  {value: 111, user_id: 1, expense_type_id: 4},
  {value: 222, user_id: 1, expense_type_id: 5},
  {value: 333, user_id: 1, expense_type_id: 6},
  {value: 111, user_id: 1, expense_type_id: 7},
  {value: 222, user_id: 1, expense_type_id: 8},
  {value: 333, user_id: 1, expense_type_id: 9},
  {value: 111, user_id: 1, expense_type_id: 10},
  {value: 222, user_id: 1, expense_type_id: 11},
  {value: 333, user_id: 1, expense_type_id: 12},
  {value: 111, user_id: 1, expense_type_id: 13},
  {value: 222, user_id: 1, expense_type_id: 14},
  {value: 333, user_id: 1, expense_type_id: 15},
  {value: 111, user_id: 1, expense_type_id: 16},
  {value: 222, user_id: 1, expense_type_id: 17},
  {value: 333, user_id: 1, expense_type_id: 18},
  {value: 111, user_id: 1, expense_type_id: 19},
  {value: 222, user_id: 1, expense_type_id: 20},
  {value: 333, user_id: 1, expense_type_id: 21},
  {value: 111, user_id: 1, expense_type_id: 22},
  {value: 222, user_id: 1, expense_type_id: 23},
  {value: 333, user_id: 1, expense_type_id: 24},
  {value: 111, user_id: 1, expense_type_id: 25},
  {value: 222, user_id: 1, expense_type_id: 26},
  {value: 333, user_id: 1, expense_type_id: 27},
  {value: 111, user_id: 1, expense_type_id: 28},
  {value: 222, user_id: 1, expense_type_id: 29},
  {value: 333, user_id: 1, expense_type_id: 30},

  {value: 10, user_id: 2, expense_type_id: 1},
  {value: 20, user_id: 2, expense_type_id: 2},
  {value: 30, user_id: 2, expense_type_id: 3},
  {value: 10, user_id: 2, expense_type_id: 4},
  {value: 20, user_id: 2, expense_type_id: 5},
  {value: 30, user_id: 2, expense_type_id: 6},
  {value: 10, user_id: 2, expense_type_id: 7},
  {value: 20, user_id: 2, expense_type_id: 8},
  {value: 30, user_id: 2, expense_type_id: 9},
  {value: 10, user_id: 2, expense_type_id: 10},
  {value: 20, user_id: 2, expense_type_id: 11},
  {value: 30, user_id: 2, expense_type_id: 12},
  {value: 10, user_id: 2, expense_type_id: 13},
  {value: 20, user_id: 2, expense_type_id: 14},
  {value: 30, user_id: 2, expense_type_id: 15},
  {value: 10, user_id: 2, expense_type_id: 16},
  {value: 20, user_id: 2, expense_type_id: 17},
  {value: 30, user_id: 2, expense_type_id: 18},
  {value: 10, user_id: 2, expense_type_id: 19},
  {value: 20, user_id: 2, expense_type_id: 20},
  {value: 30, user_id: 2, expense_type_id: 21},
  {value: 10, user_id: 2, expense_type_id: 22},
  {value: 20, user_id: 2, expense_type_id: 23},
  {value: 30, user_id: 2, expense_type_id: 24},
  {value: 10, user_id: 2, expense_type_id: 25},
  {value: 20, user_id: 2, expense_type_id: 26},
  {value: 30, user_id: 2, expense_type_id: 27},
  {value: 10, user_id: 2, expense_type_id: 28},
  {value: 20, user_id: 2, expense_type_id: 29},
  {value: 30, user_id: 2, expense_type_id: 30},
];


const seed = async () => {
  await Users.bulkCreate(userSeeds);
  await Income_Categories.bulkCreate(incomeCategorySeeds);
  await Expense_Categories.bulkCreate(expenseCategorySeeds);
  await Income_Types.bulkCreate(incomeTypeSeeds);
  await Income_Items.bulkCreate(incomeItemSeeds);
  await Expense_Types.bulkCreate(expenseTypeSeeds);
  await Expense_Items.bulkCreate(expenseItemSeeds);
  process.exit();
}

// Run `npm run seed` to use this script from cli
seed();
