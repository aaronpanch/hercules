"use strict";

const deploy = require('../lib/deployer');

const deploymentsHandler = {
  create: function *(appID) {
    let deployment = yield this.db.Deployment.create({
      ref: this.request.body.ref,
      AppId: appID
    });

    deploy(deployment, this);

    this.body = deployment;
  }
}

module.exports = deploymentsHandler;
