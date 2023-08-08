'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize')

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

// this will read subfolders as well  
function loadModels(directory) {
  fs
    .readdirSync(directory)
    .forEach(entry => {
      const entryPath = path.join(directory, entry);
      if (fs.statSync(entryPath).isDirectory()) {
        // If it's a directory, recurse into it
        loadModels(entryPath);
      } else if (
        entry.indexOf('.') !== 0 &&
        entry !== basename &&
        entry.slice(-3) === '.js' &&
        entry.indexOf('.test.js') === -1
      ) {
        const model = require(entryPath)(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
      }
    });
}

loadModels(__dirname);
Object.keys(db).forEach(modelName => {
  console.log("DB -> ", modelName)
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}); 

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Models
// db.User = require('./User')(sequelize, Sequelize.DataTypes);


// TEST CONNECTION 

// sequelize.authenticate()
// .then(() => {
//   console.log('connected..')
// })
// .catch(err => {
//   console.log('Error'+ err)
// })

module.exports = db;

