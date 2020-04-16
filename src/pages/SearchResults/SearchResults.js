// @flow
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Spinner from 'components/Spinner/Spinner';
import searchActions from 'store/search/search.actions';
import searchSelectors from 'store/search/search.selectors';
import SearchActionTypes from 'store/search/search.types';
import loadingSelectors from 'store/api/loading/loading.selectors';
import ConfigActionTypes from 'store/config/config.types';

import SearchResultsOverview from './SearchResultsOverview/SearchResultsOverview';
import SearchResultsList from './SearchResultsList/SearchResultsList';

type Props = {
  isLoading: boolean,
  selectedSearchQuery: string,
  onFetchMovies: () => void,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    padding: theme.spacing(5, 5, 2),
    display: 'flex',
    flexDirection: 'column',
  },
  overview: {
    marginBottom: theme.spacing(3),
  },
}));

const SearchResultsPage = (props: Props) => {
  const { isLoading, selectedSearchQuery, onFetchMovies } = props;

  const classes = useStyles();

  useLayoutEffect(() => {
    if (selectedSearchQuery) {
      onFetchMovies();
    }
  }, [onFetchMovies, selectedSearchQuery]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!selectedSearchQuery) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <div className={classes.overview}>
          <SearchResultsOverview />
        </div>
        <div>
          <SearchResultsList />
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: loadingSelectors.createIsLoadingSelector([
    ConfigActionTypes.GET_IMAGES_CONFIG,
    SearchActionTypes.FETCH_MOVIES,
  ]),
  selectedSearchQuery: searchSelectors.selectQuery,
});

const mapDispatchToProps = {
  onFetchMovies: searchActions.fetchMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsPage);
