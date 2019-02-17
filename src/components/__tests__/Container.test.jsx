import React from 'react';
import { shallow } from 'enzyme';
import Container from '../Container';


const wrapper = shallow(<Container />);

describe('Hello World', () => {
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
