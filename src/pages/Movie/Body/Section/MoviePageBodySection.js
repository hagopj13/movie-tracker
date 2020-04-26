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
  title: {
    marginBottom: theme.spacing(2),
  },
}));

const MoviePageBodySection = (props: Props) => {
  const { title, children } = props;

  const classes = useStyles();

  return (
    <div>
      {title && (
        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>
      )}
      {children}
    </div>
  );
};

export default MoviePageBodySection;
