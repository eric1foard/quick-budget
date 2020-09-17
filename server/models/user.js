// const db = require("../models");
// const Income_Item = db.Income_Item;
// const Income_Type = db.Income_Type;
// const Income_Category = db.Income_Category;

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
    //     User.belongsToMany(models.Income_Type, { foreignKey: 'user_id' } );
    //     User.belongsToMany(models.Income_Item, { foreignKey:  'user_id'}  );
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

  // User.belongsTo(Income_Item);
  // User.belongsTo(Income_Type);

  return User;
};
