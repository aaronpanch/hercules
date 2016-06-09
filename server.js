'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000 });

const helloWorld = require('./src/handlers/helloWorld');
server.route({
  method: 'GET',
  path: '/',
  handler: helloWorld
});

server.start((err) => {
  if (err) {
    throw err;
  }

  console.log('Server running at:', server.info.uri);
});
