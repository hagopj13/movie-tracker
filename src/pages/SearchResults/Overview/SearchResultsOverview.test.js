import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { SearchResultsOverview } from './SearchResultsOverview';

describe('SearchResultsOverview component', () => {
  let shallow;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    const mockProps = {
      searchQuery: 'Some search query',
      totalResults: 100,
    };
    wrapper = shallow(<SearchResultsOverview {...mockProps} />);
  });

  it('should render the SearchResultsOverview component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
