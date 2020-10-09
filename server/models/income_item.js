module.exports = function(sequelize, DataTypes) {
  var income_item = sequelize.define("income_item", {
    
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

  income_item.associate = function(models) {
    income_item.belongsTo(models.income_type, { foreignKey: 'income_type_id' } );
    income_item.belongsTo(models.user, { foreignKey: 'user_id' } );
  }

  return income_item;
};
