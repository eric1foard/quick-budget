module.exports = function(sequelize, DataTypes) {
  var expense_item = sequelize.define("expense_item", {
    
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

  expense_item.associate = function(models) {
    expense_item.belongsTo(models.expense_type, { foreignKey: 'expense_type_id' } );
    expense_item.belongsTo(models.user, { foreignKey: 'user_id' } );
  }


  return expense_item;
};
