'use strict';

const MongoClient = require('mongodb').MongoClient
    , config = require('../config');

global.expect = require('chai').expect;
global.onError = function (err) {
  console.error(err)
}

// connect to database
before(() => {
  return MongoClient.connect(config.mongodbURI)
    .then((database) => {
      global.DB = database;
    })
    .catch((err) => {
      throw err;
    });
});

// clear database
beforeEach(() => {
  return DB.dropDatabase();
});

// close database connection
after(() => {
  return DB.close();
})
