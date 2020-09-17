const db = require("../models");
const Income_Type = db.Income_Type;

module.exports = function(sequelize, DataTypes) {
  var Income_Category = sequelize.define("Income_Category", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    // Here, we only store the names of the categories of expenses
    name: DataTypes.STRING,

    //* Most likely can delete the below - saving for reference CB 9/16/20 */
    // user_id is the foreign key relating to Users table
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'users',
    //     key: 'id'
    //   }
    // }
  }, {
    timestamps: false
  });

  //* Most likely can delete the below - saving for reference CB 9/16/20 */
  // Income.associate = function(models) {
  //   // We're saying that an Income should belong to a User
  //   // An Income can't be created without a User due to the foreign key constraint
  //   Income.belongsTo(models.User, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  Income_Category.belongsTo(Income_Type)

  return Income_Category;
};
