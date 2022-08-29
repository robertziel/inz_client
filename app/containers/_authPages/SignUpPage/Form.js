import React, { useState } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SubmitButton, Button, Note, Grid, TextField } from 'components/_ui-elements';

import { setAuthenticationToken } from 'containers/BackendApiConnector/actions';
import useApiFetcher from 'containers/BackendApiConnector/fetcher';
import { Link } from "react-router-dom";

import messages from './messages';
import { signedUpNotify } from './notifications';
import { useHistory } from "react-router-dom";

function Form({ intl, onSignUpSuccess }) {
  const fetcher = useApiFetcher();
  const history = useHistory();

  // Form state
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();

    fetcher.post({
      disableRetry: true,
      signUp: true,
      path: '/auth/sign_up',
      body: {
        email,
        password,
        password_confirmation: passwordConfirmation,
      },
      afterSuccess: (result) => {
        setErrorMessage(result.error_message);

        if (result.success) {
          signedUpNotify();
          history.push('/sign-in');
        }
      },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid>
        <Note error message={errorMessage} />
      </Grid>
      <Grid>
        <TextField
          label={intl.formatMessage(messages.formEmail)}
          type="email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          variant="outlined"
        />
      </Grid>
      <Grid>
        <TextField
          label={intl.formatMessage(messages.formPassword)}
          type="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          variant="outlined"
        />
      </Grid>
      <Grid>
        <TextField
          label={intl.formatMessage(messages.formPasswordConfirmation)}
          type="password"
          name="password_confirmation"
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          variant="outlined"
        />
      </Grid>
      <Grid>
        <SubmitButton processing={fetcher.processing}>
          <FormattedMessage {...messages.formButton} />
        </SubmitButton>
      </Grid>
      <Grid>
        <Link to="sign-in">
          <Button>
            <FormattedMessage {...messages.signInButton} />
          </Button>
        </Link>
      </Grid>
    </form>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onSignUpSuccess: (token) => dispatch(setAuthenticationToken(token)),
    dispatch,
  };
}

Form.propTypes = {
  intl: intlShape.isRequired,
  onSignUpSuccess: PropTypes.func,
};

export default injectIntl(connect(null, mapDispatchToProps)(Form));
