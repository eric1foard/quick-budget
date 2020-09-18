// const db = require("../models");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    // Giving the User model a name of type STRING
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    // classMethods:{
    //   associate:function(models){
    //     User.belongsToMany(models.Income_Type, { through: 'UserBudget', foreignKey: 'user_id' } );
    //     User.belongsToMany(models.Income_Item, { through: 'UserBudget', foreignKey:  'user_id'}  );
    //   }
    // },
    timestamps: false
  });

  // User.associate = function(models) {
  //   // Associating Author with Posts
  //   // When an Author is deleted, also delete any associated Posts
  //   User.hasMany(models.Post, {
  //     onDelete: "cascade"
  //   });
  // };

  User.associate = function(models) {
    User.belongsToMany(models.Income_Type, { through: 'User_Budget', foreignKey: 'asdfType' } );
    User.belongsToMany(models.Income_Item, { through: 'User_Budget', foreignKey:  'asdfITEMBEFORE'}  );  
  }



  return User;
};
