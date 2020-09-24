// const db = require("../models");

module.exports = function(sequelize, DataTypes) {
  var Income_Item = sequelize.define("Income_Item", {
    // ID for other tables to reference
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },

    // *** Stores the value of the item, the dollar amount the user enters ***
    value: DataTypes.INTEGER,

    // // Foreign Key - relates to the id of income_types table.
    // // ...This allows us to access the name and description of the item, and its respective category.
    // income_type: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'income_types',
    //     key: 'id'
    //   }
    // },
    
    // // Foreign Key - relates to the user's id in the user table
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'users',
    //     key: 'id'
    //   }
    // },


  }, 
  {
    // classMethods:{
    //   associate:function(models){
    //     Income_Item.hasMany(models.Income_Type, { foreignKey: 'income_type' } );
    //     Income_Item.hasMany(models.User, { foreignKey: 'user_id' } );
    //   }
    // },
    timestamps: false,

    // // Adds an index to user_id for quicker lookups (TODO: does this work?)
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ['user_id']
    //   }
    // ]
    
  });

  Income_Item.associate = function(models) {
    Income_Item.belongsTo(models.Income_Type, { foreignKey: 'income_type_id' } ); // updated
    Income_Item.belongsTo(models.User, { foreignKey: 'user_id' } ); // updated
  }

  return Income_Item;
};
