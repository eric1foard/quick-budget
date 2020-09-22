const db = require("../models");
const config = require("../config/auth.config");
const User = db.User;
const Income = db.Income

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.userBudget = (req, res) => {
  console.log("=======================");
  console.log("=======================");
  console.log("req: ", req.userId);
  console.log("=======================");
  console.log("=======================");
  
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
      console.log(cat);

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

      res.status(200).send({
        category: JSON.stringify(arr, null, 1)
        // category: cat
        // category: arr
      });

    })
    .catch(err => {

      res.status(500).send({ message: err.message });
    });


  // SAVING FOR REFERENCE
  // Income.findOne({
  //   where: {
  //     user_id: req.userId
  //   }
  // })
  //   .then(income => {
  //     if (!income) {
  //       return res.status(404).send({ message: "User's Income not found. Or is user not logged in?" });
  //     }

  //     res.status(200).send({
  //       userIncomeRes: income
  //     });

  //   })
  //   .catch(err => {

  //     res.status(500).send({ message: err.message });
  //   });

};