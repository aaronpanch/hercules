import React from 'react';
import Input from './InputComponent';
import FormRow from './FormRowComponent';

require('../styles/card.scss');
require('../styles/button.scss');

class ApplicationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appName: this.props.name || '',
      desc: this.props.description || '',
      owner: this.props.owner || '',
      repo: this.props.repo || ''
    }
  }

  render() {
    return (
      <section className="card">
        <div className="card__padded">
          <h1 className="card__title">Add Application</h1>
          <FormRow
            hint="Choose a unique name as an identifier for your app">
            <Input
              label="name"
              value={this.state.appName}
              onChange={e => {this.setState({ appName: e.target.value })}} />
          </FormRow>
          <FormRow>
            <Input
              label="description"
              value={this.state.desc}
              onChange={e => {this.setState({ desc: e.target.value })}} />
          </FormRow>
          <FormRow
            hint="Enter the GitHub repository details"
            >
            <div className="grid">
              <div className="grid-1">
                <Input
                  label="owner"
                  value={this.state.owner}
                  onChange={e => {this.setState({ owner: e.target.value })}} />
              </div>
              <p className="grid-0 u-margin-an" style={{ display: 'flex', alignItems: 'center' }}>/</p>
              <div className="grid-1">
                <Input
                  label="repo"
                  value={this.state.repo}
                  onChange={e => {this.setState({ repo: e.target.value })}} />
              </div>
            </div>
          </FormRow>
        </div>
        <div className="card__buttons">
          <button onClick={this.props.cancelAdding} className="button button--cancel">cancel</button>
          <button className="button button--primary">save</button>
        </div>
      </section>
    );
  }
}

ApplicationForm.propTypes = {
  cancelAdding: React.PropTypes.func.isRequired
};

export default ApplicationForm;
