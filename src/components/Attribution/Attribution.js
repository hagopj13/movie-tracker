// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import tmdbLogo from './tmdbLogo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 3),
    display: 'flex',
    alignItems: 'center',
    minWidth: 270,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      maxWidth: 330,
    },
  },
  logo: {
    width: 110,
    height: 52,
    marginRight: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      marginBottom: theme.spacing(2),
    },
  },
  text: {
    fontWeight: theme.typography.fontWeightRegular,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
}));

const Attribution = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <img className={classes.logo} src={tmdbLogo} alt="tmdb logo" />
      <Typography className={classes.text} variant="h6">
        This product uses the TMDb API but is not endorsed or certified by TMDb.
      </Typography>
    </Paper>
  );
};

export default Attribution;
