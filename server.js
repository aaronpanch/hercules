'use strict';

const config = require('./config');
const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: config.port });

server.register(
  [
    {
      register: require('./src/mongodbPlugin'),
      options: {
        dbURI: config.mongodbURI
      }
    },
    require('./src/appsPlugin')
  ],
  (err) => {
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
