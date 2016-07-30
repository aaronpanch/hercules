'use strict';

require('./integrationHelper');
const co = require('co');
const { sequelize, User } = require('../src/models');
const generateToken = require('../src/lib/generateToken');

describe('Authentication', () => {
  let token;

  before(() => {
    return co(function *() {
      yield sequelize.sync({ force: true });
      let user = yield User.create({ name: 'Ms User', github_id: 123 });
      token = generateToken({ userID: user.id });
    });
  });

  it('should return 401 for unauthenticated protected route', (done) => {
    request(application)
      .get('/testProtected')
      .expect('Content-Type', /json/)
      .expect(401, {
        error: 'Unauthorized'
      }, done);
  });

  it('should forward request for authenticated protected route', (done) => {
    request(application)
      .get('/testProtected')
      .set('Authorization', `JWT ${token}`)
      .expect(200, 'protected', done);
  });

  it('should return 401 for an invalid token', (done) => {
    request(application)
      .get('/testProtected')
      .set('Authorization', 'JWT invalid')
      .expect('Content-Type', /json/)
      .expect(401, {
        error: 'Unauthorized'
      }, done);
  });

  it('should return 401 for a user that is not found', (done) => {
    const invalidToken = generateToken({ userID: 10 });

    request(application)
      .get('/testProtected')
      .set('Authorization', `JWT ${invalidToken}`)
      .expect('Content-Type', /json/)
      .expect(401, {
        error: 'Unauthorized'
      }, done);
  });

  it('should throw an error when encountered', (done) => {
    const invalidToken = generateToken({ userID: 'error' });

    request(application)
      .get('/testProtected')
      .set('Authorization', `JWT ${invalidToken}`)
      .expect(500, 'Internal Server Error', done);
  });
});
