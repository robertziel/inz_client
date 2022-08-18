import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from 'components/_ui-elements';

export function StringField(props) {
  return (
    <div>
      <TextField
        name={props.fieldKey}
        label={props.label}
        type="search"
        margin="normal"
        variant="outlined"
        defaultValue={props.defaultValue}
        onChange={event => props.onChange(props.fieldKey, event.target.value)}
      />
    </div>
  );
}

StringField.propTypes = {
  defaultValue: PropTypes.string,
  label: PropTypes.string.isRequired,
  fieldKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
