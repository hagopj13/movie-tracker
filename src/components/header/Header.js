import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import './header.scss';

const useStyles = makeStyles((theme) => ({
  buttons: {
    '& > *': {
      textTransform: 'none',
      margin: theme.spacing(0.5),
    },
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className="header">
      <div>Search</div>
      <div className="nav-section">
        <NavLink exact to="/" className="nav-link" activeClassName="selected-nav-link">
          Discover
        </NavLink>
        <NavLink to="/profile" className="nav-link" activeClassName="selected-nav-link">
          Profile
        </NavLink>
      </div>
      <div className={classes.buttons}>
        <Button variant="contained">Signup</Button>
        <Button variant="contained" color="primary">
          Login
        </Button>
        <Button variant="contained">Logout</Button>
      </div>
    </div>
  );
};

export default Header;
