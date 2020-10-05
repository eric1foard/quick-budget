// *************************************************************************************************************
// newUserSeed.js - Budget component uses this as default values for new/unregistered users' budgets.  
// *************************************************************************************************************

const { v4: uuidv4 } = require('uuid');


// TODO: It would be nice to have this info feed from seed.js, so there's only one place to update when needed (CB 9/28)
export const incomeData = {
  categories: [
    {
      categoryId: 1,
      subtotal: 0,
      title: 'Net Monthly Pay',
      categoryKey: uuidv4(),
      types: [
        {title: 'Your Net Monthly Pay', description: 'Also known as "take-home pay," this is the final amount on your paycheck - your wages, minus federal taxes, state taxes, Social Security, health insurance, etc.', value: 0.00, income_type_id: 1, typeKey: uuidv4()},
        {title: 'Spouse\'s Net Monthly Pay', description: 'Same as above, but for your partner (if applicable)', value: 0.00, income_type_id: 2, typeKey: uuidv4()}
      ]
    },
    {
      categoryId: 2,
      subtotal: 0,
      title: 'Other Monthly Income',
      categoryKey: uuidv4(),
      types: [
        {title: 'Other Monthly Income', description: 'Enter additional sources of income here, such as Social Security, child support, alimony, investments, pensions, etc.', value: 0.00, income_type_id: 3, typeKey: uuidv4()}, 
      ]
    },
  ]
};

// TODO: It would be nice to have this info feed from seed.js, so there's only one place to update when needed (CB 9/28)
export const expenseData = {
  categories: [
    {
      categoryId: 1,
      subtotal: 0,      
      title: 'Housing and Utilities',
      categoryKey: uuidv4(),
      types: [
        {title: 'Rent or Mortgage', description: 'Monthly amount due.  Add in Home or Renters Insurance if not already included', value: 0.00, expense_type_id: 1, typeKey: uuidv4()}, 
        {title: 'Property Tax', description: 'If not already included in mortgage payment', value: 0.00, expense_type_id: 2, typeKey: uuidv4()},
        {title: 'Homeowner Association (HOA) Fees', description: 'Only enter if applicable', value: 0.00, expense_type_id: 3, typeKey: uuidv4()},
        {title: 'Home Repair and Maintenance', description: 'Even if it\'s not a monthly expense, add what you estimate this costs per month', value: 0.00, expense_type_id: 4, typeKey: uuidv4()},
        {title: 'Utilities', description: 'Include electricity, gas, water, sewer, trash, etc.', value: 0.00, expense_type_id: 5, typeKey: uuidv4()},
        {title: 'Electronics', description: 'Include cable, internet, cell phone, etc.', value: 0.00, expense_type_id: 6, typeKey: uuidv4()},
      ]
    },
    {
      categoryId: 2,
      subtotal: 0,
      title: 'Transportation',
      categoryKey: uuidv4(),
      types: [
        {title: 'Car Payment', description: 'Include any additional car payments, if you have more than one', value: 0.00, expense_type_id: 7, typeKey: uuidv4()}, 
        {title: 'Car Insurance', description: 'Check your billing, and be sure to divide this into a monthly amount', value: 0.00, expense_type_id: 8, typeKey: uuidv4()},
        {title: 'Gas', description: 'Average monthly cost of gas', value: 0.00, expense_type_id: 9, typeKey: uuidv4()},
        {title: 'Car Maintenance', description: 'Average monthly cost of car repairs - you can assume oil changes, with a little extra just in case of additional repairs', value: 0.00, expense_type_id: 10, typeKey: uuidv4()},
        {title: 'Parking and Tolls', description: 'If applicable', value: 0.00, expense_type_id: 11, typeKey: uuidv4()},
      ]
    },
    {
      categoryId: 3,
      subtotal: 0,
      title: 'Grocieries and Food',
      categoryKey: uuidv4(),
      types: [
        {title: 'Groceries', description: 'Average the monthly cost of your groceries.  It may be helpful to tally up a few months\' worth to get a better average', value: 0.00, expense_type_id: 12, typeKey: uuidv4()},
        {title: 'Meals at Restaurants', description: 'Again, it may be helpful to take the average of a few months', value: 0.00, expense_type_id: 13, typeKey: uuidv4()},
      ]
    },
    {
      categoryId: 4,
      subtotal: 0,
      title: 'Health and Beauty',
      categoryKey: uuidv4(),
      types: [
        {title: 'Insurance', description: 'Include your monthly prescription costs and any regular co-pays for doctor visits', value: 0.00, expense_type_id: 14, typeKey: uuidv4()},
        {title: 'Prescriptions and Doctor Visits', description: 'Include your monthly prescription costs and any regular co-pays for doctor visits', value: 0.00, expense_type_id: 15, typeKey: uuidv4()},
        {title: 'Gym Membership', description: 'Include monthly dues, if applicable', value: 0.00, expense_type_id: 16, typeKey: uuidv4()},
        {title: 'Clothes', description: 'Average monthly amount.  Also include dry cleaning and laundry, if applicable', value: 0.00, expense_type_id: 17, typeKey: uuidv4()},
        {title: 'General Beauty Haircut and Color', description: 'Include, haircut, color, and beauty supplies', value: 0.00, expense_type_id: 18, typeKey: uuidv4()},
      ]
    },
    {
      categoryId: 5,
      subtotal: 0,
      title: 'Children',
      categoryKey: uuidv4(),
      types: [
        {title: 'Child Care', description: 'If not already deducted from your paycheck', value: 0.00, expense_type_id: 19, typeKey: uuidv4()},
        {title: 'Child Support', description: 'Include monthly child support amounts, if applicable', value: 0.00, expense_type_id: 20, typeKey: uuidv4()},
        {title: 'Tuition and Supplies', description: 'Include any additional tuition or other school suppies', value: 0.00, expense_type_id: 21, typeKey: uuidv4()},
      ]
    },
    {
      categoryId: 6,
      subtotal: 0,
      title: 'Debts and Loans',
      categoryKey: uuidv4(),
      types: [
        {title: 'Credit Cards', description: 'Total minimum monthly payment due or if you are paying extra, enter the amount you pay monthly', value: 0.00, expense_type_id: 22, typeKey: uuidv4()},
        {title: 'Student Loans', description: 'Total minimum monthly payment due or if you are paying extra, enter the amount you pay monthly', value: 0.00, expense_type_id: 23, typeKey: uuidv4()},
        {title: 'Medical Debt', description: 'Total minimum monthly payment due or if you are paying extra, enter the amount you pay monthly', value: 0.00, expense_type_id: 24, typeKey: uuidv4()},
      ]
    },
    {
      categoryId: 7,
      subtotal: 0,
      title: 'Miscellaneous',
      categoryKey: uuidv4(),
      types: [
        {title: 'Hobbies', description: 'Include the average amount you spend on your hobbies - sporting equipment, music lessons, gardening supplies, etc.', value: 0.00, expense_type_id: 25, typeKey: uuidv4()},
        {title: 'Tobacco & Alcohol', description: 'Average monthly amounts', value: 0.00, expense_type_id: 26, typeKey: uuidv4()},
        {title: 'Media Subscriptions', description: 'Include newspapers, magazines, and any other media subscriptions (Netflix, etc.)', value: 0.00, expense_type_id: 27, typeKey: uuidv4()},
        {title: 'Travel and Vacation', description: 'Average amount you save toward vacations each month', value: 0.00, expense_type_id: 28, typeKey: uuidv4()},
        {title: 'Donations', description: 'Add your regular donations, if applicable', value: 0.00, expense_type_id: 29, typeKey: uuidv4()},
        {title: 'Pet Care', description: 'If you have pets, average your pet food, insurance, toys, etc.', value: 0.00, expense_type_id: 30, typeKey: uuidv4()},
      ]
    },
  ]
}
