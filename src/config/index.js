import React from 'react';
import DiscoverIcon from '@material-ui/icons/Movie';
import UpcomingIcon from '@material-ui/icons/Update';
import ProfileIcon from '@material-ui/icons/Person';

export const navigationItems = [
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

export const dialogTypes = {
  LOGIN: 'LOGIN',
};

export const sortOptions = [
  { value: 'popularity.desc', label: 'Popularity Descending' },
  { value: 'popularity.asc', label: 'Popularity Ascending' },
  { value: 'vote_average.desc', label: 'Rating Descending' },
  { value: 'vote_average.asc', label: 'Rating Ascending' },
  { value: 'release_date.desc', label: 'Release Date Descending' },
  { value: 'release_date.asc', label: 'Release Date Ascending' },
];
