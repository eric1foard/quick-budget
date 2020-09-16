module.exports = function(sequelize, DataTypes) {
  var IncomeItem = sequelize.define("IncomeItem", {
    // ID for other tables to reference
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },

    // *** Stores the value of the item, the dollar amount the user enters ***
    value: DataTypes.INTEGER,

    // Foreign Key - relates to the id of income_types table.
    // ...This allows us to access the name and description of the item, and its respective category.
    income_type: {
      type: DataTypes.INTEGER,
      references: {
        model: 'income_types',
        key: 'id'
      }
    },
    
    // Foreign Key - relates to the user's id in the user table
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },

    // Adds an index to user_id for quicker lookups (TODO: does this work?)
    indexes: [
      {
        unique: true,
        fields: ['user_id']
      }
    ]

  }, {
    timestamps: false
  });


  return IncomeItem;
};
