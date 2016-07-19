import React from 'react';
import Input from './InputComponent';
import FormRow from './FormRowComponent';

import ajax from '../ajax';

require('../styles/side-menu.scss');

class DeploymentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ref: '',
      environment: ''
    }
  }

  createDeployment() {
    ajax(`/apps/${this.props.appID}/createDeployment`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ref: this.state.ref,
        environment: this.state.environment
      })
    }).then((payload) => {
      console.log(payload);
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <section className="side-menu">
        <div className="card">
          <div className="card__padded">
            <h1 className="card__title">Create Deployment</h1>
            <FormRow
              hint="Can be a branch, tag, or SHA">
              <Input
                label="ref"
                value={this.state.ref}
                onChange={e => {this.setState({ ref: e.target.value })}} />
            </FormRow>
            <FormRow>
              <Input
                label="environment"
                value={this.state.environment}
                onChange={e => {this.setState({ environment: e.target.value })}} />
            </FormRow>
          </div>
          <div className="card__buttons">
            <button className="button button--cancel" onClick={this.props.cancel}>cancel</button>
            <button className="button button--primary" onClick={this.createDeployment.bind(this)}>start!</button>
          </div>
        </div>
      </section>
    );
  }
}

export default DeploymentForm;
