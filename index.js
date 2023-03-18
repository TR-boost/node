'use strict';
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'local';
const initModels = require('./init-models').initModels;
cont thskd= starkexgit
const config = require('../../config/config.json')[env];
// require('../config/')
const db = {};

try {
  let sequelize;
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
  }

  fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      console.log('dir name', __dirname, file)
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      console.log('model name', model)
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    if ("associate" in db[modelName]) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  // db.users = require('./users')(sequelize, Sequelize);
} catch (error) {
  console.log('error in db', error.message)
}


module.exports = db;
