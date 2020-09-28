export const incomeData = {
  categories: [
    {
      categoryId: 1,
      subtotal: 0,
      title: 'Net Monthly Pay',
      fields: [
        {title: 'Your Net Monthly Pay', description: 'Also known as "take-home pay," this is the final amount on your paycheck - your wages, minus federal taxes, state taxes, Social Security, health insurance, etc.', value: 0, id: 1},
        {title: 'Spouse\'s Net Monthly Pay', description: 'Same as above, but for your partner (if applicable)', value: 0, id: 2}
      ]
    },
    {
      categoryId: 2,
      subtotal: 0,
      title: 'Other Monthly Income',
      fields: [
        {title: 'Other Monthly Income', description: 'Enter additional sources of income here, such as Social Security, child support, alimony, investments, pensions, etc.', value: 0, id: 3}, 
      ]
    },
  ]
};


export const expenseData = {
  categories: [
    {
      categoryId: 1,
      subtotal: 0,      
      title: 'housing and utilities',
      fields: [
        {title: 'Rent or Mortgage', description: 'Monthly amount due.  Add in Home or Renters Insurance if not already included', value: 0, id: 1}, 
        {title: 'Property Tax', description: 'If not already included in mortgage payment', value: 0, id: 2},
        {title: 'Homeowner Association (HOA) Fees', description: 'Only enter if applicable', value: 0, id: 3},
        {title: 'Home Repair and Maintenance', description: 'Even if it\'s not a monthly expense, add what you estimate this costs per month', value: 0, id: 4},
        {title: 'Utilities', description: 'Include electricity, gas, water, sewer, trash, etc.', value: 0, id: 5},
        {title: 'Electronics', description: 'Include cable, internet, cell phone, etc.', value: 0, id: 6},
      ]
    },
    {
      categoryId: 2,
      subtotal: 0,
      title: 'transportation',
      fields: [
        {title: 'Car Payment', description: 'Include any additional car payments, if you have more than one', value: 0, id: 7}, 
        {title: 'Car Insurance', description: 'Check your billing, and be sure to divide this into a monthly amount', value: 0, id: 8},
        {title: 'Gas', description: 'Average monthly cost of gas', value: 0, id: 9},
        {title: 'Car Maintenance', description: 'Average monthly cost of car repairs - you can assume oil changes, with a little extra just in case of additional repairs', value: 0, id: 10},
        {title: 'Parking and Tolls', description: 'If applicable', value: 0, id: 11},

      ]
    }
  ]
}