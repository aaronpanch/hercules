'use strict';

require('./helper');

global.request = require('supertest');
global.application = require('../app').callback();
