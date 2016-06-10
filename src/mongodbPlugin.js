const MongoClient = require('mongodb').MongoClient
    , co = require('co');

const mongodbPlugin = {
  register: function (server, options, next) {
    co(function*() {
      let database = yield MongoClient.connect(options.dbURI);
      console.log("Connected successfully to MongoDB!");

      server.app.database = database;

      server.on('stop', () => {
        database.close();
      });
    });

    next();
  }
}

mongodbPlugin.register.attributes = {
  name: 'mongodbPlugin',
  version: '0.1.0'
}

module.exports = mongodbPlugin;
