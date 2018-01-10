/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import adapter from 'enzyme-adapter-react-16';
import { ViewIdea } from '../../components/Ideas/ViewIdea';

configure({ adapter: new adapter() });

describe('User Idea List component', () => {
  const spy = jest.fn();
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  afterEach(() => {
    spy.mockReset();
  });
  const props = {
    match: {
      params: {
        ideaId: '5a312d5c01ce62169e8900d3'
      }
    },
    idea: [{
      title: 'stuff',
      description: 'stuff',
      _id: '1abcdj',
      access: 'public',
      authorName: 'bunmi',
      comments: [
        {
          _id: 'abcd',
          authorName: 'Bunmi',
          comment: 'nice'
        }
      ]
    }],
    getIdea: jest.fn(() => Promise.resolve()),
    addComment: jest.fn(() => Promise.resolve()),
  };
  const component = shallow(
    <ViewIdea {...props} />
  );

  it('should match the Idea List Snapshot', () => {
    const tree = toJson(component);
    expect(component.find('IdeaList').length).toEqual(0);
    expect(tree).toMatchSnapshot();
  });

  it('should render component and subcomponent', () => {
    expect(component.exists()).toBe(true);
    expect(component.exists()).toBe(true);
  });
  it('calls  componentWillMount method', () => {
    const componentWillMountSpy = jest.spyOn(
        component.instance(), 'componentWillMount'
      );
    component.instance().componentWillMount();
    expect(componentWillMountSpy).toHaveBeenCalled();
  });
  it('should set state when onChange function is called', () => {
    component.instance().onChange({ target: { value: 'banku', id: 'comment' } });
    expect(component.state('comment')).toEqual('banku');
  });
  it('it should submit fields when onSubmit is called', () => {
    jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onChange({ target: { value: 'banku', id: 'comment' } });
    component.find('#submit-btn').simulate('click', { preventDefault: () => {} });
    expect(component.find('#submit-btn').length).toEqual(1);
    expect(component.instance().onSubmit.mock.calls.length).toEqual(0);
  });
});
