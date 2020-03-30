import React from 'react';

import './header.scss';
import SearchField from '../Search/SearchField/SearchField';
import Navigation from './Navigation/Navigation';
import AuthButtons from '../Auth/Buttons/AuthButtons';

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
