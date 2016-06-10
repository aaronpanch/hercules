'use strict';

const MongoClient = require('mongodb').MongoClient

const mongodbPlugin = {
  register: function (server, options, next) {
    MongoClient.connect(options.dbURI)
      .then((database) => {
        console.log("Connected successfully to MongoDB!");

        server.expose('db', database)

        server.on('stop', () => {
          database.close();
        });

        next();
      })
      .catch((err) => {
        next(err);
      });
  }
}

mongodbPlugin.register.attributes = {
  name: 'mongodbPlugin',
  version: '0.1.0'
}

module.exports = mongodbPlugin;
