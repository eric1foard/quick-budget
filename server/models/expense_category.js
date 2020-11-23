module.exports = function(sequelize, DataTypes) {
  var expense_category = sequelize.define("expense_category", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },

    categoryKey: DataTypes.UUID,
    
    name: DataTypes.STRING,

  }, {
    timestamps: false
  });

  expense_category.associate = function(models) {
    expense_category.hasMany(models.expense_type, { foreignKey: 'expense_category_id' } );
  }

  return expense_category;
};
