// @flow
import React, { useEffect, useCallback } from 'react';
import type { Node } from 'react';

type Props = {
  children: Node,
  activationDistance?: number,
  onLoadMore: () => void,
};

const InfiniteScroll = (props: Props) => {
  const { children, activationDistance, onLoadMore } = props;

  const handleScroll = useCallback(() => {
    const documentHeight = document.body?.offsetHeight ?? 0;
    const scrollHeight = window.innerHeight + window.scrollY;
    if (scrollHeight + activationDistance >= documentHeight) {
      onLoadMore();
    }
  }, [activationDistance, onLoadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return <>{children}</>;
};

InfiniteScroll.defaultProps = {
  activationDistance: 20,
};

export default InfiniteScroll;
