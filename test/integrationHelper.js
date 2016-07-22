'use strict';

const co = require('co');
require('./helper');

global.request = require('supertest');

const appDef = require('../app');

global.application = appDef.app.callback();
global.db = appDef.models;

beforeEach(() => {
  return db.sequelize.sync({ force: true });
});
