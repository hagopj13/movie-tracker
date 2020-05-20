// @flow
import React from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';

import configSelectors from 'store/config/config.selectors';

type Props = {
  backdropPath?: string,
  fullBackdropPath: string,
  children: Node,
};

const useStyles = makeStyles((theme) => ({
  backdrop: {
    boxShadow: 'inset 0 0 0 100vw rgba(0, 0, 0, 0.7)',
    backgroundImage: (props) => `url(${props.fullBackdropPath})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center, center',
  },
  noImageBackdrop: {
    backgroundColor: theme.palette.grey[500],
  },
}));

export const MovieBackdrop = (props: Props) => {
  const { backdropPath, fullBackdropPath, children } = props;

  const classes = useStyles(props);

  const isImageFound = backdropPath && fullBackdropPath;

  return (
    <div className={isImageFound ? classes.backdrop : classes.noImageBackdrop}>{children}</div>
  );
};

const mapStateToProps = createStructuredSelector({
  fullBackdropPath: (state, ownProps: Props) =>
    configSelectors.createBackdropFullPathSelector(ownProps.backdropPath)(state),
});

MovieBackdrop.defaultProps = {
  backdropPath: null,
};

export default connect(mapStateToProps)(MovieBackdrop);
