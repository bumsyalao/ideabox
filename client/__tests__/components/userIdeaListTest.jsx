/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import adapter from 'enzyme-adapter-react-16';
import { UserIdeaList } from '../../components/Ideas/UserIdeaList';
import { UserIdeaCard } from '../../components/Ideas/UserIdeaCard';

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
    ideas: [{
      title: 'stuff',
      description: 'stuff',
      _id: '1abcdj',
      access: 'public',
      authorName: 'bunmi'
    }],
    getUserIdeas: jest.fn(() => Promise.resolve())
  };
  const component = shallow(
    <UserIdeaList {...props} />
  );
  const childComponent = shallow(
    <UserIdeaCard {...props} />
  );
  it('should match the Idea List Snapshot', () => {
    const tree = toJson(component);
    expect(component.find('IdeaList').length).toEqual(0);
    expect(tree).toMatchSnapshot();
  });

  it('should render component and subcomponent', () => {
    expect(childComponent.exists()).toBe(true);
    expect(component.exists()).toBe(true);
  });
  it('calls  componentWillMount method', () => {
    const componentWillMountSpy = jest.spyOn(
        component.instance(), 'componentWillMount'
      );
    component.instance().componentWillMount();
    expect(componentWillMountSpy).toHaveBeenCalled();
  });
});
