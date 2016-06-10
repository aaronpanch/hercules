'use strict';

const MongoClient = require('mongodb').MongoClient
    , config = require('../config');

global.expect = require('chai').expect;

// connect to database
before(() => {
  return MongoClient.connect(config.mongodbURI + config.mongodbName)
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
