import React from 'react';

import './header.scss';
import SearchField from '../searchField/SearchField';
import Navigation from './navigation/Navigation';
import AuthButtons from '../auth/authButtons/AuthButtons';

const Header = () => (
  <div className="header">
    <div className="left">
      <SearchField />
    </div>
    <div>
      <Navigation />
    </div>
    <div className="right">
      <AuthButtons />
    </div>
  </div>
);

export default Header;
