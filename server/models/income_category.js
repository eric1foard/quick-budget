module.exports = function(sequelize, DataTypes) {
  var Income_Category = sequelize.define("Income_Category", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },

    categoryKey: DataTypes.UUID,

    name: DataTypes.STRING,

  }, {
    timestamps: false
  });

  Income_Category.associate = function(models) {
    Income_Category.hasMany(models.Income_Type, { foreignKey: 'income_category_id' } );
  }

  return Income_Category;
};
