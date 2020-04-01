import React from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Route, Redirect } from 'react-router-dom';

import { selectIsAuth } from 'store/auth/auth.selectors';

type Props = {
  isAuth: boolean,
  component: Node,
};

const PrivateRoute = (props: Props) => {
  const { isAuth, component: Component, ...otherProps } = props;

  return (
    <Route
      {...otherProps}
      render={(routeProps) => (isAuth ? <Component {...routeProps} /> : <Redirect to="/" />)}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  isAuth: selectIsAuth,
});

export default connect(mapStateToProps)(PrivateRoute);
