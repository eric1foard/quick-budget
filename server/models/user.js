module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    
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

  user.associate = function(models) {
    user.hasMany(models.income_item, { foreignKey:  'user_id' }  );
    user.hasMany(models.expense_item, { foreignKey:  'user_id' }  );
  }


  return user;

};
