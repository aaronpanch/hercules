"use strict";

module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('User', {
    name: DataTypes.STRING,
    github_id: DataTypes.INTEGER,
    github_login: DataTypes.STRING,
    github_avatar: DataTypes.STRING,
    github_access_token: DataTypes.STRING
  }, {
    indexes: [
      {
        unique: true,
        fields: ['github_id']
      }
    ]
  });

  return User;
}
