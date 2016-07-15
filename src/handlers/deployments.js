"use strict";

const deploymentsHandler = {
  create: function *(appID) {
    let deployment = yield this.db.Deployment.create({
      ref: this.request.body.ref,
      AppId: appID
    });

    this.body = deployment;
  }
}

module.exports = deploymentsHandler;
