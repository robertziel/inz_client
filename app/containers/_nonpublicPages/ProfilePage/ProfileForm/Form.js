import React, { useState } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Divider,
  Grid,
  SubmitButton,
  TextField,
} from 'components/_ui-elements';

import useApiFetcher from 'containers/BackendApiConnector/fetcher';

import messages from './messages';
import {
  profileUpdateFailedNotify,
  profileUpdateSucceededNotify,
} from './notifications';

function Form({ intl, user }) {
  const fetcher = useApiFetcher();

  // Form state
  const [errorMessages, setErrorMessages] = useState({});
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);
  const [street, setStreet] = useState(user.street);
  const [zipCode, setZipCode] = useState(user.zip_code);
  const [city, setCity] = useState(user.city);
  const [country, setCountry] = useState(user.country);
  const [phone, setPhone] = useState(user.phone);

  const onSubmit = (event) => {
    event.preventDefault();

    fetcher.post({
      disableRetry: true,
      path: '/profile',
      body: {
        email,
        password,
        password_confirmation: passwordConfirmation,
        username,
        street,
        zip_code: zipCode,
        city,
        country,
        phone,
      },
      afterSuccess: (result) => {
        if (result.profile) {
          profileUpdateSucceededNotify();
          setErrorMessages({});
        } else {
          setErrorMessages(result.error_messages);
          profileUpdateFailedNotify();
        }
      },
    });
  };

  const passwordErrorMessage = () => {
    const message = errorMessages.password ? `${errorMessages.password}. ` : '';
    return message + intl.formatMessage(messages.formPasswordLeaveBlank);
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid>
        <TextField
          defaultValue={username}
          label={intl.formatMessage(messages.formUsername)}
          type="text"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          variant="outlined"
          helperText={errorMessages.username}
          error={!!errorMessages.username}
        />
      </Grid>
      <Grid>
        <TextField
          defaultValue={email}
          label={intl.formatMessage(messages.formEmail)}
          type="email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          variant="outlined"
          helperText={errorMessages.email}
          error={!!errorMessages.email}
        />
      </Grid>
      <br />
      <Divider />
      <br />
      <Grid>
        <TextField
          label={intl.formatMessage(messages.formPassword)}
          type="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          variant="outlined"
          helperText={passwordErrorMessage()}
          error={!!errorMessages.password}
        />
      </Grid>
      <Grid>
        <TextField
          label={intl.formatMessage(messages.formPasswordConfirmation)}
          type="password"
          name="password_confirmation"
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          variant="outlined"
          helperText={errorMessages.password_confirmation}
          error={!!errorMessages.password_confirmation}
        />
      </Grid>
      <br />
      <h2>
        <FormattedMessage {...messages.formAddress} />
      </h2>
      <Divider />
      <Grid>
        <TextField
          defaultValue={street}
          label={intl.formatMessage(messages.formStreet)}
          type="street"
          name="street"
          onChange={(event) => setStreet(event.target.value)}
          variant="outlined"
          helperText={errorMessages.street}
          error={!!errorMessages.street}
        />
      </Grid>
      <Grid>
        <TextField
          defaultValue={zipCode}
          label={intl.formatMessage(messages.formZipCode)}
          type="zip_code"
          name="zip_code"
          onChange={(event) => setZipCode(event.target.value)}
          variant="outlined"
          helperText={errorMessages.zip_code}
          error={!!errorMessages.zip_cide}
        />
      </Grid>
      <Grid>
        <TextField
          defaultValue={city}
          label={intl.formatMessage(messages.formCity)}
          type="city"
          name="city"
          onChange={(event) => setCity(event.target.value)}
          variant="outlined"
          helperText={errorMessages.city}
          error={!!errorMessages.city}
        />
      </Grid>
      <Grid>
        <TextField
          defaultValue={country}
          label={intl.formatMessage(messages.formCountry)}
          type="country"
          name="country"
          onChange={(event) => setCountry(event.target.value)}
          variant="outlined"
          helperText={errorMessages.country}
          error={!!errorMessages.country}
        />
      </Grid>
      <Grid>
        <TextField
          defaultValue={phone}
          label={intl.formatMessage(messages.formPhone)}
          type="phone"
          name="phone"
          onChange={(event) => setPhone(event.target.value)}
          variant="outlined"
          helperText={errorMessages.phone}
          error={!!errorMessages.phone}
        />
      </Grid>
      <Grid>
        <SubmitButton processing={fetcher.processing}>
          <FormattedMessage {...messages.formButton} />
        </SubmitButton>
      </Grid>
    </form>
  );
}

Form.propTypes = {
  intl: intlShape.isRequired,
  user: PropTypes.object.isRequired,
};

export default injectIntl(Form);
