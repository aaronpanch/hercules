import React from 'react';

require('../styles/app-list.scss');
require('../styles/button.scss');
require('../styles/utilities.scss');

import Application from './ApplicationComponent';
import ApplicationForm from './ApplicationFormComponent';

class AppsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddingApp: false
    }
  }

  addItem() {
    this.setState({ isAddingApp: true });
  }

  cancelAdding() {
   this.setState({ isAddingApp: false });
  }

  render() {
    let items = this.props.apps.length > 0 ?
      this.props.apps.map((item) => {
          return (
            <li key={item.name} className="app-list__item">
              <Application {...item} />
            </li>
          );
      }) :
      (<li className="app-list__item u-text-align-center">There aren't any apps!</li>);

    let addButton = (
      <button
        className="button button--outlined"
        onClick={this.addItem.bind(this)}>
        Add An Application
      </button>
    );

    return (
      <ul className="app-list">
        {items}
        <li className="app-list__item">
          {this.state.isAddingApp ? <ApplicationForm cancelAdding={this.cancelAdding.bind(this)} /> : null}
        </li>
        <li className="app-list__item u-text-align-center">
          {this.state.isAddingApp ? null : addButton}
        </li>
      </ul>
    )
  }
}

export default AppsList;
