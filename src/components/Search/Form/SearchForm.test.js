import React from 'react';
import { act } from 'react-dom/test-utils';
import { createShallow, createMount } from '@material-ui/core/test-utils';

import SearchForm from './SearchForm';

describe('SearchForm component', () => {
  let shallow;
  let mount;

  beforeAll(() => {
    shallow = createShallow();
    mount = createMount();
  });

  it('should render the SearchForm component correctly', () => {
    const selectedQuery = 'Some query';
    const mockProps = {
      selectedQuery,
      onSubmit: jest.fn(),
    };
    const wrapper = shallow(<SearchForm {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should change the SearchField value when the selected query changes', () => {
    const selectedQuery = 'Some query';
    const mockProps = {
      selectedQuery,
      onSubmit: jest.fn(),
    };
    const wrapper = mount(<SearchForm {...mockProps} />);
    const searchElement = wrapper.find('input');
    expect(searchElement.getDOMNode().value).toBe(selectedQuery);

    const newQuery = 'Some new query';
    wrapper.setProps({ selectedQuery: newQuery });
    expect(searchElement.getDOMNode().value).toBe(newQuery);
  });

  it('should call onSubmit when the form is submitted', async () => {
    const mockSubmit = jest.fn();
    const mockProps = {
      selectedQuery: '',
      onSubmit: mockSubmit,
    };
    const wrapper = mount(<SearchForm {...mockProps} />);

    const query = 'Some query';
    await act(async () => {
      const searchElement = wrapper.find('input');
      searchElement.getDOMNode().value = query;
      searchElement.getDOMNode().dispatchEvent(new Event('input'));

      wrapper.find('form').simulate('submit');
    });

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit.mock.calls[0][0]).toEqual({ query });
  });

  it('should not call onSubmit when the form is submitted with an empty query', async () => {
    const mockSubmit = jest.fn();
    const mockProps = {
      selectedQuery: 'Some query',
      onSubmit: mockSubmit,
    };
    const wrapper = mount(<SearchForm {...mockProps} />);

    const searchElement = wrapper.find('input');
    searchElement.getDOMNode().value = '';
    searchElement.getDOMNode().dispatchEvent(new Event('input'));

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });

    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
