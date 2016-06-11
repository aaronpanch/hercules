import React from 'react';

import AppsList from './AppsListComponent';

let Root = (props) => (
  <AppsList apps={props.data.apps} />
);

export default Root;
