// RETURN TO THIS


module.exports = function(sequelize, DataTypes) {
  var IncomeItems = sequelize.define("IncomeItems", {
    // ID for other tables to reference
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    income_type: DataTypes.INTEGER, // integer referencing 
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    timestamps: false
  });


  return IncomeItems;
};
