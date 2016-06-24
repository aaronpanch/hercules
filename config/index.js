const baseConfig = {
  port: process.env.PORT,
  hostURL: process.env.HOST_URL,
  mongodbURI: process.env.MONGODB_URI,
  slackDeployToken: process.env.SLACK_DEPLOY_TOKEN
};

const configOverrides = {
  dev: {
    port: process.env.PORT || 3000,
    hostURL: 'http://localhost:3000',
    mongodbURI: 'mongodb://localhost:27017/hercules-dev',
    slackDeployToken: process.env.SLACK_DEPLOY_TOKEN || 'slackDevToken'
  },
  test: {
    port: 1234,
    hostURL: 'http://localhost:1234',
    mongodbURI: 'mongodb://localhost:27017/hercules-test',
    slackDeployToken: 'slackTestToken'
  },
  production: {}
}

function getConfig(env) {
  return Object.assign({}, baseConfig, configOverrides[env]);
}

module.exports = getConfig(process.env.NODE_ENV || 'dev');
