module.exports = function(sequelize, DataTypes) {
  var Expense_Type = sequelize.define("Expense_Type", {
    
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

  Expense_Type.associate = function(models) {
    Expense_Type.belongsTo(models.Expense_Category, { foreignKey: 'expense_category_id' } );
    Expense_Type.hasMany(models.Expense_Item, { foreignKey: 'expense_type_id' } );
  }


  return Expense_Type;

};
