// @flow
import React from 'react';
import type { Node } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { lightBlue } from '@material-ui/core/colors';

type Props = {
  children: Node,
  title: string,
  onClick: () => void,
};

const useStyles = makeStyles((theme) => ({
  tooltip: {
    fontSize: theme.typography.subtitle2.fontSize,
  },
  fab: {
    backgroundColor: lightBlue[800],
    '&:hover': {
      backgroundColor: lightBlue[900],
    },
  },
}));

const MovieActionButton = (props: Props, ref) => {
  const { children, title, onClick } = props;

  const classes = useStyles();

  return (
    <Tooltip classes={{ tooltip: classes.tooltip }} title={title}>
      <Fab className={classes.fab} ref={ref} size="medium" onClick={onClick}>
        {children}
      </Fab>
    </Tooltip>
  );
};

export default React.forwardRef<Props, Fab>(MovieActionButton);
