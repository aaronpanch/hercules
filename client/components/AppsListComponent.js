import React from 'react';

require('../styles/app-list.scss');

import Application from './ApplicationComponent';

class AppsList extends React.Component {
  render() {
    return (
      <ul className="app-list">
        {this.props.apps.map((item, index) => {
          return (
            <li key={index} className="app-list__item">
              <Application {...item} />
            </li>
          );
        })}
      </ul>
    )
  }
}

export default AppsList;
