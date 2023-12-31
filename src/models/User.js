const { createSchemaAndSyncModel } = require("../utils/schemaTableCreateFunction");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
      user_name: {
          type: DataTypes.STRING,
          allowNull: false,
      }, 
      password: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    }, 
    {
        schema: 'user_schema',
        tableName:"users"
    } 
  );

  // This is for my db, insert them into thunder cloud to find the users 
  // {"username": "Hashed", "pwd":"!d4aLongString"}
  // {"username": "Jason", "pwd":"OneString!sTo7manY"}

  // ### Create Schema and table, true or false for creating schema
  // createSchemaAndSyncModel(sequelize, false, 'user_schema', true, User);
 
  return User;
};
