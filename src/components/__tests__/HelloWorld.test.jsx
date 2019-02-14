import React from 'react';
import { shallow } from 'enzyme';
import HelloWorld from '../HelloWorld';


const wrapper = shallow(<HelloWorld />);

describe('Hello World', () => {
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
