'use strict';

const appsPlugin = {
  register: function (server, options, next) {
    server.route({
      method: 'GET',
      path: '/apps',
      handler: (request, reply) => {
        server.plugins.mongodbPlugin.db.collection('apps').find({}, { '_id': false }).toArray()
          .then((apps) => {
            reply({ apps });
          })
          .catch(() => {
            let response = reply();
            response.statusCode = 500;
            response;
          });
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
