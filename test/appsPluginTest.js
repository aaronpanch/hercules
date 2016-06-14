'use strict';

require('./helper');

const server = require('../server')
    , co = require('co')
    , pick = require('lodash/pick');

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
      expect(pick(res.result.app, ['name', 'description', 'repo'])).to.eql({
        name: 'application-name',
        description: 'desc',
        repo: 'owner/project'
      });

      let appDoc = yield DB.collection('apps').find({ name: 'application-name' }).toArray();
      expect(appDoc[0]).to.include.key('_id');
      expect(pick(appDoc[0], [ 'name', 'description', 'repo' ])).to.eql({
        name: 'application-name',
        description: 'desc',
        repo: 'owner/project'
      });

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
