module.exports = function(sequelize, DataTypes) {
  var income_type = sequelize.define("income_type", {

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

  income_type.associate = function(models) {
    income_type.belongsTo(models.income_category, { foreignKey: 'income_category_id' } );
    income_type.hasMany(models.income_item, { foreignKey: 'income_type_id' } );
  }


  return income_type;

};
