'use strict';

require('./integrationHelper');
const co = require('co');
const { sequelize, App, User } = require('../src/models');
const generateToken = require('../src/lib/generateToken');

describe('Apps Resource', () => {
  const appFixtures = [
    {
      name: 'My App',
      description: 'Something Cool',
      owner: 'aaronpanch',
      repo: 'my-app'
    }
  ];

  let token;

  before(() => {
    return co(function *() {
      yield sequelize.sync({ force: true });
      let user = yield User.create({ name: 'Ms User', github_id: 123 });
      yield App.bulkCreate(appFixtures);
      token = generateToken({ userID: user.id });
    });
  });

  it('should be a protected route', (done) => {
    request(application)
      .get('/apps')
      .expect('Content-Type', /json/)
      .expect(401, {
        error: 'Unauthorized'
      }, done);
  });

  it('should list apps', (done) => {
    request(application)
      .get('/apps')
      .set('Authorization', `JWT ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).to.have.lengthOf(1);
        let appItem = res.body[0];
        expect(appItem.name).to.equal('My App');
      })
      .end(done);
  });
});
