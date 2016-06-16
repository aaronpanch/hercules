'use strict';

const deployCommandParser = require('./messageParser').parseDeploy;

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

const slackPlugin = {
  register: function (server, options, next) {
    server.route({
      method: 'POST',
      path: '/slack/deploy',
      config: {
        timeout: {
          server: 2750
        }
      },
      handler: (request, reply) => {
        const { payload } = request;
        if (payload.token !== options.slackDeployToken) {
          let response = reply();
          response.statusCode = 401;
          return response;
        }

        if (payload.text === 'help') {
          return reply(helpMessage());
        }

        const deployCommand = deployCommandParser(payload.text);

        if (!deployCommand) {
          return reply({
            response_type: 'ephemeral',
            text: `Sorry ${payload.user_name}, I didn't understand \`/deploy ${payload.text}\`.  Send \`/deploy help\` to see an explanation of options.`
          });
        }

        server.plugins.mongodbPlugin.db.collection('apps').findOne({ name: deployCommand.appName })
          .then((appDocument) => {
            if (appDocument) {
              reply({
                response_type: 'in_channel',
                text: `You got it ${payload.user_name}! I'll get started on that now.`
              });
            } else {
              reply({
                response_type: 'ephemeral',
                text: `Sorry ${payload.user_name}, I don't have a configuration for ${deployCommand.appName}. Go to <${options.hostURL}|hercules> to set one up.`
              });
            }
          });
      }
    });

    return next();
  }
}

slackPlugin.register.attributes = {
  name: 'slackPlugin',
  version: '0.1.0'
};

module.exports = slackPlugin;
