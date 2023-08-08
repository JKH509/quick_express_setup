const createSchemaAndSyncModel = async (sequelize, schemaCreate, schemaName, alter, model) => {
  try {
    // Create the schema if it doesn't exist
    if(schemaCreate){
      await sequelize.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName};`);
      console.log(`Schema ${schemaName} created successfully`);
    }
    // Set the schema for the model
    model.schema(schemaName);

    // Sync the model (create table)
    if(alter){
      await model.sync({alter: true});
    } else{
      await model.sync();
    }
    console.log(`Table for model ${model.name} created successfully in ${schemaName}.`);
  } catch (error) {
    console.error(`Error processing ${schemaName} or ${model.name}:`, error);
  }
};
module.exports = {createSchemaAndSyncModel}