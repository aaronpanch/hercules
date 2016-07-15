"use strict";

const environmentsHandler = {
  list: function *(appID) {
    let app = yield this.db.App.findById(appID, {
      include: [ this.db.Environment ]
    });

    this.body = app.Environments;
  }
}

module.exports = environmentsHandler;
