// @flow
import React from 'react';

import SearchField from 'components/Search/SearchField/SearchField';
import Navigation from 'components/Navigation/Navigation';
import AuthButtons from 'components/Auth/Buttons/AuthButtons';

import './header.scss';

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
