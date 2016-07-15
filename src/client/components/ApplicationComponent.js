import React from 'react';

require('../styles/app.scss');
require('../styles/card.scss');
require('../styles/utilities.scss');

class Application extends React.Component {
  constructor() {
    super();

    this.state = {
      expanded: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ expanded: true });
  }

  render() {
    return (
      <section className="card card__padded app" onClick={this.handleClick}>
        <h1 className="card__title">{this.props.name}</h1>
        <p className="app__description u-margin-an">{this.props.description}</p>
      </section>
    )
  }
}

export default Application;
