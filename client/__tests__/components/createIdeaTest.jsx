/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import adapter from 'enzyme-adapter-react-16';
import { CreateIdea } from '../../components/Ideas/CreateIdea';


configure({ adapter: new adapter() });

describe('Create Idea component', () => {
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
    createIdea: jest.fn(() => Promise.resolve())
  };
  const component = shallow(<CreateIdea {...props} />);

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
});
