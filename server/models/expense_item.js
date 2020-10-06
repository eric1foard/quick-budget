module.exports = function(sequelize, DataTypes) {
  var Expense_Item = sequelize.define("Expense_Item", {
    
    // id is used as foreign key for other tables to reference
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },

    // Stores the value of the item, the dollar amount the user enters
    value: DataTypes.DECIMAL(10,2),

  }, {
    timestamps: false,
  });

  Expense_Item.associate = function(models) {
    Expense_Item.belongsTo(models.Expense_Type, { foreignKey: 'expense_type_id' } );
    Expense_Item.belongsTo(models.User, { foreignKey: 'user_id' } );
  }


  return Expense_Item;
};
