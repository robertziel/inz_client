import React, { useState } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getCart } from './../selectors';
import { clearCart } from './../actions';

import {
  Divider,
  Grid,
  SubmitButton,
  TextField,
} from 'components/_ui-elements';

import useApiFetcher from 'containers/BackendApiConnector/fetcher';

import messages from './messages';
import {
  orderCreationFailedNotify,
  orderCreationSucceededNotify,
} from './notifications';

function Form({ intl, user, cart, clearCart }) {
  const fetcher = useApiFetcher();

  // Form state
  const [errorMessages, setErrorMessages] = useState({});
  const [street, setStreet] = useState(user.street);
  const [zipCode, setZipCode] = useState(user.zip_code);
  const [city, setCity] = useState(user.city);
  const [country, setCountry] = useState(user.country);
  const [phone, setPhone] = useState(user.phone);

  const onSubmit = (event) => {
    event.preventDefault();

    let products = []

    Object.keys(cart).forEach(key => {
      products.push({ id: cart[key].id, amount: cart[key].amount });
    });

    fetcher.post({
      disableRetry: true,
      path: '/orders',
      body: {
        street,
        zip_code: zipCode,
        city,
        country,
        phone,
        products
      },
      afterSuccess: (result) => {
        if (result.success) {
          orderCreationSucceededNotify();
          setErrorMessages({});
          clearCart();
        } else {
          setErrorMessages(result.error_messages);
          orderCreationFailedNotify();
        }
      },
    });
  };

  if (Object.keys(cart).length === 0) {
    return (
      <h2>No products picked.</h2>
    )
  }

  return (
    <form onSubmit={onSubmit}>
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

function mapDispatchToProps(dispatch) {
  return {
    clearCart: () => {
      dispatch(clearCart());
    },
    dispatch,
  };
}

const mapStateToProps = createSelector(getCart(), cart => ({
  cart,
}));

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Form));
