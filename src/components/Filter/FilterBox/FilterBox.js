// @flow
import React from 'react';
import type { Node } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

type Props = {
  children: Node,
  title: string,
};

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 270,
  },
  title: {
    fontWeight: theme.typography.fontWeightBold,
    padding: theme.spacing(1, 2),
  },
  filters: {
    diplay: 'flex',
    flexDirection: 'column',
  },
}));

const FilterBox = (props: Props) => {
  const { children, title } = props;

  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={3}>
      <Typography className={classes.title} variant="h6">
        {title}
      </Typography>
      <Divider />
      <div className={classes.filters}>{children}</div>
    </Paper>
  );
};

export default FilterBox;
