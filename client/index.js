import 'isomorphic-fetch';

require('normalize.css');
require('./styles/main.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import callApi from './api';

callApi('apps').then((data) => {
  ReactDOM.render(<Root data={data} />, document.getElementById('app') );
});
