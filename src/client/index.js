import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import decode from 'jwt-decode';
import qs from 'qs';

import './styles/main.scss';
import Root from './components/Root';
import ajax from './ajax';

const query = qs.parse(window.location.search.substring(1));
let token;

if (query.token) {
  localStorage.setItem('herculesToken', query.token);
  token = query.token;
  history.replaceState({}, null, '/');
} else {
  token = localStorage.getItem('herculesToken');
}

function loginGithub() {
  window.location = '/connect/github';
}

try {
  const payload = decode(token);
  if (!(payload.exp > Date.now() / 1000)) {
    loginGithub()
  }
} catch (e) {
  loginGithub();
}

ajax('/apps').then((apps) => {
  ReactDOM.render(<Root initialData={apps} />, document.getElementById('app') );
});
