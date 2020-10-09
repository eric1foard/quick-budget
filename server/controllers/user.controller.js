const db = require("../models");

// TODO 9/23 CLB - there is a lot of repitition in these API calls.
// ... They should probably be moved to models, and then I can make helper functions to call.

// Returns the user's income items, formatted for the Budget component to work with.
exports.userIncome = async (req, res) => {
  
  // TODO - significant repitition from userExpense.  Should refactor.
  // Find all income items associated with user, along with associated type and category information.
  try {

    let items = await db.income_item.findAll({
      where: {
        user_id: req.userId
      },
      include: [
        {
          model: db.income_type,
          include: [
              db.income_category
          ]
        }
      ]
    })

    // I don't think this has ever been called.  Leaving just in case.
    if (!items) return res.status(404).send({ message: "User's income information not found." });

    let itemsArr = [];
    items.forEach(income_item => {

      // Object desctructruing for clarity
      const {income_type} = income_item
      const {income_category} = income_item.income_type;

      // First, pulls the relevant item and type information into an object.
      let itemObj = 
        {
          title: income_type.name,
          description: income_type.description,
          value: income_item.value,
          id: income_item.id,
          typeKey: income_type.typeKey
        }

      // Next, find which Category the Type belongs to, so we can group them by Category.

      // 1) This approach is more modular, but less efficient.  Keeping for reference.
      // const categoryIndex = arr.findIndex(x => x.categoryId === income_category.id);
      
      // 2) This approach simply takes the id from sql id's (1,2,3) and subtracts 1 (0,1,2) for their equivalent index in array.
      // This could cause problems depending on how users are allowed to add types in the future, but currently works.
      const arrayCategoryIdx = income_category.id - 1;

      // If there is no Category object at that index yet, create it
      if (!itemsArr[arrayCategoryIdx]) {
        itemsArr.push(
          {
            title: income_category.name,
            categoryId: income_category.id,
            categoryKey: income_category.categoryKey,
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

    let items = await db.expense_item.findAll({
      where: {
        user_id: req.userId
      },
      include: [
        {
          model: db.expense_type,
          include: [
              db.expense_category
          ]
        }
      ]
    })

    // I don't think this has ever been called.  Leaving just in case.
    if (!items) return res.status(404).send({ message: "User's income information not found." });

    let itemsArr = [];
    items.forEach(expense_item => {

      // Object desctructruing for clarity
      const {expense_type} = expense_item
      const {expense_category} = expense_item.expense_type;

      // First, pulls the relevant item and type information into an object.
      let itemObj = 
        {
          title: expense_type.name,
          description: expense_type.description,
          value: expense_item.value,
          id: expense_item.id,
          typeKey: expense_type.typeKey
        }

      // Next, find which Category the Type belongs to, so we can group them by Category.

      // 1) This approach is more modular, but less efficient.  Keeping for reference.
      // const categoryIndex = arr.findIndex(x => x.categoryId === expense_category.id);
      
      // 2) This approach simply takes the id from sql id's (1,2,3) and subtracts 1 (0,1,2) for their equivalent index in array.
      // This could cause problems depending on how users are allowed to add types in the future, but currently works.
      const arrayCategoryIdx = expense_category.id - 1;

      // If there is no Category object at that index yet, create it
      if (!itemsArr[arrayCategoryIdx]) {
        itemsArr.push(
          {
            title: expense_category.name,
            categoryId: expense_category.id,
            categoryKey: expense_category.categoryKey,
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
    let result = await db.income_item.bulkCreate(dataArray, {
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
    let result = await db.expense_item.bulkCreate(dataArray, {
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
    await db.income_item.bulkCreate(dataArray, {
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
    await db.expense_item.bulkCreate(dataArray, {
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
