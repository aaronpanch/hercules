'use strict';

const config = require('config');

const logger = require('koa-logger')
    , route = require('koa-route')
    , session = require('koa-session')
    , mount = require('koa-mount')
    , Grant = require('grant-koa');

const Koa = require('koa');
let app = new Koa();

// Development only!
if (app.env === 'development') {
  app.use(logger());
  app.use(require('koa-static')('public'));
  app.use(require('koa-webpack-dev')({
    config: './webpack.config.js'
  }));
}

// OAuth/grant
let grant = new Grant({
  server: config.server,
  github: config.providers.github
});

app.keys = ['kittens'];
app.use(session(app));
app.use(mount(grant));

// Database
const models = require('./src/models');
app.context.db = models;

// Routes
const apps = require('./src/handlers/apps');
const login = require('./src/handlers/login').login;
app.use(route.get('/apps', apps.list));
app.use(route.get('/login', login));

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
