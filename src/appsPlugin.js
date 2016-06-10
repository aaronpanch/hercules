const appsPlugin = {
  register: function (server, options, next) {
    server.route({
      method: 'GET',
      path: '/',
      handler: (request, reply) => {
        reply({ msg: 'Hello World!' });
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
