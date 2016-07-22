'use strict';

require('./integrationHelper');

const App = require('../src/models').App;

describe('Apps Resource', () => {
  it('should list apps', (done) => {
    App.create({ name: 'test', description: 'desc', owner: 'foo', repo: 'bar' });

    request(application)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).to.have.lengthOf(1);
        let appItem = res.body[0];
        expect(appItem.name).to.equal('test');
      })
      .end(done);
  });
});
