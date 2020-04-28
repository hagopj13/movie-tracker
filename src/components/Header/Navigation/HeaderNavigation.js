// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

import authSelectors from 'store/auth/auth.selectors';
import { navigationItems } from 'config';

type Props = {
  isAuth: boolean,
};

const useStyles = makeStyles((theme) => ({
  navLink: {
    color: theme.palette.common.white,
    marginRight: theme.spacing(3),
    fontSize: theme.typography.h6.fontSize,
    '&:last-child': {
      marginRight: 0,
    },
  },
  selectedNavLink: {
    color: theme.palette.primary.main,
  },
}));

const HeaderNavigation = (props: Props) => {
  const { isAuth } = props;

  const classes = useStyles();

  return (
    <div>
      {navigationItems.map(
        (navItem) =>
          (isAuth || !navItem.requiresAuth) && (
            <Link
              key={navItem.id}
              component={NavLink}
              exact
              to={navItem.to}
              className={classes.navLink}
              activeClassName={classes.selectedNavLink}
            >
              {navItem.label}
            </Link>
          ),
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isAuth: authSelectors.selectIsAuth,
});

export default connect(mapStateToProps)(HeaderNavigation);
