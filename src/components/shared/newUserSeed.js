// incomeData and expenseData are used in the event of a new user
// ... these default values are imported into the Budget component,
// ... instead of making an API call like we do for an existing user.

// TODO: It would be nice to have this info feed from seed.js, so there's only one place to update when needed (CB 9/28)
export const incomeData = {
  categories: [
    {
      categoryId: 1,
      subtotal: 0,
      title: 'Net Monthly Pay',
      fields: [
        {title: 'Your Net Monthly Pay', description: 'Also known as "take-home pay," this is the final amount on your paycheck - your wages, minus federal taxes, state taxes, Social Security, health insurance, etc.', value: 0, income_type_id: 1},
        {title: 'Spouse\'s Net Monthly Pay', description: 'Same as above, but for your partner (if applicable)', value: 0, income_type_id: 2}
      ]
    },
    {
      categoryId: 2,
      subtotal: 0,
      title: 'Other Monthly Income',
      fields: [
        {title: 'Other Monthly Income', description: 'Enter additional sources of income here, such as Social Security, child support, alimony, investments, pensions, etc.', value: 0, income_type_id: 3}, 
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
      fields: [
        {title: 'Rent or Mortgage', description: 'Monthly amount due.  Add in Home or Renters Insurance if not already included', value: 0, expense_type_id: 1}, 
        {title: 'Property Tax', description: 'If not already included in mortgage payment', value: 0, expense_type_id: 2},
        {title: 'Homeowner Association (HOA) Fees', description: 'Only enter if applicable', value: 0, expense_type_id: 3},
        {title: 'Home Repair and Maintenance', description: 'Even if it\'s not a monthly expense, add what you estimate this costs per month', value: 0, expense_type_id: 4},
        {title: 'Utilities', description: 'Include electricity, gas, water, sewer, trash, etc.', value: 0, expense_type_id: 5},
        {title: 'Electronics', description: 'Include cable, internet, cell phone, etc.', value: 0, expense_type_id: 6},
      ]
    },
    {
      categoryId: 2,
      subtotal: 0,
      title: 'Transportation',
      fields: [
        {title: 'Car Payment', description: 'Include any additional car payments, if you have more than one', value: 0, expense_type_id: 7}, 
        {title: 'Car Insurance', description: 'Check your billing, and be sure to divide this into a monthly amount', value: 0, expense_type_id: 8},
        {title: 'Gas', description: 'Average monthly cost of gas', value: 0, expense_type_id: 9},
        {title: 'Car Maintenance', description: 'Average monthly cost of car repairs - you can assume oil changes, with a little extra just in case of additional repairs', value: 0, expense_type_id: 10},
        {title: 'Parking and Tolls', description: 'If applicable', value: 0, expense_type_id: 11},
      ]
    },
    {
      categoryId: 3,
      subtotal: 0,
      title: 'Grocieries and Food',
      fields: [
        {title: 'Groceries', description: 'Average the monthly cost of your groceries.  It may be helpful to tally up a few months\' worth to get a better average', value: 0, expense_type_id: 12},
        {title: 'Meals at Restaurants', description: 'Again, it may be helpful to take the average of a few months', value: 0, expense_type_id: 13},
      ]
    },
    {
      categoryId: 4,
      subtotal: 0,
      title: 'Health and Beauty',
      fields: [
        {title: 'Insurance', description: 'Include your monthly prescription costs and any regular co-pays for doctor visits', value: 0, expense_type_id: 14},
        {title: 'Prescriptions and Doctor Visits', description: 'Include your monthly prescription costs and any regular co-pays for doctor visits', value: 0, expense_type_id: 15},
        {title: 'Gym Membership', description: 'Include monthly dues, if applicable', value: 0, expense_type_id: 16},
        {title: 'Clothes', description: 'Average monthly amount.  Also include dry cleaning and laundry, if applicable', value: 0, expense_type_id: 17},
        {title: 'General Beauty Haircut and Color', description: 'Include, haircut, color, and beauty supplies', value: 0, expense_type_id: 18},
      ]
    },
    {
      categoryId: 5,
      subtotal: 0,
      title: 'Children',
      fields: [
        {title: 'Child Care', description: 'If not already deducted from your paycheck', value: 0, expense_type_id: 19},
        {title: 'Child Support', description: 'Include monthly child support amounts, if applicable', value: 0, expense_type_id: 20},
        {title: 'Tuition and Supplies', description: 'Include any additional tuition or other school suppies', value: 0, expense_type_id: 21},
      ]
    },
    {
      categoryId: 6,
      subtotal: 0,
      title: 'Debts and Loans',
      fields: [
        {title: 'Credit Cards', description: 'Total minimum monthly payment due or if you are paying extra, enter the amount you pay monthly', value: 0, expense_type_id: 22},
        {title: 'Student Loans', description: 'Total minimum monthly payment due or if you are paying extra, enter the amount you pay monthly', value: 0, expense_type_id: 23},
        {title: 'Medical Debt', description: 'Total minimum monthly payment due or if you are paying extra, enter the amount you pay monthly', value: 0, expense_type_id: 24},
      ]
    },
    {
      categoryId: 7,
      subtotal: 0,
      title: 'Miscellaneous',
      fields: [
        {title: 'Hobbies', description: 'Include the average amount you spend on your hobbies - sporting equipment, music lessons, gardening supplies, etc.', value: 0, expense_type_id: 25},
        {title: 'Tobacco & Alcohol', description: 'Average monthly amounts', value: 0, expense_type_id: 26},
        {title: 'Media Subscriptions', description: 'Include newspapers, magazines, and any other media subscriptions (Netflix, etc.)', value: 0, expense_type_id: 27},
        {title: 'Travel and Vacation', description: 'Average amount you save toward vacations each month', value: 0, expense_type_id: 28},
        {title: 'Donations', description: 'Add your regular donations, if applicable', value: 0, expense_type_id: 29},
        {title: 'Pet Care', description: 'If you have pets, average your pet food, insurance, toys, etc.', value: 0, expense_type_id: 30},
      ]
    },
  ]
}
