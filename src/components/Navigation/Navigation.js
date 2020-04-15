// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

import authSelectors from 'store/auth/auth.selectors';

type Props = {
  isAuth: boolean,
  className: string,
};

const useStyles = makeStyles((theme) => ({
  navLink: {
    color: theme.palette.common.white,
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
  },
  selectedNavLink: {
    color: theme.palette.primary.main,
  },
}));

const Navigation = (props: Props) => {
  const { isAuth, className } = props;

  const classes = useStyles();

  return (
    <div className={className}>
      <Link
        component={NavLink}
        exact
        to="/"
        className={classes.navLink}
        activeClassName={classes.selectedNavLink}
      >
        Discover
      </Link>
      <Link
        component={NavLink}
        exact
        to="/upcoming"
        className={classes.navLink}
        activeClassName={classes.selectedNavLink}
      >
        Upcoming
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
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isAuth: authSelectors.selectIsAuth,
});

export default connect(mapStateToProps)(Navigation);
