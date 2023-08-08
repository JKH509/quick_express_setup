
// require('dotenv').config(); // if you're using dotenv for environment variables
require('dotenv').config()
 
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres', // or mysql, sqlite, etc.
  },
  test: {
    username: "db_username",
    password: "db_password",
    database: "db_name",
    host: "db_host",
    dialect: "postgres", // or mysql, sqlite, etc.
  },
  production: {
    username: "db_username",
    password: "db_password",
    database: "db_name",
    host: "db_host",
    dialect: "postgres", // or mysql, sqlite, etc.
  }
};

