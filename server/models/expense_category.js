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

  Expense_Category.associate = function(models) {
    Expense_Category.hasMany(models.Expense_Type, { foreignKey: 'expense_category_id' } ); // updated
    Expense_Category.belongsToMany(models.User, { through: 'user_categories' } ); // updated?
  }

  return Expense_Category;
};
