// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useLocation, NavLink } from 'react-router-dom';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import authSelectors from 'store/auth/auth.selectors';
import navigationItems from 'config/navigationItems';

type Props = {
  isAuth: boolean,
};

export const DrawerNavigation = (props: Props) => {
  const { isAuth } = props;

  const location = useLocation();

  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <MenuList>
      {navigationItems.map(
        (navItem) =>
          (isAuth || !navItem.requiresAuth) && (
            <NavLink
              key={navItem.id}
              to={navItem.to}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <MenuItem selected={isActiveRoute(navItem.to)}>
                <ListItemIcon>{navItem.icon}</ListItemIcon>
                <ListItemText primary={navItem.label} />
              </MenuItem>
            </NavLink>
          ),
      )}
    </MenuList>
  );
};

const mapStateToProps = createStructuredSelector({
  isAuth: authSelectors.selectIsAuth,
});

export default connect(mapStateToProps)(DrawerNavigation);
