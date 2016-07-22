"use strict";

const Deployment = require('../models').Deployment;
const deploy = require('../lib/deployer');

const deploymentsHandler = {
  create: function *(appID) {
    let deployment = yield Deployment.create({
      ref: this.request.body.ref,
      AppId: appID
    });

    deploy(deployment, this);

    this.body = deployment;
  }
}

module.exports = deploymentsHandler;
