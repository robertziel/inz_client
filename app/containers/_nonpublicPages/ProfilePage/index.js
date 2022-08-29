import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Divider, Grid, H1 } from 'components/_ui-elements';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import AvatarForm from './AvatarForm';
import ProfileForm from './ProfileForm';
import messages from './messages';
import { useHistory } from "react-router-dom";
import { authenticationTokenSelector } from 'containers/BackendApiConnector/selectors';

function ProfilePage({ authenticationToken }) {
  const history = useHistory();

  if (authenticationToken === null) { history.push('/sign-in') };

  return (
    <Grid container>
      <Grid item xs={12}>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <Divider />
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <AvatarForm />
      </Grid>
      <Grid item xs={12} md={6} lg={5}>
        <ProfileForm />
      </Grid>
    </Grid>
  );
}

function mapStateToProps() {
  return createSelector(
    authenticationTokenSelector(),
    (authenticationToken) => ({
      authenticationToken,
    }),
  );
}

export default connect(mapStateToProps)(ProfilePage);
