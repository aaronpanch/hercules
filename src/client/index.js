require('./styles/main.scss');

import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import qs from 'qs';
import ajax from './ajax';
import decode from 'jwt-decode';

const query = qs.parse(window.location.search.substring(1));
if (query.token) {
  localStorage.setItem('herculesToken', query.token);
  history.replaceState({}, null, '/');
}

let token = localStorage.getItem('herculesToken');

try {
  const payload = decode(token);

  if (!(payload.exp > Date.now() / 1000)) {
    window.location = '/connect/github';
  }
} catch (e) {
  window.location = '/connect/github';
}

ajax('/apps').then((apps) => {
  ReactDOM.render(<Root initialData={apps} />, document.getElementById('app') );
});
