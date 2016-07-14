'use strict';

const logger = require('koa-logger');
const route = require('koa-route');

const koa = require('koa');
let app = koa();

if (app.env === 'development')
  app.use(logger());

const models = require('./src/models');
app.context.db = models;

// Routes
const apps = require('./src/handlers/apps');

app.use(route.get('/apps', apps.list));


models.sequelize.sync().then(() => {
  const port = process.env.PORT || 3000
  app.listen(port);
  console.log(`Koa server listening on port ${port}`);
});


// const config = require('./config');
// const Hapi = require('hapi');

// const server = new Hapi.Server();
// server.connection({ port: config.port });

// server.register(
//   [
//     require('nes'),
//     require('inert'),
//     {
//       register: require('./src/mongodbPlugin'),
//       options: {
//         dbURI: config.mongodbURI
//       }
//     },
//     require('./src/appsPlugin'),
//     {
//       register: require('./src/slackPlugin'),
//       options: {
//         slackDeployToken: config.slackDeployToken,
//         hostURL: config.hostURL
//       }
//     }
//   ],
//   (err) => {
//     server.route({
//       method: 'GET',
//       path: '/{param*}',
//       handler: {
//         directory: {
//           path: 'public'
//         }
//       }
//     })

//     if (err) {
//       console.error('Failed to load plugin: ', err);
//     }

//     server.start((err) => {
//       if (err) {
//         throw err;
//       }

//       console.log('Server running at:', server.info.uri);
//     });
//   }
// );

// module.exports = server;
