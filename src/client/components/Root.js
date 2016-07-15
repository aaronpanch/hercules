import React from 'react';
import ajax from '../ajax';
import AppsList from './AppsListComponent';
import union from 'lodash/union';

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apps: this.props.initialData
    }
  }

  addApp(app) {
    console.log('adding');
    this.setState({
      apps: union(this.state.apps, [app])
    });
  }

  render() {
    return (
      <AppsList apps={this.state.apps} addApp={this.addApp.bind(this)} />
    );
  }
}

export default Root;
