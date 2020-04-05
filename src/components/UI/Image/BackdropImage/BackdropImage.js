// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectBaseImageUrl, selectBackdropSize } from 'store/config/config.selectors';

type Props = {
  src: string,
  baseImageUrl: string,
  backdropSize: string,
};

const BackdropImage = (props: Props) => {
  const { src, baseImageUrl, backdropSize } = props;

  const imageUrl = `${baseImageUrl}${backdropSize}${src}`;

  return <img src={imageUrl} />;
};

const mapStateToProps = createStructuredSelector({
  baseImageUrl: selectBaseImageUrl,
  backdropSize: selectBackdropSize,
});

export default connect(mapStateToProps)(BackdropImage);
