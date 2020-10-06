module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },

    username: DataTypes.STRING,

    email: DataTypes.STRING,

    password: DataTypes.STRING,
    
  }, {
    timestamps: false
  });

  User.associate = function(models) {
    User.hasMany(models.Income_Item, { foreignKey:  'user_id' }  );
    User.hasMany(models.Expense_Item, { foreignKey:  'user_id' }  );
  }


  return User;

};
