"use strict";

const appsHandler = {
  list: function *(next) {
    let apps = yield this.db.App.findAll();
    this.body = apps;
  }
}

module.exports = appsHandler;
