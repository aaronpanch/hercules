"use strict";

module.exports = function(sequelize, DataTypes) {
  let App = sequelize.define('App', {
    name: DataTypes.STRING
  });

  return App;
}
