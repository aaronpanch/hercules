import React from 'react';
import classNames from 'classnames';

import Application from './ApplicationComponent';

require('../styles/app-detail.scss');

class AppDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      sideContent: null
    }
  }

  showMenu(content) {
    this.setState({ expanded: true, sideContent: content });
  }

  cancelMenu() {
    this.setState({ expanded: false })
    setTimeout(() => {
      this.setState({ sideContent: null });
    }, 300);
  }

  render() {
    let classes = classNames(
      'app-detail',
      { 'is-showing-menu': this.state.expanded }
    );

    return (
      <div className={classes}>
        <div className="app-detail__side">
          {this.state.sideContent}
        </div>
        <div className="app-detail__main">
          <Application {...this.props} selected={true} showMenu={this.showMenu.bind(this)} cancelMenu={this.cancelMenu.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default AppDetail;
