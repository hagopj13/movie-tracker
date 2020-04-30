// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import brokenPage from './brokenPage.png';

type Props = {
  errorText: string,
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: '80vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '40vh',
    height: '40vh',
    marginBottom: theme.spacing(3),
  },
  errorText: {
    fontWeight: theme.typography.fontWeightMedium,
    textAlign: 'center',
  },
}));

const ErrorPage = (props: Props) => {
  const { errorText } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img className={classes.image} src={brokenPage} alt="page broken" />
      <Typography className={classes.errorText} color="primary" variant="h3">
        {errorText}
      </Typography>
    </div>
  );
};

export default ErrorPage;
