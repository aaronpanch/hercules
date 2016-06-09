'use strict';

const helloWorldHandler = require('./handlers/helloWorld');

const config = [
  {
    method: 'GET',
    path: '/',
    handler: helloWorldHandler
  }
]

module.exports.config = config;

module.exports.createFor = (server) => {
  config.forEach((routeOptions) => { server.route(routeOptions) });
}
