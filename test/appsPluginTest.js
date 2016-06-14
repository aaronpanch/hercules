'use strict';

require('./helper');

const server = require('../server')
    , co = require('co');

describe('Apps Plugin', () => {
  it('should return a list of apps', (done) => {
    co(function*() {
      yield DB.collection('apps').insertMany([
        { _id: 'test1', name: 'app1', other: 'stuff' },
        { _id: 'test2', name: 'app2', other: 'more' }]
      );

      let res = yield server.inject({ method: 'GET', url: '/apps' });

      expect(res.statusCode).to.equal(200);
      expect(res.result).to.eql({
        apps: [ 'test1', 'test2' ],
        entities: {
          test1: { _id: 'test1', name: 'app1', other: 'stuff' },
          test2: { _id: 'test2', name: 'app2', other: 'more' }
        }
      });

      done();
    }).catch(onError);
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
    }).catch(onError);
  });

  it('should reject invalid app metadata', (done) => {
    co(function*() {
      let res = yield server.inject({ method: 'POST', url: '/apps', payload: {} });
      expect(res.statusCode).to.equal(400);

      res = yield server.inject({ method: 'POST', url: '/apps', payload: { name: 'foo', repo: 'foo/' } });
      expect(res.statusCode).to.equal(400);

      done();
    }).catch(onError);
  });
});
