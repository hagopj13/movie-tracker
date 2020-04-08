// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

import SearchField from 'components/Search/SearchField/SearchField';
import Navigation from 'components/Navigation/Navigation';
import AuthButton from 'components/Auth/Buttons/AuthButton';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.black,
  },
  toolbar: {
    justifyContent: 'center',
    minHeight: 64,
    padding: 0,
    width: '100vw',
  },
  toolbarContent: {
    alignItems: 'center',
    display: 'flex',
    padding: theme.spacing(0, 5),
    '& > *': {
      marginLeft: theme.spacing(3),
    },
    '& > :first-child': {
      marginLeft: 0,
    },
  },
  navigation: {
    flexGrow: 1,
  },
  offsetToolbar: {
    minHeight: 64,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar color="inherit" className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <Container className={classes.toolbarContent}>
            <Navigation className={classes.navigation} />
            <SearchField />
            <AuthButton />
          </Container>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.offsetToolbar} />
    </>
  );
};

export default Header;
