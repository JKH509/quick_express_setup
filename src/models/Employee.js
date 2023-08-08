// const { createSchemaAndSyncModel } = require("../utils/schemaTableCreateFunction");

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("Employee", {
    firstname: {
          type: DataTypes.STRING,
          allowNull: false,
      }, 
      lastname: {
          type: DataTypes.STRING,
          allowNull: false,
      },
    }, 
    {
        schema: 'employee_schema',
        tableName:"employees"
    } 
  );

  // This is for my db, insert them into thunder cloud to find the users 
  // {"username": "Hashed", "pwd":"!d4aLongString"}
  // {"username": "Jason", "pwd":"OneString!sTo7manY"}

  // ### Create Schema and table, true or false for creating schema
  // createSchemaAndSyncModel(sequelize, true, 'employee_schema', false, Employee);
 
  return Employee;
};
