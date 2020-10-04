module.exports = function(sequelize, DataTypes) {
  var Income_Type = sequelize.define("Income_Type", {

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

  Income_Type.associate = function(models) {
    Income_Type.belongsTo(models.Income_Category, { foreignKey: 'income_category_id' } ); // updated
    Income_Type.hasMany(models.Income_Item, { foreignKey: 'income_type_id' } ); // updated
    // Income_Type.belongsToMany(models.User, { through: 'User_Budget', foreignKey: 'income_type_id' } );  - this may later be useful
  }


  return Income_Type;

};
