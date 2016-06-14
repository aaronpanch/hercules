const configs = {
  dev: {
    env: 'dev',
    port: 3000,
    mongodbURI: 'mongodb://localhost:27017/hercules-dev',
    socketProtocol: 'ws://'
  },
  test: {
    env: 'test',
    port: 1234,
    mongodbURI: 'mongodb://localhost:27017/hercules-test',
    socketProtocol: 'ws://'
  },
  production: {
    env: 'production',
    port: process.env.PORT,
    mongodbURI: process.env.MONGODB_URI
    socketProtocol: 'wss://'
  }
}

module.exports = configs[process.env.NODE_ENV || 'dev'];
