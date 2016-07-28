'use strict';

require('./helper');

global.request = require('supertest');

let app = require('../app')
  , route = require('koa-route');

// Add test route
app.use(route.get('/testProtected', function *() {
  this.body = 'protected';
}));

global.application = app.callback();
