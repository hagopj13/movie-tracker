// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiDrawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Navigation from './Navigation/DrawerNavigation';
import AuthButton from './AuthButton/DrawerAuthButton';

type Props = {
  isOpen: boolean,
  onClose: () => void,
};

const DRAWER_WIDTH = 240;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    minHeight: 64,
  },
}));

const Drawer = (props: Props) => {
  const { isOpen, onClose } = props;

  const classes = useStyles();

  return (
    <MuiDrawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <div role="presentation" onClick={onClose}>
        <Navigation />
      </div>
      <Divider />
      <div role="presentation" onClick={onClose}>
        <AuthButton />
      </div>
    </MuiDrawer>
  );
};

export default Drawer;
