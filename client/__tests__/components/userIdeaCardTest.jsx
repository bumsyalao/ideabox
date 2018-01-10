/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import adapter from 'enzyme-adapter-react-16';
import { UserIdeaCard } from '../../components/Ideas/UserIdeaCard';

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
    deleteIdea: jest.fn(() => Promise.resolve())
  };
  const component = shallow(
    <UserIdeaCard {...props} />
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

  it('calls onDelete function', () => {
    const onDeleteSpy = jest.spyOn(
        component.instance(), 'onDelete'
      );
    const ideaId = '5a312d5c01ce62169e8900d3';
    component.instance().onDelete(ideaId);
    expect(onDeleteSpy).toHaveBeenCalled();
  });
});
