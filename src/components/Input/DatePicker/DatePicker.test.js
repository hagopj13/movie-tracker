import React from 'react';
import moment from 'moment';
import { createShallow } from '@material-ui/core/test-utils';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';

import DatePicker from './DatePicker';

describe('DatePicker component', () => {
  let shallow;
  let label;
  let selectedDate;
  let wrapper;

  const mockDateChange = jest.fn();

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    label = 'Some label';
    selectedDate = moment('2020-01-01');
    const mockProps = {
      label,
      selectedDate,
      onDateChange: mockDateChange,
    };
    wrapper = shallow(<DatePicker {...mockProps} />);
  });

  it('should render the DatePicker component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the label', () => {
    expect(wrapper.find(Typography).text()).toBe(label);
  });

  it('should pass the selectedDate prop as value to the KeyboardDatePicker', () => {
    expect(wrapper.find(KeyboardDatePicker).prop('value')).toBe(selectedDate);
  });

  it('should call the onDateChange prop with new date when the selected date changed', () => {
    const newDate = selectedDate.clone().add(1, 'day');
    wrapper.find(KeyboardDatePicker).prop('onChange')(newDate);
    expect(mockDateChange).toHaveBeenLastCalledWith(newDate);
  });
});
