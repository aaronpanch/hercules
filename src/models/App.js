"use strict";

module.exports = function(sequelize, DataTypes) {
  let App = sequelize.define('App', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['name']
      }
    ]
  });

  return App;
}
