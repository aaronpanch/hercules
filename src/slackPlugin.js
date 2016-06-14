'use strict';

const deployCommandParser = require('./messageParser').parseDeploy;

const slackPlugin = {
  register: function (server, options, next) {
    server.route({
      method: 'POST',
      path: '/slack/deploy',
      handler: (request, reply) => {
        const { payload } = request;
        if (payload.token !== options.slackDeployToken) {
          let response = reply();
          response.statusCode = 401;
          return response;
        }

        const deployCommand = deployCommandParser(payload.text);

        if (!deployCommand) {
          return reply({
            response_type: 'ephemeral',
            text: `Sorry ${payload.user_name}, I didn't understand \`/deploy ${payload.text}\`.  Please follow the form \`/deploy <app_name>/<ref> to <environment>\``
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
