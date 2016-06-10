import React from 'react';

require('../styles/app.scss');

class Application extends React.Component {
  render() {
    return (
      <section className="app">
        <h1 className="app__name">{this.props.name}</h1>
        <p className="app__desc">{this.props.description}</p>
      </section>
    )
  }
}

export default Application;
