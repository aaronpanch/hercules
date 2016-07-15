import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ajax from '../ajax';

require('../styles/app-list.scss');
require('../styles/button.scss');
require('../styles/utilities.scss');

import Application from './ApplicationComponent';
import ApplicationForm from './ApplicationFormComponent';

class AppsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isAddingApp: false,
      canAddApp: true
    }
  }

  createApp(app) {
    this.setState({ isLoading: true });
    ajax('/apps', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(app)
    }).then((app) => {
      this.setState({
        isLoading: false,
        isAddingApp: false
      });

      this.props.addApp(app);
      setTimeout(() => { this.setState({ canAddApp: true }) }, 200);

    }).catch((err) => {
      this.setState({ isLoading: false });
    });
  }

  showForm(state) {
    this.setState({ isAddingApp: state, canAddApp: !state });
  }

  render() {
    let items = this.props.apps.map((app) => {
      return (
        <li key={app.id} className="app-list__item">
          <Application {...app} />
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