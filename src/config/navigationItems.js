import React from 'react';
import DiscoverIcon from '@material-ui/icons/Movie';
import UpcomingIcon from '@material-ui/icons/Update';
import ProfileIcon from '@material-ui/icons/Person';

export default [
  {
    id: 'DISCOVER',
    label: 'Discover',
    to: '/',
    icon: <DiscoverIcon />,
    requiresAuth: false,
  },
  {
    id: 'UPCOMING',
    label: 'Upcoming',
    to: '/upcoming',
    icon: <UpcomingIcon />,
    requiresAuth: false,
  },
  {
    id: 'PROFILE',
    label: 'Profile',
    to: '/profile',
    icon: <ProfileIcon />,
    requiresAuth: true,
  },
];
