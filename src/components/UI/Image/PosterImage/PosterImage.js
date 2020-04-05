// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectBaseImageUrl, selectPosterSize } from 'store/config/config.selectors';

type Props = {
  src: string,
  baseImageUrl: string,
  posterSize: string,
};

const PosterImage = (props: Props) => {
  const { src, baseImageUrl, posterSize } = props;

  const imageUrl = `${baseImageUrl}${posterSize}${src}`;

  return <img src={imageUrl} />;
};

const mapStateToProps = createStructuredSelector({
  baseImageUrl: selectBaseImageUrl,
  posterSize: selectPosterSize,
});

export default connect(mapStateToProps)(PosterImage);
