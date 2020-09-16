module.exports = function(sequelize, DataTypes) {
  var Expense_Category = sequelize.define("Expense_Category", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    
    // Here, we only store the names of the categories of expenses
    name: DataTypes.STRING,

  }, {
    timestamps: false
  });

  return Expense_Category;
};
