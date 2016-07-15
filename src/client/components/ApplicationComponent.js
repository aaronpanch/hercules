import React from 'react';

require('../styles/app.scss');
require('../styles/card.scss');
require('../styles/table.scss');
require('../styles/utilities.scss');

import DeploymentForm from './DeploymentFormComponent';

class Application extends React.Component {
  constructor() {
    super();
  }

  render() {
    let environments = null;
    if (this.props.selected) {
      environments = (
        <div>
          <h2 className="card__subtitle">Environments</h2>
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: '10%' }}>Active</th>
                <th style={{ width: '25%' }}>Name</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="u-text-align-center"><input type="checkbox" /></td>
                <td>production</td>
                <td>Amazon AWS</td>
              </tr>
              <tr>
                <td className="u-text-align-center"><input type="checkbox" /></td>
                <td>qa</td>
                <td>Amazon AWS</td>
              </tr>
              <tr>
                <td className="u-text-align-center"><input type="checkbox" /></td>
                <td>branchlab</td>
                <td>Heroku</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    let history = null;
    if (this.props.selected) {
      history = (
        <div>
          <h2 className="card__subtitle">Deployment History</h2>
          <table className="table">
            <tbody>
              <tr>
                <td>Aaron Panchal deployed @ref master to production 10 min ago.</td>
              </tr>
              <tr>
                <td>Aaron Panchal deployed @ref master to production 1 hour ago.</td>
              </tr>
              <tr>
                <td>Aaron Panchal deployed @ref master to production 1.2 hours ago.</td>
              </tr>
            </tbody>
          </table>

          <div style={{marginTop: '1rem', textAlign: 'right'}}>
            <button className="button button--secondary" onClick={() => { this.props.showMenu(<DeploymentForm cancel={this.props.cancelMenu}/>) }}>create deployment</button>
          </div>
        </div>
      );
    }

    return (
      <section className="card card__padded app" onClick={this.handleClick}>
        <h1 className="card__title">{this.props.name}</h1>
        <p className="app__description u-margin-an">{this.props.description}</p>
        { environments }
        { history }
      </section>
    )
  }
}

export default Application;
