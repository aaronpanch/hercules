"use strict";

const { App, Environment } = require('../models');

const environmentsHandler = {
  list: function *(appID) {
    let app = yield App.findById(appID, {
      include: [ Environment ]
    });

    this.body = app.Environments;
  }
}

module.exports = environmentsHandler;
