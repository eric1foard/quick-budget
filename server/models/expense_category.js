module.exports = function(sequelize, DataTypes) {
  var Expense_Category = sequelize.define("Expense_Category", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },

    categoryKey: DataTypes.UUID,
    
    name: DataTypes.STRING,

  }, {
    timestamps: false
  });

  Expense_Category.associate = function(models) {
    Expense_Category.hasMany(models.Expense_Type, { foreignKey: 'expense_category_id' } );
  }

  return Expense_Category;
};
