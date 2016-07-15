'use strict';

require('./helper');

global.request = require('supertest');

const application = require('../app');

global.App = application.app.callback();
global.Models = application.models;

before(() => {
  return Models.sequelize.sync();
});

after(() => {
  return Models.App.destroy({ truncate: true });
})
