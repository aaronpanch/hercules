import React from 'react';
import Input from './InputComponent';
import FormRow from './FormRowComponent';

require('../styles/side-menu.scss');

class DeploymentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ref: '',
      environment: ''
    }
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
            <button className="button button--primary">start!</button>
          </div>
        </div>
      </section>
    );
  }
}

export default DeploymentForm;
