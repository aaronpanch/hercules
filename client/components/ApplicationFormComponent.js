import React from 'react';
import Input from './InputComponent';

require('../styles/card.scss');
require('../styles/button.scss');

class ApplicationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appName: this.props.name || '',
      desc: this.props.description || '',
      repo: this.props.repo || ''
    }
  }

  render() {
    return (
      <section className="card">
        <div className="card__padded">
          <h1 className="card__title">Add Application</h1>
          <Input
            label="name"
            value={this.state.appName}
            onChange={e => {this.setState({ appName: e.target.value })}} />
          <Input
            label="description"
            value={this.state.desc}
            onChange={e => {this.setState({ desc: e.target.value })}} />
          <Input
            label="github repo"
            value={this.state.repo}
            onChange={e => {this.setState({ repo: e.target.value })}} />
        </div>
        <div className="card__buttons">
          <button onClick={this.props.cancelAdding} className="button">cancel</button>
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
