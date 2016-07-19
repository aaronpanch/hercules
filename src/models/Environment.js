"use strict";

module.exports = function(sequelize, DataTypes) {
  let Environment = sequelize.define('Environment', {
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    classMethods: {
      associate: function(models) {
        Environment.belongsTo(models.App);
      }
    }
  });

  return Environment;
}
