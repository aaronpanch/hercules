'use strict';

import React from 'react';
import classNames from 'classnames';

require('../styles/Input.scss');

class InputComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasText: this.isPresent(props.value)
    }
  }

  componentWillReceiveProps(newProps) {
    if (document.activeElement !== this.refs.inputNode) {
      this.setHasText(this.isPresent(newProps.value));
    }
  }

  isPresent(value = '') {
    return value.length > 0
  }

  setHasText(hasText) {
    this.setState({ hasText });
  }

  render() {
    const { className, onFocus, onBlur, label, ...other } = this.props;
    const inputClasses = classNames(
      'input-component',
      { 'has-text': this.state.hasText },
      { 'input-component--disabled': this.props.disabled },
      className
    );
    return (
      <div className={inputClasses}>
        <label className="input-component__label">{label}</label>
        <input
          ref="inputNode"
          className="input-component__input"
          onFocus={() => {this.setHasText(true)}}
          onBlur={event => {this.setHasText(event.target.value.length > 0)}}
          {...other}
        />
      </div>
    );
  }
}

InputComponent.displayName = 'Input';

InputComponent.propTypes = {
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired
};

InputComponent.defaultProps = {
  type: 'text'
};

export default InputComponent;
