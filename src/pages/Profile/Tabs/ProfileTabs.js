// @flow
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabPanel from 'components/TabPanel/TabPanel';

import FavortiesTab from './Favorites/ProfileFavoritesTab';
import WatchlistTab from './Watchlist/ProfileWatchlistTab';

const useStyles = makeStyles((theme) => ({
  tab: {
    fontSize: theme.typography.body1.fontSize,
  },
}));

const ProfileTabs = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const classes = useStyles();

  const handleTabChange = (event, newTab) => {
    setCurrentTab(newTab);
  };

  return (
    <>
      <Paper square>
        <Tabs
          value={currentTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleTabChange}
          centered
        >
          <Tab className={classes.tab} label="Favorites" disableRipple />
          <Tab className={classes.tab} label="Watchlist" disableRipple />
        </Tabs>
      </Paper>
      <TabPanel value={currentTab} index={0}>
        <FavortiesTab />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <WatchlistTab />
      </TabPanel>
    </>
  );
};

export default ProfileTabs;
