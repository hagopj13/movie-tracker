// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { blueGrey } from '@material-ui/core/colors';

import profileSelectors from 'store/user/profile/profile.selectors';

type Props = {
  userName: string,
};

const useStyles = makeStyles((theme) => ({
  root: {
    background: `linear-gradient(${blueGrey[700]}, ${blueGrey[600]} 70%, ${blueGrey[500]})`,
  },
  container: {
    padding: theme.spacing(5),
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.common.white,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  avatar: {
    fontSize: 40,
    width: theme.spacing(11),
    height: theme.spacing(11),
    backgroundColor: theme.palette.primary.main,
    textTransform: 'uppercase',
    marginRight: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      marginBottom: theme.spacing(2),
    },
  },
}));

export const ProfileHeader = (props: Props) => {
  const { userName } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Avatar className={classes.avatar} color="primary">
          {userName?.length > 0 ? userName.charAt(0) : ''}
        </Avatar>
        <Typography className={classes.userName} variant="h4">
          {userName}
        </Typography>
      </Container>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userName: profileSelectors.selectUserName,
});

export default connect(mapStateToProps)(ProfileHeader);
