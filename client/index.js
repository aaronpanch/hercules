require('./styles/main.scss');

import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';

function ajax(url) {
  return fetch(url)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      return json;
    });
}

ajax('/apps').then((payload) => {
  ReactDOM.render(<Root initialData={payload} />, document.getElementById('app') );
});
