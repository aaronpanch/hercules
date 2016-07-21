import React from 'react';
import ajax from '../ajax';
import AppsList from './AppsListComponent';
import union from 'lodash/union';
import find from 'lodash/find';

import '../styles/base.scss';

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apps: this.props.initialData,
      isFocused: false
    }
  }

  addApp(app) {
    this.setState({
      apps: union(this.state.apps, [app])
    });
  }

  selectApp(id) {
    this.setState({
      isFocused: id
    });
  }

  render() {
    let apps = this.state.isFocused ? [find(this.state.apps, ['id', this.state.isFocused])] : this.state.apps;

    return (
      <AppsList apps={apps} addApp={this.addApp.bind(this)} selectApp={this.selectApp.bind(this)} />
    );
  }
}

export default Root;
