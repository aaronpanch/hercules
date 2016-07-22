"use strict";

const config = require('config');
const request = require('request-promise');
const User = require('../models').User;

const loginHandler = {
  checkSession: function *(next) {
    if (!this.session.userID) {
      if (this.request.get('X-Requested-With') === 'XMLHttpRequest') {
        this.status = 401;
      } else {
        this.redirect('/connect/github');
      }
    } else {
      this.state.user = yield User.findById(this.session.userID)
    }

    yield next;
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

module.exports = loginHandler;
