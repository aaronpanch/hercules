"use strict";
const config = require('config');
const deploy = require('../lib/deployer');

const { App, Deployment, User } = require('../models');

function parseDeploy (message) {
  const deployPattern = /([-\.\w]+)(?:\/([^\s]+))?(?:\s+(?:to|in|on))\s+([-\.\w]+)/
      , commandParts = message.trim().match(deployPattern);

  if (commandParts) {
    return {
      appName: commandParts[1],
      branch: commandParts[2] || 'master',
      environment: commandParts[3]
    }
  }
}

function helpMessage() {
  const helpText = `
- \`/deploy help\`—Display this message
- \`/deploy <app_name>/<ref> to <environment>\`—Initiate a deployment!
    *app_name*: the name of the application as mapped to a repo on hercules
    *ref*: _(optional)_ any Git ref (branch, sha, tag)
    *environment*: an environment to deploy to as set up in hercules
*Example:* \`/deploy best-application/my-feature to staging\`
  `;

  return {
    response_type: 'in_channel',
    attachments: [
      {
        fallback: '`\deploy <app_name>/<ref> to <environment>`',
        title: 'Hercules Command Reference',
        color: '#9578E4',
        text: helpText,
        mrkdwn_in: ['text']
      }
    ]
  }
}

const slackHandler = {
  deploy: function *() {
    const payload = this.request.body

    if (payload.token !== config.slackToken) {
      this.body.status = 401;
      return;
    }

    if (payload.text === 'help') {
      this.body = helpMessage();
      return;
    }

    const deployCommand = parseDeploy(payload.text);

    if (!deployCommand) {
      this.body = {
        response_type: 'ephemeral',
        text: `Sorry ${payload.user_name}, I didn't understand \`/deploy ${payload.text}\`.  Send \`/deploy help\` to see an explanation of options.`
      };

      return;
    }

    let app = yield App.findOne({ where: { name: deployCommand.appName } });
    if (app) {
      this.body = {
        response_type: 'in_channel',
        text: `You got it ${payload.user_name}! I'll get started on that now.`
      }

      let deployment = yield Deployment.create({
        ref: deployCommand.branch,
        AppId: app.id
      });

      // NEED TO GET THE REAL USER
      this.state.user = yield User.findById(2);

      deploy(deployment, this);
    } else {
      this.body = {
        response_type: 'ephemeral',
        text: `Sorry ${payload.user_name}, I don't have a configuration for ${deployCommand.appName}. Go to <http://localhost:3000|hercules> to set one up.`
      }
    }
  }
}

module.exports = slackHandler;
