// @flow
import React from 'react';
import type { Node } from 'react';

type Props = {
  value: number,
  index: number,
  children: Node,
};

const TabPanel = (props: Props) => {
  const { value, index, children } = props;

  return <div>{value === index && <>{children}</>}</div>;
};

export default TabPanel;
