"use strict";

const fs   = require("fs");
const path = require("path");
const database = require('../database');

let sequelize = database.connect();
let db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.Sequelize = database.Sequelize;
db.sequelize = sequelize;

module.exports = db;
