module.exports = function(sequelize, DataTypes) {
  var Expense_Type = sequelize.define("Expense_Type", {
    // ID for other tables to reference
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },

    typeKey: DataTypes.UUID,

    // The name of the Expense item - displayed next to the numerical amount
    name: DataTypes.STRING, 

    // Appears as the description under the item, giving user more info about it
    description: DataTypes.STRING,

    // Foreign Key - relates to the user's id in the user table
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'users',
    //     key: 'id'
    //   }
    // },

    // Foreign Key - relates to the Expense_categories table's id
    // category_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'expense_categories',
    //     key: 'id'
    //   }
    // },


    

  }, {
    timestamps: false,
    // Adds an index to user_id for quicker lookups (TODO: does this work?)
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ['user_id']
    //   }
    // ]
    
  });

  Expense_Type.associate = function(models) {
    // Expense_Type.belongsToMany(models.User, { through: 'User_Budget', foreignKey: 'Expense_type_id' } );
    Expense_Type.belongsTo(models.Expense_Category, { foreignKey: 'expense_category_id' } ); // updated
    Expense_Type.hasMany(models.Expense_Item, { foreignKey: 'expense_type_id' } ); // updated
  }


  return Expense_Type;
};