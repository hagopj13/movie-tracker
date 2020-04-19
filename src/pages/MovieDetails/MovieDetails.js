// @flow
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import MovieDetailsActionTypes from 'store/movieDetails/movieDetails.types';
import movieDetailsActions from 'store/movieDetails/movieDetails.actions';
import loadingSelectors from 'store/api/loading/loading.selectors';
import ConfigActionTypes from 'store/config/config.types';
import Spinner from 'components/Spinner/Spinner';

type Props = {
  isLoading: boolean,
  onFetchMovieDetails: (id: string) => void,
};

const useStyles = makeStyles((theme) => ({
  spinnerContainer: {
    marginTop: theme.spacing(5),
  },
}));

const MovieDetailsPage = (props: Props) => {
  const { isLoading, onFetchMovieDetails } = props;

  const { id } = useParams();

  const classes = useStyles();

  useLayoutEffect(() => {
    if (id) {
      onFetchMovieDetails(id);
    }
  }, [id, onFetchMovieDetails]);

  if (isLoading) {
    return (
      <Container className={classes.spinnerContainer}>
        <Spinner />
      </Container>
    );
  }

  return (
    <div>
      MovieDetailsPage for movie with id=
      {id}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: loadingSelectors.createIsLoadingSelector([
    MovieDetailsActionTypes.FETCH_MOVIE_DETAILS,
    ConfigActionTypes.FETCH_IMAGES_CONFIG,
  ]),
});

const mapDispatchToProps = {
  onFetchMovieDetails: movieDetailsActions.fetchMovieDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsPage);
