import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import DialogTitle from './DialogTitle';

describe('DialogTitle component', () => {
  let shallow;
  const title = 'Some title';
  let mockClose;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    mockClose = jest.fn();
    const mockProps = {
      title,
      onClose: mockClose,
    };
    wrapper = shallow(<DialogTitle {...mockProps} />);
  });

  it('should render the DialogTitle component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the title', () => {
    expect(wrapper.find(Typography).at(0).text()).toBe(title);
  });

  it('should trigger the onClose prop when close icon is clicked', () => {
    wrapper.find(IconButton).simulate('click');
    expect(mockClose).toHaveBeenCalled();
  });
});
