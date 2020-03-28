import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './header.scss';
import SearchField from '../Search/SearchField/SearchField';
import Navigation from './Navigation/Navigation';
import AuthButtons from '../Auth/Buttons/AuthButtons';
import { selectIsAuth } from '../../store/auth/auth.selectors';

type Props = {
  isAuth: boolean,
};

const Header = (props: Props) => {
  const { isAuth } = props;

  return (
    <div className="header">
      <div className="left">
        <SearchField />
      </div>
      <div>
        <Navigation />
      </div>
      <div className="right">
        <AuthButtons isAuth={isAuth} />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isAuth: selectIsAuth,
});

export default connect(mapStateToProps)(Header);
