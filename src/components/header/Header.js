import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import './header.scss';

const Header = () => (
  <div className="header">
    <div>Search</div>
    <div className="nav-links-section">
      <NavLink exact to="/" className="nav-link" activeClassName="selected-nav-link">
        Discover
      </NavLink>
      <NavLink to="/profile" className="nav-link" activeClassName="selected-nav-link">
        Profile
      </NavLink>
    </div>
    <div>
      <Button variant="contained">Signup</Button>
      <Button variant="contained" color="primary">
        Login
      </Button>
    </div>
  </div>
);

export default Header;
