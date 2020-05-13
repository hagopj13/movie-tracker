// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ImageIcon from '@material-ui/icons/Image';

import configSelectors from 'store/config/config.selectors';
import type { Actor } from 'types';

type Props = {
  actor: Actor,
  fullProfilePath: string,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: 155,
    minWidth: 155,
  },
  cardContent: {
    padding: theme.spacing(2),
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
  profileMedia: {
    width: 155,
    height: 235,
  },
  brokenMediaContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.grey[200],
    height: 235,
  },
}));

export const ActorListItem = (props: Props) => {
  const { actor, fullProfilePath } = props;

  const classes = useStyles();

  const isImageFound = actor.profilePath && fullProfilePath;

  const renderMedia = () => {
    return isImageFound ? (
      <CardMedia className={classes.profileMedia} image={fullProfilePath} />
    ) : (
      <div className={classes.brokenMediaContainer}>
        <ImageIcon fontSize="large" />
      </div>
    );
  };

  return (
    <Card className={classes.root} elevation={3}>
      {renderMedia()}
      <CardContent className={classes.cardContent}>
        <Typography variant="h6">{actor.name}</Typography>
        <Typography>{actor.character}</Typography>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = createStructuredSelector({
  fullProfilePath: (state, ownProps: Props) =>
    configSelectors.createProfileFullPathSelector(ownProps.actor.profilePath)(state),
});

export default connect(mapStateToProps)(ActorListItem);
