/* global expect test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import adapter from 'enzyme-adapter-react-16';
import Homepage from '../../components/Homepage';

configure({ adapter: new adapter() });

describe('Hompeage component', () => {
  const component = shallow(
    <Homepage />
  );
  it('should match the homepage component snapshot', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
