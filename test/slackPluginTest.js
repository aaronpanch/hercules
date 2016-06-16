'use strict';

require('./databaseHelper');
const config = require('../config');

const server = require('../server')
    , co = require('co');

describe('Slack Plugin', () => {
  it('should give a 401 for invalid slack tokens', (done) => {
    co(function*() {
      const slackPayload = {
        token: 'wrongToken'
      }

      const res = yield server.inject({ method: 'POST', url: '/slack/deploy', payload: slackPayload })
      expect(res.statusCode).to.equal(401);
      done();
    }).catch(onError);
  });

  it('should respond to malformed command with help', (done) => {
    co(function*() {
      const slackPayload = {
        token: config.slackDeployToken,
        user_name: 'Aaron',
        text: 'i like cheese'
      }

      const res = yield server.inject({ method: 'POST', url: '/slack/deploy', payload: slackPayload })
      expect(res.statusCode).to.equal(200);
      expect(res.result).to.eql({
        response_type: 'ephemeral',
        text: "Sorry Aaron, I didn't understand `/deploy i like cheese`.  Send `/deploy help` to see an explanation of options."
      });

      done();
    }).catch(onError);
  });

  it('should respond to unknown app name with appropriate message', (done) => {
    co(function*() {
      const slackPayload = {
        token: config.slackDeployToken,
        user_name: 'Aaron',
        text: 'myapp to production'
      }

      const res = yield server.inject({ method: 'POST', url: '/slack/deploy', payload: slackPayload })
      expect(res.statusCode).to.equal(200);
      expect(res.result).to.eql({
        response_type: 'ephemeral',
        text: "Sorry Aaron, I don't have a configuration for myapp. Go to <http://localhost:1234|hercules> to set one up."
      });

      done();
    }).catch(onError);
  });

  it('should respond good command with message', (done) => {
    co(function*() {
      yield DB.collection('apps').insertOne({ name: 'myapp' });

      const slackPayload = {
        token: config.slackDeployToken,
        user_name: 'Aaron',
        text: 'myapp to production'
      }

      const res = yield server.inject({ method: 'POST', url: '/slack/deploy', payload: slackPayload })
      expect(res.statusCode).to.equal(200);
      expect(res.result).to.eql({
        response_type: 'in_channel',
        text: "You got it Aaron! I'll get started on that now."
      });

      done();
    }).catch(onError);
  });
});
