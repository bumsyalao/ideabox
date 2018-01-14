
/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import adapter from 'enzyme-adapter-react-16';
import { Auth } from '../../components/User/Auth';

configure({ adapter: new adapter() });

xdescribe('Auth Component', () => {
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
    access: {
      isAuthenticated: false
    },
    history: {
      push: spy
    },
    loginRequest: jest.fn(() => Promise.resolve()),
    registerRequest: jest.fn(() => Promise.resolve())
  };
  const component = shallow(
    <Auth {...props} />
  );

  it('should match the Auth snapshot', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  it('should set state when onChange function is called', () => {
    component.instance().onChange(
      { target: { value: 'banku', id: 'username' } });
    expect(component.state('username')).toEqual('banku');
  });
  it(
    'should submit fields in state when onRegister function is called', () => {
      jest.spyOn(component.instance(), 'onRegister');
      component.instance().onChange(
      { target: { value: 'banku', id: 'username' } });
      component.instance().onChange(
      { target: { value: 'banku@email.com', id: 'email' } });
      component.instance().onChange(
      { target: { value: 'banku123', id: 'password' } });
      component.find('#register-btn').simulate('click', { preventDefault: () => {} });
      expect(component.find('#register-btn').length).toEqual(1);
      expect(component.instance().onSubmit.mock.calls.length).toEqual(0);
    });

  it('should register user when onRegister function is called', () => {
    component.instance().onChange(
      { target: { value: 'banku', id: 'username' } });
    component.instance().onChange(
      { target: { value: 'banku@email.com', id: 'email' } });
    component.instance().onChange(
      { target: { value: 'banku123', id: 'password' } });
    expect(component.state('username')).toEqual('banku');
    expect(component.state('email')).toEqual('banku@email.com');
    expect(component.state('password')).toEqual('banku123');
    const newspy = jest.spyOn(component.instance(), 'onRegister');
    component.find('#register-btn').simulate('click', { preventDefault: () => {} });
    expect(newspy).toHaveBeenCalled();
  });

  it(
    'should submit fields in state when onLogin function is called', () => {
      jest.spyOn(component.instance(), 'onLogin');
      component.instance().onChange(
      { target: { value: 'banku', id: 'username' } });
      component.instance().onChange(
      { target: { value: 'banku123', id: 'password' } });
      component.find('#login-btn').simulate('click', { preventDefault: () => {} });
      expect(component.find('#login-btn').length).toEqual(1);
      expect(component.instance().onSubmit.mock.calls.length).toEqual(0);
    });
  it('should login user when onLogin function is called', () => {
    component.instance().onChange(
      { target: { value: 'banku', id: 'username' } });
    component.instance().onChange(
      { target: { value: 'banku123', id: 'password' } });
    expect(component.state('username')).toEqual('banku');
    expect(component.state('password')).toEqual('banku123');
    const newspy = jest.spyOn(component.instance(), 'onLogin');
    component.find('#login-btn').simulate('click', { preventDefault: () => {} });
    expect(newspy).toHaveBeenCalled();
  });
});
