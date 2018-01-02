/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import adapter from 'enzyme-adapter-react-16';
import { NavigationBar } from '../../components/NavigationBar';

configure({ adapter: new adapter() });

describe('NavigationBar component', () => {
  const spy = jest.fn();
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  afterEach(() => {
    spy.mockReset();
  });
  const props = {
    logoutRequest: spy,
    history: { push: spy },
    access: {
      username: 'bunmi',
      email: 'bunmi@email.com'
    }
  };
  const component = shallow(
    <NavigationBar {...props} />

  );

  it('should match the NavigationBar component snapshot', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('calls logout function', () => {
    const logoutSpy = jest.spyOn(
      component.instance(), 'logout'
    );
    component.instance().logout({ preventDefault: () => {} });
    expect(logoutSpy).toHaveBeenCalled();
  });
});
