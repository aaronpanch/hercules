'use strict';

require('./helper');

const server = require('../server')
    , co = require('co');

describe('Apps Plugin', () => {
  it('should return a list of apps', (done) => {
    co(function*() {
      yield DB.collection('apps').insertMany([
        { name: 'app1', other: 'stuff' },
        { name: 'app2', other: 'more' }]
      );

      let res = yield server.inject({ method: 'GET', url: '/apps' });

      expect(res.statusCode).to.equal(200);
      expect(res.result).to.eql({
        apps: [ 'app1', 'app2' ],
        entities: {
          app1: { name: 'app1', other: 'stuff' },
          app2: { name: 'app2', other: 'more' }
        }
      });

      done();
    });
  });

  it('should create an app document', (done) => {
    co(function*() {
      let res = yield server.inject({
        method: 'POST',
        url: '/apps',
        payload: {
          name: 'application-name',
          description: 'desc',
          repo: 'owner/project'
        }
      });

      expect(res.statusCode).to.equal(200);
      expect(res.result).to.eql({
        app: {
          name: 'application-name',
          description: 'desc'
        }
      });

      let appDoc = yield DB.collection('apps').find({ name: 'application-name' }).toArray();
      expect(appDoc.length).to.equal(1);

      done();
    });
  });

  it('should reject invalid app metadata', (done) => {
    co(function*() {
      let res = yield server.inject({ method: 'POST', url: '/apps', payload: {} });
      expect(res.statusCode).to.equal(400);

      res = yield server.inject({ method: 'POST', url: '/apps', payload: { name: 'foo', repo: 'foo/' } });
      expect(res.statusCode).to.equal(400);

      done();
    });
  });
});
