module.exports = function(sequelize, DataTypes) {
  var ExpenseCategories = sequelize.define("ExpenseCategories", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    // Here, we only store the names of the categories of expenses
    name: DataTypes.STRING,

  }, {
    timestamps: false
  });

  return ExpenseCategories;
};
