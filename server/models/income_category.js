module.exports = function(sequelize, DataTypes) {
  var income_category = sequelize.define("income_category", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },

    categoryKey: DataTypes.UUID,

    name: DataTypes.STRING,

  }, {
    timestamps: false
  });

  income_category.associate = function(models) {
    income_category.hasMany(models.income_type, { foreignKey: 'income_category_id' } );
  }

  return income_category;
};
