"use strict";

const appsHandler = {
  list: function *() {
    let apps = yield this.db.App.findAll();
    this.body = apps;
  },
  create: function *() {
    try {
      let appItem = yield this.db.App.create({
        name: this.request.body.name,
        description: this.request.body.description
      });

      this.body = appItem;
    } catch (err) {
      this.status = 400;
    }
  }
}

module.exports = appsHandler;
