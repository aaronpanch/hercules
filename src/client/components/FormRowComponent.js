import React from 'react';
import classNames from 'classnames';

require('../styles/form-row.scss');
require('../styles/grid.scss');

class FormRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false
    }
  }

  render() {
    let {children, hint, error} = this.props;

    const formRowClasses = classNames(
      'form-row',
      { 'is-active': this.state.isActive }
    );

    const messageClass = classNames({
      'form-row__error': error,
      'form-row__hint': !error && hint
    });

    return (
      <div className={formRowClasses}>
        <div
          className="form-row__controls"
          onFocus={() => { this.setState({ isActive: true })}}
          onBlur={() => { this.setState({ isActive: false })}}
          children={children} />
        <div className="form-row__message">
          {error || hint ? <p className={messageClass}>{error || hint}</p> : null}
        </div>
      </div>
    );
  }
}

export default FormRow;
