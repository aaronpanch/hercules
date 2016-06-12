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
