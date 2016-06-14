import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import merge from 'lodash/merge';
import union from 'lodash/union';

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
      isLoading: false,
      isAddingApp: false,
      canAddApp: true
    }
  }

  createApp(app) {
    this.setState({ isLoading: true });
    this.props.client.request({
      path: '/apps',
      method: 'POST',
      payload: app
    }, (err, payload) => {
      let newState = {
        isLoading: false
      }

      if (!err) {
        const { app } = payload;
        newState.isAddingApp = false;
        newState.appEntities = merge({ [app._id]: app }, this.state.appEntities);
        newState.apps = union(this.state.apps, [app._id]);
        setTimeout(() => { this.setState({ canAddApp: true }) }, 200);
      }

      this.setState(newState);
    });
  }

  showForm(state) {
    this.setState({ isAddingApp: state, canAddApp: !state });
  }

  render() {
    let items = this.state.apps.map((appID) => {
      const entity = this.state.appEntities[appID];
      return (
        <li key={appID} className="app-list__item">
          <Application {...entity} />
        </li>
      );
    });

    let addButton = (
      <li className="app-list__item u-text-align-center" key="app-list-add-button">
        { items.length === 0 ? <p>There aren't any apps!</p> : null }
        <button
          className="button button--outlined"
          onClick={() => { this.showForm(true) }}>
          Add An Application
        </button>
      </li>
    );

    let appForm = (
      <li className="app-list__item" key="app-list-app-form">
        <ApplicationForm
          disabled={this.state.isLoading}
          cancelAdding={() => { this.showForm(false) }}
          createApp={this.createApp.bind(this)} />
      </li>
    );

    if (this.state.isAddingApp) {
      items.push(appForm);
    }

    if (this.state.canAddApp) {
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
