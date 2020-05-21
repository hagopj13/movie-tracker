// @flow
import React from 'react';
import type { Node } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

type Props = {
  title: string,
  children: Node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

const MovieOverviewBodySection = (props: Props) => {
  const { title, children } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h5">
        {title}
      </Typography>
      {children}
    </div>
  );
};

export default MovieOverviewBodySection;
