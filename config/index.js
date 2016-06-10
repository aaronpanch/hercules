const configs = {
  dev: {
    env: 'dev',
    port: 3000,
    mongodbURI: 'mongodb://localhost:27017/',
    mongodbName: 'hercules-dev'
  },
  test: {
    env: 'test',
    port: 1234,
    mongodbURI: 'mongodb://localhost:27017/',
    mongodbName: 'hercules-test'
  },
  prod: {
    env: 'prod',
    port: process.env.PORT,
    mongodbURI: process.env.MONGODB_URI,
    mongodbName: 'hercules'
  }
}

module.exports = configs[process.env.NODE_ENV || 'dev'];
