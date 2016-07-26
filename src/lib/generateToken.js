"use strict";

const config = require('config')
    , jwt = require('jsonwebtoken');

module.exports = function (payload) {
  return jwt.sign(payload, config.secret, { expiresIn: '1d' });
}
