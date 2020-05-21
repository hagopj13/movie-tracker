import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Typography from '@material-ui/core/Typography';

import ErrorPage from './ErrorPage';

describe('ErrorPage page', () => {
  let shallow;
  let errorText;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    errorText = 'Some error text';
    const mockProps = {
      errorText,
    };
    wrapper = shallow(<ErrorPage {...mockProps} />);
  });

  it('should render the ErrorPage page correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the error text', () => {
    expect(wrapper.find(Typography).text()).toBe(errorText);
  });
});
