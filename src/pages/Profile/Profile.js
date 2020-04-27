// @flow
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Spinner from 'components/Spinner/Spinner';
import ProfileActionTypes from 'store/user/profile/profile.types';
import profileActions from 'store/user/profile/profile.actions';
import loadingSelectors from 'store/api/loading/loading.selectors';

import ProfileHeader from './Header/ProfileHeader';

type Props = {
  isLoading: boolean,
  onFetchProfile: () => void,
};

const ProfilePage = (props: Props) => {
  const { isLoading, onFetchProfile } = props;

  useLayoutEffect(() => {
    onFetchProfile();
  }, [onFetchProfile]);

  if (isLoading) {
    return <Spinner />;
  }

  return <ProfileHeader />;
};

const mapStateToProps = createStructuredSelector({
  isLoading: loadingSelectors.createIsLoadingSelector([ProfileActionTypes.FETCH_PROFILE]),
});

const mapDispatchToProps = {
  onFetchProfile: profileActions.fetchProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
