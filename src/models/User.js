
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
      user_name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      user_email: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      user_password: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      user_business_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
  }, 
  {
      schema: 'user_schema',
      tableName:"users"
  } 
  );

  User.associate = function(models) {
    User.belongsTo(models.Business, { 
      foreignKey: 'user_business_id' 
    });
  };
  
  // uncomment for adding table to the schema 
  // User.sync()
  //     .then(() => {
  //         console.log('User table created successfully in custom_schema.');
  //     })
  //     .catch(error => {
  //         console.error('Error creating User table:', error);
  //     });
 
  return User;
};
