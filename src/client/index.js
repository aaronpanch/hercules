require('./styles/main.scss');

import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';

import ajax from './ajax';

ajax('/apps').then((apps) => {
  ReactDOM.render(<Root initialData={apps} />, document.getElementById('app') );
});
