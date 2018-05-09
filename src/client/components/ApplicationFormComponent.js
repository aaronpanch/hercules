import React from 'react';
import PropTypes from 'prop-types';
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
      repo: this.props.repo || '',
    };

    this.cancel = this.cancel.bind(this);
    this.create = this.create.bind(this);
  }

  cancel() {
    this.props.cancelAdding();
  }

  create(e) {
    this.props.createApp({
      name: this.state.appName,
      description: this.state.desc,
      owner: this.state.owner,
      repo: this.state.repo,
    });
  }

  render() {
    return (
      <section className="card">
        <div className="card__padded">
          <h1 className="card__title">Add Application</h1>
          <FormRow hint="Choose a unique name as an identifier for your app">
            <Input
              label="name"
              disabled={this.props.disabled}
              value={this.state.appName}
              onChange={e => {
                this.setState({ appName: e.target.value });
              }}
            />
          </FormRow>
          <FormRow>
            <Input
              label="description"
              disabled={this.props.disabled}
              value={this.state.desc}
              onChange={e => {
                this.setState({ desc: e.target.value });
              }}
            />
          </FormRow>
          <FormRow hint="Enter the GitHub repository details">
            <div className="grid">
              <div className="grid-1">
                <Input
                  label="owner"
                  disabled={this.props.disabled}
                  value={this.state.owner}
                  onChange={e => {
                    this.setState({ owner: e.target.value });
                  }}
                />
              </div>
              <p
                className="grid-0 u-margin-an"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                /
              </p>
              <div className="grid-1">
                <Input
                  label="repo"
                  disabled={this.props.disabled}
                  value={this.state.repo}
                  onChange={e => {
                    this.setState({ repo: e.target.value });
                  }}
                />
              </div>
            </div>
          </FormRow>
        </div>
        <div className="card__buttons">
          <button onClick={this.cancel} className="button button--cancel">
            cancel
          </button>
          <button className="button button--primary" onClick={this.create}>
            save
          </button>
        </div>
      </section>
    );
  }
}

ApplicationForm.propTypes = {
  cancelAdding: PropTypes.func.isRequired,
};

export default ApplicationForm;
