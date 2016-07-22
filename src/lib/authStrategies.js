const config = require('config');
const User = require('../models').User;
const co = require('co')
    , passport = require('koa-passport')
    , JwtStrategy = require('passport-jwt').Strategy
    , ExtractJwt = require('passport-jwt').ExtractJwt;

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.secret,
}, function(payload, done) {
  co(function *() {
    const user = yield User.findOne();
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  }).catch(err => done(err, false));
}));
