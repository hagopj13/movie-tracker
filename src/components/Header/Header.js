// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import SearchField from 'components/Search/SearchField/SearchField';
import Navigation from 'components/Navigation/Navigation';
import AuthButtons from 'components/Auth/Buttons/AuthButtons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.common.black,
  },
  toolbar: {
    boxSizing: 'border-box',
    padding: theme.spacing(1, 3, 1, 2),
    minHeight: 64,
    width: '100vw',
    '& > *': {
      margin: theme.spacing(0, 1),
    },
  },
  navigation: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="sticky" color="inherit" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.navigation}>
          <Navigation />
        </div>
        <SearchField />
        <AuthButtons />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
