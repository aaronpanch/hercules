const dbConfig = require('config').get('db');
const Sequelize = require('sequelize');

const cls = require('continuation-local-storage');
Sequelize.cls = cls.createNamespace('testNamespace');

function connect() {
  return new Sequelize(dbConfig.name, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'postgres',
    port: dbConfig.port,
    logging: dbConfig.logging === undefined ? console.log : dbConfig.logging,

    pool: {
      max: 10,
      min: 0,
      idle: 10000
    }
  });
}

module.exports = { Sequelize, connect };
