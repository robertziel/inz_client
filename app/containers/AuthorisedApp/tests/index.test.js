/* global context */

import React from 'react';

import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import App from '../index';

function shallowWrapper() {
  return shallow(<App store={store} />)
    .find('App')
    .shallow();
}

let store;
let wrapper;

beforeEach(() => {
  store = new ConfigureTestStore().store;
  wrapper = shallowWrapper();
});

describe('<App />', () => {
  it('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  context('when sidebar collapses', () => {

    it('should set marginLeft to <ContentWrapper />', () => {
      expect(wrapper.find('ContentWrapper').prop('marginLeft')).toBe(260);
    });

    it('should set marginLeft to <Footer />', () => {
      expect(wrapper.find('Footer').prop('marginLeft')).toBe(260);
    });
  });
});
