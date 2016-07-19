"use strict";

module.exports = function(sequelize, DataTypes) {
  let Deployment = sequelize.define('Deployment', {
    ref: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    github_status_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'failed', 'success'),
      defaultValue: 'pending',
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Deployment.belongsTo(models.App);
        // Deployment.belongsTo(models.Environment);
      }
    }
  });

  return Deployment;
}
