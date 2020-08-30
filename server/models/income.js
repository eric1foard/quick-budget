module.exports = function(sequelize, DataTypes) {
  var Income = sequelize.define("Income", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    // These are the fields where the user's amounts are stored
    monthly_pay: DataTypes.INTEGER,
    spouse_monthly_pay: DataTypes.INTEGER,
    other_monthly: DataTypes.INTEGER,
    // user_id is the foreign key relating to Users table
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    timestamps: false
  });

  // Income.associate = function(models) {
  //   // We're saying that an Income should belong to a User
  //   // An Income can't be created without a User due to the foreign key constraint
  //   Income.belongsTo(models.User, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return Income;
};
