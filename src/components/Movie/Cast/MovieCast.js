// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import ActorCard from 'components/Actor/Card/ActorCard';
import { Actor } from 'types';

type Props = {
  cast: Actor[],
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(-2.25, 0, 0, -2.25),
    '& > *': {
      margin: theme.spacing(2.25, 0, 0, 2.25),
    },
  },
}));

const MovieCast = (props: Props) => {
  const { cast } = props;

  const classes = useStyles();

  if (cast.length === 0) {
    return <Typography>No actors found</Typography>;
  }

  return (
    <div className={classes.root}>
      {cast.map((actor) => (
        <ActorCard key={actor.id} actor={actor} />
      ))}
    </div>
  );
};

export default MovieCast;
