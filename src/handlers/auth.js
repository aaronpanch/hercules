"use strict";

const config = require('config');
const request = require('request-promise');
const passport = require('koa-passport');
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

  createSession: function *(next) {
    let access_token = this.query.access_token
    let githubUser = yield request({
      uri: config.providers.github.endpoint + '/user',
      qs: { access_token },
      headers: {
        'User-Agent': 'hercules'
      },
      json: true
    });

    let user = yield User.findOrCreate({
      where: { github_id: githubUser.id },
      defaults: {
        name: githubUser.name,
        github_id: githubUser.id,
        github_login: githubUser.login,
        github_avatar: githubUser.avatar_url,
        github_access_token: access_token
      }
    });

    this.session.userID = user[0].id;

    this.redirect('/');
  }
}

module.exports = authHandler;
