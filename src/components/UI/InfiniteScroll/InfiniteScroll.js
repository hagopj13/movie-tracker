// @flow
import React, { useEffect, useCallback } from 'react';
import type { Node } from 'react';

type Props = {
  children: Node,
  onLoadMore: () => void,
};

const InfiniteScroll = (props: Props) => {
  const { children, onLoadMore } = props;

  const activationDistance = 20;
  const handleScroll = useCallback(() => {
    const documentHeight = document.body?.offsetHeight;
    const scrollHeight = window.innerHeight + window.scrollY;
    if (scrollHeight + activationDistance >= documentHeight) {
      onLoadMore();
    }
  }, [onLoadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return <>{children}</>;
};

export default InfiniteScroll;
