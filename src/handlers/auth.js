"use strict";

const request = require('request-promise')
    , passport = require('koa-passport')
    , generateToken = require('../lib/generateToken');

const User = require('../models').User;

const authHandler = {
  checkToken: function *(next) {
    let self = this;
    yield passport.authenticate('jwt', function *(err, user, info) {
      if (err) throw err;
      if (user === false) {
        self.status = 401;
        self.body = { error: 'Unauthorized' };
      } else {
        yield self.login(user, { session: false });
        yield next;
      }
    }).call(this, next);
  },

  createToken: function *(next) {
    let self = this;
    yield passport.authenticate('github', function *(err, user, info) {
      if (err) throw err;

      const token = generateToken({ userID: user.id, name: user.name });
      self.redirect(`/?token=${token}`);
    }).call(this, next);
  }
}

module.exports = authHandler;
