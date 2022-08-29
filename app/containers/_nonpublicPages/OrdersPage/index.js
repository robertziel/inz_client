import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Divider, Grid, H1 } from 'components/_ui-elements';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import OrdersList from './OrdersList';
import messages from './messages';
import { useHistory } from "react-router-dom";
import { authenticationTokenSelector } from 'containers/BackendApiConnector/selectors';

function OrdersPage({ authenticationToken }) {
  const history = useHistory();

  if (authenticationToken === null) { history.push('/sign-in') };

  return (
    <Grid container fullHeight>
      <Grid item xs={12}>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <OrdersList />
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

export default connect(mapStateToProps)(OrdersPage);
