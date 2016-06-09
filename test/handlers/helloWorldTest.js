'use strict';

const expect = require('chai').expect;
const helloWorld = require('../../src/handlers/helloWorld');

describe('Hello World Handler', () => {
  it('should return a JSON hello world response', () => {
    const reply = (data) => {
      expect(data).to.eql({ msg: 'Hello World!' });
    }

    helloWorld(undefined, reply);
  });
});
