"use strict";

const App = require('../models').App;

const appsHandler = {
  list: function *() {
    let apps = yield App.findAll();
    this.body = apps;
  },
  create: function *() {
    try {
      let appItem = yield App.create({
        name: this.request.body.name,
        description: this.request.body.description,
        owner: this.request.body.owner,
        repo: this.request.body.repo
      });

      this.body = appItem;
    } catch (err) {
      this.status = 400;
    }
  },
  show: function *(appID) {
    let app = yield App.findById(appID);
    this.body = app;
  }
}

module.exports = appsHandler;
