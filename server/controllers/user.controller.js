const db = require("../models");

// TODO 9/23 CLB - there is a lot of repitition in these API calls.
// ... They should probably be moved to models, and then I can make helper functions to call.

// Returns the user's income items, formatted for the Budget component to work with.
exports.userIncome = async (req, res) => {
  
  // TODO - significant repitition from userExpense.  Should refactor.
  // Find all income items associated with user, along with associated type and category information.
  try {

    let items = await db.Income_Item.findAll({
      where: {
        user_id: req.userId
      },
      include: [
        {
          model: db.Income_Type,
          include: [
              db.Income_Category
          ]
        }
      ]
    })

    // I don't think this has ever been called.  Leaving just in case.
    if (!items) return res.status(404).send({ message: "User's income information not found." });

    let itemsArr = [];
    items.forEach(Income_Item => {

      // Object desctructruing for clarity
      const {Income_Type} = Income_Item
      const {Income_Category} = Income_Item.Income_Type;

      // First, pulls the relevant item and type information into an object.
      let itemObj = 
        {
          title: Income_Type.name,
          description: Income_Type.description,
          value: Income_Item.value,
          id: Income_Item.id,
          typeKey: Income_Type.typeKey
        }

      // Next, find which Category the Type belongs to, so we can group them by Category.

      // 1) This approach is more modular, but less efficient.  Keeping for reference.
      // const categoryIndex = arr.findIndex(x => x.categoryId === Income_Category.id);
      
      // 2) This approach simply takes the id from sql id's (1,2,3) and subtracts 1 (0,1,2) for their equivalent index in array.
      // This could cause problems depending on how users are allowed to add types in the future, but currently works.
      const arrayCategoryIdx = Income_Category.id - 1;

      // If there is no Category object at that index yet, create it
      if (!itemsArr[arrayCategoryIdx]) {
        itemsArr.push(
          {
            title: Income_Category.name,
            categoryId: Income_Category.id,
            categoryKey: Income_Category.categoryKey,
            types: [],
          }
        );
      }
      
      // Push itemObj into arr within the types of the correct Category object
      itemsArr[arrayCategoryIdx].types.push(itemObj);
      
    });

    let categoryObj = {categories: itemsArr}

    // Find each Category's subtotal by adding all Type's Item's values
    categoryObj.categories.forEach(category => {
      let subtotal = 0;
      category.types.forEach(type => subtotal += parseFloat(type.value));
      category["subtotal"] = subtotal.toFixed(2);
    });

    // Find the overall total of Income by adding all subtotals
    let total = 0;
    categoryObj.categories.forEach(category => {
      total += parseFloat(category.subtotal);
    });
    total = total.toFixed(2);

    res.status(200).send({
      jsonStringResponse: JSON.stringify(categoryObj),
      total: total
    });

  } catch(error) {
    res.status(500).send({ message: error.message });
  }
}


exports.userExpense = async (req, res) => {
  
  // TODO - significant repitition from userIncome.  Should refactor.
  // Find all income items associated with user, along with associated type and category information.
  try {

    let items = await db.Expense_Item.findAll({
      where: {
        user_id: req.userId
      },
      include: [
        {
          model: db.Expense_Type,
          include: [
              db.Expense_Category
          ]
        }
      ]
    })

    // I don't think this has ever been called.  Leaving just in case.
    if (!items) return res.status(404).send({ message: "User's income information not found." });

    let itemsArr = [];
    items.forEach(Expense_Item => {

      // Object desctructruing for clarity
      const {Expense_Type} = Expense_Item
      const {Expense_Category} = Expense_Item.Expense_Type;

      // First, pulls the relevant item and type information into an object.
      let itemObj = 
        {
          title: Expense_Type.name,
          description: Expense_Type.description,
          value: Expense_Item.value,
          id: Expense_Item.id,
          typeKey: Expense_Type.typeKey
        }

      // Next, find which Category the Type belongs to, so we can group them by Category.

      // 1) This approach is more modular, but less efficient.  Keeping for reference.
      // const categoryIndex = arr.findIndex(x => x.categoryId === Expense_Category.id);
      
      // 2) This approach simply takes the id from sql id's (1,2,3) and subtracts 1 (0,1,2) for their equivalent index in array.
      // This could cause problems depending on how users are allowed to add types in the future, but currently works.
      const arrayCategoryIdx = Expense_Category.id - 1;

      // If there is no Category object at that index yet, create it
      if (!itemsArr[arrayCategoryIdx]) {
        itemsArr.push(
          {
            title: Expense_Category.name,
            categoryId: Expense_Category.id,
            categoryKey: Expense_Category.categoryKey,
            types: [],
          }
        );
      }
      
      // Push itemObj into arr within the types of the correct Category object
      itemsArr[arrayCategoryIdx].types.push(itemObj);
      
    });

    let categoryObj = {categories: itemsArr}

    // Find each Category's subtotal by adding all Type's Item's values
    categoryObj.categories.forEach(category => {
      let subtotal = 0;
      category.types.forEach(type => subtotal += parseFloat(type.value));
      category["subtotal"] = subtotal.toFixed(2);
    });

    // Find the overall total of Income by adding all subtotals
    let total = 0;
    categoryObj.categories.forEach(category => {
      total += parseFloat(category.subtotal);
    });
    total = total.toFixed(2);

    res.status(200).send({
      jsonStringResponse: JSON.stringify(categoryObj),
      total: total
    });
    
  } catch(error) {
    res.status(500).send({ message: error.message });
  };
}

// Used for the first time a user saves their income
exports.saveIncomeNew = async (req, res) => {

  // First, turns all Item info into an array of objects, and adds user_id into each object
  let dataArray = [];
  for (let i = 0; i < req.body.income.categories.length; i++) {
    for (let j = 0; j < req.body.income.categories[i].types.length; j++) {
      
      let obj = {...req.body.income.categories[i].types[j], user_id: req.userId}
      dataArray.push(obj)

    }
  }

  // Then, use the now formatted info to create the Items in the DB
  try {
    let result = await db.Income_Item.bulkCreate(dataArray, {
      fields: ["id", "value", "user_id", "income_type_id"]
    });
    res.status(201).send({
      result // TODO: send location in header as well
    });
  } catch(error) {
    res.status(500).send({ message: error.message });
  }

}

exports.saveExpenseNew = async (req, res) => {

  // First, turns all Item info into an array of objects, and adds user_id into each object
  let dataArray = [];
  for (let i = 0; i < req.body.expense.categories.length; i++) {
    for (let j = 0; j < req.body.expense.categories[i].types.length; j++) {

      let obj = {...req.body.expense.categories[i].types[j], user_id: req.userId}
      dataArray.push(obj);

    }
  }

  // Then, use the now formatted info to create the Items in the DB
  try {
    let result = await db.Expense_Item.bulkCreate(dataArray, {
      fields: ["id", "value", "user_id", "expense_type_id"]
    });
    res.status(201).send({
      result // TODO: send location in header as well
    });
  } catch(error) {
    res.status(500).send({ message: error.message });
  }

}

// Saves existing Users' budgets by updating their Items' values
exports.saveIncome = async (req, res) => {

  // Formats Item information before making call to db
  const {categories} = req.body.income;
  let dataArray = [];
  for (let i = 0; i < categories.length; i++) {
    for (let j = 0; j < categories[i].types.length; j++) {
      dataArray.push(categories[i].types[j]);
    }
  }

  // Uses bulkCreate, set up to update existing values
  try {
    await db.Income_Item.bulkCreate(dataArray, {
      fields: ["id", "value", "user_id", "income_type_id"],
      updateOnDuplicate: ["value"]
    });
    res.status(204).send({
      // Based on research, it appears that successful PUT requests should return no content and a 204 status
    });
  } catch(error) {
    res.status(500).send({ message: error.message });
  }

}

// Saves existing Users' budgets by updating their Items' values
exports.saveExpense = async (req, res) => {

  // Formats Item information before making call to db
  const {categories} = req.body.expense;
  let dataArray = [];
  for (let i = 0; i < categories.length; i++) {
    for (let j = 0; j < categories[i].types.length; j++) {
      dataArray.push(categories[i].types[j]);
    }
  }

  // Uses bulkCreate, set up to update existing values
  try {
    await db.Expense_Item.bulkCreate(dataArray, {
      fields: ["id", "value", "user_id", "expense_type_id"],
      updateOnDuplicate: ["value"]
    })
    res.status(204).send({
      // Based on research, it appears that successful PUT requests should return no content and a 204 status
    });
  } catch(error) {
    res.status(500).send({ message: error.message });
  }

}
