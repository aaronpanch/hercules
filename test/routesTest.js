'use strict';

const expect = require('chai').expect;

const routeConfig = require('../src/routes').config;
const find = require('lodash/find');

const helloWorld = require('../src/handlers/helloWorld');

describe('Routes', () => {
  it('should have an index route', () => {
    const route = find(routeConfig, (r) => { return r.path === '/' });
    expect(route).to.exist
    expect(route.method).to.equal('GET');
    expect(route.handler).to.equal(helloWorld);
  });
});
