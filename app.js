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

app.use(route.get('/login', auth.createSession));
app.use(route.post('/slack', slack.deploy));

app.use(passport.authenticate('jwt', { session: false }));
app.use(route.get('/apps', apps.list));
app.use(route.post('/apps', apps.create));
app.use(route.get('/apps/:appID', apps.show));
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
