'use strict';

const config = require('./config');
const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: config.port });

server.register(
  [
    require('inert'),
    {
      register: require('./src/mongodbPlugin'),
      options: {
        dbURI: config.mongodbURI
      }
    },
    require('./src/appsPlugin')
  ],
  (err) => {
    server.route({
      method: 'GET',
      path: '/',
      handler: (request, reply) => {
        reply.file('./public/index.html');
      }
    })

    if (err) {
      console.error('Failed to load plugin: ', err);
    }

    server.start((err) => {
      if (err) {
        throw err;
      }

      console.log('Server running at:', server.info.uri);
    });
  }
);

module.exports = server;
