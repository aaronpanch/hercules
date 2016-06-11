import React from 'react';

require('../styles/app-list.scss');

import Application from './ApplicationComponent';

class AppsList extends React.Component {
  render() {

    let items = this.props.apps.length > 0 ?
      this.props.apps.map((item, index) => {
          return (
            <li key={index} className="app-list__item">
              <Application {...item} />
            </li>
          );
      }) :
      (<li className="app-list__item app-list__message">There aren't any apps!</li>);

    return (
      <ul className="app-list">
        {items}
        <li className="app-list__item app-list__message">
          <button className="app-list__button">Add An Application</button>
        </li>
      </ul>
    )
  }
}

export default AppsList;
