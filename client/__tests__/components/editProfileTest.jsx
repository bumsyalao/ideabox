/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import adapter from 'enzyme-adapter-react-16';
import { EditProfile } from '../../components/User/EditProfile';


configure({ adapter: new adapter() });

describe('Edit Profile component', () => {
  const spy = jest.fn();
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  afterEach(() => {
    spy.mockReset();
  });
  const props = {
    history: {
      push: spy
    },
    access: {
      username: 'bunms',
      email: 'bunms@email.com'
    },
    editProfile: jest.fn(() => Promise.resolve())
  };
  const component = shallow(<EditProfile {...props} />);

  it('should render component', () => {
    expect(component.exists()).toBe(true);
  });
  it('should set state when onChange function is called', () => {
    component.instance().onChange({ target: { value: 'banku', id: 'username' } });
    expect(component.state('username')).toEqual('banku');
  });
  it('it should submit fields when editProfile is called', () => {
    jest.spyOn(component.instance(), 'editProfile');
    component.instance().onChange({ target: { value: 'banku', id: 'username' } });
    component.instance().onChange({ target: { value: 'banku@email.com', id: 'email' } });
    component.find('#submit-btn').simulate('click', { preventDefault: () => {} });
    expect(component.find('#submit-btn').length).toEqual(1);
    expect(component.instance().editProfile.mock.calls.length).toEqual(0);
  });

  it('it should update the state when props are changed', () => {
    const mountedComponent = shallow(
      <EditProfile {...props} />
    );
    mountedComponent.setState({
      username: 'bunms',
      email: 'bunmis@email.com'
    });
    const componentWillReceivePropsSpy = jest.spyOn(
      mountedComponent.instance(), 'componentWillReceiveProps'
    );
    const nextProps = spy;
    mountedComponent.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });
});
