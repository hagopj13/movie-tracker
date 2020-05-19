import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Chip from '@material-ui/core/Chip';

import { genres } from 'store/fixtures/config';

import ChipsList from './ChipsList';

describe('ChipsList component', () => {
  let shallow;
  let items;
  let mockItemClick;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    items = genres;
    mockItemClick = jest.fn();
    const mockProps = {
      items,
      selectedItems: [],
      onItemClick: mockItemClick,
    };
    wrapper = shallow(<ChipsList {...mockProps} />);
  });

  it('should render the ChipsList component correctly', () => {
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
    const mockProps = {
      items,
      selectedItems: [items[1].id],
      onItemClick: mockItemClick,
    };
    const newWrapper = shallow(<ChipsList {...mockProps} />);
    expect(newWrapper.find(Chip).at(1).prop('color')).toBe('primary');
    expect(newWrapper.find(Chip).at(0).prop('color')).toBe('default');
  });
});
