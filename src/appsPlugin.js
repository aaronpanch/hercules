'use strict';

const Joi = require('joi');

const appsPlugin = {
  register: function (server, options, next) {
    server.route({
      method: 'GET',
      path: '/apps',
      handler: (request, reply) => {
        server.plugins.mongodbPlugin.db.collection('apps')
          .find({}, { '_id': false }).toArray()
          .then((apps) => {
            apps = apps.reduce((appsObj, app) => {
              appsObj[app.name] = app;
              return appsObj;
            }, {});

            reply({ apps: Object.keys(apps), entities: apps });
          })
          .catch(() => {
            let response = reply();
            response.statusCode = 500;
            response;
          });
      }
    });

    server.route({
      method: 'POST',
      path: '/apps',
      handler: (request, reply) => {
        const name = request.payload.name
            , description = request.payload.description;

        let app = { name, description }
        server.plugins.mongodbPlugin.db.collection('apps').insertOne(Object.assign({}, app))
          .then(() => {
            reply({ app });
          });
      },
      config: {
        validate: {
          payload: {
            name: Joi.string().required(),
            repo: Joi.string().regex(/\w+\/\w+/).required(),
            description: Joi.string()
          }
        }
      }
    });

    return next();
  }
}

appsPlugin.register.attributes = {
  name: 'appsPlugin',
  version: '0.1.0',
  dependencies: 'mongodbPlugin'
};

module.exports = appsPlugin;
