// @flow
import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

import type { MovieDetails } from 'types';

const useStyles = makeStyles((theme) => ({
  iconEmpty: {
    color: theme.palette.grey[500],
  },
}));

type Props = {
  movie: MovieDetails,
};

const MovieSummary = (props: Props) => {
  const { movie } = props;

  const classes = useStyles();

  const getReleaseYear = () => moment(movie.releaseDate).get('year');

  const renderTitle = () => (
    <Typography>
      <Box component="span" fontWeight="fontWeightMedium" fontSize={34}>
        {movie.title}
      </Box>
      {movie.releaseDate && (
        <Box component="span" fontWeight="fontWeightLight" fontSize={34}>
          {` (${getReleaseYear()})`}
        </Box>
      )}
    </Typography>
  );

  const renderTagline = () =>
    movie.tagline && (
      <Typography variant="h6">
        <Box fontStyle="italic" fontWeight="fontWeightLight">
          {movie.tagline}
        </Box>
      </Typography>
    );

  const renderRating = () =>
    movie.voteCount ? (
      <Box display="flex" alignItems="center" mt={1}>
        <Rating
          classes={{ iconEmpty: classes.iconEmpty }}
          value={movie.voteAverage}
          precision={0.5}
          readOnly
        />
        <Box component="span" ml={0.75} fontWeight="fontWeightMedium" fontSize="h6.fontSize">
          {movie.voteAverage}
        </Box>
      </Box>
    ) : null;

  const renderGenres = () =>
    movie.genres && movie.genres.length > 0 ? (
      <Box mt={1}>
        <Typography variant="h6">
          <Box component="span">Genres: </Box>
          <Box component="span" fontWeight="fontWeightLight">
            {movie.genres.map((genre) => genre.name).join(', ')}
          </Box>
        </Typography>
      </Box>
    ) : null;

  const renderRuntime = () =>
    movie.runtime ? (
      <Box mt={1}>
        <Typography variant="h6">
          <Box component="span">Runtime: </Box>
          <Box component="span" fontWeight="fontWeightLight">
            {`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
          </Box>
        </Typography>
      </Box>
    ) : null;

  const renderReleaseStatus = () =>
    movie.releaseDate || movie.status ? (
      <Box mt={1}>
        <Typography variant="h6">
          <Box component="span">Release Date: </Box>
          <Box component="span" fontWeight="fontWeightLight">
            {movie.releaseDate ? moment(movie.releaseDate).format('MMM D, YYYY') : '-'}
          </Box>
          <Box component="span" ml={8}>
            {'Status: '}
          </Box>
          <Box component="span" fontWeight="fontWeightLight">
            {movie.status || '-'}
          </Box>
        </Typography>
      </Box>
    ) : null;

  const renderOverview = () =>
    movie.overview && (
      <Box mt={1}>
        <Typography variant="h6">Overview</Typography>
        <Typography variant="h6">
          <Box fontWeight="fontWeightLight">{movie.overview}</Box>
        </Typography>
      </Box>
    );

  return (
    <>
      {renderTitle()}
      {renderTagline()}
      {renderRating()}
      {renderGenres()}
      {renderRuntime()}
      {renderReleaseStatus()}
      {renderOverview()}
    </>
  );
};

export default MovieSummary;
