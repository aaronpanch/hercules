const config = require('config');
const User = require('../models').User;
const co = require('co')
    , passport = require('koa-passport')
    , JwtStrategy = require('passport-jwt').Strategy
    , ExtractJwt = require('passport-jwt').ExtractJwt
    , GitHubStrategy = require('passport-github2').Strategy;

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret,
  },
  function(payload, done) {
    co(function *() {
      const user = yield User.findById(payload.userID);
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    }).catch(err => done(err, false));
  }
));

passport.use(new GitHubStrategy({
    clientID: config.providers.github.clientID,
    clientSecret: config.providers.github.clientSecret,
    callbackURL: `${config.hostURL}${config.providers.github.callbackPath}`
  },
  function(accessToken, refreshToken, profile, done) {
    co(function *() {
      const githubUser = profile._json;

      let [user] = yield User.findOrCreate({
        where: { github_id: githubUser.id },
        defaults: {
          name: githubUser.name,
          github_id: githubUser.id,
          github_login: githubUser.login,
          github_avatar: githubUser.avatar_url,
          github_access_token: accessToken
        }
      });

      if (!user.isNewRecord) {
        // Update Token
        user.github_access_token = accessToken;
        yield user.save();
      }

      done(null, user);
    }).catch(err => done(err, false));
  }
));
