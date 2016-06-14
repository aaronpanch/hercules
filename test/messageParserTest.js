'use strict';

require('./helper');

const deployCommandParser = require('../src/messageParser').parseDeploy;

describe('Deploy Command Parser', () => {
  it('should parse command without branch', () => {
    expect(deployCommandParser('myapp to production')).to.eql({
      appName: 'myapp',
      branch: 'master',
      environment: 'production'
    });
  });

  it('should parse full command', () => {
    expect(deployCommandParser('myapp/something-cool-here to production')).to.eql({
      appName: 'myapp',
      branch: 'something-cool-here',
      environment: 'production'
    });
  });

  it('should return undefined malformed commands', () => {
    expect(deployCommandParser('')).to.be.undefined
    expect(deployCommandParser('myapp')).to.be.undefined
    expect(deployCommandParser('myapp to')).to.be.undefined
    expect(deployCommandParser('my app to')).to.be.undefined
    expect(deployCommandParser('to production')).to.be.undefined
    expect(deployCommandParser('myapp/cool branch to')).to.be.undefined
  });
});
