'use strict';

const config = require('./config');
const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: config.port });

const routes = require('./src/routes')
routes.createFor(server);

server.start((err) => {
  if (err) {
    throw err;
  }

  console.log('Server running at:', server.info.uri);
});
