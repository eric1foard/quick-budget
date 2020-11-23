module.exports = function(sequelize, DataTypes) {
  var expense_type = sequelize.define("expense_type", {
    
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },

    // Unique identifier, used by React as key
    typeKey: DataTypes.UUID,

    // The name of the item - displayed next to the numerical amount
    name: DataTypes.STRING, 

    // Appears as the description under the item, giving user more info about it
    description: DataTypes.STRING,

  }, {
    timestamps: false,
  });

  expense_type.associate = function(models) {
    expense_type.belongsTo(models.expense_category, { foreignKey: 'expense_category_id' } );
    expense_type.hasMany(models.expense_item, { foreignKey: 'expense_type_id' } );
  }


  return expense_type;

};
