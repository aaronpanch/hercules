module.exports = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,

  mongodbURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/'
}
