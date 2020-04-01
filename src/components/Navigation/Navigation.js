// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { NavLink } from 'react-router-dom';

import { selectIsAuth } from 'store/auth/auth.selectors';

import './navigation.scss';

type Props = {
  isAuth: boolean,
};

const Navigation = (props: Props) => {
  const { isAuth } = props;

  return (
    <div className="navigation">
      <NavLink exact to="/" className="nav-link" activeClassName="nav-link-selected">
        Discover
      </NavLink>
      {isAuth && (
        <NavLink to="/profile" className="nav-link" activeClassName="nav-link-selected">
          Profile
        </NavLink>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isAuth: selectIsAuth,
});

export default connect(mapStateToProps)(Navigation);
