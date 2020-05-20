import React from 'react';
import { useLocation } from 'react-router-dom';
import { createShallow } from '@material-ui/core/test-utils';

import { mountWithStore } from 'testUtils';
import SearchForm from 'components/Search/Form/SearchForm';

import { HeaderSearch } from './HeaderSearch';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('HeaderSearch component', () => {
  let shallow;
  let selectedSearchQuery;
  let wrapper;

  const mockSetSearchQuery = jest.fn();

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    useLocation.mockReturnValue({ pathname: '/search', search: `?query=${selectedSearchQuery}` });
    selectedSearchQuery = 'Some query';
    const mockProps = {
      selectedSearchQuery,
      onSetSearchQuery: mockSetSearchQuery,
    };
    wrapper = shallow(<HeaderSearch {...mockProps} />);
  });

  it('should render the HeaderSearch component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should set the "selectedQuery" prop of the SearchForm component', () => {
    expect(wrapper.find(SearchForm).prop('selectedQuery')).toBe(selectedSearchQuery);
  });

  it('should push new query to history when SearchForm is submitted', () => {
    const newSearchQuery = 'Some new query';
    wrapper.find(SearchForm).prop('onSubmit')({ query: newSearchQuery });
    expect(mockHistoryPush).toHaveBeenLastCalledWith(`/search?query=${newSearchQuery}`);
  });

  it('should set the new search query after mounting', () => {
    const newSearchQuery = 'Some new query';
    useLocation.mockReturnValue({ pathname: '/search', search: `?query=${newSearchQuery}` });
    const mockProps = {
      selectedSearchQuery,
      onSetSearchQuery: mockSetSearchQuery,
    };
    mountWithStore(<HeaderSearch {...mockProps} />);
    expect(mockSetSearchQuery).toHaveBeenLastCalledWith(newSearchQuery);
  });

  it('should not set the search query after mounting if the query has not changed', () => {
    const mockProps = {
      selectedSearchQuery,
      onSetSearchQuery: mockSetSearchQuery,
    };
    mountWithStore(<HeaderSearch {...mockProps} />);
    expect(mockSetSearchQuery).not.toHaveBeenCalled();
  });
});
