import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import MenuItem from '@material-ui/core/MenuItem';

import { sortOptions } from 'config';

import Select from './Select';

describe('Select component', () => {
  let shallow;
  let options;
  let selectedValue;
  let mockValueChange;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    options = sortOptions;
    selectedValue = options[0].value;
    mockValueChange = jest.fn();
    const mockProps = {
      options,
      selectedValue,
      onValueChange: mockValueChange,
    };
    wrapper = shallow(<Select {...mockProps} />);
  });

  it('should render the Select component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a MenuItem for each option', () => {
    expect(wrapper.find(MenuItem)).toHaveLength(options.length);
  });

  it('should render the option label as a child of MenuItem', () => {
    expect(wrapper.find(MenuItem).at(0).text()).toBe(options[0].label);
  });

  it('should pass the selectedValue prop as value prop to Select', () => {
    expect(wrapper.prop('value')).toBe(selectedValue);
  });

  it('should call the onValueChange prop when the selected option changes', () => {
    const newValue = options[1].value;
    wrapper.prop('onChange')({ target: { value: newValue } });
    expect(mockValueChange).toHaveBeenLastCalledWith(newValue);
  });
});
