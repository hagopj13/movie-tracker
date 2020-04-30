// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';

import Navigation from './Navigation/HeaderNavigation';
import Search from './Search/HeaderSearch';
import AuthButton from './AuthButton/HeaderAuthButton';

type Props = {
  onOpenDrawer: () => void,
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  toolbar: {
    justifyContent: 'center',
    minHeight: 64,
    padding: 0,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 4, 0, 5),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(3.5),
    },
    '& > *': {
      marginRight: theme.spacing(2.5),
      '&:last-child': {
        marginRight: 0,
      },
    },
  },
  offsetToolbar: {
    minHeight: 64,
  },
  menuIcon: {
    color: theme.palette.common.white,
    fontSize: 24,
  },
  searchContainer: {
    [theme.breakpoints.down('xs')]: {
      flexGrow: 1,
    },
  },
}));

const Header = (props: Props) => {
  const { onOpenDrawer } = props;
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.root} elevation={4}>
        <Toolbar className={classes.toolbar}>
          <Container className={classes.container}>
            <Hidden mdUp>
              <IconButton onClick={onOpenDrawer}>
                <MenuIcon className={classes.menuIcon} />
              </IconButton>
            </Hidden>
            <Hidden smDown>
              <Navigation />
            </Hidden>
            <Hidden xsDown>
              <Box flexGrow={1} />
            </Hidden>
            <Box className={classes.searchContainer}>
              <Search />
            </Box>
            <Hidden smDown>
              <AuthButton />
            </Hidden>
          </Container>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.offsetToolbar} />
    </>
  );
};

export default Header;
