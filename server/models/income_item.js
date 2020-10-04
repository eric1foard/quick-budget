module.exports = function(sequelize, DataTypes) {
  var Income_Item = sequelize.define("Income_Item", {
    
    // id is used as foreign key for other tables to reference
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },

    // Stores the value of the item, the dollar amount the user enters
    value: DataTypes.DECIMAL(10,2),

  }, 
  {
    timestamps: false,
  });

  Income_Item.associate = function(models) {
    Income_Item.belongsTo(models.Income_Type, { foreignKey: 'income_type_id' } );
    Income_Item.belongsTo(models.User, { foreignKey: 'user_id' } );
  }

  return Income_Item;
};
