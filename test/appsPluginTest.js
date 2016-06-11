'use strict';

require('./helper');

const server = require('../server')
    , co = require('co');

describe('Apps Plugin', () => {
  it('should return a list of apps', (done) => {
    co(function*() {
      yield DB.collection('apps').insertOne({ name: 'cool' });

      let res = yield server.inject({ method: 'GET', url: '/apps' });

      expect(res.statusCode).to.equal(200);
      expect(res.result).to.eql({
        apps: [
          { name: 'cool' }
        ]
      });

      done();
    });
  });

  it('should create an app document', (done) => {
    co(function*() {
      let res = yield server.inject({ method: 'POST', url: '/apps', payload: { name: 'application-name', description: 'desc' } });
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
});
