require('./styles/main.scss');

import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';

function ajax(url) {
  return fetch(url, { credentials: 'same-origin' })
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      return json;
    });
}

ajax('/apps').then((apps) => {
  ReactDOM.render(<Root initialData={apps} />, document.getElementById('app') );
});
