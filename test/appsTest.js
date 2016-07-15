'use strict';

require('./integrationHelper');

describe('Apps Resource', () => {
  it('should list apps', (done) => {
    Models.App.create({ name: 'test', description: 'desc' });

    request(App)
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
