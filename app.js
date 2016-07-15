'use strict';

const config = require('config');
const logger = require('koa-logger');
const route = require('koa-route');

const Koa = require('koa');
let app = new Koa();

if (app.env === 'development')
  app.use(logger());

const models = require('./src/models');
app.context.db = models;

// Routes
const apps = require('./src/handlers/apps');

app.use(route.get('/apps', apps.list));


// Start App (unless testing)
if (app.env !== 'test') {
  models.sequelize.sync().then(() => {
    app.listen(config.port);
    console.log(`Koa server listening on port ${config.port}`);
  });
}

module.exports = {
  app,
  models
}
