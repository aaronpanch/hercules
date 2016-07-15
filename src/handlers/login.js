"use strict";

const config = require('config');
const request = require('request-promise');

const loginHandler = {
  login: function *(next) {
    let access_token = this.query.access_token
    let githubUser = yield request({
      uri: config.providers.github.endpoint + '/user',
      qs: { access_token },
      headers: {
        'User-Agent': 'hercules'
      },
      json: true
    });

    this.db.User.findOrCreate({
      where: { github_id: githubUser.id },
      defaults: {
        name: githubUser.name,
        github_id: githubUser.id,
        github_login: githubUser.login,
        github_avatar: githubUser.avatar_url,
        github_access_token: access_token
      }
    });

    this.redirect('/');
  }
}

module.exports = loginHandler;
