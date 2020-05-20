// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import ImageIcon from '@material-ui/icons/Image';

import configSelectors from 'store/config/config.selectors';

type Props = {
  posterPath?: string,
  fullPosterPath: string,
  height?: number,
  width?: number,
};

const useStyles = makeStyles((theme) => ({
  brokenMediaContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.grey[200],
  },
}));

export const MoviePoster = (props: Props) => {
  const { posterPath, fullPosterPath, height, width } = props;

  const classes = useStyles();

  const isImageFound = posterPath && fullPosterPath;
  const imageStyle = {};
  if (height) {
    imageStyle.height = height;
  }
  if (width) {
    imageStyle.width = width;
  }

  return isImageFound ? (
    <CardMedia image={fullPosterPath} style={imageStyle} />
  ) : (
    <div className={classes.brokenMediaContainer} style={imageStyle}>
      <ImageIcon fontSize="large" />
    </div>
  );
};

MoviePoster.defaultProps = {
  posterPath: null,
  height: 0,
  width: 0,
};

const mapStateToProps = createStructuredSelector({
  fullPosterPath: (state, ownProps: Props) =>
    configSelectors.createPosterFullPathSelector(ownProps.posterPath)(state),
});

export default connect(mapStateToProps)(MoviePoster);
