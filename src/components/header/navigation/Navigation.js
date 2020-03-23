import React from 'react';
import { NavLink } from 'react-router-dom';

import './navigation.scss';

const Navigation = () => (
  <div className="navigation">
    <NavLink exact to="/" className="nav-link" activeClassName="selected">
      Discover
    </NavLink>
    <NavLink to="/profile" className="nav-link" activeClassName="selected">
      Profile
    </NavLink>
  </div>
);

export default Navigation;