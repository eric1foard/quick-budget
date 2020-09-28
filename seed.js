const db = require('./server/models/index');

const Users = db.User;
const Income_Items = db.Income_Item;
const Income_Types = db.Income_Type;
const Income_Categories = db.Income_Category;
const Expense_Items = db.Expense_Item;
const Expense_Types = db.Expense_Type;
const Expense_Categories = db.Expense_Category;

// Users
// const userSeeds = [
//   {
//     username: 'codyishere',
//     email: 'codyishere@gmail.com',
//     password: 'blah'
//   }, {
//     username: 'beancat',
//     email: 'beancat@gmail.com',
//     password: 'bean'
//   }
// ];


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
  {
    name: 'Your Net Monthly Pay', 
    description: 'Also known as "take-home pay," this is the final amount on your paycheck - your wages, minus federal taxes, state taxes, Social Security, health insurance, etc.', 
    income_category_id: 1
  },
  {
    name: 'Spouse\'s Net Monthly Pay', 
    description: 'Same as above, but for your partner (if applicable)', 
    income_category_id: 1
  },
  {
    name: 'Other Monthly Income', 
    description: 'Enter additional sources of income here, such as Social Security, child support, alimony, investments, pensions, etc.', 
    income_category_id: 2
  },
];

const expenseTypeSeeds = [
  {
    name: 'Rent or Mortgage', 
    description: 'Monthly amount due. Add in Home or Renters Insurance if not already included', 
    expense_category_id: 1
  },
  {
    name: 'Property Tax', 
    description: 'If not already included in mortgage payment', 
    expense_category_id: 1
  },
  {
    name: 'Homeowner Association (HOA) Fees', 
    description: 'Only enter if applicable', 
    expense_category_id: 1
  },
  {
    name: 'Home Repair and Maintenance', 
    description: 'Even if it\'s not a monthly expense, add what you estimate this costs per month', 
    expense_category_id: 1
  },
  {
    name: 'Utilities', 
    description: 'Include electricity, gas, water, sewer, trash, etc.', 
    expense_category_id: 1
  }, 
  {
    name: 'Electronics', 
    description: 'Include cable, internet, cell phone, etc.', 
    expense_category_id: 1
  },

  {
    name: 'Car Payment', 
    description: 'Include any additional car payments, if you have more than one', 
    expense_category_id: 2
  },
  {
    name: 'Car Insurance', 
    description: 'Check your billing, and be sure to divide this into a monthly amount', 
    expense_category_id: 2
  },
  {
    name: 'Gas', 
    description: 'Average monthly cost of gas', 
    expense_category_id: 2
  },
  {
    name: 'Car Maintenance', 
    description: 'Average monthly cost of car repairs - you can assume oil changes, with a little extra just in case of additional repairs', 
    expense_category_id: 2
  },
  {
    name: 'Parking and Tolls', 
    description: 'If applicable', 
    expense_category_id: 2
  },

  {
    name: 'Groceries', 
    description: 'Average the monthly cost of your groceries.  It may be helpful to tally up a few months\' worth to get a better average', 
    expense_category_id: 3
  }, 
  {
    name: 'Meals at Restaurants', 
    description: 'Again, it may be helpful to take the average of a few months', 
    expense_category_id: 3
  },

  {
    name: 'Insurance', 
    description: 'If not already deducted from your paycheck, include your Health Insurance and Life Insurance', 
    expense_category_id: 4
  }, 
  {
    name: 'Prescriptions and Doctor Visits', 
    description: 'Include your monthly prescription costs and any regular co-pays for doctor visits', 
    expense_category_id: 4
  }, 
  {
    name: 'Gym Membership', 
    description: 'Include monthly dues, if applicable', 
    expense_category_id: 4
  }, 
  {
    name: 'Clothes', 
    description: 'Average monthly amount.  Also include dry cleaning and laundry, if applicable', 
    expense_category_id: 4
  }, 
  {
    name: 'General Beauty Haircut and Color', 
    description: 'Include, haircut, color, and beauty supplies', 
    expense_category_id: 4
  }, 

  {
    name: 'Child Care', 
    description: 'If not already deducted from your paycheck', 
    expense_category_id: 5
  }, 
  {
    name: 'Child Support', 
    description: 'Include monthly child support amounts, if applicable', 
    expense_category_id: 5
  }, 
  {
    name: 'Tuition and Supplies', 
    description: 'Include any additional tuition or other school suppies', 
    expense_category_id: 5
  }, 

  {
    name: 'Credit Cards', 
    description: 'Total minimum monthly payment due or if you are paying extra, enter the amount you pay monthly', 
    expense_category_id: 6
  }, 
  {
    name: 'Student Loans', 
    description: 'Total minimum monthly payment due or if you are paying extra, enter the amount you pay monthly', 
    expense_category_id: 6
  }, 
  {
    name: 'Medical Debt', 
    description: 'Total minimum monthly payment due or if you are paying extra, enter the amount you pay monthly', 
    expense_category_id: 6
  }, 

  {
    name: 'Hobbies', 
    description: 'Include the average amount you spend on your hobbies - sporting equipment, music lessons, gardening supplies, etc.', 
    expense_category_id: 7
  }, 
  {
    name: 'Tobacco & Alcohol', 
    description: 'Average monthly amounts', 
    expense_category_id: 7
  }, 
  {
    name: 'Media Subscriptions', 
    description: 'Include newspapers, magazines, and any other media subscriptions (Netflix, etc.)', 
    expense_category_id: 7
  }, 
  {
    name: 'Travel and Vacation', 
    description: 'Average amount you save toward vacations each month', 
    expense_category_id: 7
  }, 
  {
    name: 'Donations', 
    description: 'Add your regular donations, if applicable', 
    expense_category_id: 7
  }, 
  {
    name: 'Pet Care', 
    description: 'If you have pets, average your pet food, insurance, toys, etc.', 
    expense_category_id: 7
  }, 
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
  {value: 333, user_id: 1, expense_type_id: 3}, // expense_type_id may be an issue
];


// 2) Have the password get hashed in the seed file, so it can be accessed later.

// TODO - it would be nice to turn this into async/await if possible.
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
