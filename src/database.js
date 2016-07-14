const Sequelize = require('sequelize');

function connect() {
  return new Sequelize('hercules_dev', null, null, {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,

    pool: {
      max: 10,
      min: 0,
      idle: 10000
    }
  });
}

module.exports = connect;
