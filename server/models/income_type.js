// const db = require("../models");
// const User = db.User;
// const Income_Category = db.Income_Category;
// const Income_Item = db.Income_Item;

module.exports = function(sequelize, DataTypes) {
  var Income_Type = sequelize.define("Income_Type", {
    // ID for other tables to reference
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    // The name of the income item - displayed next to the numerical amount
    name: DataTypes.STRING, 

    // Appears as the description under the item, giving user more info about it
    description: DataTypes.STRING,

    // Foreign Key - relates to the user's id in the user table
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },

    // Foreign Key - relates to the income_categories table's id
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'income_categories',
        key: 'id'
      }
    },


  }, 
  {
    // classMethods:{
    //   associate:function(models){
    //     Income_Type.hasMany(models.User, { foreignKey: 'user_id' } );
    //     Income_Type.hasMany(models.Income_Category, { foreignKey: 'category_id' } );
    //     Income_Type.belongsToMany(models.Income_Item, { foreignKey: 'income_type' } );
    //   }
    // },
    timestamps: false,
    
    // Adds an index to user_id for quicker lookups (TODO: does this work?)
    indexes: [
      {
        unique: true,
        fields: ['user_id']
      }
    ]

  });


  // Income_Type.hasMany(User);
  // Income_Type.hasMany(Income_Category);
  // Income_Type.belongsTo(Income_Item);


  return Income_Type;
};