'use strict';

require('./helper');

const server = require('../server')
    , co = require('co');

describe('Apps Plugin', () => {
  it('should return a 200 for GET /apps', (done) => {
    co(function*() {
      yield DB.collection('apps').insertOne({ name: 'cool' });

      server.inject({ method: 'GET', url: '/apps' }, (res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.result).to.eql({
          apps: [
            { name: 'cool' }
          ]
        });

        done();
      });
    });
  });
});
