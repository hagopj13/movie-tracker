import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Popover from '@material-ui/core/Popover';
import Rating from '@material-ui/lab/Rating';

import RatingPopover from './RatingPopover';

describe('RatingPopover component', () => {
  let shallow;
  let isOpen;
  let initialValue;
  let wrapper;

  const mockClose = jest.fn();
  const mockChange = jest.fn();

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    isOpen = true;
    initialValue = 5;
    const mockProps = {
      isOpen,
      initialValue,
      onClose: mockClose,
      onChange: mockChange,
    };
    wrapper = shallow(<RatingPopover {...mockProps} />);
  });

  it('should render the RatingPopover component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should pass isOpen prop to Popover', () => {
    expect(wrapper.find(Popover).prop('open')).toBe(isOpen);
  });

  it('should set the initial value of Rating', () => {
    expect(wrapper.find(Rating).prop('value')).toBe(initialValue);
  });

  it('should change the value and call onChange when rating changes', () => {
    const newValue = 6;
    wrapper.find(Rating).prop('onChange')(null, newValue);
    expect(wrapper.find(Rating).prop('value')).toBe(newValue);
    expect(mockChange).toHaveBeenCalledTimes(1);
    expect(mockChange).toHaveBeenCalledWith(newValue);
  });

  it('should call onClose prop when Popover is closed', () => {
    wrapper.find(Popover).prop('onClose')();
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});
