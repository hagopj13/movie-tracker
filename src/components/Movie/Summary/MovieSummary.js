// @flow
import React from 'react';
import moment from 'moment';
import { makeStyles, styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

import type { Movie } from 'types';

type Props = {
  movie: Movie,
};

const SummarySection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  [theme.breakpoints.down('xs')]: {
    textAlign: 'center',
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  tagline: {
    marginTop: 0,
  },
  iconEmpty: {
    color: theme.palette.grey[500],
  },
}));

const MovieSummary = (props: Props) => {
  const { movie } = props;

  const classes = useStyles();

  const getReleaseYear = () => moment(movie.releaseDate).get('year');

  const renderTitle = () => (
    <SummarySection>
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
    </SummarySection>
  );

  const renderTagline = () =>
    movie.tagline && (
      <SummarySection className={classes.tagline}>
        <Typography className={classes.tagline} variant="h6">
          <Box fontStyle="italic" fontWeight="fontWeightLight">
            {movie.tagline}
          </Box>
        </Typography>
      </SummarySection>
    );

  const renderRating = () =>
    movie.voteCount ? (
      <SummarySection>
        <Box display="flex" alignItems="center">
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
      </SummarySection>
    ) : null;

  const renderGenres = () =>
    movie.genres?.length > 0 ? (
      <SummarySection>
        <Typography variant="h6">
          <Box component="span">Genres: </Box>
          <Box component="span" fontWeight="fontWeightLight">
            {movie.genres.map((genre) => genre.name).join(', ')}
          </Box>
        </Typography>
      </SummarySection>
    ) : null;

  const renderRuntime = () =>
    movie.runtime ? (
      <SummarySection>
        <Typography variant="h6">
          <Box component="span">Runtime: </Box>
          <Box component="span" fontWeight="fontWeightLight">
            {`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
          </Box>
        </Typography>
      </SummarySection>
    ) : null;

  const renderReleaseDate = () => (
    <SummarySection>
      <Typography variant="h6">
        <Box component="span">Release Date: </Box>
        <Box component="span" fontWeight="fontWeightLight">
          {movie.releaseDate ? moment(movie.releaseDate).format('MMM D, YYYY') : 'Unknown'}
        </Box>
      </Typography>
    </SummarySection>
  );

  const renderReleaseStatus = () => (
    <SummarySection>
      <Typography variant="h6">
        <Box component="span">Status: </Box>
        <Box component="span" fontWeight="fontWeightLight">
          {movie.status || 'Unknown'}
        </Box>
      </Typography>
    </SummarySection>
  );

  const renderOverview = () =>
    movie.overview && (
      <SummarySection>
        <Typography variant="h6">Overview</Typography>
        <Typography variant="h6">
          <Box fontWeight="fontWeightLight">{movie.overview}</Box>
        </Typography>
      </SummarySection>
    );

  return (
    <div className={classes.root}>
      {renderTitle()}
      {renderTagline()}
      {renderRating()}
      {renderGenres()}
      {renderRuntime()}
      {renderReleaseDate()}
      {renderReleaseStatus()}
      {renderOverview()}
    </div>
  );
};

export default MovieSummary;
