import 'isomorphic-fetch';

require('normalize.css');
require('./styles/main.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import Nes from 'nes';

let client = new Nes.Client('ws://' + location.host);

client.connect(() => {
  client.request('/apps', function (err, payload) {
    ReactDOM.render(<Root initialData={payload} client={client} />, document.getElementById('app') );
  });
});
