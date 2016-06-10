const appsPlugin = {
  register: function (server, options, next) {
    server.route({
      method: 'GET',
      path: '/apps',
      handler: (request, reply) => {
        request.server.app.database.collection('apps').find().toArray()
          .then((apps) => {
            reply({ apps });
          })
          .catch(() => {
            let response = reply();
            response.statusCode = 500;
            return response;
          });
      }
    });

    next();
  }
}

appsPlugin.register.attributes = {
  name: 'appsPlugin',
  version: '0.1.0'
};

module.exports = appsPlugin;
