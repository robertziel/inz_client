import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SwappingSquaresSpinner } from 'react-epic-spinners';
import FontAwesome from 'react-fontawesome';
import { Link } from "react-router-dom";

import { colors } from 'styles/constants';
import { Button, SubmitButton } from 'components/_ui-elements';

import { nullifyAuthenticationCredentials } from 'containers/BackendApiConnector/actions';
import useApiFetcher from 'containers/BackendApiConnector/fetcher';
import StoreAccessor from 'containers/BackendApiConnector/StoreAccessor';

import { signedOutNotify } from './notifications';
import Wrapper from './Wrapper';
import { useHistory } from "react-router-dom";

function SignOutSignInButton({ onSignOutSuccess }) {
  const fetcher = useApiFetcher();
  const history = useHistory();

  const isSignedIn = StoreAccessor.store.getState().backendApiConnector.authenticationToken == null;

  const signOut = (event) => {
    event.preventDefault();

    fetcher.delete({
      disableRetry: true,
      path: '/auth/sign_out',
      afterSuccess: () => {
        history.push('/sign-in');
        onSignOutSuccess();
      },
    });
  };

  if (isSignedIn) {
    return (
      <Wrapper><Link to="/sign-in"><Button navbar><FontAwesome name="power-off" /></Button></Link></Wrapper>
    );
  }

  return (
    <Wrapper>
      <form onSubmit={signOut}>
        <SubmitButton
          navbar
          processing={fetcher.processing}
          spinner={<SwappingSquaresSpinner color={colors.main} size={40} />}
        >
          <FontAwesome name="power-off" />
        </SubmitButton>
      </form>
    </Wrapper>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onSignOutSuccess: () => {
      dispatch(nullifyAuthenticationCredentials());
      signedOutNotify();
    },
    dispatch,
  };
}

SignOutSignInButton.propTypes = {
  onSignOutSuccess: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(SignOutSignInButton);
