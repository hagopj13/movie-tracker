// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

import { selectIsAuth } from 'store/auth/auth.selectors';

type Props = {
  isAuth: boolean,
};

const useStyles = makeStyles((theme) => ({
  navLink: {
    color: theme.palette.common.white,
    margin: theme.spacing(0, 1),
  },
  selectedNavLink: {
    color: theme.palette.primary.main,
  },
}));

const Navigation = (props: Props) => {
  const { isAuth } = props;

  const classes = useStyles();

  return (
    <>
      <Link
        component={NavLink}
        exact
        to="/"
        className={classes.navLink}
        activeClassName={classes.selectedNavLink}
      >
        Discover
      </Link>
      {isAuth && (
        <Link
          component={NavLink}
          to="/profile"
          className={classes.navLink}
          activeClassName={classes.selectedNavLink}
        >
          Profile
        </Link>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  isAuth: selectIsAuth,
});

export default connect(mapStateToProps)(Navigation);
