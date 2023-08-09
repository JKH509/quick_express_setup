const { createSchemaAndSyncModel } = require("../utils/schemaTableCreateFunction");

module.exports = (sequelize, DataTypes) => {
const RefreshToken = sequelize.define('RefreshToken', {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
  },
  user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'users', // assuming you have a 'Users' table, whatever db tablename is
          key: 'id'
      }
  },
  token: {
      type: DataTypes.STRING(512), // Length based on your token's size
      allowNull: false
  },
  token_type: {
      type: DataTypes.STRING, 
      allowNull: false,
      defaultValue: 'refresh'
  },
  expires_at: {
      type: DataTypes.DATE,
      allowNull: false
  },
  issued_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW
  },
  is_revoked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
  },
  device_info: {
      type: DataTypes.STRING(255),
      allowNull: true
  },
  ip_address: {
      type: DataTypes.STRING(45), // Length is for IPv6, adjust as needed
      allowNull: true
  }
}, {
  schema: 'user_schema',
  tableName: 'refresh_tokens',
  timestamps: false // Assuming you're manually handling 'issued_at'. If you want automatic 'createdAt' and 'updatedAt', set this to true.
});
  // ### Create Schema and table, true or false for creating schema
  // createSchemaAndSyncModel(sequelize, false, 'user_schema', false, RefreshToken);
return RefreshToken;
}