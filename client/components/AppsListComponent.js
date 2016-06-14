import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

require('../styles/app-list.scss');
require('../styles/button.scss');
require('../styles/utilities.scss');

import Application from './ApplicationComponent';
import ApplicationForm from './ApplicationFormComponent';

class AppsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apps: this.props.initialData.apps,
      appEntities: this.props.initialData.entities,
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
    let items = this.state.apps.length > 0 ?
      this.state.apps.map((appName) => {
          const entity = this.state.appEntities[appName];
          return (
            <li key={appName} className="app-list__item">
              <Application {...entity} />
            </li>
          );
      }) :
      (<li className="app-list__item u-text-align-center">There aren't any apps!</li>);

    let addButton = (
      <li className="app-list__item u-text-align-center" key="app-list-add-button">
        <button
          className="button button--outlined"
          onClick={this.addItem.bind(this)}>
          Add An Application
        </button>
      </li>
    );

    let appForm = (
      <li className="app-list__item" key="app-list-app-form">
        <ApplicationForm cancelAdding={this.cancelAdding.bind(this)} />
      </li>
    );

    if (this.state.isAddingApp) {
      items.push(appForm);
    } else {
      items.push(addButton);
    }

    return (
      <ReactCSSTransitionGroup
        component="ul"
        className="app-list"
        transitionName="slide"
        transitionAppear={true}
        transitionAppearTimeout={325 + items.length * 100}
        transitionEnterTimeout={175}
        transitionLeaveTimeout={175}>
          {items}
      </ReactCSSTransitionGroup>
    )
  }
}

export default AppsList;
