/* global context */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';

import NotificationSystem from 'containers/NotificationsSystem';
import loadApiFetchMock from 'testsHelpers/loadApiFetchMock';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import Form from '../Form';
import messages from '../messages';

const authenticationToken = 'a token';
const errorMessage = 'Error message';
const email = 'test@gmail.com';
const password = '12345678';
const submitPath = '/auth/sign_in';

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <Provider store={store}>
        <NotificationSystem />
        <Form />
      </Provider>
    </IntlProvider>,
  );
}

function fillInAndSubmitForm() {
  wrapper
    .find('input[name="email"]')
    .simulate('change', { target: { value: email } });
  wrapper
    .find('input[name="password"]')
    .simulate('change', { target: { value: password } });

  wrapper.find('button[type="submit"]').simulate('submit');
}

let store;
let wrapper;

beforeEach(() => {
  store = new ConfigureTestStore().store;
  wrapper = mountWrapper();
});

describe('<Form />', () => {
  context('when sign in succeeded', () => {
    loadApiFetchMock({
      method: 'POST',
      path: submitPath,
      requestBody: { email, password },
      responseBody: { authentication_token: authenticationToken },
      status: 200,
    });

    it('should save new authenticationToken in redux store', async () => {
      fillInAndSubmitForm();

      await waitForExpect(() => {
        expect(
          store.getState().backendApiConnector.authenticationToken,
        ).toEqual(authenticationToken);
      });
    });

    it('should add signed in notification', async () => {
      fillInAndSubmitForm();

      await waitForExpect(() => {
        expect(wrapper.text()).toContain(
          messages.signedInNotify.defaultMessage,
        );
      });
    });
  });

  context('when sign in not succeeded', () => {
    loadApiFetchMock({
      method: 'POST',
      path: submitPath,
      requestBody: { email, password },
      responseBody: { error_message: errorMessage },
      status: 401,
    });

    it('should render an error message', async () => {
      fillInAndSubmitForm();

      await waitForExpect(() => {
        wrapper.update();
        expect(wrapper.find('.error-message').contains(errorMessage)).toEqual(
          true,
        );
      });
    });
  });
});