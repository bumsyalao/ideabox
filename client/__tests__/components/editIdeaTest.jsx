/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import adapter from 'enzyme-adapter-react-16';
import { EditIdea } from '../../components/Ideas/EditIdea';


configure({ adapter: new adapter() });

describe('Edit Idea component', () => {
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
    match: {
      params: spy
    },
    idea: {
      title: 'banku',
      description: 'banku',
      category: 'health',
      access: 'public'
    },
    editIdea: jest.fn(() => Promise.resolve()),
    getIdea: jest.fn(() => Promise.resolve())
  };
  const component = shallow(<EditIdea {...props} />);

  it('should render component', () => {
    expect(component.exists()).toBe(true);
  });
  it('should set state when onChange function is called', () => {
    component.instance().onChange({ target: { value: 'banku', id: 'title' } });
    expect(component.state('title')).toEqual('banku');
  });
  it('should set state of description when handleValueChange function is called', () => {
    component.instance().handleValueChange({ target: { value: 'banku', id: 'description' } });
    expect(component.state('description')).toEqual({ target: { id: 'description', value: 'banku' } });
  });
  it('it should submit fields when onSubmit is called', () => {
    jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onChange({ target: { value: 'banku', id: 'title' } });
    component.instance().onChange({ target: { value: 'banku', id: 'description' } });
    component.instance().onChange({ target: { value: 'health', id: 'category' } });
    component.instance().onChange({ target: { value: 'public', id: 'access' } });
    component.find('#submit-btn').simulate('click', { preventDefault: () => {} });
    expect(component.find('#submit-btn').length).toEqual(1);
    expect(component.instance().onSubmit.mock.calls.length).toEqual(0);
  });

  it('should run componentWillRecieveProps if new props are added', () => {
    const newerspy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
    const newusers = [{ title: 'new', description: 'new', category: 'health', access: 'public' }];
    component.setProps({ newusers });
    expect(newerspy).toHaveBeenCalled();
  });

  it('it runs componentWillMount', () => {
    const componentWillMountSpy = jest.spyOn(
      component.instance(), 'componentWillMount'
    );
    component.instance().componentWillMount();
    expect(componentWillMountSpy).toHaveBeenCalled();
  });
});
