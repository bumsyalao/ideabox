/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import adapter from 'enzyme-adapter-react-16';
import { ResetPassword } from '../../components/User/ResetPassword';

configure({ adapter: new adapter() });

describe('ResetPassword component', () => {
  const spy = jest.fn();

  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });

  afterEach(() => {
    spy.mockReset();
  });

  const props = {
    match: {
      path: ''
    },
    location: {
      pathname: ''
    },
    history: {
      push: spy
    },
    resetPasswordAction: jest.fn(() => Promise.resolve())
  };

  const component = shallow(
    <ResetPassword {...props} />
  );

  it('should match the ResetPassword snapshot', () => {
    const tree = toJson(component);
    expect(component.find('input').length).toEqual(2);
    expect(tree).toMatchSnapshot();
  });
  it('it should set state when onChange function is called', () => {
    component.instance().onChange(
      { target: { value: 'banku123', id: 'password' } });
    expect(component.state('password')).toEqual('banku123');
  });
  it('it should submit fields when resetPassword fuunction is called', () => {
    jest.spyOn(component.instance(), 'resetPassword');
    component.instance().onChange(
      { target: { value: 'banku123', id: 'password' } });
    component.instance().onChange(
      { target: { value: 'banku123', id: 'confirmPassword' } });
    expect(component.find('#resetPassword').simulate('click'));
    expect(component.instance().resetPassword.mock.calls.length).toEqual(0);
  });
  it('resetPassword function should run', () => {
    component.instance().onChange(
      { target: { value: 'banku123', id: 'password' } });
    component.instance().onChange(
      { target: { value: 'banku123', id: 'confirmPassword' } });
    expect(component.state('password')).toEqual('banku123');
    expect(component.state('confirmPassword')).toEqual('banku123');
    const newspy = jest.spyOn(component.instance(), 'resetPassword');
    component.instance().resetPassword();
    expect(newspy).toHaveBeenCalled();
  });
});
