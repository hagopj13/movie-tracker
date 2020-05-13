import React from 'react';
import { shallow } from 'enzyme';

import Attribution from './Attribution';

describe('Attribution component', () => {
  it('should render Attribution component', () => {
    const wrapper = shallow(<Attribution />);
    expect(wrapper).toMatchSnapshot();
  });
});
