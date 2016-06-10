'use strict';

const expect = require('chai').expect;
let server = require('../server');

describe('Apps Plugin', () => {
  it('should return a 200 for GET /', (done) => {
    server.inject({ method: 'GET', url: '/' }, (res) => {
      expect(res.statusCode).to.equal(200);
      expect(res.result).to.eql({
        msg: 'Hello World!'
      });

      done();
    });
  });
});
