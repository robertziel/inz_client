/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import PropTypes from 'prop-types';

import { Container, Divider, H1, Paper } from 'components/_ui-elements';

import Search from 'components/Search';
import messages from './messages';

export default function HomePage(props) {
  const categoryId = props.match.params.id;

  return (
    <Container>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>

      <Divider />
      <Search categoryId={categoryId} />
    </Container>
  );
}

HomePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};
