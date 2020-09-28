const db = require("../models");
const config = require("../config/auth.config");

// TODO 9/23 CLB - there is a lot of repitition in these API calls.
// ... They should probably be moved to models, and then I can make helper functions to call.
exports.createNewUserItems = (req, res) => {
  // console.log("=======================");
  // console.log("=======================");
  // console.log("req: ", req.userId);
  // console.log("=======================");
  // console.log("=======================");

  db.User.findOne({
    where: {
      id: req.userId
    }
  })
    .then(user => {
      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}


exports.userIncome = (req, res) => {
  // console.log("=======================");
  // console.log("=======================");
  // console.log("req: ", req.userId);
  // console.log("=======================");
  // console.log("=======================");
  
  db.Income_Item.findAll({
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
    .then(cat => {
      // console.log(cat);

      if (!cat) {
        return res.status(404).send({ message: "User's Income not found. Or is user not logged in?" });
      }

      let arr = [];
      cat.forEach(item => {

        let itemObj = 
        {
          title: item.Income_Type.name,
          description: item.Income_Type.description,
          value: item.value,
          id: item.id
        }

        let categoryIdentifier = item.Income_Type.Income_Category.id;
        let categoryName = item.Income_Type.Income_Category.name;
        let categoryIndex = false;

        for (let i = 0; i < arr.length; i++) {
          if (arr[i].categoryId === categoryIdentifier) {
            categoryIndex = i;
            break;
          }
        }

        // let catNameIdx = arr.find(x => (x.title === catName));
        if (categoryIndex === false) {
          let obj = 
          {
            title: categoryName,
            categoryId: item.Income_Type.Income_Category.id,
            fields: [itemObj],
          }
          arr.push(obj);
        } else {
          arr[categoryIndex].fields.push(itemObj);
        }
      });

      let categoryObj = {categories: arr}

      categoryObj.categories.forEach(catElem => {
        let sub = 0;
        catElem.fields.forEach(typeElem => {
          sub += typeElem.value;
        })
        catElem["subtotal"] = sub
      });

      let total = 0;
      categoryObj.categories.forEach(catElem => {
        total += catElem.subtotal;
      });

      res.status(200).send({
        jsonStringResponse: JSON.stringify(categoryObj),
        total: total
      });

    })
    .catch(err => {

      res.status(500).send({ message: err.message });
    });
}


exports.userExpense = (req, res) => {
  // console.log("=======================");
  // console.log("=======================");
  // console.log("req: ", req.userId);
  // console.log("=======================");
  // console.log("=======================");
  
  db.Expense_Item.findAll({
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
    .then(cat => {
      // console.log(cat);

      if (!cat) {
        return res.status(404).send({ message: "User's Expense not found. Or is user not logged in?" });
      }

      let arr = [];
      cat.forEach(item => {

        let itemObj = 
        {
          title: item.Expense_Type.name,
          description: item.Expense_Type.description,
          value: item.value,
          id: item.id
        }

        let categoryIdentifier = item.Expense_Type.Expense_Category.id;
        let categoryName = item.Expense_Type.Expense_Category.name;
        let categoryIndex = false;

        for (let i = 0; i < arr.length; i++) {
          if (arr[i].categoryId === categoryIdentifier) {
            categoryIndex = i;
            break;
          }
        }

        // let catNameIdx = arr.find(x => (x.title === catName));
        if (categoryIndex === false) {
          let obj = 
          {
            title: categoryName,
            categoryId: item.Expense_Type.Expense_Category.id,
            subtotal: 0.00,
            fields: [itemObj],
          }
          arr.push(obj);
        } else {
          arr[categoryIndex].fields.push(itemObj);
        }
      });

      let categoryObj = {categories: arr}

      categoryObj.categories.forEach(catElem => {
        let sub = 0;
        catElem.fields.forEach(typeElem => {
          sub += typeElem.value;
        })
        catElem["subtotal"] = sub
      })

      let total = 0;
      categoryObj.categories.forEach(catElem => {
        total += catElem.subtotal;
      })

      res.status(200).send({
        jsonStringResponse: JSON.stringify(categoryObj),
        total: total
      });

    })
    .catch(err => {

      res.status(500).send({ message: err.message });
    });
}

exports.saveIncome = (req, res) => {
  // console.log("=======================");
  // console.log("=======================");
  // console.log("req: ", req.body.income.categories);
  // console.log("=======================");
  // console.log("=======================");

  let dataArray = [];
  for (let i = 0; i < req.body.income.categories.length; i++) {
    console.log("LOOPING HERE: ", req.body.income.categories[i]);
    for (let j = 0; j < req.body.income.categories[i].fields.length; j++) {
      console.log("SUB LOOP: ", req.body.income.categories[i].fields[j]);
      dataArray.push(req.body.income.categories[i].fields[j]);
    }
  }

  // console.log("AFTER LOOP: ", dataArray);

  db.Income_Item.bulkCreate(dataArray, {
    fields: ["id", "value", "user_id", "income_type_id"],
    updateOnDuplicate: ["value"]
  })
    .then(response => {
      // console.log("response: ", response);
      res.status(204).send({
        // Based on research, it appears that successful PUT requests...
        // ...should return no content and a 204 status
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.saveExpense = (req, res) => {
  // console.log("=======================");
  // console.log("=======================");
  // console.log("req: ", req.body.expense.categories);
  // console.log("=======================");
  // console.log("=======================");

  let dataArray = [];
  for (let i = 0; i < req.body.expense.categories.length; i++) {
    console.log("LOOPING HERE: ", req.body.expense.categories[i]);
    for (let j = 0; j < req.body.expense.categories[i].fields.length; j++) {
      console.log("SUB LOOP: ", req.body.expense.categories[i].fields[j]);
      dataArray.push(req.body.expense.categories[i].fields[j]);
    }
  }

  // console.log("AFTER LOOP: ", dataArray);

  db.Expense_Item.bulkCreate(dataArray, {
    fields: ["id", "value", "user_id", "expense_type_id"],
    updateOnDuplicate: ["value"]
  })
    .then(response => {
      // console.log("response: ", response);
      res.status(204).send({
        // Based on research, it appears that successful PUT requests...
        // ...should return no content and a 204 status
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}
