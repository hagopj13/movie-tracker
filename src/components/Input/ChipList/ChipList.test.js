import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Chip from '@material-ui/core/Chip';

import { genres } from 'store/fixtures/config';

import ChipList from './ChipList';

describe('ChipList component', () => {
  let shallow;
  let items;
  let selectedItems;
  let wrapper;

  const mockItemClick = jest.fn();

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    items = genres;
    selectedItems = [];
    const mockProps = {
      items,
      selectedItems,
      onItemClick: mockItemClick,
    };
    wrapper = shallow(<ChipList {...mockProps} />);
  });

  it('should render the ChipList component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a Chip for each item', () => {
    expect(wrapper.find(Chip)).toHaveLength(items.length);
  });

  it('should set the Chip label to the item name', () => {
    expect(wrapper.find(Chip).at(0).prop('label')).toBe(items[0].name);
  });

  it('should call the onItemClick prop with the clicked item id', () => {
    wrapper.find(Chip).at(0).simulate('click');
    expect(mockItemClick).toHaveBeenLastCalledWith(items[0].id);
  });

  it('should set the primary color on the Chip if the item is selected', () => {
    selectedItems = [items[1].id];
    const mockProps = {
      items,
      selectedItems,
      onItemClick: mockItemClick,
    };
    const newWrapper = shallow(<ChipList {...mockProps} />);
    expect(newWrapper.find(Chip).at(1).prop('color')).toBe('primary');
    expect(newWrapper.find(Chip).at(0).prop('color')).toBe('default');
  });
});
