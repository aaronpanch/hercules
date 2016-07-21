'use strict';

const config = require('config');

const koa = require('koa')
    , bodyParser = require('koa-bodyparser')
    , route = require('koa-route')
    , session = require('koa-session')
    , mount = require('koa-mount')
    , Grant = require('grant-koa');

let app = koa();

// Development only!
if (app.env === 'development') {
  app.use(require('koa-logger')());
  app.use(require('koa-static')('public'));
  app.use(require('koa-webpack-dev')({
    config: './webpack.config.js'
  }));
}

app.use(bodyParser());

// OAuth/grant
let grant = new Grant({
  server: config.server,
  github: config.providers.github
});

app.keys = [config.secret];
app.use(session(app));
app.use(mount(grant));

// Database
const models = require('./src/models');
app.context.db = models;

// Routes
const apps = require('./src/handlers/apps');
const deployments = require('./src/handlers/deployments');
const environments = require('./src/handlers/environments');
const login = require('./src/handlers/login');
const slack = require('./src/handlers/slack');

app.use(route.get('/login', login.createSession));
app.use(route.post('/slack', slack.deploy));

app.use(login.checkSession);
app.use(route.get('/apps', apps.list));
app.use(route.post('/apps', apps.create));
app.use(route.get('/apps/:appID', apps.show));
app.use(route.get('/apps/:appID/environments', environments.list));
app.use(route.post('/apps/:appID/createDeployment', deployments.create));

// Automatically start app (unless testing)
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
