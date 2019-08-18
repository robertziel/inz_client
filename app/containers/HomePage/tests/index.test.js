import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import HomePage from '../index';

describe('<HomePage />', () => {
  it('should render and match the snapshot', () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <HomePage />
      </IntlProvider>,
    );
    expect(wrapper.html()).toMatchSnapshot();
  });
});
