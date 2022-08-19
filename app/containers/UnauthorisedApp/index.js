/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import { createSelector } from 'reselect';

import { Scroll } from 'components/_ui-elements';

import Navbar from 'components/Navbar/index';
import Footer from 'components/Footer/index';

import HomePage from 'containers/_publicPages/HomePage/Loadable';
import SignInPage from 'containers/_authPages/SignInPage/Loadable';
import SignUpPage from 'containers/_authPages/SignUpPage/Loadable';
import NotFoundPage from 'containers/_publicPages/NotFoundPage/Loadable';

import ContentWrapper from './ContentWrapper';

function App(props) {
  return (
    <ContentWrapper>
      <Navbar />
      <Scroll>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/category/:id" component={HomePage} />
          <Route exact path="/profile" element={ <Redirect to="/sign-in" /> } />
          <Route exact path="/sign-in" component={SignInPage} />
          <Route exact path="/sign-up" component={SignUpPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Scroll>
      <Footer />
    </ContentWrapper>
  );
}

export default App;
