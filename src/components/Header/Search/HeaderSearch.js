// @flow
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory, useLocation } from 'react-router-dom';

import searchActions from 'store/search/search.actions';
import searchSelectors from 'store/search/search.selectors';

import SearchForm from 'components/Search/Form/SearchForm';

type Props = {
  selectedSearchQuery: string,
  onSetSearchQuery: (query: string) => void,
};

export const HeaderSearch = (props: Props) => {
  const { selectedSearchQuery, onSetSearchQuery } = props;

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/search') {
      const urlSearchParams = new URLSearchParams(location.search);
      const urlSearchQuery = urlSearchParams.get('query');
      if (urlSearchQuery && urlSearchQuery !== selectedSearchQuery) {
        onSetSearchQuery(urlSearchQuery);
      }
    }
  }, [location, selectedSearchQuery, onSetSearchQuery]);

  const handleSubmit = ({ query }) => {
    if (query) {
      history.push(`/search?query=${query}`);
    }
  };

  return <SearchForm onSubmit={handleSubmit} selectedQuery={selectedSearchQuery} />;
};

const mapStateToProps = createStructuredSelector({
  selectedSearchQuery: searchSelectors.selectQuery,
});

const mapDispatchToProps = {
  onSetSearchQuery: searchActions.setSearchQuery,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearch);
