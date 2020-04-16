// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

import Search from 'components/Search/Search';
import Navigation from 'components/Navigation/Navigation';
import AuthButton from 'components/Auth/Buttons/AuthButton';
import colors from 'styles/colors.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: colors.darkBlue,
  },
  toolbar: {
    justifyContent: 'center',
    minHeight: 64,
    padding: 0,
  },
  toolbarContent: {
    alignItems: 'center',
    display: 'flex',
    padding: theme.spacing(0, 4, 0, 5),
    '& > *': {
      marginLeft: theme.spacing(2.5),
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
      <AppBar className={classes.root} elevation={4}>
        <Toolbar className={classes.toolbar}>
          <Container className={classes.toolbarContent}>
            <Navigation className={classes.navigation} />
            <Search />
            <AuthButton />
          </Container>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.offsetToolbar} />
    </>
  );
};

export default Header;
