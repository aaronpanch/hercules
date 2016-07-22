'use strict';

const co = require('co');
const db = require('../src/models');

require('./helper');

global.request = require('supertest');
global.application = require('../app').callback();

beforeEach(() => {
  return db.sequelize.sync({ force: true });
});
