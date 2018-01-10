/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import adapter from 'enzyme-adapter-react-16';
import { IdeaList } from '../../components/Ideas/IdeaList';
import { IdeaCard } from '../../components/Ideas/IdeaCard';

configure({ adapter: new adapter() });

describe('List Idea component', () => {
  const spy = jest.fn();
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  afterEach(() => {
    spy.mockReset();
  });
  const props = {
    foundIdeas: [{
      title: 'stuff',
      description: 'stuff',
      _id: '1abcdj',
      access: 'public',
      authorName: 'bunmi'
    }],
    getIdeas: jest.fn(() => Promise.resolve()),
    getPublicIdeas: jest.fn(() => Promise.resolve()),
    searchIdeas: jest.fn(() => Promise.resolve())
  };
  const component = shallow(
    <IdeaList {...props} />
  );
  const childComponent = shallow(
    <IdeaCard {...props} />
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

  it('should run componentWillRecieveProps if new props are added', () => {
    const newerspy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
    const foundIdeas = [{ title: 'stuff',
      description: 'stuff',
      _id: '1abcdj',
      access: 'public',
      authorName: 'bunmi' }];
    const pagination = { pageCount: '', count: '' };
    component.setProps({ foundIdeas, pagination });
    expect(newerspy).toHaveBeenCalled();
  });

  it('calls onSearch function', () => {
    const onSearchSpy = jest.spyOn(
        component.instance(), 'onSearch'
      );
    component.setState({
      title: 'stuff',
      description: 'stuff',
      id: '1abcdj',
      access: 'public',
      authorName: 'bunmi'
    });
    component.instance().onSearch();
    expect(onSearchSpy).toHaveBeenCalled();
  });
});
