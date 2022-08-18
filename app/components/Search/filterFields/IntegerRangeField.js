import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Divider, InputLabel } from '@material-ui/core';
import { TextField } from 'components/_ui-elements';

export class IntegerRangeField extends Component {
  constructor(props) {
    super(props);

    this.props = props;

    this.state = props.defaultValue ? props.defaultValue : {};

    this.onChange = this.onChange.bind(this);
  }

  onChange(field, value) {
    this.setState({ [field]: value }, () => {
      this.props.onChange(this.props.fieldKey, {
        from: this.state.from,
        to: this.state.to,
      });
    });
  }

  render() {
    return (
      <div>
        <Divider />
        <InputLabel htmlFor="component-helper">{this.props.label}</InputLabel>
        <TextField
          name={`${this.props.fieldKey}_from`}
          label="from"
          type="number"
          margin="normal"
          variant="outlined"
          defaultValue={this.state.from}
          onChange={event => this.onChange('from', event.target.value)}
        />
        <TextField
          name={`${this.props.fieldKey}_to`}
          label="to"
          type="number"
          margin="normal"
          variant="outlined"
          defaultValue={this.state.to}
          onChange={event => this.onChange('to', event.target.value)}
        />
      </div>
    );
  }
}

IntegerRangeField.propTypes = {
  defaultValue: PropTypes.object,
  label: PropTypes.string.isRequired,
  fieldKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
