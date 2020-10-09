/* 
  - This seed.sql file is to be run after the schema.sql file.
  - It will provide the default income/expense categories and income/expense types that are needed in order to get the app running.
 */


/* CATEGORIES */

-- Income Categories
INSERT INTO income_categories (name, categoryKey) VALUES ('Net Monthly Pay', '63b60f97-58ad-410a-8b51-641317f80582');
INSERT INTO income_categories (name, categoryKey) VALUES ('Other Monthly Income', 'e2c5b029-a5fb-4c1e-8012-afd6c820d613');

-- Expense Categories
INSERT INTO expense_categories (name, categoryKey) VALUES ('Housing and Utilities', '5da96204-dd41-4bd9-992d-1f82bb232e44');
INSERT INTO expense_categories (name, categoryKey) VALUES ('Transportation', 'f2fe0cc4-88a8-4825-a65b-4bbade0a3179');
INSERT INTO expense_categories (name, categoryKey) VALUES ('Grocieries and Food', '28b87eee-ad86-428e-8599-5b125ed57731');
INSERT INTO expense_categories (name, categoryKey) VALUES ('Health and Beauty', '4df644cf-b10c-4ed2-804a-c7421706bed8');
INSERT INTO expense_categories (name, categoryKey) VALUES ('Children', '3ebc9033-ca45-4a07-accd-7f601bab12a3');
INSERT INTO expense_categories (name, categoryKey) VALUES ('Debts and Loans', '21fd4fe1-1889-42d5-ac5e-df4fa8fa2ade');
INSERT INTO expense_categories (name, categoryKey) VALUES ('Miscellaneous', '3c22c6a3-30d7-49cb-8bab-5a9064a122bf');



/* TYPES */

-- Income Types (Income Category 1)
INSERT INTO income_types (name, description, income_category_id, typeKey) VALUES ('Your Net Monthly Pay', 'Also known as "take-home pay," this is the final amount on your paycheck - your wages, minus federal taxes, state taxes, Social Security, health insurance, etc.', 1, 'c3142873-5611-40b5-8466-93e9b9821d77');
INSERT INTO income_types (name, description, income_category_id, typeKey) VALUES ('Spouse''s Net Monthly Pay', 'Same as above, but for your partner (if applicable)', 1, 'df46539a-da53-41a7-9173-0c4de0cfa557');

-- Income Types (Income Category 2)
INSERT INTO income_types (name, description, income_category_id, typeKey) VALUES ('Other Monthly Income', 'Enter additional sources of income here, such as Social Security, child support, alimony, investments, pensions, etc.', 2, 'a550d43d-bf3f-43f5-9d3a-5e29b69fc70d');


-- Expense Types (Expense Category 1)
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Rent or Mortgage', 'Monthly amount due. Add in Home or Renters Insurance if not already included', 1, '35b3acb6-1532-4066-adbc-94368023e191');
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Property Tax', 'If not already included in mortgage payment', 1, '01a4b8ca-3fc7-4e82-bc96-94f41c700896');
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Homeowner Association (HOA) Fees', 'Only enter if applicable', 1, 'cc7f4796-3262-4c01-8abe-456c6eb9b57d');
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Home Repair and Maintenance', 'Even if it''s not a monthly expense, add what you estimate this costs per month', 1, 'fdfb8c6c-987a-4391-9b34-8cc45325bac8');
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Utilities', 'Include electricity, gas, water, sewer, trash, etc.', 1, 'fcada05f-6d18-4421-ad38-197cb4e54d88');
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Electronics', 'Include cable, internet, cell phone, etc.', 1, '4dcc72ac-9da6-48e9-9cf4-aa397a7820bb');

-- Expense Types (Expense Category 2)
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Car Payment', 'Include any additional car payments, if you have more than one', 2, '5c07c59e-c995-41bc-b826-c6c496da372b');
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Car Insurance', 'Check your billing, and be sure to divide this into a monthly amount', 2, '01754449-be71-46b2-bfaa-2627c0685571');
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Gas', 'Average monthly cost of gas', 2, '9e24884a-1a33-49d1-ae68-c594b8ddac78');
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Car Maintenance', 'Average monthly cost of car repairs - you can assume oil changes, with a little extra just in case of additional repairs', 2, '772c0d90-bbd6-48f6-ab61-b9af11da37d6');
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Parking and Tolls', 'If applicable', 2, 'a30c0fe3-8ae8-4126-964f-0d1417f15d29');

-- Expense Types (Expense Category 3)
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Groceries', 'Average the monthly cost of your groceries.  It may be helpful to tally up a few months'' worth to get a better average', 3, 'c5fc3482-9836-405f-b328-b7de56893911');
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Meals at Restaurants', 'Again, it may be helpful to take the average of a few months', 3, '09c6679c-227c-4e87-869f-1db21431aefa');

-- Expense Types (Expense Category 4)
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Insurance', 'If not already deducted from your paycheck, include your Health Insurance and Life Insurance', 4, '54df098d-54b6-4b6b-a75e-e7d0c3b71089');
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Prescriptions and Doctor Visits', 'Include your monthly prescription costs and any regular co-pays for doctor visits', 4, 'e8bc157b-b756-4c70-8730-3cc420aebac5');
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Gym Membership', 'Include monthly dues, if applicable', 4, 'b6b93f71-d6df-4ebb-b69a-a4a5eaa610cd');
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Clothes', 'Average monthly amount.  Also include dry cleaning and laundry, if applicable', 4, '194b5795-38c7-4d60-a79b-ef9fbe488f58');
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('General Beauty Haircut and Color', 'Include, haircut, color, and beauty supplies', 4, '9653b541-fa6b-4c54-abe1-b6212349fc34');

-- Expense Types (Expense Category 5)
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Child Care', 'If not already deducted from your paycheck', 5, '4a6bcf8f-9e12-4882-a2db-9763325266aa');
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Child Support', 'Include monthly child support amounts, if applicable', 5, 'd897f497-6bc2-449a-a824-219a76097305');
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Tuition and Supplies', 'Include any additional tuition or other school suppies', 5, '08b0dcdf-aa5e-44b4-8e8f-89d7f85bd78d');

-- Expense Types (Expense Category 6)
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Credit Cards', 'Total minimum monthly payment due or if you are paying extra, enter the amount you pay monthly', 6, '678e0712-ca1d-450e-8c62-710dcde2fbb2');
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Student Loans', 'Total minimum monthly payment due or if you are paying extra, enter the amount you pay monthly', 6, 'e4618dcb-1fe0-4da6-b5f6-ad40f2f49eae');
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Medical Debt', 'Total minimum monthly payment due or if you are paying extra, enter the amount you pay monthly', 6, '1eaa1fa4-b1de-46ed-8162-5db1b7cf6d7f');

-- Expense Types (Expense Category 7)
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Hobbies', 'Include the average amount you spend on your hobbies - sporting equipment, music lessons, gardening supplies, etc.', 7, '3121a29f-70ad-4e90-b523-9585a44d0d29');
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Tobacco & Alcohol', 'Average monthly amounts', 7, 'da85608e-8e8a-4ee0-bcf1-fe338d843203');
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Media Subscriptions', 'Include newspapers, magazines, and any other media subscriptions (Netflix, etc.)', 7, 'e72e381d-efa4-428a-85e2-3566116c71f1');
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Travel and Vacation', 'Average amount you save toward vacations each month', 7, '63e0c951-8b72-4b4d-8e85-faefcb8e41f8');
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Donations', 'Add your regular donations, if applicable', 7, 'db2388c2-b5db-4541-95b5-be752427ca17');
INSERT INTO expense_types (name, description, expense_category_id, typeKey) VALUES ('Pet Care', 'If you have pets, average your pet food, insurance, toys, etc.', 7, '7070b5d9-5d4f-4e1d-82e3-eae406d32f08');
