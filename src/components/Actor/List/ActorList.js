// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import type { Actor } from 'types';

import ActorListItem from './Item/ActorListItem';

type Props = {
  actors: Actor[],
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(-2.25, 0, 0, -2.25),
    '& > *': {
      margin: theme.spacing(2.25, 0, 0, 2.25),
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
  },
  noActorsText: {
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export const ActorList = (props: Props) => {
  const { actors } = props;

  const classes = useStyles();

  if (actors.length === 0) {
    return (
      <Typography className={classes.noActorsText} variant="h6">
        No actors found
      </Typography>
    );
  }

  return (
    <div className={classes.root}>
      {actors.map((actor) => (
        <ActorListItem key={actor.id} actor={actor} />
      ))}
    </div>
  );
};

export default ActorList;
