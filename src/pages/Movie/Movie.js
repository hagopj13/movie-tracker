// @flow
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import MovieActionTypes from 'store/movie/movie.types';
import movieActions from 'store/movie/movie.actions';
import loadingSelectors from 'store/api/loading/loading.selectors';
import ConfigActionTypes from 'store/config/config.types';
import Spinner from 'components/Spinner/Spinner';

type Props = {
  isLoading: boolean,
  onFetchMovie: (id: string) => void,
};

const useStyles = makeStyles((theme) => ({
  spinnerContainer: {
    marginTop: theme.spacing(5),
  },
}));

const MoviePage = (props: Props) => {
  const { isLoading, onFetchMovie } = props;

  const { id } = useParams();

  const classes = useStyles();

  useLayoutEffect(() => {
    if (id) {
      onFetchMovie(id);
    }
  }, [id, onFetchMovie]);

  if (isLoading) {
    return (
      <Container className={classes.spinnerContainer}>
        <Spinner />
      </Container>
    );
  }

  return (
    <div>
      MoviePage for movie with id=
      {id}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: loadingSelectors.createIsLoadingSelector([
    MovieActionTypes.FETCH_MOVIE,
    ConfigActionTypes.FETCH_IMAGES_CONFIG,
  ]),
});

const mapDispatchToProps = {
  onFetchMovie: movieActions.fetchMovie,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
