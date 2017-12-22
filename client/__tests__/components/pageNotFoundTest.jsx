/* global expect test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import adapter from 'enzyme-adapter-react-16';
import PageNotFound from '../../components/PageNotFound';

configure({ adapter: new adapter() });

describe('Hompeage component', () => {
  const component = shallow(
    <PageNotFound />
  );
  it('should match the PageNotFound component snapshot', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
