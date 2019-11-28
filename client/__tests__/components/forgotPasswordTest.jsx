/* global expect jest jest */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import adapter from 'enzyme-adapter-react-16';
import { ForgotPassword } from '../../components/User/ForgotPassword';

configure({ adapter: new adapter() });

describe('ForgotPassword component', () => {
  const spy = jest.fn();
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  afterEach(() => {
    spy.mockReset();
  });
  const props = {
    forgotPasswordAction: jest.fn(() => Promise.resolve()),
    history: {
      push: spy
    }
  };
  const component = shallow(
    <ForgotPassword {...props} />
  );
  it('should match the ForgotPassword snapshot', () => {
    const tree = toJson(component);
    expect(component.find('input').length).toEqual(1);
    expect(tree).toMatchSnapshot();
  });
  it('should set state when onChange function is called', () => {
    component.instance().onChange(
      { target: { value: 'banku@email.com', id: 'email' } });
    expect(component.state('email')).toEqual('banku@email.com');
  });

  it('forgotPassword function should run', () => {
    component.instance().onChange(
      { target: { value: 'banku@email.com', id: 'email' } });
    expect(component.state('email')).toEqual('banku@email.com');
    component.find('#submit-forgotPassword').simulate('click');
    expect(component.find('#submit-forgotPassword').length).toEqual(1);
  });
});
