import React from 'react';

require('../styles/app.scss');
require('../styles/card.scss');
require('../styles/utilities.scss');

class Application extends React.Component {
  render() {
    return (
      <section className="card card__padded app">
        <h1 className="card__title">{this.props.name}</h1>
        <p className="app__description u-margin-an">{this.props.description}</p>
      </section>
    )
  }
}

export default Application;
