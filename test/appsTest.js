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

  it('should authenticate index', (done) => {
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

  it('should authenticate show', (done) => {
    request(application)
      .get('/apps/1')
      .expect('Content-Type', /json/)
      .expect(401, {
        error: 'Unauthorized'
      }, done);
  });

  it('should show an app', (done) => {
    request(application)
      .get('/apps/1')
      .set('Authorization', `JWT ${token}`)
      .expect('Content-Type', /json/)
      .expect(res => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, Object.assign({}, appFixtures[0], { id: 1 }), done);
  });

  it('should authenticate create', (done) => {
    request(application)
      .post('/apps')
      .send({
        id: 5,
        name: 'New App',
        description: 'Another Cool',
        owner: 'aaronpanch',
        repo: 'new-app'
      })
      .expect('Content-Type', /json/)
      .expect(401, {
        error: 'Unauthorized'
      }, done);
  });

  it('should create an app', (done) => {
    const newApp = {
      name: 'New App',
      description: 'Another Cool',
      owner: 'aaronpanch',
      repo: 'new-app'
    };

    request(application)
      .post('/apps')
      .set('Authorization', `JWT ${token}`)
      .send(Object.assign({}, newApp, { id: 5 }))
      .expect('Content-Type', /json/)
      .expect(res => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(201, Object.assign({}, newApp, { id: 2 }), done);
  });

  it('should not create an invalid app', (done) => {
    request(application)
      .post('/apps')
      .set('Authorization', `JWT ${token}`)
      .send(appFixtures[0])
      .expect(400, done);
  });
});
