// @flow
import React from 'react';
import type { Node } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

type Props = {
  children: Node,
  title?: string,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(1),
  },
}));

const FilterBox = (props: Props) => {
  const { children, title } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {title && <Typography className={classes.title}>{title}</Typography>}
      {children}
    </div>
  );
};

FilterBox.defaultProps = {
  title: null,
};

export default FilterBox;
