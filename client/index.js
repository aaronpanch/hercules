import 'isomorphic-fetch';

require('normalize.css');
require('./styles/main.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';

function callApi(endpoint) {
  return fetch(endpoint)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      return json;
    });
}

callApi('apps').then((data) => {
  ReactDOM.render(<Root data={data} />, document.getElementById('app') );
});
