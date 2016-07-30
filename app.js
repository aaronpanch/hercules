'use strict';

const config = require('config');

const koa = require('koa')
    , bodyParser = require('koa-bodyparser')
    , route = require('koa-route')
    , passport = require('koa-passport');

let app = koa();

// Database
const db = require('./src/models');

// Development only!
if (app.env === 'development') {
  app.use(require('koa-logger')());
  app.use(require('koa-webpack-dev')({
    config: './webpack.config.js'
  }));
  app.use(require('koa-static')('public'));
}

// Middleware
app.use(bodyParser());

// Auth
require('./src/lib/authStrategies');
app.use(passport.initialize());

// Routes
const apps = require('./src/handlers/apps');
const deployments = require('./src/handlers/deployments');
const environments = require('./src/handlers/environments');
const auth = require('./src/handlers/auth');
const slack = require('./src/handlers/slack');

// Public Routes
app.use(route.post('/slack', slack.deploy));

app.use(route.get('/connect/github',
  passport.authenticate('github', { scope: config.providers.github.scope })));
app.use(route.get(config.providers.github.callbackPath, auth.createToken));

// Protected Routes
app.use(auth.checkToken);
app.use(route.get('/apps', apps.list));
app.use(route.post('/apps', apps.create));
app.use(route.get('/apps/:id', apps.show));
app.use(route.get('/apps/:appID/environments', environments.list));
app.use(route.post('/apps/:appID/createDeployment', deployments.create));

// Automatically start app (unless testing)
if (app.env !== 'test') {
  db.sequelize.sync().then(() => {
    app.listen(config.port);
    console.log(`Koa server listening on port ${config.port}`);
  });
}

module.exports = app;
