/* global context */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';
import { act } from 'react-dom/test-utils';

import NotificationSystem from 'containers/NotificationsSystem';
import IntlCatcher from 'containers/LanguageProvider/IntlCatcher';
import loadApiFetchMock from 'testsHelpers/loadApiFetchMock';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import {
  setAuthenticationToken,
  setCurrentUser,
} from 'containers/BackendApiConnector/actions';

import SignOutSignInButton from '../index';
import messages from '../messages';

const authenticationToken = 'a token';
const currentUser = { name: 'User' };
const submitPath = '/auth/sign_out';

let store;
let wrapper;

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <IntlCatcher>
        <Provider store={store}>
          <NotificationSystem />
          <SignOutSignInButton />
        </Provider>
      </IntlCatcher>
    </IntlProvider>,
  );
}

async function configureWrapper() {
  store = new ConfigureTestStore().store;
  await act(async () => {
    wrapper = mountWrapper();
  });
  return wrapper;
}

function clickButton() {
  wrapper.find('button[type="submit"]').simulate('submit');
}

const fetchMock = () => {
  loadApiFetchMock({
    method: 'DELETE',
    path: submitPath,
    responseBody: {},
    status: 200,
  });
};

beforeEach(() => {
  configureWrapper();
  act(() => {
    store.dispatch(setCurrentUser(currentUser));
    store.dispatch(setAuthenticationToken(authenticationToken));
  });
});

describe('<SignOutSignInButton />', () => {
  context('onClick', () => {
    context('when fetch succeeded', () => {
      fetchMock();

      it('should nullify backendApiConnector credentials', async () => {
        clickButton();

        await waitForExpect(() => {
          expect(
            store.getState().backendApiConnector.authenticationToken,
          ).toEqual(null);
          expect(store.getState().backendApiConnector.currentUser).toEqual(
            null,
          );
        });
      });

      it('should add signed out notification', async () => {
        clickButton();

        await waitForExpect(() => {
          expect(wrapper.text()).toContain(
            messages.signedOutNotify.defaultMessage,
          );
        });
      });
    });
  });
});
