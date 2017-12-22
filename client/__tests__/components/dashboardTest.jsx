/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import adapter from 'enzyme-adapter-react-16';
import { Dashboard } from '../../components/Dashboard';

configure({ adapter: new adapter() });

describe('Hompeage component', () => {
  const spy = jest.fn();
  global.Materialize = { toast: jest.fn() };
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  afterEach(() => {
    spy.mockReset();
  });
  const props = {
    match: {
      path: '',
      url: ''
    },
    history: {
      push: spy
    },
    access: {
      isAuthenticated: false
    },
  };
  const component = shallow(
    <Dashboard {...props} />
  );

  it('should match the Dashboard component snapshot', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
